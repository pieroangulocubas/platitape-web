// Analítica (GA4) — modelo opt-out (práctica habitual en Perú, Ley 29733).
// - Sin NEXT_PUBLIC_GA_ID no se carga nada ni se muestra el aviso.
// - Se rastrea por defecto; el aviso informa y permite RECHAZAR.
// - Si el visitante rechaza, GA no se carga (ni ahora ni en visitas futuras).

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

const CONSENT_KEY = "platita_cookie_consent";
export type Consent = "granted" | "denied";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Opt-out: se permite analítica salvo rechazo explícito. */
export function analyticsAllowed(): boolean {
  return getConsent() !== "denied";
}

export function setConsent(v: Consent): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* modo incógnito / storage bloqueado */
  }
  // Si GA ya se cargó en esta sesión, respeta el rechazo con su flag oficial.
  if (GA_ID) {
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] =
      v === "denied";
  }
  window.dispatchEvent(new CustomEvent("platita:consent", { detail: v }));
}

/** Borra la elección para que el visitante pueda volver a decidir. */
export function resetConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new CustomEvent("platita:consent-reset"));
}

type GtagParams = Record<string, string | number | boolean | undefined>;

/** Envía un evento a GA4 si ya está cargado (si no, no hace nada). */
export function track(event: string, params?: GtagParams): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") w.gtag("event", event, params ?? {});
}
