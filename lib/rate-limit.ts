// Rate limiting por IP — ventana deslizante en memoria, por instancia.
//
// En serverless el límite efectivo es `limit × nº de instancias calientes`:
// no es una muralla exacta, es un freno ante ráfagas desde una misma IP.
// Para una landing de validación es suficiente; el honeypot y Turnstile son
// la defensa real contra bots.

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
}

const buckets = new Map<string, number[]>();
let lastSweep = 0;

function memoryLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  if (now - lastSweep > 5 * 60_000) {
    for (const [k, hits] of buckets) {
      if (hits.every((t) => now - t > windowMs)) buckets.delete(k);
    }
    lastSweep = now;
  }
  let hits = buckets.get(key) ?? [];
  hits = hits.filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil((windowMs - (now - hits[0])) / 1000),
    };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { ok: true, remaining: limit - hits.length, retryAfterSec: 0 };
}

export async function rateLimit(
  key: string,
  {
    bucket = "form",
    limit = 5,
    windowMs = 10 * 60_000,
  }: { bucket?: string; limit?: number; windowMs?: number } = {}
): Promise<RateLimitResult> {
  return memoryLimit(`${bucket}:${key}`, limit, windowMs);
}

/** IP del cliente detrás del proxy de Vercel. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Defensa CSRF ligera para endpoints POST que cambian estado.
 * Acepta:
 *   - peticiones sin `Origin` (curl, server-to-server) — no son ataques CSRF,
 *   - `Origin` cuyo host coincide con el del propio servidor,
 *   - `Sec-Fetch-Site` "same-origin" / "same-site" / "none".
 * Rechaza solo cuando hay señal explícita de origen cruzado.
 */
export function isSameOrigin(req: Request): boolean {
  const secFetchSite = req.headers.get("sec-fetch-site");
  if (secFetchSite && !["same-origin", "same-site", "none"].includes(secFetchSite)) {
    return false;
  }
  const origin = req.headers.get("origin");
  if (!origin) return true; // sin Origin no hay CSRF de navegador
  try {
    const originHost = new URL(origin).host;
    const selfHost =
      req.headers.get("x-forwarded-host") ??
      req.headers.get("host") ??
      new URL(req.url).host;
    return originHost === selfHost;
  } catch {
    return false;
  }
}
