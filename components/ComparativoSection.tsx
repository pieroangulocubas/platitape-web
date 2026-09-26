import Image from "next/image";

const rows = [
  {
    label: "Rentabilidad anual",
    banco: "3% – 5%",
    cajas: "4% – 6%",
    fondos: "5% – 10%",
    acciones: "6% – 12%*",
    platita: "14% – 20% anual",
    icon: "trending",
    accent: "#bc45e9",
  },
  {
    label: "Inversión mínima",
    banco: "S/ 1,000+",
    cajas: "S/ 500+",
    fondos: "S/ 5,000+",
    acciones: "S/ 100+",
    platita: "S/ 10,000",
    icon: "coins",
    accent: "#6cdcff",
  },
  {
    label: "Respaldo del capital",
    banco: "Fondo de seguro",
    cajas: "Fondo de seguro limitado",
    fondos: "Patrimonio del fondo (no asegurado)",
    acciones: "No hay respaldo del capital",
    platita: "Activo inmobiliario",
    icon: "shield",
    accent: "#bc45e9",
  },
  {
    label: "Proceso",
    banco: "Colas presenciales",
    cajas: "Colas presenciales",
    fondos: "A través de intermediarios",
    acciones: "Plataformas de bolsa",
    platita: "100% online · 5 min",
    icon: "zap",
    accent: "#6cdcff",
  },
  {
    label: "Gestión del activo",
    banco: "N/A",
    cajas: "N/A",
    fondos: "Administradora del fondo",
    acciones: "Tú mismo",
    platita: "Nosotros lo hacemos",
    icon: "gear",
    accent: "#bc45e9",
  },
  {
    label: "Comisiones de entrada",
    banco: "Varía",
    cajas: "Varía",
    fondos: "1% – 3% anual + comisiones",
    acciones: "0.1% – 0.5% por operación",
    platita: "S/ 0",
    icon: "tag",
    accent: "#6cdcff",
  },
  {
    label: "Ingresos",
    banco: "Al vencimiento",
    cajas: "Al vencimiento",
    fondos: "Al rescate",
    acciones: "Al vender",
    platita: "Mensuales",
    icon: "wallet",
    accent: "#bc45e9",
  },
];

const cols = [
  { key: "banco", label: "Banco" },
  { key: "cajas", label: "Cajas" },
  { key: "fondos", label: "Fondos" },
  { key: "acciones", label: "Acciones" },
] as const;

const ROW_H = 68;
const HEAD_H = 140;

