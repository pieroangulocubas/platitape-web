"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { NEXT_PUBLIC_TURNSTILE_SITE_KEY, WA_BASE_URL } from "@/lib/config";
import { track } from "@/lib/analytics";
import TurnstileWidget, { type TurnstileHandle } from "./TurnstileWidget";

interface FormData {
  nombre: string;
  dni: string;
  telefono: string;
  correo: string;
  ciudad: string;
  experiencia: string;
  aceptaTerminos: boolean;
}

const INITIAL: FormData = {
  nombre: "",
  dni: "",
  telefono: "",
  correo: "",
  ciudad: "",
  experiencia: "",
  aceptaTerminos: false,
};

const EXPERIENCIA_OPCIONES: [string, string][] = [
  ["ninguna", "Sin experiencia comercial"],
  ["menos-1", "Menos de 1 año"],
  ["1-3", "De 1 a 3 años"],
  ["3-mas", "Más de 3 años"],
];

const inputClass =
  "w-full rounded-[0.9rem] px-4 py-3.5 text-[0.95rem] font-medium outline-none transition-[border-color,box-shadow] border-[1.5px] border-[#e0ddf2] bg-white text-[#1c0f4c] focus:border-[#bc45e9] focus:shadow-[0_0_0_3px_rgba(188,69,233,0.10)]";
const SELECT_ARROW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231c0f4c' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`;
const labelClass = "text-xs font-semibold tracking-wide text-[rgba(15,10,46,0.66)]";

const WA_ASESOR_URL = `${WA_BASE_URL}?text=${encodeURIComponent(
  "Hola, quiero postular al Programa de Asesores de Platita.pe."
)}`;

export default function AsesorForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hpRef = useRef<HTMLInputElement>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const onCaptcha = useCallback((t: string | null) => setCaptchaToken(t), []);
  const captchaRequired = Boolean(NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const turnstileRef = useRef<TurnstileHandle>(null);

  const metaRef = useRef({ utmSource: "", utmMedium: "", utmCampaign: "", referrer: "" });
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      metaRef.current = {
        utmSource: p.get("utm_source") ?? "",
        utmMedium: p.get("utm_medium") ?? "",
        utmCampaign: p.get("utm_campaign") ?? "",
        referrer: document.referrer ?? "",
      };
    } catch {
      /* noop */
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "aceptaTerminos") {
      setForm((prev) => ({ ...prev, aceptaTerminos: (e.target as HTMLInputElement).checked }));
    } else if (name === "dni") {
      setForm((prev) => ({ ...prev, dni: value.replace(/\D/g, "").slice(0, 8) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.dni || !form.telefono || !form.correo || !form.ciudad) {
      setError("Por favor, completa los campos obligatorios.");
      return;
    }
    if (form.dni.length !== 8) {
      setError("El DNI debe tener 8 dígitos.");
      return;
    }
    if (!form.aceptaTerminos) {
      setError("Debes aceptar los términos para enviar tu postulación.");
      return;
    }
    if (captchaRequired && !captchaToken) {
      setError("Completa la verificación de seguridad para continuar.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/asesores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: hpRef.current?.value ?? "",
          turnstileToken: captchaToken,
          ...metaRef.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.");
      }
      track("asesor_postulacion", {
        experiencia: form.experiencia || undefined,
        utm_source: metaRef.current.utmSource || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.");
      setCaptchaToken(null);
      turnstileRef.current?.reset();
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-3xl p-10 flex flex-col items-center text-center gap-4"
        style={{ background: "#ffffff", border: "1.5px solid #e0ddf2", boxShadow: "0 8px 40px rgba(28,15,76,0.08)" }}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "linear-gradient(135deg,#22d3ee,#8b5cf6)" }}>
          🤝
        </div>
        <h4 className="text-2xl font-black" style={{ color: "#1c0f4c" }}>¡Recibimos tu postulación!</h4>
        <p className="text-base" style={{ color: "rgba(15,10,46,0.66)" }}>
          Nuestro equipo revisará tu perfil y te contactará por WhatsApp o correo con los siguientes pasos.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6 md:p-8"
      style={{ background: "#ffffff", border: "1px solid #d2dcea", boxShadow: "0 2px 8px rgba(8,10,30,0.05), 0 12px 40px rgba(8,10,30,0.07)" }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Honeypot */}
        <input
          ref={hpRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px opacity-0"
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="as-nombre" className={labelClass}>Nombres y apellidos *</label>
          <input id="as-nombre" name="nombre" value={form.nombre} onChange={handleChange} autoComplete="name" maxLength={120} className={inputClass} placeholder="Ej.: María Quispe Rojas" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="as-dni" className={labelClass}>DNI *</label>
            <input id="as-dni" name="dni" value={form.dni} onChange={handleChange} inputMode="numeric" autoComplete="off" className={inputClass} placeholder="8 dígitos" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="as-telefono" className={labelClass}>Celular / WhatsApp *</label>
            <input id="as-telefono" name="telefono" type="tel" value={form.telefono} onChange={handleChange} autoComplete="tel" maxLength={20} className={inputClass} placeholder="9XX XXX XXX" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="as-correo" className={labelClass}>Correo electrónico *</label>
            <input id="as-correo" name="correo" type="email" value={form.correo} onChange={handleChange} autoComplete="email" maxLength={160} className={inputClass} placeholder="tu@correo.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="as-ciudad" className={labelClass}>Ciudad *</label>
            <input id="as-ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} autoComplete="address-level2" maxLength={80} className={inputClass} placeholder="Ej.: Arequipa" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="as-experiencia" className={labelClass}>
            Experiencia comercial <span className="font-normal text-[#8a85a0]">(opcional)</span>
          </label>
          <select id="as-experiencia" name="experiencia" value={form.experiencia} onChange={handleChange} className={`${inputClass} appearance-none pr-10`} style={{ backgroundImage: SELECT_ARROW, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
            <option value="">Selecciona una opción</option>
            {EXPERIENCIA_OPCIONES.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>

        <label className="flex items-start gap-2.5 text-xs leading-relaxed cursor-pointer" style={{ color: "#3a3357" }}>
          <input
            type="checkbox"
            name="aceptaTerminos"
            checked={form.aceptaTerminos}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#bc45e9]"
          />
          <span>
            Acepto que Platita.pe evalúe mi postulación y trate mis datos según la{" "}
            <Link href="/privacidad" className="font-bold underline" style={{ color: "#a234cc" }}>
              Política de Privacidad
            </Link>
            . Entiendo que las condiciones del programa, incluida la comisión, se firman al ser aprobado. *
          </span>
        </label>

        <TurnstileWidget ref={turnstileRef} action="asesores" onToken={onCaptcha} />

        {error && (
          <p className="text-sm px-4 py-3 rounded-xl" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)", color: "#dc2626" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-gradient w-full py-4 rounded-full font-bold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{loading ? "Enviando..." : "Enviar postulación"}</span>
        </button>

        <p className="text-xs text-center" style={{ color: "rgba(15,10,46,0.6)" }}>
          ¿Dudas?{" "}
          <a href={WA_ASESOR_URL} target="_blank" rel="noopener noreferrer" className="font-bold" style={{ color: "#a234cc" }}>
            Escríbenos por WhatsApp
          </a>
        </p>
      </form>
    </div>
  );
}
