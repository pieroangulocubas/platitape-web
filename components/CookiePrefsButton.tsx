"use client";
import { resetConsent } from "@/lib/analytics";

/** Enlace del footer para reabrir el aviso de preferencias de cookies. */
export default function CookiePrefsButton() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="footer-link"
      style={{
        color: "rgba(15,10,46,0.66)",
        background: "none",
        border: 0,
        padding: 0,
        cursor: "pointer",
        font: "inherit",
      }}
    >
      Preferencias de cookies
    </button>
  );
}
