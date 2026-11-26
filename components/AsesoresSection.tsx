import { ReactNode } from "react";
import AsesorForm from "./AsesorForm";

/**
 * Trabaja con nosotros — Programa de Asesores y Afiliados (un solo nivel).
 * La comisión no se publica: la define el equipo y se firma al aprobar al asesor.
 */

const NAVY = "#1c0f4c";
const MUTED = "rgba(8,11,30,0.66)";

const ico = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IconCoins = ({ c }: { c: string }) => (
  <svg {...ico} stroke={c}><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></svg>
);
const IconLink = ({ c }: { c: string }) => (
  <svg {...ico} stroke={c}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
);
const IconChart = ({ c }: { c: string }) => (
  <svg {...ico} stroke={c}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
);
const IconReceipt = ({ c }: { c: string }) => (
  <svg {...ico} stroke={c}><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v-11" /></svg>
);
const IconRocket = ({ c }: { c: string }) => (
  <svg {...ico} stroke={c}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
);
const IconShield = ({ c }: { c: string }) => (
  <svg {...ico} stroke={c}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
);

interface Benefit {
  icon: ReactNode;
  title: string;
  text: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: <IconCoins c="#bc45e9" />,
    title: "Comisión por cada inversionista",
    text: "Ganas un porcentaje sobre la inversión elegible de cada persona que refieres y se convierte en inversionista validado.",
  },
  {
    icon: <IconLink c="#0ea5e9" />,
    title: "Tu código y enlace personal",
    text: "Al ser aprobado recibes un código único para compartir por WhatsApp, redes o en persona. Cada registro queda a tu nombre.",
  },
  {
    icon: <IconChart c="#bc45e9" />,
    title: "Panel de seguimiento",
    text: "Consulta en tiempo real tus referidos, registros, inversionistas aprobados y el monto que generan.",
  },
  {
    icon: <IconReceipt c="#0ea5e9" />,
    title: "Comisiones transparentes",
    text: "Cada comisión muestra su estado (generada, pendiente o pagada) y la inversión que la originó. Con historial de pagos.",
  },
  {
    icon: <IconRocket c="#bc45e9" />,
    title: "Crece como asesor",
    text: "Representa una propuesta de inversión inmobiliaria con respaldo legal y desarróllate como asesor comercial de Platita.pe.",
  },
];

const STEPS = [
  { title: "Postula", text: "Completa el formulario en 2 minutos." },
  { title: "Te evaluamos", text: "Nuestro equipo revisa y aprueba tu perfil." },
  { title: "Recibe tu código", text: "Activamos tu enlace y tu panel de asesor." },
  { title: "Comparte", text: "Recomienda Platita.pe a quien quiera invertir." },
  { title: "Gana", text: "Tu referido invierte y se genera tu comisión." },
];

const PANEL_ROWS = [
  { label: "Personas referidas", value: "12" },
  { label: "Registros realizados", value: "9" },
  { label: "Inversionistas aprobados", value: "4" },
];

const RULES = [
  "Ganas solo por los inversionistas que refieres directamente.",
  "No hay multinivel ni pagos por reclutar a otros asesores.",
  "No aplican autoreferidos, cuentas duplicadas ni fraudulentas.",
  "La comisión se genera cuando tu referido completa sus validaciones e invierte.",
];

