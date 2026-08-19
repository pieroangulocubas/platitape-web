/**
 * ProyectosSection — tipos de proyecto en los que se podrá invertir
 * (categorías ilustrativas, no listados de oportunidades activas)
 */
"use client";
import Image from "next/image";
import { MAX_RATE } from "@/lib/plans";

interface ProjectType {
  name: string;
  bullets: string[];
  plazo: string;
  min: string;
  accent: string;
  image: string;
  icon: "urbanizacion" | "remate" | "inmueble" | "construccion";
  featured?: boolean;
}

const projectTypes: ProjectType[] = [
  {
    name: "Urbanizaciones",
    bullets: [
      "Desarrollo de lotes con alta proyección de crecimiento.",
      "Zonas estratégicas y de alta demanda.",
      "Plusvalía garantizada.",
    ],
    plazo: "12 meses",
    min: "S/ 10,000",
    accent: "#ec4899",
    image: "/p-habilitaciones.PNG",
    icon: "urbanizacion",
    featured: true,
  },
  {
    name: "Remates Judiciales",
    bullets: [
      "Adquisición de propiedades por debajo del valor comercial.",
      "Oportunidades con alta rentabilidad.",
      "Procesos 100% legales y transparentes.",
    ],
    plazo: "12 meses",
    min: "S/ 10,000",
    accent: "#22d3ee",
    image: "/p-subastas.PNG",
    icon: "remate",
  },
  {
    name: "Compra y Venta de Bien Inmuebles",
    bullets: [
      "Selección de inmuebles con alto potencial.",
      "Compra estratégica.",
      "Venta rápida y rentable.",
    ],
    plazo: "12 meses",
    min: "S/ 10,000",
    accent: "#f97316",
    image: "/p-inmuebles.PNG",
    icon: "inmueble",
  },
  {
    name: "Construcción",
    bullets: [
      "Proyectos residenciales y comerciales.",
      "Construcción eficiente y de calidad.",
      "Rentabilidad desde la etapa de preventa.",
    ],
    plazo: "12 meses",
    min: "S/ 10,000",
    accent: "#a78bfa",
    image: "/p-construccion.PNG",
    icon: "construccion",
  },
];

function CategoryIcon({ type, color }: { type: ProjectType["icon"]; color: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "urbanizacion":
      return (
        <svg {...common}>
          <path d="M3 21h18" /><path d="M5 21V9l7-5 7 5v12" />
          <path d="M9 21v-6h6v6" /><path d="M9 12h.01M15 12h.01" />
        </svg>
      );
    case "remate":
      return (
        <svg {...common}>
          <path d="m14 4-8 8" /><path d="m17.5 7.5-8 8" /><path d="m5 13 3 3" />
          <path d="m3 21 4-4" /><path d="M19 5 21 3" /><path d="m21 5-2-2" />
        </svg>
      );
    case "inmueble":
      return (
        <svg {...common}>
          <path d="M3 9.5 12 3l9 6.5" /><path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case "construccion":
      return (
        <svg {...common}>
          <path d="M6 22V10l8-6v18" /><path d="M14 22V6l4 3v13" />
          <path d="M2 22h20" /><path d="M9 13h2M9 17h2" />
        </svg>
      );
    default:
      return null;
  }
}

const trustBadges = [
  {
    label: "100% seguro",
    detail: "Tu inversión está protegida.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    label: "Contratos notariales",
    detail: "Transparencia y respaldo legal.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    label: "Proyectos en Perú",
    detail: "Invertimos en todo el país.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Respaldo en proyectos inmobiliarios",
    detail: "Experiencia que genera confianza.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5 12 3l9 6.5" /><path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
      </svg>
    ),
  },
];

