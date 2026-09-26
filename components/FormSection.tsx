"use client";
import {
  WA_BASE_URL,
  WA_CHANNEL_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY,
} from "@/lib/config";
import { peruData } from "@/lib/peru-data";
import { track } from "@/lib/analytics";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TurnstileWidget, { type TurnstileHandle } from "./TurnstileWidget";

interface LeadMeta {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrer: string;
}

interface FormData {
  nombre: string;
  correo: string;
  telefono: string;
  departamento: string;
  provincia: string;
  distrito: string;
  fechaNacimiento: string;
  montoInteres: string;
  viveExtranjero: boolean;
  ubicacionExtranjero: string;
}

const INITIAL: FormData = {
  nombre: "",
  correo: "",
  telefono: "",
  departamento: "",
  provincia: "",
  distrito: "",
  fechaNacimiento: "",
  montoInteres: "",
  viveExtranjero: false,
  ubicacionExtranjero: "",
};

// Rango de inversión de interés — métrica clave de validación de demanda.
const MONTO_INTERES_OPCIONES: [string, string][] = [
  ["10-25k", "Entre S/ 10,000 y S/ 25,000"],
  ["25-50k", "Entre S/ 25,000 y S/ 50,000"],
  ["50-100k", "Entre S/ 50,000 y S/ 100,000"],
  ["100-250k", "Entre S/ 100,000 y S/ 250,000"],
  ["250k+", "Más de S/ 250,000"],
  ["explorando", "Aún estoy explorando"],
];

// Valor de pipeline potencial (S/) para el evento generate_lead de GA4:
// punto medio del rango, o el mínimo para el tramo abierto.
const MONTO_INTERES_VALOR: Record<string, number> = {
  "10-25k": 17500,
  "25-50k": 37500,
  "50-100k": 75000,
  "100-250k": 175000,
  "250k+": 250000,
  explorando: 0,
};

// Light input style
const lightInput: React.CSSProperties = {
  background: "#ffffff",
  border: "1.5px solid #e0ddf2",
  color: "#1c0f4c",
  borderRadius: "0.9rem",
  padding: "0.875rem 1rem 0.875rem 3.1rem",
  width: "100%",
  fontSize: "0.95rem",
  fontWeight: 500,
  transition: "border-color 0.2s, box-shadow 0.2s",
  outline: "none",
};

const lightInputFocus: React.CSSProperties = {
  borderColor: "#bc45e9",
  boxShadow: "0 0 0 3px rgba(188,69,233,0.10)",
};

/** Icon circle overlaid on the left side of a field */
function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
      style={{ width: "2.1rem", height: "2.1rem", borderRadius: "9999px", background: "rgba(28,15,76,0.06)" }}
    >
      {children}
    </div>
  );
}

