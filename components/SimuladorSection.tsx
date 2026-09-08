"use client";
import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import {
  getPlanForAmount,
  MIN_INVESTMENT,
  MAX_RATE,
  PLAN_TIERS,
  amountToSliderPos,
  sliderPosToAmount,
} from "@/lib/plans";

const MIN_AMOUNT = MIN_INVESTMENT;
const MAX_AMOUNT = 1000000;

const PERIODS = [12, 18, 24];

function fmt(n: number) {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clampAmount(v: number) {
  return Math.min(MAX_AMOUNT, Math.max(MIN_AMOUNT, v));
}

const IconCalculator = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="11" x2="8" y2="11.01" /><line x1="12" y1="11" x2="12" y2="11.01" /><line x1="16" y1="11" x2="16" y2="11.01" />
    <line x1="8" y1="15" x2="8" y2="15.01" /><line x1="12" y1="15" x2="12" y2="15.01" /><line x1="16" y1="15" x2="16" y2="15.01" />
    <line x1="8" y1="19" x2="8" y2="19.01" /><line x1="12" y1="19" x2="12" y2="19.01" /><line x1="16" y1="19" x2="16" y2="19.01" />
  </svg>
);

const IconCalendarCheck = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

const IconTrending = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconCheck = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconShield = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
  </svg>
);