function RowIcon({ name, color }: { name: string; color: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "trending":
      return (
        <svg {...common}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "coins":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6" />
          <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "zap":
      return (
        <svg {...common}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12.01V2h10.01l8.58 8.58a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <path d="M3 7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1h-2a3 3 0 0 0 0 6h2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
          <circle cx="16" cy="12" r="1" fill={color} stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

function ColIcon({ name }: { name: string }) {
  const src: Record<string, string> = {
    banco: "/icons/banco-norm.webp",
    cajas: "/icons/cajas-norm.webp",
    fondos: "/icons/fondos-norm.webp",
    acciones: "/icons/acciones-norm.webp",
  };
  return (
    <div style={{ position: "relative", width: 52, height: 52 }}>
      <Image src={src[name]} alt="" fill sizes="52px" style={{ objectFit: "contain" }} />
    </div>
  );
}

export default function ComparativoSection() {
  return (
    <section id="comparativo" className="relative py-12 md:py-20 px-4 overflow-hidden" style={{ background: "#ffffff" }}>
      {/* Dot grid — subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(28,15,76,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-8%",
          top: "5%",
          width: "38%",
          height: "50%",
          background: "radial-gradient(ellipse, rgba(108,220,255,0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-8%",
          bottom: "-5%",
          width: "42%",
          height: "55%",
          background: "radial-gradient(ellipse, rgba(188,69,233,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#1c0f4c" }}
          >
            ¿Por qué Platita.pe?
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-3" style={{ color: "#1c0f4c" }}>
            Compara y decide{" "}
            <span className="gradient-text">con datos</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(8,11,30,0.66)" }}>
            Tu platita merece trabajar más duro. Mira cómo se compara Platita.pe con las alternativas tradicionales.
          </p>
        </div>

        {/* Comparison — desktop / tablet: side-by-side cards, no scroll */}
        <div className="hidden md:flex items-stretch" style={{ gap: "12px" }} data-reveal>
          {/* Base card — Label + Banco + Cajas + Fondos + Acciones */}
          <div
            className="flex-1 rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(28,15,76,0.08)",
              boxShadow: "0 1px 3px rgba(8,10,30,0.04), 0 8px 24px rgba(8,10,30,0.06)",
              background: "#ffffff",
            }}
          >
            {/* Head row */}
            <div className="grid" style={{ gridTemplateColumns: "0.85fr 1fr 1fr 1fr 1fr", background: "#1c0f4c" }}>
              <div className="flex flex-col items-center justify-center gap-1.5 text-center px-2" style={{ minHeight: HEAD_H }}>
                <div style={{ position: "relative", width: 52, height: 52 }}>
                  <Image src="/icons/informacion-norm.webp" alt="" fill sizes="52px" style={{ objectFit: "contain" }} />
                </div>
                <span className="text-xs font-bold tracking-wide" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Información
                </span>
              </div>
              {cols.map((col) => (
                <div
                  key={col.key}
                  className="flex flex-col items-center justify-center gap-1.5 text-center px-1"
                  style={{ minHeight: HEAD_H }}
                >
                  <ColIcon name={col.key} />
                  <span
                    className="text-xs font-bold tracking-wide"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    {col.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Body rows */}
            {rows.map((row, ri) => (
              <div
                key={row.label}
                className="grid transition-colors duration-200 hover:bg-[rgba(188,69,233,0.03)]"
                style={{
                  gridTemplateColumns: "0.85fr 1fr 1fr 1fr 1fr",
                  background: ri % 2 === 1 ? "rgba(28,15,76,0.025)" : "transparent",
                  borderTop: "1px solid rgba(28,15,76,0.06)",
                }}
              >
                <div
                  className="flex items-center gap-2 px-3"
                  style={{ minHeight: ROW_H }}
                >
                  <div
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: `${row.accent}14`, border: `1px solid ${row.accent}2a` }}
                  >
                    <RowIcon name={row.icon} color={row.accent} />
                  </div>
                  <span className="text-xs font-bold leading-tight" style={{ color: "#1c0f4c" }}>
                    {row.label}
                  </span>
                </div>
                {cols.map((col) => (
                  <div
                    key={col.key}
                    className="flex items-center justify-center text-center px-2"
                    style={{ minHeight: ROW_H, fontSize: "0.8rem", fontWeight: 600, color: "rgba(15,10,46,0.66)" }}
                  >
                    {row[col.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Featured card — Platita.pe */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              width: "190px",
              flexShrink: 0,
              background: "linear-gradient(160deg, #6cdcff 0%, #bc45e9 65%, #a233d4 100%)",
              boxShadow: "0 14px 40px rgba(188,69,233,0.38), 0 4px 14px rgba(108,220,255,0.20)",
              transform: "scale(1.045)",
              zIndex: 2,
            }}
          >
            {/* Head cell */}
            <div
              className="flex flex-col items-center justify-center gap-1.5 text-center px-3"
              style={{ minHeight: HEAD_H, background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="rounded-full overflow-hidden relative shrink-0"
                style={{ width: 54, height: 54, background: "#1c0f4c", boxShadow: "0 2px 8px rgba(28,15,76,0.25)" }}
              >
                <Image src="/isotipo.webp" alt="" fill sizes="54px" style={{ objectFit: "cover", objectPosition: "left center" }} />
              </div>
              <span className="text-sm font-black text-white">platita.pe</span>
            </div>

            {/* Body cells */}
            {rows.map((row, ri) => (
              <div
                key={row.label}
                className="flex items-center justify-center text-center px-3"
                style={{
                  minHeight: ROW_H,
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  background: ri % 2 === 1 ? "rgba(255,255,255,0.06)" : "transparent",
                  borderTop: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {row.platita}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison — mobile: stacked cards, no scroll */}
        <div className="flex md:hidden flex-col gap-3" data-reveal>
          {rows.map((row) => (
            <div
              key={row.label}
              className="rounded-2xl p-3.5"
              style={{
                border: "1px solid rgba(28,15,76,0.08)",
                boxShadow: "0 1px 3px rgba(8,10,30,0.04), 0 6px 18px rgba(8,10,30,0.05)",
                background: "#ffffff",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${row.accent}14`, border: `1px solid ${row.accent}2a` }}
                >
                  <RowIcon name={row.icon} color={row.accent} />
                </div>
                <span className="text-sm font-bold" style={{ color: "#1c0f4c" }}>
                  {row.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {cols.map((col) => (
                  <div
                    key={col.key}
                    className="rounded-xl px-2.5 py-2.5 text-center"
                    style={{ background: "rgba(28,15,76,0.03)" }}
                  >
                    <div
                      className="text-[0.65rem] font-bold uppercase tracking-wide mb-1"
                      style={{ color: "rgba(15,10,46,0.66)" }}
                    >
                      {col.label}
                    </div>
                    <div className="text-xs font-bold leading-tight" style={{ color: "rgba(15,10,46,0.66)" }}>
                      {row[col.key]}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="rounded-xl px-2.5 py-2.5 text-center flex items-center justify-center gap-2 flex-wrap"
                style={{ background: "linear-gradient(160deg, #6cdcff 0%, #bc45e9 65%, #a233d4 100%)" }}
              >
                <div className="text-[0.65rem] font-black uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.85)" }}>
                  platita.pe
                </div>
                <div className="text-xs font-black leading-tight text-white">
                  {row.platita}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(15,10,46,0.66)" }}>
          *Rentabilidades estimadas basadas en datos históricos del mercado peruano. No garantizan resultados futuros.
        </p>
      </div>
    </section>
  );
}
