"use client";
import { useEffect, useRef, useState } from "react";
import { WA_CHANNEL_URL } from "@/lib/config";
import { track } from "@/lib/analytics";
import { getPlanForAmount, amountToSliderPos, sliderPosToAmount } from "@/lib/plans";

const PERIODS = [12, 18, 24];

function fmt(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Isla cliente del hero: el botón "Simula tu inversión" y el panel deslizante.
 * Todo lo demás del hero (headline, CTAs, badges) es Server Component estático.
 * `buttonClassName` permite que el hero controle el estilo del disparador.
 */
export default function HeroSimulator({
  buttonClassName,
}: {
  buttonClassName?: string;
}) {
  const [showSim, setShowSim] = useState(false);
  const [amount, setAmount] = useState(100000);
  const [months, setMonths] = useState(12);
  const interacted = useRef(false);

  // Bloquear scroll de la página al abrir en mobile y permitir cerrar con tecla Escape
  useEffect(() => {
    if (!showSim) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSim(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showSim]);

  const toggleSim = () => {
    if (!showSim) track("simulator_open", { source: "hero" });
    setShowSim((v) => !v);
  };

  const onAmount = (next: number) => {
    setAmount(next);
    if (!interacted.current) {
      interacted.current = true;
      track("simulator_interact", { source: "hero" });
    }
  };

  const plan = getPlanForAmount(amount);
  const earnings = amount * plan.rate * (months / 12);
  const total = amount + earnings;
  const monthlyEarnings = (amount * plan.rate) / 12;
  const sliderPct = amountToSliderPos(amount) * 100;

  const defaultBtn = `px-8 py-3.5 rounded-lg text-sm font-semibold flex items-center gap-2 border-[1.5px] bg-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(188,69,233,0.40)] hover:text-[#a234cc] ${
    showSim
      ? "border-[rgba(188,69,233,0.40)] text-[#a234cc]"
      : "border-[rgba(12,18,55,0.18)] text-[#1c0f4c]"
  }`;

  return (
    <>
      <button
        onClick={toggleSim}
        className={buttonClassName ?? defaultBtn}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        Simula tu inversión
      </button>

      {/* ── Simulador panel — light theme, desliza desde la derecha ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Simulador de inversión"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100dvh",
          width: "min(420px, 100vw)",
          zIndex: 100,
          transform: showSim ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          display: "flex",
          flexDirection: "column",
          background: "#f8fbff",
          backdropFilter: "blur(24px)",
          borderLeft: "1px solid #d2dcea",
          boxShadow: showSim ? "-12px 0 60px rgba(8,10,30,0.12)" : "none",
        }}
      >
        {/* Borde animado cyan→magenta de izquierda a derecha */}
        <div className="sim-border-ltr" />

        {/* Encabezado fijo con margen para notch / dynamic island / safe-area */}
        <div
          className="flex items-center justify-between px-5 pb-3 border-b border-[#d2dcea]/80 bg-[#f8fbff] shrink-0"
          style={{
            paddingTop: "max(1.25rem, calc(env(safe-area-inset-top, 0px) + 0.85rem))",
          }}
        >
          <div className="min-w-0 pr-2">
            <p className="font-black text-lg truncate" style={{ color: "#1c0f4c" }}>Simulador de inversión</p>
            <p className="text-xs font-medium" style={{ color: "rgba(8,11,30,0.66)" }}>Estimación al {Math.round(plan.rate * 100)}% anual · {plan.label}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowSim(false)}
            aria-label="Cerrar simulador"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#cbd5e1] shadow-sm text-xs font-bold text-[#1c0f4c] hover:bg-[#ede9fe] hover:border-[#bc45e9] hover:text-[#a234cc] active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Cerrar</span>
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto p-5 flex flex-col gap-4"
          style={{
            paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))",
          }}
        >
          {/* ── Monto ── */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-semibold" style={{ color: "rgba(8,11,30,0.66)" }}>Monto a invertir</span>
              <span className="text-xs" style={{ color: "rgba(8,11,30,0.66)" }}>mín. S/ 10,000</span>
            </div>
            <p key={`amt-${amount}`} className="text-2xl font-black sim-result-value" style={{ color: "#1c0f4c" }}>
              S/ {fmt(amount)}
            </p>
            <input
              type="range"
              aria-label="Monto a invertir"
              min={0}
              max={1000}
              step={2}
              value={Math.round(amountToSliderPos(amount) * 1000)}
              onChange={(e) => onAmount(sliderPosToAmount(Number(e.target.value) / 1000))}
              className="w-full mt-2"
              style={{
                accentColor: "#bc45e9",
                height: "6px",
                borderRadius: "99px",
                background: `linear-gradient(90deg, #6cdcff 0%, #bc45e9 ${sliderPct}%, #e8edf6 ${sliderPct}%, #e8edf6 100%)`,
              }}
            />
            <div className="relative mt-1.5 h-3 text-[0.6rem] font-semibold" style={{ color: "rgba(8,11,30,0.66)" }}>
              {[
                { pct: 0, label: "S/10K", a: "left" },
                { pct: 25, label: "S/50K", a: "center" },
                { pct: 50, label: "S/100K", a: "center" },
                { pct: 75, label: "S/500K", a: "center" },
                { pct: 100, label: "S/1M", a: "right" },
              ].map((t) => (
                <span
                  key={t.pct}
                  className="absolute top-0 whitespace-nowrap"
                  style={{
                    left: `${t.pct}%`,
                    transform:
                      t.a === "left" ? "translateX(0)" : t.a === "right" ? "translateX(-100%)" : "translateX(-50%)",
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Período ── */}
          <div>
            <span className="text-xs font-semibold mb-2 block" style={{ color: "rgba(8,11,30,0.66)" }}>Período de inversión</span>
            <div className="grid grid-cols-3 gap-1.5">
              {PERIODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMonths(m)}
                  className="py-2.5 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: months === m ? "linear-gradient(135deg, #6cdcff, #bc45e9)" : "#ffffff",
                    border: months === m ? "none" : "1px solid #d2dcea",
                    color: months === m ? "white" : "rgba(8,11,30,0.66)",
                    boxShadow: months === m ? "0 4px 16px rgba(188,69,233,0.28)" : "none",
                  }}
                >
                  {m} meses
                </button>
              ))}
            </div>
          </div>

          {/* ── Resultados — cards sintetizados al estilo del simulador completo ── */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl p-3" style={{ background: "#f5f3fc" }}>
              <p className="text-[0.62rem] font-semibold" style={{ color: "rgba(8,11,30,0.66)" }}>Tu plan</p>
              <p className="text-base font-black mt-0.5" style={{ color: "#a234cc" }}>Hasta {Math.round(plan.rate * 100)}%</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: "rgba(108,220,255,0.12)" }}>
              <p className="text-[0.62rem] font-semibold" style={{ color: "rgba(8,11,30,0.66)" }}>Ingreso mensual</p>
              <p key={`month-${amount}`} className="text-base font-black mt-0.5 sim-result-value" style={{ color: "#0097b2" }}>+S/ {fmt(monthlyEarnings)}</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: "rgba(34,197,94,0.09)" }}>
              <p className="text-[0.62rem] font-semibold" style={{ color: "rgba(8,11,30,0.66)" }}>
                {months === 12 ? "Rentabilidad anual" : "Rentabilidad total"}
              </p>
              <p key={`earn-${amount}-${months}`} className="text-base font-black mt-0.5 sim-result-value" style={{ color: "#16a34a" }}>+S/ {fmt(earnings)}</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: "rgba(188,69,233,0.08)" }}>
              <p className="text-[0.62rem] font-semibold" style={{ color: "rgba(8,11,30,0.66)" }}>Inversión</p>
              <p key={`inv-${amount}`} className="text-base font-black mt-0.5 sim-result-value" style={{ color: "#1c0f4c" }}>S/ {fmt(amount)}</p>
            </div>
          </div>

          {/* ── Total al final — card destacado ── */}
          <div className="rounded-xl p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2d1a6e 0%, #1c0f4c 100%)" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #6cdcff 0%, #bc45e9 50%, #6cdcff 100%)", backgroundSize: "200% 100%", animation: "border-sweep-ltr 2.8s ease-in-out infinite" }} />
            <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.55)" }}>
              Total al final · {months} meses
            </p>
            <p key={`total-${amount}-${months}`} className="font-black text-white mt-1 sim-result-value" style={{ fontSize: "2rem", lineHeight: 1.1 }}>
              S/ {fmt(total)}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "rgba(12,18,55,0.04)", border: "1px solid rgba(12,18,55,0.09)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(8,11,30,0.40)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-xs" style={{ color: "rgba(8,11,30,0.66)" }}>
              Estimación referencial al {Math.round(plan.rate * 100)}% anual ({plan.label}).{" "}
              <strong>No constituye una promesa ni garantía de rentabilidad.</strong> Si incrementas tu monto y subes de categoría,
              tu saldo se consolida en un nuevo contrato de 12 meses. Respaldo legal: Contrato mutuo.
            </p>
          </div>

          <a href="#registro" onClick={() => setShowSim(false)}
            className="btn-gradient text-center py-3.5 rounded-xl font-bold text-base">
            <span>Reserva tu lugar</span>
          </a>

          {/* WA */}
          <a href={WA_CHANNEL_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.01]"
            style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.22)" }}
          >
            <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(37,211,102,0.14)" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold" style={{ color: "#1c0f4c" }}>Únete a nuestro canal</p>
              <p className="text-xs" style={{ color: "rgba(8,11,30,0.66)" }}>Ofertas exclusivas antes del lanzamiento</p>
            </div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(8,11,30,0.30)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>

          {/* Botón explícito para cerrar en mobile */}
          <button
            type="button"
            onClick={() => setShowSim(false)}
            className="w-full py-3 rounded-xl font-bold text-xs text-[#1c0f4c] bg-white border border-[#d2dcea] shadow-sm hover:bg-slate-100 active:scale-[0.99] transition-all text-center flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Cerrar simulador</span>
          </button>
        </div>
      </div>

      {showSim && (
        <div
          onClick={() => setShowSim(false)}
          style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(2px)", animation: "count-up 0.3s ease-out" }}
        />
      )}
    </>
  );
}
