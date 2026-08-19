"use client";
import Image from "next/image";
import { PLAN_TIERS } from "@/lib/plans";

function fmt(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* Acento de marca por plan — alterna azul/magenta de Platita.pe */
const PLAN_ACCENTS: Record<number, string> = {
  1: "#bc45e9",
  2: "#0ea5e9",
  3: "#bc45e9",
  4: "#bc45e9",
};

/* Icono por plan — cartera.png para 1-3 (teñida por acento), diamante.png para el tope */
const PLAN_ICON_SRC: Record<number, string> = {
  1: "/icons/cartera-magenta.png",
  2: "/icons/cartera-blue.png",
  3: "/icons/cartera-magenta.png",
  4: "/icons/diamante-magenta.png",
};

function PlanIcon({ tier }: { tier: number }) {
  return (
    <div style={{ position: "relative", width: 38, height: 38 }}>
      <Image src={PLAN_ICON_SRC[tier]} alt="" fill sizes="38px" style={{ objectFit: "contain" }} />
    </div>
  );
}

const IconCalendarCheck = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

const trustBadges = [
  {
    label: "100% seguro",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    label: "Contratos notariales",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    label: "Proyectos en Perú",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Respaldo en proyectos inmobiliarios",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5 12 3l9 6.5" /><path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
      </svg>
    ),
  },
];

export default function PlanesSection() {
  return (
    <section id="planes" className="relative py-14 md:py-24 px-4 overflow-hidden" style={{ background: "#ffffff" }}>
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-10%", top: "-5%", width: "40%", height: "50%",
          background: "radial-gradient(ellipse, rgba(108,220,255,0.13) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-10%", bottom: "0%", width: "42%", height: "55%",
          background: "radial-gradient(ellipse, rgba(188,69,233,0.13) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-3 leading-tight" style={{ color: "#1c0f4c" }}>
              Con <span className="gradient-text">Platita.pe</span> tus inversiones
              <br className="hidden md:block" /> crecen, tú ganas más.
            </h2>
            <p className="text-base max-w-md" style={{ color: "rgba(8,11,30,0.50)" }}>
              Elige el plan que mejor se adapte a tus <span style={{ color: "#bc45e9", fontWeight: 700 }}>objetivos</span>
            </p>
          </div>
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shrink-0"
            style={{ background: "#f5f3fc", border: "1px solid #e0ddf2" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(188,69,233,0.10)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bc45e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <p className="text-sm font-semibold" style={{ color: "#1c0f4c" }}>
              Obtén ingresos <span style={{ color: "#bc45e9" }}>mensuales</span>.
            </p>
          </div>
        </div>

        {/* Divisor "Planes de inversión" */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: "rgba(28,15,76,0.15)" }} />
          <span className="text-sm font-black tracking-widest uppercase shrink-0" style={{ color: "#5b3fa8" }}>
            Planes de inversión
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(28,15,76,0.15)" }} />
        </div>

        {/* Plan cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8" data-reveal>
          {PLAN_TIERS.map((tier) => {
            const accent = PLAN_ACCENTS[tier.id];
            return (
              <div
                key={tier.id}
                className="relative rounded-3xl pt-12 pb-6 px-6 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: "#ffffff",
                  border: "1px solid #d2dcea",
                  boxShadow: "0 1px 3px rgba(8,10,30,0.04), 0 8px 24px rgba(8,10,30,0.06)",
                }}
              >
                <div
                  className="absolute left-1/2 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ top: 0, transform: "translate(-50%, -50%)", border: `2px solid ${accent}`, background: "#ffffff" }}
                >
                  <PlanIcon tier={tier.id} />
                </div>

                <div>
                  <p className="text-sm font-black tracking-widest uppercase" style={{ color: accent }}>
                    Plan {tier.id}
                  </p>
                  <div
                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: `${accent}15`, color: accent }}
                  >
                    Desde
                  </div>
                  <p className="text-2xl font-black mt-2" style={{ color: "#1c0f4c" }}>
                    S/ {fmt(tier.min)}
                  </p>
                </div>

                <div className="h-px w-full" style={{ background: "rgba(28,15,76,0.08)" }} />

                <div>
                  <p className="text-xs font-semibold" style={{ color: "rgba(15,10,46,0.40)" }}>
                    Hasta
                  </p>
                  <p className="text-6xl font-black leading-none mt-1.5" style={{ color: accent }}>
                    {Math.round(tier.rate * 100)}%
                  </p>
                  <p className="text-xs font-semibold mt-1" style={{ color: "rgba(15,10,46,0.40)" }}>
                    rentabilidad anual
                  </p>
                </div>

                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: `${accent}12`, border: `1px solid ${accent}35`, color: accent }}
                >
                  <IconCalendarCheck color={accent} />
                  Ingresos mensuales
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-10 pt-8" style={{ borderTop: "1px solid rgba(28,15,76,0.08)" }}>
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              {b.icon}
              <span className="text-sm font-semibold" style={{ color: "#1c0f4c" }}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* Consolidación de contrato al subir de categoría */}
        <div
          className="mt-10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-5 md:items-start"
          style={{ background: "rgba(108,220,255,0.06)", border: "1px solid rgba(108,220,255,0.28)" }}
        >
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(108,220,255,0.16)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <div>
            <p className="font-black text-base mb-1.5" style={{ color: "#1c0f4c" }}>Tu plan sube contigo</p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(8,11,30,0.60)" }}>
              Cada vez que incrementas tu capital y alcanzas una nueva categoría de inversión, tu inversión se
              consolida en un <strong style={{ color: "#1c0f4c" }}>nuevo contrato por el saldo total</strong> y
              comienza un <strong style={{ color: "#1c0f4c" }}>nuevo plazo de 12 meses</strong> con la rentabilidad
              correspondiente a la nueva categoría.
            </p>
            <p className="text-xs mt-3 px-3 py-2 rounded-xl inline-block" style={{ background: "rgba(255,255,255,0.6)", color: "rgba(8,11,30,0.55)" }}>
              Ejemplo: empiezas con S/10,000 (Plan 1, 14%). A los 2 meses agregas S/40,000 más — se suma el saldo
              total (S/50,000) y desde esa fecha corre un nuevo contrato de 12 meses al 16% (Plan 2), y así
              sucesivamente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
