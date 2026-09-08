"use client";
import { useCallback, useRef, useState } from "react";
import { NEXT_PUBLIC_TURNSTILE_SITE_KEY, WA_CONTACT_URL } from "@/lib/config";
import TurnstileWidget, { type TurnstileHandle } from "./TurnstileWidget";

const field: React.CSSProperties = {
  background: "#ffffff",
  border: "1.5px solid #e0ddf2",
  color: "#1c0f4c",
  borderRadius: "0.75rem",
  padding: "0.7rem 0.9rem",
  width: "100%",
  fontSize: "0.95rem",
  fontWeight: 500,
  outline: "none",
};
const labelCls = "text-xs font-bold tracking-wide";
const labelStyle: React.CSSProperties = { color: "rgba(15,10,46,0.66)" };

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className={labelCls} style={labelStyle}>
      {children}
    </label>
  );
}

interface State {
  consumidorNombre: string;
  tipoDocumento: string;
  numeroDocumento: string;
  domicilio: string;
  correo: string;
  telefono: string;
  esMenor: boolean;
  apoderadoNombre: string;
  bienTipo: string;
  bienDescripcion: string;
  montoReclamado: string;
  tipoSolicitud: string;
  detalle: string;
  pedido: string;
  acepta: boolean;
}

const INITIAL: State = {
  consumidorNombre: "",
  tipoDocumento: "DNI",
  numeroDocumento: "",
  domicilio: "",
  correo: "",
  telefono: "",
  esMenor: false,
  apoderadoNombre: "",
  bienTipo: "",
  bienDescripcion: "",
  montoReclamado: "",
  tipoSolicitud: "",
  detalle: "",
  pedido: "",
  acepta: false,
};

