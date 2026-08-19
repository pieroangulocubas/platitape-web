"use client";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    initials: "JP",
    name: "Jorge Paredes",
    city: "Miraflores, Lima",
    role: "Ingeniero de Software",
    planAmount: "S/ 15,000",
    quote: "Llevo años buscando una alternativa real a los depósitos bancarios. Con Platita.pe podré invertir en bienes raíces desde el celular, sin necesitar cientos de miles de soles.",
    gradient: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
    accent: "#bc45e9",
    accentRgb: "188,69,233",
  },
  {
    initials: "VS",
    name: "Valeria Soto",
    city: "Arequipa",
    role: "Médico residente",
    planAmount: "S/ 12,000",
    quote: "Nunca pensé que podría invertir en inmuebles con mi sueldo. Platita.pe democratiza algo que siempre fue solo para los que ya tienen plata. Me apunté al instante.",
    gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
  },
  {
    initials: "CM",
    name: "Carlos Meza",
    city: "San Isidro, Lima",
    role: "Contador independiente",
    planAmount: "S/ 20,000",
    quote: "Como contador conozco bien las tasas bancarias. Un 16% anual respaldado por activos inmobiliarios reales es exactamente lo que mis clientes y yo necesitábamos.",
    gradient: "linear-gradient(135deg,#22d3ee,#06b6d4)",
    accent: "#6cdcff",
    accentRgb: "108,220,255",
  },
  {
    initials: "LR",
    name: "Lucía Ríos",
    city: "Trujillo",
    role: "Empresaria",
    planAmount: "S/ 10,000",
    quote: "En Trujillo las opciones de inversión formal son limitadas. Platita.pe abre el acceso a proyectos de Lima y del país entero desde donde estés. Eso cambia todo.",
    gradient: "linear-gradient(135deg,#ec4899,#f97316)",
    accent: "#ec4899",
    accentRgb: "236,72,153",
  },
];


const SLIDE_DURATION = 4500;

function Stars() {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive]   = useState(0);
  const [animDir, setAnimDir] = useState<"in" | "out">("in");
  const timerRef              = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const go = (next: number) => {
    setAnimDir("out");
    timerRef.current = setTimeout(() => { setActive(next); setAnimDir("in"); }, 320);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => { const next = (prev + 1) % testimonials.length; go(next); return prev; });
    }, SLIDE_DURATION);
    return () => { clearInterval(id); clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = testimonials[active];

  return (
    <section
      id="testimonios"
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Soft brand blob */}
      <div style={{ position: "absolute", top: "10%", right: "-8%", width: "380px", height: "380px", borderRadius: "50%", background: `rgba(${t.accentRgb},0.07)`, filter: "blur(80px)", transition: "background 0.6s ease", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-5%", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(108,220,255,0.06)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1024px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, color: "#1c0f4c", margin: "0 0 12px", lineHeight: 1.15 }}>
            Lo que dicen los{" "}
            <span className="gradient-text">primeros en unirse</span>
          </h2>
          <p style={{ color: "rgba(15,10,46,0.50)", fontSize: "1rem", margin: 0 }}>
            Personas de la lista de espera comparten por qué quieren invertir
          </p>
        </div>

        {/* Slide card */}
        <div
          className="rounded-3xl p-6 md:p-12"
          style={{
            background: "#ffffff",
            border: "1.5px solid #d2dcea",
            boxShadow: "0 8px 40px rgba(28,15,76,0.07)",
            position: "relative",
            overflow: "hidden",
            transition: "opacity 0.32s ease, transform 0.32s ease",
            opacity: animDir === "in" ? 1 : 0,
            transform: animDir === "in" ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {/* Accent top border */}
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "2px", background: `linear-gradient(90deg, transparent, rgba(${t.accentRgb},0.55), transparent)`, transition: "background 0.5s" }} />

          {/* Big quote mark */}
          <div className="hidden md:block" style={{ fontSize: "9rem", lineHeight: 0.75, fontFamily: "Georgia, serif", color: `rgba(${t.accentRgb},0.12)`, position: "absolute", top: "20px", left: "28px", userSelect: "none", transition: "color 0.5s" }}>
            "
          </div>

          <div className="flex flex-col md:grid md:items-center gap-6 md:gap-10" style={{ gridTemplateColumns: "1fr auto" }}>
            {/* Left — quote + person */}
            <div className="flex flex-col gap-5">
              <Stars />
              <p style={{ color: "rgba(15,10,46,0.78)", fontSize: "1.05rem", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: t.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem", color: "white", flexShrink: 0, transition: "background 0.5s" }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ color: "#1c0f4c", fontWeight: 700, fontSize: "0.9rem", margin: 0 }}>{t.name}</p>
                  <p style={{ color: "rgba(15,10,46,0.42)", fontSize: "0.75rem", margin: "2px 0 0" }}>{t.role} · {t.city}</p>
                </div>
              </div>
            </div>

            {/* Right — investment intent */}
            <div
              className="flex md:flex-col items-center md:items-center justify-between md:justify-center gap-4 md:gap-0 rounded-2xl p-4 md:p-6"
              style={{ background: `rgba(${t.accentRgb},0.06)`, border: `1px solid rgba(${t.accentRgb},0.18)`, transition: "background 0.5s, border-color 0.5s", minWidth: 0 }}
            >
              <div className="flex flex-col md:items-center md:text-center gap-1">
                <p style={{ color: "rgba(15,10,46,0.4)", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
                  Planea invertir
                </p>
                <p style={{ color: t.accent, fontSize: "1.7rem", fontWeight: 900, margin: 0, lineHeight: 1, transition: "color 0.5s" }}>
                  {t.planAmount}
                </p>
                <p style={{ color: "rgba(15,10,46,0.35)", fontSize: "0.72rem", margin: 0 }}>al lanzamiento</p>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "20px", background: `rgba(${t.accentRgb},0.10)`, border: `1px solid rgba(${t.accentRgb},0.25)`, fontSize: "0.75rem", fontWeight: 700, color: t.accent, whiteSpace: "nowrap" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: t.accent, boxShadow: `0 0 6px ${t.accent}`, animation: "pulse-dot 2s infinite", flexShrink: 0 }} />
                En lista de espera
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(28,15,76,0.06)" }}>
            <div key={active} style={{ height: "100%", background: t.accent, animation: `slide-progress ${SLIDE_DURATION}ms linear forwards` }} />
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Testimonio ${i + 1}`}
              style={{ width: i === active ? "24px" : "8px", height: "8px", borderRadius: "4px", border: "none", background: i === active ? item.accent : "rgba(28,15,76,0.15)", cursor: "pointer", transition: "width 0.3s ease, background 0.3s ease", padding: 0 }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
