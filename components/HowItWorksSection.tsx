import { ReactNode } from "react";
import VslPlayer from "./VslPlayer";

/* ── icons ── */
const IconUserCheck = ({ c }: { c: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);
const IconBuilding = ({ c }: { c: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IconArrowUpCircle = ({ c }: { c: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="16 12 12 8 8 12" />
    <line x1="12" y1="16" x2="12" y2="8" />
  </svg>
);
const IconAward = ({ c }: { c: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const IconFileSign = ({ c }: { c: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <path d="M8 17h3l1.5-1.5L14 17h2" />
  </svg>
);

interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

const steps: Step[] = [
  {
    number: "01",
    icon: <IconUserCheck c="#1c0f4c" />,
    title: "Regístrate gratis",
    description: "Completa tu perfil en minutos. Sin costos de apertura ni comisiones ocultas. Tu cuenta está lista al instante.",
  },
  {
    number: "02",
    icon: <IconArrowUpCircle c="#bc45e9" />,
    title: "Invierte desde S/10,000",
    description: "Realiza tu inversión de forma segura y 100% online.",
  },
  {
    number: "03",
    icon: <IconFileSign c="#ffffff" />,
    title: "Firma de contrato notarial",
    description: "Firma virtual de contrato mutuo y validación notarial. En 2 días hábiles tienes tu documento digitalizado.",
    highlight: true,
  },
  {
    number: "04",
    icon: <IconAward c="#1c0f4c" />,
    title: "Recibe tus ganancias",
    description: "Cobra tus rendimientos de acuerdo al período elegido. Reinvierte o retira a tu cuenta bancaria sin complicaciones.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-14 md:py-24 px-4" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#1c0f4c" }}
          >
            Proceso simple
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-5 mb-4" style={{ color: "#1c0f4c" }}>
            ¿Cómo{" "}
            <span className="gradient-text">funciona?</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(15,10,46,0.66)" }}>
            Míralo en 1:23 min y luego sigue los 4 pasos para que tu dinero trabaje por ti
          </p>
        </div>

        {/* ── VSL Video ── */}
        <div className="max-w-3xl mx-auto mb-6">
          <VslPlayer />
        </div>

        {/* ── Trust strip ── */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {[
            { icon: "🔒", text: "Inversión respaldada en activos reales" },
            { icon: "📋", text: "Contratos legales notariales" },
            { icon: "🇵🇪", text: "Proyectos verificados en Perú" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-sm" style={{ color: "rgba(15,10,46,0.66)" }}>
              <span>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>

        {/* ── Divider label ── */}
        <div className="flex items-center gap-4 mb-10 max-w-3xl mx-auto">
          <div className="flex-1 h-px" style={{ background: "rgba(28,15,76,0.12)" }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(28,15,76,0.66)" }}>
            4 pasos para empezar
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(28,15,76,0.12)" }} />
        </div>

        {/* ── Steps ── */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute"
            style={{
              top: "54px",
              left: "calc(12.5% + 4px)",
              right: "calc(12.5% + 4px)",
              height: "2px",
              background: "linear-gradient(90deg, #bc45e9 0%, #6cdcff 50%, #bc45e9 100%)",
              opacity: 0.25,
              zIndex: 0,
              borderRadius: "99px",
            }}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative" style={{ zIndex: 1 }}>
            {steps.map((step, i) => (
              step.highlight ? (
                <div
                  key={i}
                  className="rounded-3xl p-7 flex flex-col gap-4 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #1c0f4c 0%, #6b1fa8 55%, #bc45e9 100%)",
                    border: "1px solid rgba(188,69,233,0.4)",
                    boxShadow: "0 8px 40px rgba(188,69,233,0.28), 0 2px 12px rgba(28,15,76,0.18)",
                  }}
                >
                  {/* subtle inner glow */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 70% 20%, rgba(108,220,255,0.15) 0%, transparent 65%)",
                  }} />
                  <div className="step-number relative z-10" style={{ color: "rgba(255,255,255,0.35)" }}>{step.number}</div>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center relative z-10"
                    style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}
                  >
                    {step.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2 text-white">{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.68)" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className="rounded-3xl p-7 flex flex-col gap-4 group hover:-translate-y-2 transition-all duration-300"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e6e3f5",
                    boxShadow: "0 1px 4px rgba(28,15,76,0.06), 0 4px 20px rgba(28,15,76,0.04)",
                  }}
                >
                  <div className="step-number">{step.number}</div>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(28,15,76,0.06)", border: "1px solid rgba(28,15,76,0.1)" }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: "#1c0f4c" }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(15,10,46,0.66)" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-12">
          <a href="#registro" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold">
            <span>Empezar ahora</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