export default function ReclamoForm() {
  const [s, setS] = useState<State>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [correlativo, setCorrelativo] = useState<string | null>(null);

  const hpRef = useRef<HTMLInputElement>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const onCaptcha = useCallback((t: string | null) => setCaptchaToken(t), []);
  const captchaRequired = Boolean(NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const turnstileRef = useRef<TurnstileHandle>(null);

  function set<K extends keyof State>(key: K, value: State[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!s.acepta) {
      setError("Debes aceptar la Política de Privacidad para enviar el reclamo.");
      return;
    }
    if (captchaRequired && !captchaToken) {
      setError("Completa la verificación de seguridad.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reclamo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...s,
          montoReclamado: s.montoReclamado || undefined,
          turnstileToken: captchaToken ?? undefined,
          website: hpRef.current?.value ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "No se pudo registrar tu reclamo. Intenta de nuevo.");
        turnstileRef.current?.reset();
        setCaptchaToken(null);
        return;
      }
      setCorrelativo(data.correlativo ?? "registrado");
    } catch {
      setError("Hubo un problema de conexión. Intenta de nuevo.");
      turnstileRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  }

  if (correlativo) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "#ffffff", border: "1.5px solid #cdeede", boxShadow: "0 8px 30px rgba(28,15,76,0.06)" }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
          style={{ background: "linear-gradient(135deg,#22d3ee,#8b5cf6)" }}
        >
          ✓
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: "#1c0f4c" }}>
          Reclamo registrado
        </h2>
        <p className="text-sm mb-4" style={{ color: "rgba(15,10,46,0.66)" }}>
          Tu hoja del Libro de Reclamaciones quedó registrada con el número
        </p>
        <p
          className="text-lg font-black mb-4 inline-block px-4 py-2 rounded-lg"
          style={{ color: "#1c0f4c", background: "rgba(108,220,255,0.15)" }}
        >
          {correlativo}
        </p>
        <p className="text-sm" style={{ color: "rgba(15,10,46,0.66)" }}>
          Te enviamos una copia a tu correo. Recibirás respuesta en un plazo no
          mayor de <strong>15 días hábiles</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 md:p-8 flex flex-col gap-6"
      style={{ background: "#ffffff", border: "1.5px solid #e0ddf2", boxShadow: "0 8px 30px rgba(28,15,76,0.06)" }}
      noValidate
    >
      {/* Honeypot */}
      <input
        ref={hpRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {/* 1. Consumidor */}
      <fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
        <legend className="text-sm font-black mb-1" style={{ color: "#1c0f4c" }}>
          1. Identificación del consumidor reclamante
        </legend>

        <div className="flex flex-col gap-1.5">
          <Label>Nombre completo *</Label>
          <input
            style={field}
            value={s.consumidorNombre}
            onChange={(e) => set("consumidorNombre", e.target.value)}
            placeholder="Nombres y apellidos"
            required
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Tipo de documento *</Label>
            <select
              style={field}
              value={s.tipoDocumento}
              onChange={(e) => set("tipoDocumento", e.target.value)}
            >
              <option value="DNI">DNI</option>
              <option value="CE">Carné de extranjería</option>
              <option value="PASAPORTE">Pasaporte</option>
              <option value="RUC">RUC</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label>Número de documento *</Label>
            <input
              style={field}
              value={s.numeroDocumento}
              onChange={(e) => set("numeroDocumento", e.target.value)}
              inputMode="numeric"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Correo electrónico *</Label>
            <input
              type="email"
              style={field}
              value={s.correo}
              onChange={(e) => set("correo", e.target.value)}
              placeholder="tucorreo@email.com"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Teléfono / celular</Label>
            <input
              type="tel"
              style={field}
              value={s.telefono}
              onChange={(e) => set("telefono", e.target.value)}
              placeholder="+51 999 999 999"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Domicilio</Label>
          <input
            style={field}
            value={s.domicilio}
            onChange={(e) => set("domicilio", e.target.value)}
            placeholder="Av. / Calle, número, distrito"
          />
        </div>

        <label className="flex items-center gap-2 text-sm" style={{ color: "#3a3357" }}>
          <input
            type="checkbox"
            checked={s.esMenor}
            onChange={(e) => set("esMenor", e.target.checked)}
          />
          El consumidor es menor de edad
        </label>
        {s.esMenor && (
          <div className="flex flex-col gap-1.5">
            <Label>Nombre del padre, madre o apoderado *</Label>
            <input
              style={field}
              value={s.apoderadoNombre}
              onChange={(e) => set("apoderadoNombre", e.target.value)}
              required
            />
          </div>
        )}
      </fieldset>

      {/* 2. Bien contratado */}
      <fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
        <legend className="text-sm font-black mb-1" style={{ color: "#1c0f4c" }}>
          2. Identificación del bien contratado
        </legend>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>¿Producto o servicio? *</Label>
            <select
              style={field}
              value={s.bienTipo}
              onChange={(e) => set("bienTipo", e.target.value)}
              required
            >
              <option value="">— Selecciona —</option>
              <option value="producto">Producto</option>
              <option value="servicio">Servicio</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Monto reclamado (S/)</Label>
            <input
              style={field}
              value={s.montoReclamado}
              onChange={(e) => set("montoReclamado", e.target.value)}
              inputMode="decimal"
              placeholder="Opcional"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Descripción del producto o servicio *</Label>
          <input
            style={field}
            value={s.bienDescripcion}
            onChange={(e) => set("bienDescripcion", e.target.value)}
            placeholder="Ej.: plan de inversión, atención en la plataforma, etc."
            required
          />
        </div>
      </fieldset>

      {/* 3. Detalle */}
      <fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
        <legend className="text-sm font-black mb-1" style={{ color: "#1c0f4c" }}>
          3. Detalle de la reclamación
        </legend>

        <div className="flex flex-col gap-2">
          <Label>Tipo *</Label>
          <label className="flex gap-2 text-sm items-start" style={{ color: "#3a3357" }}>
            <input
              type="radio"
              name="tipoSolicitud"
              checked={s.tipoSolicitud === "reclamo"}
              onChange={() => set("tipoSolicitud", "reclamo")}
              className="mt-1"
            />
            <span>
              <strong>Reclamo</strong> — disconformidad relacionada con el
              producto o servicio.
            </span>
          </label>
          <label className="flex gap-2 text-sm items-start" style={{ color: "#3a3357" }}>
            <input
              type="radio"
              name="tipoSolicitud"
              checked={s.tipoSolicitud === "queja"}
              onChange={() => set("tipoSolicitud", "queja")}
              className="mt-1"
            />
            <span>
              <strong>Queja</strong> — malestar respecto de la atención al
              público; no está referida al producto o servicio.
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Detalle *</Label>
          <textarea
            style={{ ...field, minHeight: 110, resize: "vertical" }}
            value={s.detalle}
            onChange={(e) => set("detalle", e.target.value)}
            maxLength={3000}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Pedido del consumidor *</Label>
          <textarea
            style={{ ...field, minHeight: 80, resize: "vertical" }}
            value={s.pedido}
            onChange={(e) => set("pedido", e.target.value)}
            maxLength={3000}
            placeholder="Qué solicitas concretamente"
            required
          />
        </div>
      </fieldset>

      <TurnstileWidget ref={turnstileRef} action="reclamo" onToken={onCaptcha} />

      <label className="flex items-start gap-2 text-xs" style={{ color: "#3a3357" }}>
        <input
          type="checkbox"
          checked={s.acepta}
          onChange={(e) => set("acepta", e.target.checked)}
          className="mt-0.5"
        />
        <span>
          He leído y acepto la{" "}
          <a href="/privacidad" target="_blank" style={{ color: "#a234cc", fontWeight: 700, textDecoration: "underline" }}>
            Política de Privacidad
          </a>{" "}
          y autorizo el tratamiento de mis datos para gestionar este reclamo.
        </span>
      </label>

      {error && (
        <p
          className="text-sm px-4 py-3 rounded-xl"
          style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)", color: "#dc2626" }}
        >
          ⚠️ {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-gradient px-8 py-4 rounded-full font-bold self-start"
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Enviando…" : "Enviar hoja de reclamación"}
      </button>

      <p className="text-xs" style={{ color: "rgba(15,10,46,0.55)" }}>
        La formulación del reclamo no impide acudir a otras vías de solución de
        controversias ni es requisito previo para presentar una denuncia ante
        INDECOPI. Si prefieres, también puedes escribirnos por{" "}
        <a href={WA_CONTACT_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#a234cc", fontWeight: 700 }}>
          WhatsApp
        </a>
        .
      </p>
    </form>
  );
}