export default function SimuladorSection() {
  const [amount, setAmount] = useState<number>(100000);
  const [months, setMonths] = useState<number>(12);
  const interacted = useRef(false);

  const onAmount = (next: number) => {
    setAmount(clampAmount(next));
    if (!interacted.current) {
      interacted.current = true;
      track("simulator_interact", { source: "section" });
    }
  };

  const plan             = getPlanForAmount(amount);
  const earnings          = amount * plan.rate * (months / 12);
  const total             = amount + earnings;
  const monthlyEarnings   = (amount * plan.rate) / 12;
  const sliderPct         = amountToSliderPos(amount) * 100;

  return (
    <section
      id="simulador"
      className="py-14 md:py-24 px-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 15% 10%, rgba(108,220,255,0.10) 0%, transparent 55%), " +
          "radial-gradient(ellipse 70% 60% at 85% 90%, rgba(188,69,233,0.09) 0%, transparent 55%), " +
          "#ffffff",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-5"
              style={{ background: "linear-gradient(135deg, #1c0f4c 0%, #4338ca 100%)", color: "#ffffff" }}
            >
              <IconCalculator />
              Simulador de inversión
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: "#1c0f4c" }}>
              Invierte y proyecta
              <br />
              <span className="gradient-text">tus ingresos</span>
            </h2>
            <p className="text-base max-w-md mt-3" style={{ color: "rgba(15,10,46,0.66)" }}>
              Descubre cuánto puedes ganar con <span style={{ color: "#a234cc", fontWeight: 700 }}>Platita.pe</span> según el monto que elijas.
            </p>
          </div>
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shrink-0"
            style={{ background: "#f5f3fc", border: "1px solid #e0ddf2" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(188,69,233,0.10)" }}>
              <IconCalendarCheck color="#bc45e9" />
            </div>
            <p className="text-sm font-semibold max-w-47.5" style={{ color: "#1c0f4c" }}>
              Obtén ingresos <span style={{ color: "#a234cc" }}>mensuales</span> desde el primer mes.
            </p>
          </div>
        </div>

        {/* ── 3-column layout ── */}
        <div className="grid lg:grid-cols-[0.85fr_1.7fr_0.75fr] gap-5 items-start" data-reveal>

          {/* ── Panel 1: inputs ─────────────────────────────── */}
          <div
            className="rounded-3xl p-4 sm:p-6"
            style={{ background: "#ffffff", border: "1px solid #d2dcea", boxShadow: "0 1px 3px rgba(8,10,30,0.04), 0 8px 24px rgba(8,10,30,0.06)" }}
          >
            <p className="text-sm font-black mb-4" style={{ color: "#1c0f4c" }}>
              1. Ingresa el monto de tu inversión
            </p>

            <p className="text-xs font-semibold mb-1" style={{ color: "rgba(15,10,46,0.66)" }}>Monto de inversión</p>
            <p className="text-3xl font-black mb-4" style={{ color: "#1c0f4c" }}>S/ {fmt(amount)}</p>

            <input
              type="range"
              aria-label="Monto a invertir"
              min={0}
              max={1000}
              step={2}
              value={Math.round(amountToSliderPos(amount) * 1000)}
              onChange={(e) =>
                onAmount(sliderPosToAmount(Number(e.target.value) / 1000))
              }
              className="w-full"
              style={{
                accentColor: "#bc45e9",
                height: "6px",
                borderRadius: "99px",
                background: `linear-gradient(90deg, #6cdcff 0%, #bc45e9 ${sliderPct}%, #e8edf6 ${sliderPct}%, #e8edf6 100%)`,
              }}
            />
            {/* Etiquetas alineadas a los tramos (0/25/50/75/100 %) */}
            <div
              className="relative mt-2 h-4 text-[0.65rem] font-semibold"
              style={{ color: "rgba(15,10,46,0.66)" }}
            >
              {[
                { pct: 0, label: "S/10K", align: "left" },
                { pct: 25, label: "S/50K", align: "center" },
                { pct: 50, label: "S/100K", align: "center" },
                { pct: 75, label: "S/500K", align: "center" },
                { pct: 100, label: "S/1M", align: "right" },
              ].map((t) => (
                <span
                  key={t.pct}
                  className="absolute top-0 whitespace-nowrap"
                  style={{
                    left: `${t.pct}%`,
                    transform:
                      t.align === "left"
                        ? "translateX(0)"
                        : t.align === "right"
                        ? "translateX(-100%)"
                        : "translateX(-50%)",
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>

            <p className="text-sm font-black mt-7 mb-4" style={{ color: "#1c0f4c" }}>
              2. Selecciona tu plazo
            </p>
            <div className="flex flex-col gap-2">
              {PERIODS.map((m) => {
                const active = months === m;
                return (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all"
                    style={{
                      background: active ? "rgba(188,69,233,0.08)" : "#ffffff",
                      border: active ? "1.5px solid #bc45e9" : "1px solid #d2dcea",
                      color: active ? "#a234cc" : "rgba(15,10,46,0.66)",
                    }}
                  >
                    {m} meses
                    {active && (
                      <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#bc45e9" }}>
                        <IconCheck color="#ffffff" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Panel 2: proyección ─────────────────────────────── */}
          <div
            className="rounded-3xl p-4 sm:p-6"
            style={{ background: "#ffffff", border: "1px solid #d2dcea", boxShadow: "0 1px 3px rgba(8,10,30,0.04), 0 8px 24px rgba(8,10,30,0.06)", minWidth: 0 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(188,69,233,0.10)" }}>
                  <IconTrending color="#bc45e9" />
                </div>
                <p className="text-base font-black" style={{ color: "#1c0f4c" }}>Proyección de tu inversión</p>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: "rgba(34,197,94,0.10)", color: "#16a34a" }}
              >
                <IconCheck color="#16a34a" />
                Plan seleccionado
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="rounded-2xl p-3.5" style={{ background: "#f5f3fc" }}>
                <p className="text-[0.65rem] font-semibold" style={{ color: "rgba(15,10,46,0.66)" }}>Tu plan</p>
                <p className="text-lg font-black mt-1" style={{ color: "#a234cc" }}>Hasta {Math.round(plan.rate * 100)}%</p>
                <p className="text-[0.62rem]" style={{ color: "rgba(15,10,46,0.66)" }}>Rentabilidad anual</p>
              </div>
              <div className="rounded-2xl p-3.5" style={{ background: "#eef2f9" }}>
                <p className="text-[0.65rem] font-semibold" style={{ color: "rgba(15,10,46,0.66)" }}>Inversión total</p>
                <p className="text-lg font-black mt-1" style={{ color: "#1c0f4c" }}>S/ {fmt(amount)}</p>
              </div>
              <div className="rounded-2xl p-3.5" style={{ background: "rgba(34,197,94,0.07)" }}>
                <p className="text-[0.65rem] font-semibold" style={{ color: "rgba(15,10,46,0.66)" }}>
                  {months === 12 ? "Rentabilidad anual" : "Rentabilidad total"}
                </p>
                <p className="text-lg font-black mt-1" style={{ color: "#16a34a" }}>S/ {fmt(earnings)}</p>
              </div>
              <div className="rounded-2xl p-3.5" style={{ background: "rgba(108,220,255,0.10)" }}>
                <p className="text-[0.65rem] font-semibold" style={{ color: "rgba(15,10,46,0.66)" }}>Ingreso mensual est.</p>
                <p className="text-lg font-black mt-1" style={{ color: "#0097b2" }}>S/ {fmt(monthlyEarnings)}</p>
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold" style={{ color: "#1c0f4c" }}>Detalle de proyección</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] font-semibold" style={{ color: "rgba(15,10,46,0.66)" }}>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#bc45e9" }} /> Ingreso mensual
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "rgba(188,69,233,0.25)" }} /> Capital invertido
                </span>
              </div>
            </div>
            <div className="overflow-x-auto pb-1 -mx-1 px-1">
              <div className="flex items-end gap-1 sm:gap-2" style={{ minHeight: "140px" }}>
                {Array.from({ length: months }, (_, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 sm:gap-1.5 min-w-5 sm:min-w-8">
                    <span className="hidden sm:block text-[0.6rem] font-bold whitespace-nowrap" style={{ color: "#a234cc" }}>
                      S/{fmt(monthlyEarnings)}
                    </span>
                    <div
                      className="w-full rounded-t-md"
                      style={{ height: "80px", background: "linear-gradient(180deg, #bc45e9 0%, #8b2fc9 100%)" }}
                    />
                    <span className="text-[0.55rem] sm:text-[0.6rem] font-semibold whitespace-nowrap" style={{ color: "rgba(15,10,46,0.66)" }}>
                      <span className="sm:hidden">{i + 1}</span>
                      <span className="hidden sm:inline">Mes {i + 1}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex items-center gap-2 mt-5 px-4 py-3 rounded-xl"
              style={{ background: "rgba(188,69,233,0.06)" }}
            >
              <IconCalendarCheck color="#bc45e9" />
              <p className="text-sm font-semibold" style={{ color: "#1c0f4c" }}>
                Recibes S/ {fmt(monthlyEarnings)} cada mes durante {months} meses
              </p>
            </div>
          </div>

          {/* ── Panel 3: resumen ─────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-3xl p-4 sm:p-6"
              style={{ background: "#ffffff", border: "1px solid #d2dcea", boxShadow: "0 1px 3px rgba(8,10,30,0.04), 0 8px 24px rgba(8,10,30,0.06)" }}
            >
              <p className="text-sm font-black mb-4" style={{ color: "#1c0f4c" }}>Resumen al vencimiento</p>

              <div className="flex justify-between items-center py-2.5" style={{ borderBottom: "1px solid rgba(28,15,76,0.07)" }}>
                <span className="text-xs font-semibold" style={{ color: "rgba(15,10,46,0.66)" }}>Capital invertido</span>
                <span className="text-sm font-black" style={{ color: "#1c0f4c" }}>S/ {fmt(amount)}</span>
              </div>
              <div className="flex justify-between items-center py-2.5" style={{ borderBottom: "1px solid rgba(28,15,76,0.07)" }}>
                <span className="text-xs font-semibold" style={{ color: "rgba(15,10,46,0.66)" }}>Rentabilidad total</span>
                <span className="text-sm font-black" style={{ color: "#16a34a" }}>S/ {fmt(earnings)}</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-xs font-bold" style={{ color: "#1c0f4c" }}>Monto total recibido</span>
                <span className="text-xl font-black" style={{ color: "#1c0f4c" }}>S/ {fmt(total)}</span>
              </div>

              <div
                className="flex items-start gap-2.5 mt-5 p-3.5 rounded-xl"
                style={{ background: "rgba(28,15,76,0.04)" }}
              >
                <span className="shrink-0 mt-0.5"><IconShield color="#1c0f4c" /></span>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(15,10,46,0.66)" }}>
                  Tu inversión está protegida con respaldo en proyectos inmobiliarios.
                </p>
              </div>

              <a
                href="#registro"
                className="btn-gradient text-center py-3.5 rounded-2xl font-bold text-sm mt-5 block"
              >
                <span>Reserva tu lugar</span>
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(15,10,46,0.66)" }}>
          *Estimación referencial al {Math.round(plan.rate * 100)}% anual ({plan.label} · hasta {Math.round(MAX_RATE * 100)}% en Plan {PLAN_TIERS[PLAN_TIERS.length - 1].id}).
          <strong> No constituye una promesa ni garantía de rentabilidad.</strong>
          {" "}Al subir de categoría, tu saldo se consolida en un nuevo contrato de 12 meses. Respaldo legal: Contrato mutuo.
        </p>
      </div>
    </section>
  );
}
