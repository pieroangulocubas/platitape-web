"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GA_ID, getConsent, setConsent } from "@/lib/analytics";

/**
 * Banner de consentimiento (opt-in). Solo aparece si hay GA configurado
 * y el visitante aún no ha elegido. No bloquea la página.
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Se lee tras montar para evitar desajuste de hidratación (localStorage
    // no existe en SSR). Un único setState al montar es aceptable aquí.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (GA_ID && getConsent() === null) setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener("platita:consent-reset", reopen);
    return () => window.removeEventListener("platita:consent-reset", reopen);
  }, []);

  if (!show) return null;

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div
        className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-4"
        style={{
          background: "#1c0f4c",
          color: "#fff",
          boxShadow: "0 12px 40px rgba(8,6,26,0.35)",
        }}
      >
        <p className="text-xs leading-relaxed sm:flex-1" style={{ color: "rgba(255,255,255,0.82)" }}>
          Usamos cookies de analítica para mejorar el sitio. Están activas por
          defecto; puedes rechazarlas aquí o cuando quieras desde el pie de página.
          Más información en nuestra{" "}
          <Link href="/privacidad" className="underline" style={{ color: "#6cdcff" }}>
            Política de Privacidad
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose("denied")}
            className="rounded-lg px-4 py-2 text-xs font-bold"
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}
          >
            Rechazar
          </button>
          <button
            onClick={() => choose("granted")}
            className="rounded-lg px-4 py-2 text-xs font-bold"
            style={{ background: "linear-gradient(135deg,#6cdcff,#bc45e9)", color: "#fff" }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
