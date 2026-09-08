/**
 * Respaldo del grupo Bercorp — reemplaza la antigua cinta "Socios Estratégicos".
 * Banda oscura, tipografía grande, índice de negocios en filas (no tarjetas)
 * y una tira de datos duros como números.
 *
 * TODO (cliente): logos (a /public/bercorp/...), nombres y descripciones de las
 * unidades de negocio, y los valores de FACTS (año, proyectos, partida, RUC).
 */

interface Business {
  name: string;
  desc: string;
  /** Ruta a /public. `null` mientras no haya logo. */
  logo: string | null;
}

const BUSINESSES: Business[] = [
  {
    name: "Bercorp Real Estate",
    desc: "Desarrollo y comercialización de proyectos inmobiliarios.",
    logo: "/bercorp-real-state.webp",
  },
  { name: "[Unidad de negocio 2]", desc: "[Descripción por completar]", logo: null },
  { name: "[Unidad de negocio 3]", desc: "[Descripción por completar]", logo: null },
  { name: "[Unidad de negocio 4]", desc: "[Descripción por completar]", logo: null },
];

const FACTS: [string, string][] = [
  ["Fundación del grupo", "[año]"],
  ["Proyectos ejecutados", "[N]"],
  ["Partida registral", "[SUNARP · N.º]"],
  ["RUC", "[por completar]"],
];

const CYAN = "#6cdcff";
const HAIRLINE = "rgba(255,255,255,0.14)";
const MUTED = "rgba(255,255,255,0.64)";

export default function BercorpSection() {
  return (
    <section
      id="respaldo"
      className="relative overflow-hidden px-5 py-20 md:py-28"
      style={{
        background: "linear-gradient(160deg,#1c0f4c 0%,#241257 58%,#190c46 100%)",
        color: "#ffffff",
      }}
    >
      {/* atmósfera: un solo resplandor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          right: "-12%",
          top: "-22%",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(188,69,233,0.32),transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div
          className="flex items-center gap-2.5 text-[0.72rem] font-black uppercase tracking-[0.18em]"
          style={{ color: CYAN }}
        >
          <span className="h-0.5 w-7 shrink-0" style={{ background: CYAN }} />
          Respaldo del grupo
        </div>

        <h2
          className="mt-5 max-w-3xl text-[clamp(1.95rem,4.8vw,3.15rem)] font-black leading-[1.04]"
          style={{ letterSpacing: "-0.02em", textWrap: "balance" }}
        >
          Detrás de Platita.pe está{" "}
          <span style={{ color: CYAN }}>Bercorp Holding</span>.
        </h2>

        <p
          className="mt-5 max-w-xl text-[1.02rem] leading-relaxed"
          style={{ color: MUTED }}
        >
          Un grupo con operación inmobiliaria real en el Perú. Nosotros ponemos la
          tecnología; ellos, la experiencia y el respaldo detrás de cada inversión.
        </p>

        {/* Unidades de negocio — índice en filas, no tarjetas */}
        <ul
          className="mt-12 list-none p-0"
          style={{ borderTop: `1px solid ${HAIRLINE}` }}
        >
          {BUSINESSES.map((b) => (
            <li
              key={b.name}
              className="flex flex-col gap-1.5 py-6 sm:flex-row sm:items-center sm:gap-10"
              style={{ borderBottom: `1px solid ${HAIRLINE}` }}
            >
              <div className="flex items-center gap-3.5 sm:w-[320px] sm:shrink-0">
                {b.logo && (
                  <span className="inline-flex items-center rounded-md bg-white px-2 py-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.logo}
                      alt={b.name}
                      loading="lazy"
                      decoding="async"
                      style={{ height: "22px", width: "auto", display: "block" }}
                    />
                  </span>
                )}
                <span className="text-[clamp(1.15rem,2.4vw,1.5rem)] font-extrabold leading-tight">
                  {b.name}
                </span>
              </div>
              <span
                className="text-[0.95rem] leading-relaxed sm:flex-1"
                style={{ color: MUTED }}
              >
                {b.desc}
              </span>
            </li>
          ))}
        </ul>

        {/* Datos duros — números, no cajas */}
        <div className="mt-12 flex flex-wrap gap-x-14 gap-y-7">
          {FACTS.map(([label, value]) => (
            <div key={label} className="min-w-[130px]">
              <div
                className="text-[clamp(1.5rem,3.4vw,2.15rem)] font-black leading-none"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {value}
              </div>
              <div
                className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.12em]"
                style={{ color: CYAN }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
