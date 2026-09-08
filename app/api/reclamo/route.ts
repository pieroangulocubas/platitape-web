import { NextResponse } from "next/server";
import { validateReclamo, isBot } from "@/lib/validation";
import { rateLimit, clientIp, isSameOrigin } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { processReclamo } from "@/lib/reclamos";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(req: Request) {
  const ip = clientIp(req);

  // 0. Rechaza envíos de origen cruzado (CSRF).
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }

  // 1. Rate limit por IP.
  const rl = await rateLimit(ip, { bucket: "reclamo", limit: 4, windowMs: 15 * 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiados envíos. Espera unos minutos e intenta de nuevo." },
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
    return NextResponse.json({ ok: true, correlativo: null });
  }

  // 4. CAPTCHA (Cloudflare Turnstile). Se omite si no está configurado.
  const captchaOk = await verifyTurnstile(
    typeof body.turnstileToken === "string" ? body.turnstileToken : undefined,
    ip,
    "reclamo"
  );
  if (!captchaOk) {
    return NextResponse.json(
      { error: "No pudimos verificar que no eres un robot. Recarga e intenta de nuevo." },
      { status: 400 }
    );
  }

  // 5. Validación + normalización.
  const result = validateReclamo(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, field: result.field }, { status: 400 });
  }

  // 6. Persistir (Supabase) y disparar emails tras responder.
  try {
    const r = await processReclamo(result.data, {
      ip,
      userAgent: req.headers.get("user-agent") ?? "",
    });
    if (!r.ok) {
      return NextResponse.json(
        { error: r.error ?? "No se pudo registrar tu reclamo." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, correlativo: r.correlativo });
  } catch (err) {
    console.error("[reclamo] error inesperado:", err);
    return NextResponse.json(
      { error: "No se pudo registrar tu reclamo. Escríbenos por WhatsApp." },
      { status: 502 }
    );
  }
}
