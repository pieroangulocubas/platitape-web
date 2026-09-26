import Image from "next/image";

/**
 * Respaldo del grupo Bercorp — 3 entidades principales con Bercorp Holding
 * en el centro, Bercorp Real Estate a la izquierda y Bercorp Capital a la derecha.
 */

interface BusinessUnit {
  name: string;
  category: string;
  categoryColor: string;
  desc: string;
  logo: string;
  logoBg: string;
  logoRing?: string;
  statusText: string;
  isCenter?: boolean;
}

const UNITS: BusinessUnit[] = [
  {
    name: "Bercorp Real Estate",
    category: "Desarrollo Inmobiliario",
    categoryColor: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    desc: "Desarrollo, habilitación urbana y comercialización de proyectos inmobiliarios en el Perú con alta plusvalía.",
    logo: "/bercorp-real-state.webp",
    logoBg: "bg-white",
    statusText: "Proyectos en ejecución",
    isCenter: false,
  },
  {
    name: "Holding Bercorp Group",
    category: "Matriz Corporativa",
    categoryColor: "bg-amber-400/15 text-amber-300 ring-amber-400/30",
    desc: "Entidad matriz que lidera el gobierno corporativo, respalda patrimonialmente la operación y garantiza los activos del grupo.",
    logo: "/bercorp-holding.webp",
    logoBg: "bg-[#090613]",
    logoRing: "ring-amber-400/30",
    statusText: "Matriz y respaldo patrimonial",
    isCenter: true,
  },
  {
    name: "Bercorp Capital",
    category: "Inversiones y Finanzas",
    categoryColor: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
    desc: "Gestión de capitales, estructuración financiera y colocación de fondos orientados a maximizar rentabilidad con respaldo real.",
    logo: "/bercorp-capital.webp",
    logoBg: "bg-[#9ecb28]",
    statusText: "Estructuración activa",
    isCenter: false,
  },
];

const FACTS: [string, string][] = [
  ["Proyectos en total", "8"],
  ["Fundación del grupo", "2024"],
  ["Partida registral", "SUNARP 11094181"],
  ["RUC Oficial", "20613498878"],
];

const CYAN = "#6cdcff";
const MUTED = "rgba(255,255,255,0.68)";

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
      {/* atmósfera: resplandores suaves de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          right: "-10%",
          top: "-18%",
          width: "580px",
          height: "580px",
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(188,69,233,0.28),transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "-12%",
          bottom: "-15%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(108,220,255,0.18),transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Cabecera centrada y elegante */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="inline-flex items-center gap-2.5 text-[0.72rem] font-black uppercase tracking-[0.18em]"
            style={{ color: CYAN }}
          >
            <span className="h-0.5 w-7 shrink-0" style={{ background: CYAN }} />
            Ecosistema y Respaldo Empresarial
            <span className="h-0.5 w-7 shrink-0" style={{ background: CYAN }} />
          </div>

          <h2
            className="mt-4 text-[clamp(2.1rem,5vw,3.35rem)] font-black leading-[1.04]"
            style={{ letterSpacing: "-0.02em", textWrap: "balance" }}
          >
            Detrás de Platita.pe está{" "}
            <span style={{ color: CYAN }}>Bercorp Holding</span>.
          </h2>

          <p
            className="mx-auto mt-4 max-w-2xl text-[1.02rem] leading-relaxed"
            style={{ color: MUTED }}
          >
            Un grupo empresarial con presencia operativa en desarrollo inmobiliario
            y estructuración de capitales en el Perú. Platita.pe aporta la
            tecnología digital; el grupo aporta los proyectos, las garantías
            y la solidez patrimonial.
          </p>
        </div>

        {/* Trilogía de Proyectos / Unidades (Holding destacado en el centro) */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {UNITS.map((u) => (
            <div
              key={u.name}
              className={`relative flex flex-col justify-between rounded-3xl p-6 backdrop-blur-md transition-all duration-300 ${
                u.isCenter
                  ? "bg-white/[0.08] ring-2 ring-amber-400/40 shadow-2xl shadow-amber-500/10 md:-translate-y-2 hover:bg-white/[0.11] hover:ring-amber-400/60"
                  : "bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.07] hover:ring-white/20"
              }`}
            >
              {u.isCenter && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-200 px-3.5 py-0.5 text-[0.68rem] font-black uppercase tracking-wider text-black shadow-md">
                  Matriz Central
                </div>
              )}

              <div>
                {/* Stage del Logo */}
                <div
                  className={`relative flex h-20 w-full items-center justify-center overflow-hidden rounded-2xl p-3 shadow-md ring-1 ${
                    u.logoRing ?? "ring-black/10"
                  } ${u.logoBg}`}
                >
                  <Image
                    src={u.logo}
                    alt={u.name}
                    width={220}
                    height={70}
                    className="h-full w-auto max-w-[88%] object-contain"
                  />
                </div>

                {/* Categoría y Título */}
                <div className="mt-6">
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 text-[0.68rem] font-black uppercase tracking-wider ring-1 ${u.categoryColor}`}
                  >
                    {u.category}
                  </span>
                  <h3 className="mt-2.5 text-xl font-black text-white">
                    {u.name}
                  </h3>
                  <p
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: MUTED }}
                  >
                    {u.desc}
                  </p>
                </div>
              </div>

              {/* Pie de la tarjeta: estado */}
              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-[0.75rem] font-semibold text-white/75">
                <span
                  className={`h-2 w-2 rounded-full ${
                    u.isCenter ? "bg-amber-400" : "bg-emerald-400"
                  } animate-pulse`}
                />
                <span>{u.statusText}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Barra de datos duros — números y garantías */}
        <div className="mt-14 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {FACTS.map(([label, value]) => (
              <div key={label}>
                <div
                  className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-black leading-none text-white"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {value}
                </div>
                <div
                  className="mt-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em]"
                  style={{ color: CYAN }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
