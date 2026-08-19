import Image from "next/image";

/**
 * Dos cintas corredizas independientes:
 *   RespaldoLegalBand   — entidades públicas regulatorias (→)
 *   SociosEstrategicosBand — socios privados estratégicos (←)
 *
 * Cada una va en una sección distinta del page.
 */

const PUBLIC_ENTITY_LOGOS = [
  { src: "/respaldo/indecopi.PNG", alt: "INDECOPI", label: "INDECOPI · Propiedad Intelectual" },
  { src: "/respaldo/sunarp.PNG", alt: "SUNARP", label: "SUNARP · Registros Públicos" },
  { src: "/respaldo/sunat.PNG", alt: "SUNAT", label: "SUNAT · Administración Tributaria" },
  { src: "/respaldo/notaria.PNG", alt: "Notaría", label: "NOTARIAL · Contrato Mutuo" },
];

const PRIVATE_PARTNERS = [
  "BCP · Banco de Crédito del Perú",
  "Interbank · Banco Internacional del Perú",
  "BBVA Perú · BBVA Continental",
  "Credicorp · Grupo Financiero",
  "Notarías del Perú · Colegio de Notarios",
];

function MarqueeRow({
  items,
  reverse = false,
  color,
}: {
  items: string[];
  reverse?: boolean;
  color: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrapper" style={{ overflow: "hidden" }}>
      <div className={reverse ? "ticker-track-reverse" : "ticker-track"}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              padding: "0 36px",
              flexShrink: 0,
              fontSize: "0.75rem",
              fontWeight: 600,
              color,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span style={{ marginLeft: "36px", opacity: 0.25, color: "rgba(28,15,76,0.4)" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function MarqueeLogoRow({
  logos,
  reverse = false,
  color,
}: {
  logos: { src: string; alt: string; label: string }[];
  reverse?: boolean;
  color: string;
}) {
  const doubled = [...logos, ...logos];
  return (
    <div className="ticker-wrapper" style={{ overflow: "hidden" }}>
      <div className={reverse ? "ticker-track-reverse" : "ticker-track"}>
        {doubled.map((logo, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 36px",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={48}
              style={{ height: "28px", width: "auto", objectFit: "contain" }}
              unoptimized
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color,
                letterSpacing: "0.04em",
              }}
            >
              {logo.label}
            </span>
            <span style={{ marginLeft: "26px", opacity: 0.25, color: "rgba(28,15,76,0.4)" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Cinta 1: Respaldo Legal ──────────────────────────── */
export function RespaldoLegalBand() {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(28,15,76,0.08)",
        borderBottom: "1px solid rgba(28,15,76,0.08)",
        background: "#ffffff",
        padding: "12px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          paddingLeft: "20px",
          marginBottom: "0",
        }}
      >
        {/* Label fijo a la izquierda */}
        <span
          style={{
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#1c0f4c",
            flexShrink: 0,
            paddingRight: "16px",
            borderRight: "1px solid rgba(28,15,76,0.15)",
            opacity: 0.7,
          }}
        >
          Respaldo<br />Legal
        </span>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <MarqueeLogoRow logos={PUBLIC_ENTITY_LOGOS} color="rgba(28,15,76,0.5)" />
        </div>
      </div>
    </div>
  );
}

/* ── Cinta 2: Socios Estratégicos ─────────────────────── */
export function SociosEstrategicosBand() {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(28,15,76,0.08)",
        borderBottom: "1px solid rgba(28,15,76,0.08)",
        background: "#ffffff",
        padding: "12px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          paddingLeft: "20px",
        }}
      >
        <span
          style={{
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#1c0f4c",
            flexShrink: 0,
            paddingRight: "16px",
            borderRight: "1px solid rgba(28,15,76,0.15)",
            opacity: 0.7,
          }}
        >
          Socios<br />Estratégicos
        </span>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <MarqueeRow items={PRIVATE_PARTNERS} reverse color="rgba(28,15,76,0.5)" />
        </div>
      </div>
    </div>
  );
}

/* Default export por si se importa directamente */
export default function LegalTicker() {
  return (
    <>
      <RespaldoLegalBand />
      <SociosEstrategicosBand />
    </>
  );
}
