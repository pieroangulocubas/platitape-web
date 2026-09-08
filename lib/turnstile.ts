import {
  TURNSTILE_SECRET_KEY,
  TURNSTILE_ALLOWED_HOSTNAMES,
  turnstileEnabled,
} from "./config";

// Cliente-side widget -> tu backend -> siteverify. NUNCA desde el navegador.
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_TOKEN_LEN = 2048;

interface SiteVerifyResponse {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
}

let warnedDisabled = false;
let warnedNoHostnames = false;

/**
 * Valida el token de Turnstile contra Cloudflare siguiendo el patrón canónico:
 * comprueba `success`, `action` y `hostname`. Falla cerrado (devuelve false)
 * ante cualquier error si Turnstile está configurado.
 *
 * Si Turnstile NO está configurado:
 *   - en desarrollo: devuelve true (no bloquea el formulario), avisa una vez.
 *   - en producción: devuelve FALSE (fail-closed), salvo TURNSTILE_OPTIONAL=true.
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string,
  expectedAction?: string
): Promise<boolean> {
  if (!turnstileEnabled) {
    const optional = process.env.TURNSTILE_OPTIONAL === "true";
    const isProd = process.env.NODE_ENV === "production";
    if (isProd && !optional) {
      console.error(
        "[turnstile] SIN CONFIGURAR en producción — se rechazan los envíos. " +
          "Define TURNSTILE_SECRET_KEY y NEXT_PUBLIC_TURNSTILE_SITE_KEY en Vercel " +
          "(o TURNSTILE_OPTIONAL=true para desactivar el CAPTCHA a propósito)."
      );
      return false;
    }
    if (!warnedDisabled) {
      console.warn(
        "[turnstile] no configurado — se omite la verificación de CAPTCHA. " +
          "Define TURNSTILE_SECRET_KEY y NEXT_PUBLIC_TURNSTILE_SITE_KEY."
      );
      warnedDisabled = true;
    }
    return true;
  }

  if (typeof token !== "string" || token.length === 0 || token.length > MAX_TOKEN_LEN) {
    return false;
  }

  const body = new URLSearchParams({
    secret: TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (ip && ip !== "unknown") body.set("remoteip", ip);

  let data: SiteVerifyResponse;
  try {
    const r = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) throw new Error(`siteverify HTTP ${r.status}`);
    data = (await r.json()) as SiteVerifyResponse;
  } catch (err) {
    console.error("[turnstile] error llamando a siteverify (fail closed):", err);
    return false;
  }

  if (!data.success) {
    console.warn("[turnstile] token rechazado:", data["error-codes"]);
    return false;
  }

  // La acción que declara el widget debe coincidir con la del endpoint.
  if (expectedAction && data.action && data.action !== expectedAction) {
    console.warn(
      `[turnstile] acción inesperada: ${data.action} (esperada ${expectedAction})`
    );
    return false;
  }

  // El hostname devuelto debe estar en la allowlist (si hay una).
  if (TURNSTILE_ALLOWED_HOSTNAMES.length > 0) {
    if (!data.hostname || !TURNSTILE_ALLOWED_HOSTNAMES.includes(data.hostname)) {
      console.warn(`[turnstile] hostname no permitido: ${data.hostname}`);
      return false;
    }
  } else if (!warnedNoHostnames) {
    console.warn(
      "[turnstile] TURNSTILE_ALLOWED_HOSTNAMES vacío — no se valida el hostname."
    );
    warnedNoHostnames = true;
  }

  return true;
}
