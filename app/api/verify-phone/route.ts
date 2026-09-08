import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { verifyPhoneByCode } from "@/lib/supabase";
import { INTERNAL_API_SECRET, supabaseEnabled } from "@/lib/config";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** Comparación en tiempo constante (evita timing attack sobre el secreto). */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * Marca el teléfono de un lead como verificado a partir del código corto que
 * el usuario envía por WhatsApp. Uso interno (equipo o una automatización que
 * lea el buzón de WhatsApp). Requiere el header `x-internal-secret`.
 *
 *   curl -X POST https://platita.pe/api/verify-phone \
 *     -H 'x-internal-secret: <INTERNAL_API_SECRET>' \
 *     -H 'content-type: application/json' \
 *     -d '{"code":"ABC12"}'
 */
export async function POST(req: Request) {
  if (!supabaseEnabled) {
    return NextResponse.json({ error: "Supabase no configurado." }, { status: 501 });
  }
  if (!INTERNAL_API_SECRET) {
    return NextResponse.json(
      { error: "INTERNAL_API_SECRET no configurado." },
      { status: 501 }
    );
  }
  // Rate limit por IP: freno ante fuerza bruta del secreto o de códigos.
  const rl = await rateLimit(clientIp(req), {
    bucket: "verify-phone",
    limit: 20,
    windowMs: 10 * 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiados intentos." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  const provided = req.headers.get("x-internal-secret") ?? "";
  if (!safeEqual(provided, INTERNAL_API_SECRET)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  let body: { code?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }
  const code = typeof body.code === "string" ? body.code.trim() : "";

  const r = await verifyPhoneByCode(code);
  if (!r.ok) return NextResponse.json({ error: "Código inválido." }, { status: 400 });
  return NextResponse.json({ ok: true, matched: r.matched });
}