function IconCheck({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ProjectCard({ p }: { p: ProjectType }) {
  return (
    <div
      className="rounded-3xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        border: p.featured ? "1px solid #6cdcff" : "1px solid #d2dcea",
        boxShadow: p.featured
          ? "0 1px 4px rgba(28,15,76,0.08), 0 10px 32px rgba(108,220,255,0.25)"
          : "0 1px 4px rgba(28,15,76,0.08), 0 8px 28px rgba(28,15,76,0.08)",
        height: "100%",
      }}
    >
      {/* ── Header: icon + name ───────────────────────────── */}
      <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          className="shrink-0 rounded-2xl flex items-center justify-center"
          style={{ width: "44px", height: "44px", background: `${p.accent}14`, border: `1px solid ${p.accent}30` }}
        >
          <CategoryIcon type={p.icon} color={p.accent} />
        </div>
        <h3 style={{ color: "#1c0f4c", fontWeight: 800, fontSize: "1rem", margin: 0, lineHeight: 1.2 }}>
          {p.name}
        </h3>
      </div>

      {/* ── Photo ───────────────────────────── */}
      <div style={{ position: "relative", height: "150px", margin: "16px 20px 0", borderRadius: "16px", overflow: "hidden", background: "#1c0f4c" }}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="transition-transform duration-500 group-hover:scale-110"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* ── Card body ───────────────────────────────────── */}
      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        <ul style={{ display: "flex", flexDirection: "column", gap: "8px", margin: 0, padding: 0, listStyle: "none" }}>
          {p.bullets.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <span
                className="shrink-0 flex items-center justify-center"
                style={{ width: "18px", height: "18px", borderRadius: "50%", background: `${p.accent}18`, marginTop: "1px" }}
              >
                <IconCheck color={p.accent} />
              </span>
              <span style={{ color: "rgba(15,10,46,0.60)", fontSize: "0.78rem", lineHeight: 1.45 }}>{b}</span>
            </li>
          ))}
        </ul>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
          {[
            { label: "Plazo típico", value: p.plazo },
            { label: "Inversión mín.", value: p.min },
          ].map((s) => (
            <div
              key={s.label}
              style={{ flex: 1, background: "#eef2f9", border: "1px solid #d2dcea", borderRadius: "10px", padding: "8px 10px" }}
            >
              <p style={{ color: "rgba(15,10,46,0.4)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
                {s.label}
              </p>
              <p style={{ color: "#1c0f4c", fontWeight: 700, fontSize: "0.8rem", margin: "2px 0 0" }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#registro"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "10px",
            borderRadius: "12px",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: p.accent,
            background: `${p.accent}1f`,
            border: `1px solid ${p.accent}44`,
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          Ver más <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default function ProyectosSection() {
  return (
    <section id="proyectos" className="py-14 md:py-24 px-4" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#1c0f4c" }}>
              Tipos de inversión
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-3 leading-tight" style={{ color: "#1c0f4c" }}>
              Invertimos en proyectos{" "}
              <br className="hidden md:block" />
              que generan <span className="gradient-text">valor real</span>.
            </h2>
            <p className="text-base max-w-md" style={{ color: "rgba(15,10,46,0.5)" }}>
              Diversificamos nuestras inversiones en sectores estratégicos para generar{" "}
              <span style={{ color: "#bc45e9", fontWeight: 700 }}>rentabilidad sostenible</span>.
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
            <p className="text-sm font-semibold max-w-45" style={{ color: "#1c0f4c" }}>
              Tu inversión trabaja en proyectos <span style={{ color: "#bc45e9" }}>sólidos y rentables</span>.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectTypes.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 mt-14 pt-10" style={{ borderTop: "1px solid rgba(28,15,76,0.08)" }}>
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-3 max-w-55">
              <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(28,15,76,0.05)" }}>
                {b.icon}
              </div>
              <div>
                <p className="text-sm font-bold leading-tight" style={{ color: "#1c0f4c" }}>{b.label}</p>
                <p className="text-xs mt-0.5 leading-tight" style={{ color: "rgba(15,10,46,0.42)" }}>{b.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center mt-10 text-xs" style={{ color: "rgba(15,10,46,0.3)" }}>
          *Rentabilidad hasta {Math.round(MAX_RATE * 100)}% anual según categoría de inversión. Plazos son referenciales y pueden variar según el proyecto específico.
        </p>
      </div>
    </section>
  );
}
