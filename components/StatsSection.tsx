"use client";
import { useState, useEffect, useRef } from "react";
import { MAX_RATE } from "@/lib/plans";

const IconPercent = ({ c }: { c: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);
const IconCoins = ({ c }: { c: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
  </svg>
);
const IconUsers = ({ c }: { c: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconShield = ({ c }: { c: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconCheck = ({ c }: { c: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!trigger) return;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else setValue(end);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [end, duration, trigger]);

  return value;
}

const stats = [
  {
    raw: Math.round(MAX_RATE * 100), prefix: "Hasta ", suffix: "%", label: "Rentabilidad anual",
    detail: "Según tu categoría de inversión",
    icon: <IconPercent c="#ffffff" />,
    gradient: "linear-gradient(135deg, #7fe3ff 0%, #4bc4ef 100%)",
    delay: 0,
  },
  {
    raw: 10, prefix: "S/", suffix: "K", label: "Inversión mínima",
    detail: "Accede desde S/ 10,000",
    icon: <IconCoins c="#ffffff" />,
    gradient: "linear-gradient(135deg, #6cdcff 0%, #3fb3e0 100%)",
    delay: 120,
  },
  {
    raw: 500, prefix: "+", suffix: "", label: "En lista de espera",
    detail: "Comunidad en crecimiento",
    icon: <IconUsers c="#ffffff" />,
    gradient: "linear-gradient(135deg, #cd6bf2 0%, #a233d4 100%)",
    delay: 240,
  },
  {
    raw: 100, prefix: "", suffix: "%", label: "Proceso online",
    detail: "Registro y validación en minutos",
    icon: <IconShield c="#ffffff" />,
    gradient: "linear-gradient(135deg, #bc45e9 0%, #8b2fc9 100%)",
    delay: 360,
  },
];

function StatCard({ stat, trigger }: { stat: typeof stats[0]; trigger: boolean }) {
  const [fired, setFired] = useState(false);
  const count = useCountUp(stat.raw, 1400, fired);

  useEffect(() => {
    if (!trigger || fired) return;
    const t = setTimeout(() => setFired(true), stat.delay);
    return () => clearTimeout(t);
  }, [trigger, fired, stat.delay]);

  return (
    <div
      className="rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center gap-3"
      style={{
        background: stat.gradient,
        boxShadow: "0 4px 14px rgba(28,15,76,0.10), 0 12px 32px rgba(28,15,76,0.10)",
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.20)" }}
      >
        {stat.icon}
      </div>

      <div>
        <div
          className="text-3xl md:text-4xl font-black tabular-nums text-white leading-none whitespace-nowrap"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {stat.prefix}{count.toLocaleString()}{stat.suffix}
        </div>
        <div className="text-xs font-bold tracking-widest uppercase text-white leading-tight mt-1.5" style={{ opacity: 0.9 }}>
          {stat.label}
        </div>
      </div>

      <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.35)" }} />

      <div className="flex items-center justify-center gap-2">
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.25)" }}
        >
          <IconCheck c="#ffffff" />
        </div>
        <p className="text-xs font-semibold leading-snug text-white" style={{ opacity: 0.92 }}>
          {stat.detail}
        </p>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 px-4" style={{ background: "#ffffff" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} trigger={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}
