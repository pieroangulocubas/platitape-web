"use client";
import { GA_ID, resetConsent } from "@/lib/analytics";

/** Enlace del footer para reabrir el banner de consentimiento de cookies. */
export default function CookiePrefsButton() {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="footer-link"
      style={{ color: "rgba(15,10,46,0.66)", background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit" }}
    >
      Preferencias de cookies
    </button>
  );
}
