import Image from "next/image";

/**
 * Respaldo real del grupo Bercorp — reemplaza la antigua cinta
 * "Socios Estratégicos" (logos de bancos que no eran socios).
 *
 * TODO (cliente): reemplazar los placeholders con:
 *  - Logos de cada unidad de negocio del holding (a /public/bercorp/...).
 *  - Nombre y una línea de descripción por unidad.
 *  - Datos duros verificables en FACTS (año, partida registral, RUC, cifras).
 */

interface Business {
  name: string;
  desc: string;
  /** Ruta a /public. `null` mientras no haya logo → se muestra un recuadro. */
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
  ["Grupo fundado en", "[año]"],
  ["Proyectos ejecutados", "[N]"],
  ["Partida registral", "[SUNARP · N.° de partida]"],
  ["RUC", "[por completar]"],
];

export default function BercorpSection() {
  return (
    <section
      id="respaldo"
      className="py-14 md:py-20 px-4"
      style={{ background: "#faf9ff", borderTop: "1px solid rgba(28,15,76,0.08)", borderBottom: "1px solid rgba(28,15,76,0.08)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase"
            style={{ color: "#a234cc" }}
          >
            <span className="h-0.5 w-6" style={{ background: "#a234cc" }} />
            Respaldo del grupo
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3" style={{ color: "#1c0f4c" }}>
            Somos la unidad fintech de{" "}
            <span className="gradient-text">Bercorp Holding</span>
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: "rgba(15,10,46,0.66)" }}>
            Detrás de cada inversión hay un grupo con operación real en el sector.
            Platita.pe pone la tecnología; el grupo, el respaldo y la experiencia.
          </p>
        </div>

        {/* Unidades de negocio */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BUSINESSES.map((b) => (
            <div
              key={b.name}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ background: "#ffffff", border: "1px solid rgba(28,15,76,0.10)" }}
            >
              <div
                className="h-12 flex items-center"
                style={{ opacity: b.logo ? 1 : 0.5 }}
              >
                {b.logo ? (
                  <Image
                    src={b.logo}
                    alt={b.name}
                    width={200}
                    height={48}
                    style={{ height: "32px", width: "auto", objectFit: "contain" }}
                  />
                ) : (
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded"
                    style={{ border: "1px dashed rgba(28,15,76,0.25)", color: "rgba(28,15,76,0.4)" }}
                  >
                    logo
                  </span>
                )}
              </div>
              <div>
                <p className="font-extrabold text-sm" style={{ color: "#1c0f4c" }}>{b.name}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(15,10,46,0.62)" }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Datos duros */}
        <div
          className="mt-8 rounded-2xl grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0"
          style={{ background: "#ffffff", border: "1px solid rgba(28,15,76,0.10)", borderColor: "rgba(28,15,76,0.10)" }}
        >
          {FACTS.map(([label, value]) => (
            <div key={label} className="p-4 text-center">
              <p className="text-[0.7rem] font-bold tracking-wide uppercase" style={{ color: "rgba(15,10,46,0.5)" }}>
                {label}
              </p>
              <p className="text-sm font-black mt-1" style={{ color: "#1c0f4c" }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