export default function AsesoresSection() {
  return (
    <section id="asesores" className="relative px-4 pt-6 pb-14 md:pb-24" style={{ background: "#ffffff" }}>
      {/* ── Banda principal (inspirada en un hero editorial oscuro) ── */}
      <div
        className="relative max-w-6xl mx-auto rounded-[32px] overflow-hidden px-6 py-12 md:px-14 md:py-20"
        style={{ background: `radial-gradient(120% 140% at 85% 0%, #3b1d8f 0%, ${NAVY} 55%, #0d0726 100%)` }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            right: "-8%", bottom: "-30%", width: "55%", height: "90%",
            background: "radial-gradient(ellipse, rgba(108,220,255,0.22) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(255,255,255,0.10)", color: "#c9f1ff" }}
            >
              Trabaja con nosotros
            </span>
            <h2 className="text-4xl md:text-6xl font-black mt-5 leading-[1.05] text-white">
              Gana comisiones
              <br />
              recomendando <span className="gradient-text">Platita.pe</span>
            </h2>
            <p className="text-base md:text-lg mt-5 max-w-xl" style={{ color: "rgba(255,255,255,0.78)" }}>
              Únete al Programa de Asesores y Afiliados. Comparte tu enlace personal con quienes quieren invertir en
              bienes raíces y gana por cada inversionista que se suma contigo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="#postular" className="btn-gradient px-8 py-4 rounded-full font-bold text-center">
                <span>Quiero ser asesor</span>
              </a>
              <a
                href="#asesores-como-funciona"
                className="px-8 py-4 rounded-full font-bold text-center text-white transition-colors hover:bg-white/10"
                style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}
              >
                ¿Cómo funciona?
              </a>
            </div>
          </div>

          {/* Vista referencial del panel del asesor */}
          <div
            className="rounded-3xl p-5 md:p-6"
            style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 30px 60px rgba(0,0,0,0.35)" }}
            aria-label="Vista referencial del panel del asesor"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-black" style={{ color: NAVY }}>Mi panel de asesor</p>
              <span className="text-[0.65rem] font-bold px-2 py-1 rounded-full" style={{ background: "#f5f3fc", color: "#6d678a" }}>
                Vista referencial
              </span>
            </div>
            <div
              className="mt-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
              style={{ background: "rgba(188,69,233,0.07)", border: "1px dashed rgba(188,69,233,0.4)" }}
            >
              <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold" style={{ color: MUTED }}>Tu enlace</p>
                <p className="text-sm font-bold truncate" style={{ color: "#a234cc" }}>platita.pe/?ref=MARIA24</p>
              </div>
              <IconLink c="#a234cc" />
            </div>
            <div className="mt-4 flex flex-col">
              {PANEL_ROWS.map((r) => (
                <div key={r.label} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor: "#eeeaf8" }}>
                  <span className="text-sm" style={{ color: MUTED }}>{r.label}</span>
                  <span className="text-sm font-black" style={{ color: NAVY }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { l: "Generada", c: "#0ea5e9" },
                { l: "Pendiente", c: "#f59e0b" },
                { l: "Pagada", c: "#16a34a" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl px-2 py-2.5 text-center" style={{ background: `${s.c}12` }}>
                  <span className="block w-2 h-2 rounded-full mx-auto mb-1.5" style={{ background: s.c }} />
                  <p className="text-[0.68rem] font-bold" style={{ color: s.c }}>{s.l}</p>
                </div>
              ))}
            </div>
            <p className="text-[0.68rem] mt-3 text-center" style={{ color: "rgba(8,11,30,0.5)" }}>
              Estados de tus comisiones e historial de pagos
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* ── Beneficios ── */}
        <div className="mt-14 md:mt-20 mb-8 max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: NAVY }}>
            Crece con <span className="gradient-text">propósito</span>
          </h3>
          <p className="text-base mt-3" style={{ color: MUTED }}>
            Te damos las herramientas y el respaldo para que te enfoques en lo importante: acompañar a tus contactos a
            invertir mejor.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal>
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl p-6 bg-white transition-transform duration-300 hover:-translate-y-1"
              style={{ border: "1px solid #e6e0f5", boxShadow: "0 8px 24px rgba(8,10,30,0.05)" }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#f5f3fc" }}>
                {b.icon}
              </div>
              <p className="text-lg font-black mt-4" style={{ color: NAVY }}>{b.title}</p>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: MUTED }}>{b.text}</p>
            </div>
          ))}
          <div
            className="rounded-3xl p-6 flex flex-col justify-between gap-4"
            style={{ background: "linear-gradient(135deg, rgba(108,220,255,0.16), rgba(188,69,233,0.16))", border: "1px solid rgba(188,69,233,0.25)" }}
          >
            <p className="text-lg font-black" style={{ color: NAVY }}>
              ¿Tienes contactos que buscan dónde invertir?
            </p>
            <a href="#postular" className="btn-gradient px-6 py-3 rounded-full font-bold text-center text-sm">
              <span>Postula ahora</span>
            </a>
          </div>
        </div>

        {/* ── Cómo funciona ── */}
        <div id="asesores-como-funciona" className="mt-14 md:mt-20 scroll-mt-28">
          <h3 className="text-3xl md:text-4xl font-black mb-8" style={{ color: NAVY }}>
            Así funciona el programa
          </h3>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl p-5" style={{ background: "#f8f7fd", border: "1px solid #ebe7f7" }}>
                <span className="text-4xl font-black gradient-text">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-base font-black mt-2" style={{ color: NAVY }}>{s.title}</p>
                <p className="text-sm mt-1" style={{ color: MUTED }}>{s.text}</p>
              </li>
            ))}
          </ol>

          <div
            className="mt-6 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-5"
            style={{ background: "rgba(108,220,255,0.06)", border: "1px solid rgba(108,220,255,0.28)" }}
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(108,220,255,0.16)" }}>
              <IconShield c="#0ea5e9" />
            </div>
            <div>
              <p className="font-black text-base mb-2" style={{ color: NAVY }}>Un programa claro, de un solo nivel</p>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-1.5">
                {RULES.map((r) => (
                  <li key={r} className="text-sm leading-relaxed flex gap-2" style={{ color: MUTED }}>
                    <span style={{ color: "#0ea5e9" }}>•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Postulación ── */}
        <div id="postular" className="mt-14 md:mt-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-start scroll-mt-28">
          <div>
            <h3 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: NAVY }}>
              Postula como <span className="gradient-text">asesor</span>
            </h3>
            <p className="text-base mt-3" style={{ color: MUTED }}>
              Revisamos cada postulación. Si eres aprobado, te contactamos para firmar las condiciones del programa,
              registrar tu cuenta bancaria para el pago de comisiones y activar tu código.
            </p>
            <div className="mt-6 rounded-2xl p-4 text-sm" style={{ background: "#faf9ff", border: "1px dashed #c8c2ec", color: "#3a3357" }}>
              <strong style={{ color: NAVY }}>Importante:</strong> nadie opera como asesor de Platita.pe sin la
              aprobación de nuestro equipo. El porcentaje de comisión se comunica al aprobar tu perfil.
            </div>
          </div>
          <AsesorForm />
        </div>
      </div>
    </section>
  );
}