const iconProps = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "#1c0f4c", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IconUser = () => (
  <svg {...iconProps}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const IconMail = () => (
  <svg {...iconProps}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
);
const IconPhone = () => (
  <svg {...iconProps}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const IconCalendar = () => (
  <svg {...iconProps}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);
const IconBuilding = () => (
  <svg {...iconProps}><path d="M3 21h18M6 21V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17M15 21v-9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9" /><path d="M9 7h1M9 11h1M9 15h1" /></svg>
);
const IconPin = () => (
  <svg {...iconProps}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IconWallet = () => (
  <svg {...iconProps}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
);

function LightInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{ ...lightInput, ...(focused ? lightInputFocus : {}), ...props.style }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

function LightSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      style={{ ...lightInput, ...(focused ? lightInputFocus : {}), appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231c0f4c' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "2.5rem" }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

export default function FormSection() {
  const [form, setForm]           = useState<FormData>(INITIAL);
  const [showLocation, setShowLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  // Código corto para verificar el teléfono por WhatsApp (Nivel 1).
  const [verifyCode, setVerifyCode] = useState<string | null>(null);

  // Honeypot: input oculto que los humanos no ven ni tabulan; los bots lo llenan.
  const hpRef = useRef<HTMLInputElement>(null);

  // Token de Cloudflare Turnstile (null hasta que el widget lo emite).
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const onCaptcha = useCallback((t: string | null) => setCaptchaToken(t), []);
  const captchaRequired = Boolean(NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const turnstileRef = useRef<TurnstileHandle>(null);

  // Atribución de campaña — se captura una vez al montar.
  const metaRef = useRef<LeadMeta>({ utmSource: "", utmMedium: "", utmCampaign: "", referrer: "" });
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

  const provinces = useMemo(
    () => peruData.find((d) => d.name === form.departamento)?.provinces ?? [],
    [form.departamento]
  );
  const districts = useMemo(
    () => provinces.find((p) => p.name === form.provincia)?.districts ?? [],
    [provinces, form.provincia]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target;
    const { name } = target;
    if (name === "viveExtranjero") {
      const checked = (target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, viveExtranjero: checked }));
      setError("");
      return;
    }
    const { value } = target;
    setForm((prev) => {
      if (name === "departamento") return { ...prev, departamento: value, provincia: "", distrito: "" };
      if (name === "provincia")    return { ...prev, provincia: value, distrito: "" };
      return { ...prev, [name]: value };
    });
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const required: (keyof FormData)[] = [
      "nombre",
      "correo",
      "telefono",
      "fechaNacimiento",
      "montoInteres",
    ];
    for (const key of required) {
      if (!form[key]) {
        setError("Por favor, completa los campos obligatorios.");
        return;
      }
    }
    if (captchaRequired && !captchaToken) {
      setError("Completa la verificación de seguridad para continuar.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          correo: form.correo,
          telefono: form.telefono,
          departamento: form.departamento,
          provincia: form.provincia,
          distrito: form.distrito,
          fechaNacimiento: form.fechaNacimiento,
          montoInteres: form.montoInteres,
          viveExtranjero: form.viveExtranjero,
          ubicacionExtranjero: form.ubicacionExtranjero,
          website: hpRef.current?.value ?? "",
          turnstileToken: captchaToken,
          ...metaRef.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.error || "Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp."
        );
      }
      if (typeof data.verifyCode === "string") setVerifyCode(data.verifyCode);
      track("generate_lead", {
        currency: "PEN",
        value: MONTO_INTERES_VALOR[form.montoInteres] ?? 0,
        monto_interes: form.montoInteres,
        vive_extranjero: form.viveExtranjero,
        pais: form.viveExtranjero ? form.ubicacionExtranjero : "Perú",
        duplicate: Boolean(data.duplicate),
        utm_source: metaRef.current.utmSource || undefined,
        utm_campaign: metaRef.current.utmCampaign || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp."
      );
      // El token de Turnstile es de un solo uso: si el envío falló, pide uno nuevo.
      setCaptchaToken(null);
      turnstileRef.current?.reset();
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    // Chat directo con el negocio, con el código pre-cargado para confirmar el teléfono.
    const waDirectConfirmUrl = `${WA_BASE_URL}?text=${encodeURIComponent(
      `Hola, confirmo mi registro en Platita.pe ✅ Mi código: ${verifyCode ?? ""}`
    )}`;
    return (
      <section id="registro" className="py-12 md:py-20 px-4" style={{ background: "#ffffff" }}>
        <div className="max-w-xl mx-auto text-center">
          <div className="rounded-3xl p-12 flex flex-col items-center gap-5"
            style={{ background: "#ffffff", border: "1.5px solid #e0ddf2", boxShadow: "0 8px 40px rgba(28,15,76,0.08)" }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
              style={{ background: "linear-gradient(135deg,#22d3ee,#8b5cf6)" }}>
              🎉
            </div>
            <h2 className="text-3xl font-black" style={{ color: "#1c0f4c" }}>
              ¡Ya estás en la lista!
            </h2>
            <p className="text-lg" style={{ color: "rgba(15,10,46,0.66)" }}>
              {verifyCode
                ? "Último paso opcional: escríbenos por WhatsApp con tu código y aseguras acceso prioritario cuando lancemos."
                : "Te notificaremos cuando Platita.pe esté disponible en tu zona."}
            </p>

            {verifyCode ? (
              <a href={waDirectConfirmUrl} target="_blank" rel="noopener noreferrer"
                className="btn-gradient px-8 py-4 rounded-full font-bold flex items-center gap-2">
                <span>📲</span>
                <span>Confirmar por WhatsApp</span>
              </a>
            ) : (
              <a href={WA_CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="btn-gradient px-8 py-4 rounded-full font-bold flex items-center gap-2">
                <span>📢</span>
                <span>Unirme al canal</span>
              </a>
            )}

            {/* El canal (difusión) siempre disponible como secundario */}
            {verifyCode && (
              <a href={WA_CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="text-sm font-bold" style={{ color: "#a234cc" }}>
                Únete también a nuestro canal de WhatsApp →
              </a>
            )}
            {verifyCode && (
              <p className="text-xs" style={{ color: "rgba(15,10,46,0.66)" }}>
                También te enviamos un correo para confirmar tu email.
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registro" className="py-12 md:py-20 px-4 relative overflow-hidden" style={{ background: "#ffffff" }}>
      {/* Decorative blobs */}
      <div className="absolute pointer-events-none" style={{ right: "-5%", top: "-10%", width: "40%", height: "60%", background: "radial-gradient(ellipse, rgba(188,69,233,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute pointer-events-none" style={{ left: "-5%", bottom: "-5%", width: "35%", height: "50%", background: "radial-gradient(ellipse, rgba(108,220,255,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: "#1c0f4c" }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#6cdcff", boxShadow: "0 0 6px #6cdcff",
              animation: "pulse-dot 1.5s infinite", flexShrink: 0,
            }} />
            Únete a la lista de espera
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-3" style={{ color: "#1c0f4c" }}>
            Únete a{" "}
            <span className="gradient-text">inversionistas</span>
          </h2>
          <p className="text-base" style={{ color: "rgba(8,11,30,0.66)" }}>
            Sin compromiso. Cupos limitados para el primer grupo de inversionistas: te avisamos antes del lanzamiento y tendrás acceso prioritario.
          </p>

          {/* Badge de cupos reservados */}
          <div
            className="mt-5 inline-flex flex-col sm:flex-row items-center gap-2.5 px-4 py-2 rounded-2xl border"
            style={{
              background: "rgba(28,15,76,0.03)",
              borderColor: "rgba(28,15,76,0.08)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold" style={{ color: "#1c0f4c" }}>
                Private Beta Q4 2026:{" "}
                <strong className="text-[#a234cc]">82% de cupos reservados</strong>
              </span>
            </div>
            <div className="w-24 sm:w-28 h-2 rounded-full overflow-hidden bg-slate-200">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: "82%",
                  background: "linear-gradient(90deg, #6cdcff, #bc45e9)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-3xl p-8 md:p-10" style={{ background: "#ffffff", border: "1px solid #d2dcea", boxShadow: "0 2px 8px rgba(8,10,30,0.05), 0 12px 40px rgba(8,10,30,0.07)" }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

            {/* Honeypot anti-spam — oculto para humanos, invisible a lectores de pantalla */}
            <input
              ref={hpRef}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide" style={{ color: "rgba(15,10,46,0.66)" }}>Nombre completo *</label>
                <div className="relative">
                  <FieldIcon><IconUser /></FieldIcon>
                  <LightInput type="text" name="nombre" aria-label="Nombre completo" value={form.nombre} onChange={handleChange} placeholder="Juan Pérez García" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide" style={{ color: "rgba(15,10,46,0.66)" }}>Correo electrónico *</label>
                <div className="relative">
                  <FieldIcon><IconMail /></FieldIcon>
                  <LightInput type="email" name="correo" aria-label="Correo electrónico" value={form.correo} onChange={handleChange} placeholder="juan@email.com" />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide" style={{ color: "rgba(15,10,46,0.66)" }}>Teléfono / WhatsApp *</label>
                <div className="relative">
                  <FieldIcon><IconPhone /></FieldIcon>
                  <LightInput type="tel" name="telefono" aria-label="Teléfono / WhatsApp" value={form.telefono} onChange={handleChange} placeholder="+51 999 999 999" autoComplete="tel" />
                </div>
                <span className="text-[0.68rem]" style={{ color: "rgba(15,10,46,0.5)" }}>
                  Con código de país (ej. +51 Perú, +1 EE.UU., +34 España).
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide" style={{ color: "rgba(15,10,46,0.66)" }}>Fecha de nacimiento *</label>
                <div className="relative">
                  <FieldIcon><IconCalendar /></FieldIcon>
                  <LightInput
                    type="date" name="fechaNacimiento" aria-label="Fecha de nacimiento" value={form.fechaNacimiento} onChange={handleChange}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                    style={{ colorScheme: "light" }}
                  />
                </div>
              </div>
            </div>

            {/* Rango de inversión de interés — antes que la ubicación */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide" style={{ color: "rgba(15,10,46,0.66)" }}>¿Cuánto te interesaría invertir? *</label>
              <div className="relative">
                <FieldIcon><IconWallet /></FieldIcon>
                <LightSelect name="montoInteres" aria-label="Rango de inversión de interés" value={form.montoInteres} onChange={handleChange}>
                  <option value="">— Selecciona un rango —</option>
                  {MONTO_INTERES_OPCIONES.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </LightSelect>
              </div>
            </div>

            {/* Ubicación opcional — con incentivo de valor claro */}
            <div className="rounded-2xl border border-dashed border-[#c8c2ec] bg-[#faf9ff] p-4 transition-all hover:border-[#bc45e9]/50">
              <button
                type="button"
                onClick={() => setShowLocation((prev) => !prev)}
                className="flex w-full items-center justify-between text-left transition-colors"
                style={{ color: "#1c0f4c" }}
                aria-expanded={showLocation}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg, rgba(108,220,255,0.2), rgba(188,69,233,0.2))" }}
                  >
                    <IconPin />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-[#1c0f4c]">
                      ¿Quieres prioridad en proyectos de tu zona?{" "}
                      <span className="font-normal text-[#8a85a0]">(Opcional)</span>
                    </div>
                    <p className="mt-0.5 text-[0.72rem] text-[#6d678a]">
                      Te avisamos primero cuando abramos proyectos cerca de ti y coordinamos notarías en tu ciudad.
                    </p>
                  </div>
                </div>
                <span
                  className="ml-2 shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-extrabold transition-all"
                  style={{
                    background: showLocation ? "rgba(28,15,76,0.08)" : "#ffffff",
                    color: "#a234cc",
                    border: "1px solid rgba(28,15,76,0.12)",
                  }}
                >
                  {showLocation ? "Ocultar −" : "Personalizar +"}
                </span>
              </button>

              {showLocation && (
                <div className="mt-4 flex flex-col gap-4 border-t border-[#e0ddf2] pt-4">
                  <label className="flex items-center gap-2 text-xs font-semibold" style={{ color: "#3a3357" }}>
                    <input
                      type="checkbox"
                      name="viveExtranjero"
                      checked={form.viveExtranjero}
                      onChange={handleChange}
                    />
                    <span>Vivo fuera del Perú</span>
                  </label>

                  {form.viveExtranjero ? (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold tracking-wide" style={{ color: "rgba(15,10,46,0.66)" }}>
                        Ciudad y país de residencia (opcional)
                      </label>
                      <div className="relative">
                        <FieldIcon><IconPin /></FieldIcon>
                        <LightInput
                          type="text"
                          name="ubicacionExtranjero"
                          aria-label="Ciudad y país de residencia"
                          value={form.ubicacionExtranjero}
                          onChange={handleChange}
                          placeholder="Ej.: Miami, Estados Unidos"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold tracking-wide" style={{ color: "rgba(15,10,46,0.66)" }}>
                          Departamento (opcional)
                        </label>
                        <div className="relative">
                          <FieldIcon><IconBuilding /></FieldIcon>
                          <LightSelect name="departamento" aria-label="Departamento" value={form.departamento} onChange={handleChange}>
                            <option value="">— Selecciona tu departamento (opcional) —</option>
                            {peruData.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
                          </LightSelect>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold tracking-wide" style={{ color: "rgba(15,10,46,0.66)" }}>
                            Provincia (opcional)
                          </label>
                          <div className="relative">
                            <FieldIcon><IconPin /></FieldIcon>
                            <LightSelect name="provincia" aria-label="Provincia" value={form.provincia} onChange={handleChange} disabled={!form.departamento} style={{ opacity: !form.departamento ? 0.45 : 1 }}>
                              <option value="">— Selecciona provincia —</option>
                              {provinces.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                            </LightSelect>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold tracking-wide" style={{ color: "rgba(15,10,46,0.66)" }}>
                            Distrito (opcional)
                          </label>
                          <div className="relative">
                            <FieldIcon><IconPin /></FieldIcon>
                            <LightSelect name="distrito" aria-label="Distrito" value={form.distrito} onChange={handleChange} disabled={!form.provincia} style={{ opacity: !form.provincia ? 0.45 : 1 }}>
                              <option value="">— Selecciona distrito —</option>
                              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                            </LightSelect>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* CAPTCHA — sólo se muestra si hay site key configurada */}
            <TurnstileWidget ref={turnstileRef} action="registro" onToken={onCaptcha} />

            {error && (
              <p className="text-sm px-4 py-3 rounded-xl" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)", color: "#dc2626" }}>
                ⚠️ {error}
              </p>
            )}

            <button
              type="submit" disabled={loading}
              className="btn-gradient py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Enviando...</span>
                </>
              ) : (
                <span>Reserva tu lugar</span>
              )}
            </button>

            <p className="text-xs text-center mt-1" style={{ color: "rgba(15,10,46,0.55)" }}>
              Al enviar aceptas los{" "}
              <a href="/terminos" target="_blank" className="font-semibold" style={{ color: "#a234cc", textDecoration: "underline" }}>
                Términos y Condiciones
              </a>{" "}
              y la{" "}
              <a href="/privacidad" target="_blank" className="font-semibold" style={{ color: "#a234cc", textDecoration: "underline" }}>
                Política de Privacidad
              </a>
              .
            </p>

            {/* Micro-garantía de seguridad y privacidad — Recomendación Punto 2 */}
            <div
              className="flex items-center justify-center gap-2 text-xs pt-1"
              style={{ color: "rgba(15,10,46,0.62)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Tus datos viajan cifrados bajo la Ley N.° 29733 · Cero spam ni llamadas molestas</span>
            </div>
          </form>
        </div>

        {/* WA channel CTA */}
        <div className="mt-6 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4"
          style={{ background: "rgba(37,211,102,0.06)", border: "1.5px solid rgba(37,211,102,0.20)" }}>
          <div className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(37,211,102,0.12)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-sm" style={{ color: "#1c0f4c" }}>Únete a nuestro canal de WhatsApp</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(15,10,46,0.66)" }}>
              Recibe actualizaciones exclusivas, tips de inversión y el aviso de lanzamiento antes que nadie
            </p>
          </div>
          <a href={WA_CHANNEL_URL} target="_blank" rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
            style={{ background: "#0C7A3E", boxShadow: "0 4px 20px rgba(37,211,102,0.3)", textDecoration: "none" }}>
            Unirme al canal
          </a>
        </div>
      </div>
    </section>
  );
}
