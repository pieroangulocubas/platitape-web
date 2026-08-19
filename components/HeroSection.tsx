"use client";
import { useState } from "react";
import ToastNotifications from "./ToastNotifications";
import { WA_CHANNEL_URL } from "@/lib/config";
import { getPlanForAmount, MIN_INVESTMENT, MAX_RATE } from "@/lib/plans";

const MIN_AMOUNT   = MIN_INVESTMENT;
const MAX_AMOUNT   = 1000000;

const PERIODS = [12, 18, 24];

function fmt(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function HeroSection() {
  const [showSim, setShowSim] = useState(false);
  const [amount, setAmount]          = useState(100000);
  const [months, setMonths]          = useState(12);

  const plan             = getPlanForAmount(amount);
  const earnings         = amount * plan.rate * (months / 12);
  const total             = amount + earnings;
  const monthlyEarnings   = (amount * plan.rate) / 12;
  const sliderPct         = ((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;

  return (
    <>
    <section
      className="relative flex flex-col justify-center overflow-hidden md:h-[calc(100vh-64px)]"
      style={{ marginTop: "64px" }}
    >
      {/* ── Background ── */}

      {/* Llama background image — desktop/tablet only */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage: "url('/llama-hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Mobile background — white with diffused brand-color blobs, no llama */}
      <div className="absolute inset-0 pointer-events-none md:hidden" style={{ background: "#ffffff" }}>
        <div
          className="absolute"
          style={{
            top: "-10%", right: "-15%",
            width: "70%", height: "40%",
            background: "radial-gradient(circle, rgba(188,69,233,0.22) 0%, transparent 70%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "20%", left: "-20%",
            width: "60%", height: "35%",
            background: "radial-gradient(circle, rgba(108,220,255,0.20) 0%, transparent 70%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "-15%", right: "-10%",
            width: "75%", height: "45%",
            background: "radial-gradient(circle, rgba(28,15,76,0.10) 0%, transparent 70%)",
            filter: "blur(32px)",
          }}
        />
      </div>

      {/* Dot grid — full width, subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(28,15,76,0.048) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow — right-bottom, behind llama */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "0%",
          bottom: "0%",
          width: "55%",
          height: "75%",
          background: "radial-gradient(ellipse 65% 70% at 65% 90%, rgba(188,69,233,0.16) 0%, rgba(108,180,255,0.10) 55%, transparent 80%)",
          filter: "blur(32px)",
        }}
      />
      {/* Glow — top center-right accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "15%",
          top: "5%",
          width: "30%",
          height: "40%",
          background: "radial-gradient(ellipse, rgba(108,180,255,0.10) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
      {/* Left brand accent bar */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0, top: 0,
          width: "3px",
          height: "55%",
          background: "linear-gradient(180deg, #6cdcff 0%, #bc45e9 60%, transparent 100%)",
          opacity: 0.55,
        }}
      />

      {/* Promo card — "GANA X% Anual", flotando sobre la foto de la llama (desktop) */}
      <div
        className="absolute z-10 hidden md:block"
        style={{
          right: "17%",
          bottom: "9%",
          width: "clamp(180px, 19vw, 230px)",
          borderRadius: "16px",
          padding: "16px 18px",
          background: "linear-gradient(135deg, #bc45e9 0%, #8b2fc9 100%)",
          boxShadow: "0 16px 40px rgba(139,47,201,0.38)",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 2px" }}>
          Gana
        </p>
        <p style={{ color: "white", fontWeight: 900, fontSize: "1.6rem", margin: "0 0 4px", lineHeight: 1 }}>
          {Math.round(MAX_RATE * 100)}% Anual
        </p>
        <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.72rem", lineHeight: 1.35, margin: 0, fontWeight: 600 }}>
          En todos nuestros proyectos inmobiliarios en Perú
        </p>
      </div>

      {/* ── Main two-column layout ── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-5 py-8">
        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-0">

          {/* LEFT — text */}
          <div className="flex-1 md:max-w-xl flex flex-col justify-center gap-4 md:gap-5 md:pr-10 pb-6 md:pb-16">

            {/* Badge */}
            <div
              className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #6cdcff, #bc45e9) border-box",
                border: "1.5px solid transparent",
                color: "#1c0f4c",
                boxShadow: "0 4px 16px rgba(188,69,233,0.14)",
              }}
            >
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#bc45e9", boxShadow: "0 0 6px #bc45e9",
                animation: "pulse-dot 1.5s infinite", flexShrink: 0,
              }} />
              Próximamente · Perú
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-black leading-[1.08] tracking-tight" style={{ color: "#1c0f4c" }}>
                Bienvenido a <span className="gradient-text-cyan">Platita.pe</span>
              </h1>
              <p className="text-base md:text-lg font-bold mt-2" style={{ color: "rgba(28,15,76,0.55)" }}>
                Inversiones que Dan Gusto
              </p>
            </div>

            {/* Promo card — mobile (sin foto de fondo, va inline) */}
            <div
              className="md:hidden w-fit rounded-2xl"
              style={{
                padding: "14px 18px",
                background: "linear-gradient(135deg, #bc45e9 0%, #8b2fc9 100%)",
                boxShadow: "0 10px 28px rgba(139,47,201,0.30)",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 2px" }}>
                Gana
              </p>
              <p style={{ color: "white", fontWeight: 900, fontSize: "1.35rem", margin: "0 0 3px", lineHeight: 1 }}>
                {Math.round(MAX_RATE * 100)}% Anual
              </p>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.68rem", lineHeight: 1.3, margin: 0, fontWeight: 600 }}>
                En todos nuestros proyectos inmobiliarios en Perú
              </p>
            </div>

            {/* Feature list */}
            <div className="flex flex-col max-w-md">
              {[
                {
                  icon: (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                    </svg>
                  ),
                  text: <>Invierte desde <span className="gradient-text-cyan font-extrabold">S/10,000</span></>,
                },
                {
                  icon: (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  ),
                  text: <>Obtén <span className="gradient-text-cyan font-extrabold">ingresos mensuales</span></>,
                },
                {
                  icon: (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="5" x2="5" y2="19" />
                      <circle cx="6.5" cy="6.5" r="2.5" />
                      <circle cx="17.5" cy="17.5" r="2.5" />
                    </svg>
                  ),
                  text: <>Genera hasta un <span className="gradient-text-cyan font-extrabold">{Math.round(MAX_RATE * 100)}%</span> de rentabilidad anual</>,
                },
                {
                  icon: (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9.5 12 3l9 6.5" />
                      <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
                    </svg>
                  ),
                  text: <>Con respaldo en <span className="gradient-text-cyan font-extrabold">proyectos inmobiliarios</span></>,
                },
              ].map((f, i, arr) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 py-2.5"
                  style={i < arr.length - 1 ? { borderBottom: "1px solid rgba(28,15,76,0.08)" } : undefined}
                >
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-full shrink-0"
                    style={{
                      background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #6cdcff, #bc45e9) border-box",
                      border: "1.5px solid transparent",
                      boxShadow: "0 2px 10px rgba(28,15,76,0.08)",
                    }}
                  >
                    {f.icon}
                  </div>
                  <p className="text-base font-semibold" style={{ color: "rgba(8,11,30,0.78)" }}>{f.text}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a
                href="#registro"
                className="btn-gradient px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide"
              >
                <span>Invierte Hoy</span>
              </a>
              <button
                onClick={() => setShowSim((v) => !v)}
                className={`px-8 py-3.5 rounded-lg text-sm font-semibold flex items-center gap-2 border-[1.5px] bg-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(188,69,233,0.40)] hover:text-[#bc45e9] ${
                  showSim
                    ? "border-[rgba(188,69,233,0.40)] text-[#bc45e9]"
                    : "border-[rgba(12,18,55,0.18)] text-[#1c0f4c]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Simula tu inversión
              </button>
            </div>

            {/* Video hint — apunta al VSL en ¿Cómo funciona? */}
            <a
              href="#como-funciona"
              className="group inline-flex items-center gap-2 w-fit text-sm font-semibold transition-colors duration-200 hover:text-[#bc45e9]"
              style={{ color: "rgba(8,11,30,0.55)" }}
            >
              <span
                className="flex items-center justify-center w-7 h-7 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: "rgba(188,69,233,0.10)", border: "1px solid rgba(188,69,233,0.25)" }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="#bc45e9" style={{ marginLeft: "1px" }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Mira el video y descubre cómo funciona
              <svg
                className="hero-scroll-hint"
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>

            {/* Social proof */}
            <div className="flex items-center gap-2.5 text-xs" style={{ color: "rgba(8,11,30,0.40)" }}>
              <div className="flex -space-x-1.5">
                {["#bc45e9","#6cdcff","#8b5cf6"].map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: c, borderColor: "#ffffff" }}
                  >
                    {["P","M","R"][i]}
                  </div>
                ))}
              </div>
              <span>+500 personas ya en lista de espera</span>
            </div>

            {/* Trust badges — fintech solemn style */}
            <div className="flex flex-wrap gap-2">
              {[
                { svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>, text: "100% seguro" },
                { svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, text: "Contratos notariales" },
                { svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, text: "Proyectos en Perú" },
              ].map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, rgba(108,220,255,0.5), rgba(188,69,233,0.5)) border-box",
                    border: "1px solid transparent",
                    color: "#1c0f4c",
                    boxShadow: "0 2px 10px rgba(28,15,76,0.06)",
                  }}
                >
                  {b.svg}
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Transición de color hacia la siguiente sección — sin forma, solo degradado (solo desktop, donde el fondo llama contrasta con la sección blanca) */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none hidden md:block"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.2) 52%, rgba(255,255,255,0.45) 68%, rgba(255,255,255,0.72) 82%, rgba(255,255,255,0.92) 92%, #ffffff 100%)",
        }}
      />
    </section>

    {/* ── Simulador panel — light theme, desliza desde la derecha ── */}
    <div
      style={{
        position: "fixed",
        top: 0, right: 0,
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

      <div className="flex items-center justify-between p-5 pb-0">
        <div>
          <p className="font-black text-lg" style={{ color: "#1c0f4c" }}>Simulador de inversión</p>
          <p className="text-xs font-medium" style={{ color: "rgba(8,11,30,0.45)" }}>Estimación al {Math.round(plan.rate * 100)}% anual · {plan.label}</p>
        </div>
        <button
          onClick={() => setShowSim(false)}
          className="group w-9 h-9 flex items-center justify-center bg-transparent transition-transform duration-200 hover:scale-110"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.5" strokeLinecap="round" className="transition-colors duration-200 group-hover:stroke-[#bc45e9]">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

        {/* ── Monto ── */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs font-semibold" style={{ color: "rgba(8,11,30,0.50)" }}>Monto a invertir</span>
            <span className="text-xs" style={{ color: "rgba(8,11,30,0.35)" }}>mín. S/ 10,000</span>
          </div>
          <p key={`amt-${amount}`} className="text-2xl font-black sim-result-value" style={{ color: "#1c0f4c" }}>
            S/ {fmt(amount)}
          </p>
          <input
            type="range"
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full mt-2"
            style={{
              accentColor: "#bc45e9",
              height: "6px",
              borderRadius: "99px",
              background: `linear-gradient(90deg, #6cdcff 0%, #bc45e9 ${sliderPct}%, #e8edf6 ${sliderPct}%, #e8edf6 100%)`,
            }}
          />
          <div className="flex justify-between mt-1.5 text-[0.62rem] font-semibold" style={{ color: "rgba(8,11,30,0.35)" }}>
            <span>S/10K</span>
            <span>S/100K</span>
            <span>S/500K+</span>
          </div>
        </div>

        {/* ── Período ── */}
        <div>
          <span className="text-xs font-semibold mb-2 block" style={{ color: "rgba(8,11,30,0.50)" }}>Período de inversión</span>
          <div className="grid grid-cols-3 gap-1.5">
            {PERIODS.map((m) => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                className="py-2.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: months === m ? "linear-gradient(135deg, #6cdcff, #bc45e9)" : "#ffffff",
                  border: months === m ? "none" : "1px solid #d2dcea",
                  color: months === m ? "white" : "rgba(8,11,30,0.55)",
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
            <p className="text-[0.62rem] font-semibold" style={{ color: "rgba(8,11,30,0.45)" }}>Tu plan</p>
            <p className="text-base font-black mt-0.5" style={{ color: "#bc45e9" }}>Hasta {Math.round(plan.rate * 100)}%</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: "rgba(108,220,255,0.12)" }}>
            <p className="text-[0.62rem] font-semibold" style={{ color: "rgba(8,11,30,0.45)" }}>Ingreso mensual</p>
            <p key={`month-${amount}`} className="text-base font-black mt-0.5 sim-result-value" style={{ color: "#0097b2" }}>+S/ {fmt(monthlyEarnings)}</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: "rgba(34,197,94,0.09)" }}>
            <p className="text-[0.62rem] font-semibold" style={{ color: "rgba(8,11,30,0.45)" }}>
              {months === 12 ? "Rentabilidad anual" : "Rentabilidad total"}
            </p>
            <p key={`earn-${amount}-${months}`} className="text-base font-black mt-0.5 sim-result-value" style={{ color: "#16a34a" }}>+S/ {fmt(earnings)}</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: "rgba(188,69,233,0.08)" }}>
            <p className="text-[0.62rem] font-semibold" style={{ color: "rgba(8,11,30,0.45)" }}>Inversión</p>
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
          <p className="text-xs" style={{ color: "rgba(8,11,30,0.42)" }}>
            Proyección referencial al {Math.round(plan.rate * 100)}% anual ({plan.label}). Si incrementas tu monto y subes de categoría,
            tu saldo se consolida en un nuevo contrato de 12 meses. Respaldo legal: Contrato mutuo.
          </p>
        </div>

        <a href="#registro" onClick={() => setShowSim(false)}
          className="btn-gradient text-center py-3.5 rounded-xl font-bold text-base">
          <span>Quiero invertir ahora</span>
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
            <p className="text-xs" style={{ color: "rgba(8,11,30,0.42)" }}>Ofertas exclusivas antes del lanzamiento</p>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(8,11,30,0.30)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    </div>

    {showSim && (
      <div
        onClick={() => setShowSim(false)}
        style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(2px)", animation: "count-up 0.3s ease-out" }}
      />
    )}

    <ToastNotifications />
    </>
  );
}
