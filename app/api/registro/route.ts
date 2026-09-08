import { NextResponse } from "next/server";
import { validateRegistro, isBot, extractMeta } from "@/lib/validation";
import { rateLimit, clientIp, isSameOrigin } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { processRegistro } from "@/lib/leads";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8 * 1024;

export async function POST(req: Request) {
  const ip = clientIp(req);

  // 0. Rechaza envíos de origen cruzado (CSRF).
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }

  // 1. Rate limit por IP.
  const rl = await rateLimit(ip, { bucket: "registro", limit: 5, windowMs: 10 * 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera unos minutos e intenta de nuevo." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  // 2. Cuerpo: tamaño + JSON válido.
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });
  }
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Formato inválido." }, { status: 400 });
  }

  // 3. Honeypot.
  if (isBot(body)) {
    return NextResponse.json({ ok: true });
  }

  // 4. CAPTCHA (Cloudflare Turnstile). Se omite si no está configurado.
  const captchaOk = await verifyTurnstile(
    typeof body.turnstileToken === "string" ? body.turnstileToken : undefined,
    ip,
    "registro"
  );
  if (!captchaOk) {
    return NextResponse.json(
      { error: "No pudimos verificar que no eres un robot. Recarga e intenta de nuevo." },
      { status: 400 }
    );
  }

  // 5. Validación + normalización.
  const result = validateRegistro(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, field: result.field }, { status: 400 });
  }
  const meta = extractMeta(body, req.headers.get("user-agent") ?? "");

  // 6. Persistir (Supabase + espejo Sheets) y disparar emails.
  try {
    const r = await processRegistro(result.data, meta);
    if (!r.ok) {
      return NextResponse.json(
        { error: "No se pudo guardar el registro. Escríbenos por WhatsApp." },
        { status: 502 }
      );
    }
    if (r.duplicate) {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    // verifyCode: código corto para el CTA de WhatsApp de la pantalla de éxito.
    return NextResponse.json({ ok: true, verifyCode: r.verifyCode ?? null });
  } catch (err) {
    console.error("[registro] error inesperado:", err);
    return NextResponse.json(
      { error: "No se pudo guardar el registro. Escríbenos por WhatsApp." },
      { status: 502 }
    );
  }
}
