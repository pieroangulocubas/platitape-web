import Image from "next/image";
import ToastNotifications from "./ToastNotifications";
import HeroSimulator from "./HeroSimulator";

/* Hero · paleta de marca (navy #1c0f4c · magenta #bc45e9 · cyan #6cdcff) ·
   tipografía Nunito (la del sitio). Copy 50% izq · visual 50% der · alto 100vh.
   Navbar lo aporta <Navbar /> del layout de página. */

const NAVY = "#1c0f4c";
const MAGENTA_TEXT = "#a234cc"; // magenta de marca oscurecido para texto (AA)
const MUTED = "rgba(28,15,76,0.62)";
const HAIRLINE = "rgba(28,15,76,0.10)";

const FEATURES = [
  { mark: "S/", bg: "rgba(108,220,255,0.20)", fg: "#0e8fb0", text: "Invierte desde ", accent: "S/10,000" },
  { mark: "%", bg: "rgba(188,69,233,0.12)", fg: MAGENTA_TEXT, text: "Hasta ", accent: "20% de rentabilidad", tail: " anual" },
  { mark: "✓", bg: "rgba(188,69,233,0.12)", fg: MAGENTA_TEXT, text: "Respaldo en ", accent: "proyectos reales" },
];

export default function HeroSection() {
  return (
    <>
      <section
        className="relative flex items-start overflow-hidden lg:min-h-[100svh] lg:items-center"
        style={{ background: "linear-gradient(115deg,#ffffff 0%,#fbfaff 45%,#f2f0fb 100%)" }}
      >
        {/* Blob cónico girando (cyan → magenta de marca) */}
        <div
          className="hero-anim-spin pointer-events-none absolute rounded-full"
          style={{
            top: "-180px",
            right: "-160px",
            width: "min(820px, 90vw)",
            height: "min(820px, 90vw)",
            background:
              "conic-gradient(from 200deg,rgba(108,220,255,.42),rgba(188,69,233,.38),rgba(188,69,233,.3),rgba(108,220,255,.42))",
            filter: "blur(70px)",
          }}
        />
        {/* Velo blanco a la derecha (solo desktop) — suave, no lava el anillo */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(90deg,transparent 74%,rgba(255,255,255,.4))" }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:py-24">
          {/* ── Columna izquierda: copy (50%) ─────────────── */}
          <div>
            <div
              className="flex items-center gap-2.5 text-xs font-black tracking-[0.16em]"
              style={{ color: MAGENTA_TEXT }}
            >
              <span className="h-0.5 w-6 shrink-0" style={{ background: MAGENTA_TEXT }} />
              BETA PRIVADA · INVERSIÓN INMOBILIARIA EN PERÚ
            </div>

            <h1
              className="mt-4 text-[2.2rem] font-black leading-[1.08] tracking-tight sm:mt-5 sm:text-[3.25rem] sm:leading-[1.04] lg:mt-6 lg:text-[3.75rem] lg:leading-[1.02]"
              style={{ color: NAVY }}
            >
              <span className="block">
                Haz que tu{" "}
                <span className="relative inline-block" style={{ color: MAGENTA_TEXT }}>
                  platita
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0"
                    style={{
                      bottom: "0.06em",
                      height: "0.14em",
                      borderRadius: "6px",
                      background:
                        "linear-gradient(90deg,rgba(108,220,255,.65),rgba(188,69,233,.55))",
                      zIndex: -1,
                    }}
                  />
                </span>
              </span>
              <span className="block">
                trabaje por ti<span style={{ color: MAGENTA_TEXT }}>.</span>
              </span>
            </h1>

            <p
              className="mt-5 max-w-[470px] text-[1.05rem] leading-relaxed lg:mt-6 lg:text-[1.125rem]"
              style={{ color: MUTED }}
            >
              Proyectos auditados, contratos notariales y reportes mensuales. La
              tecnología hace el trabajo; tú ves crecer tu inversión.
            </p>

            {/* Lista de beneficios */}
            <div className="mt-6 flex flex-col border-t lg:mt-7" style={{ borderColor: HAIRLINE }}>
              {FEATURES.map((f) => (
                <div
                  key={f.mark}
                  className="flex items-center gap-4 border-b py-3.5"
                  style={{ borderColor: HAIRLINE }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] text-[15px] font-black"
                    style={{ background: f.bg, color: f.fg }}
                  >
                    {f.mark}
                  </div>
                  <div className="text-[1.0625rem] font-semibold" style={{ color: NAVY }}>
                    {f.text}
                    <span style={{ color: f.fg }}>{f.accent}</span>
                    {f.tail}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs — primario domina, secundario discreto */}
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5 lg:mt-7">
              <a
                href="#registro"
                className="btn-gradient inline-flex items-center justify-center rounded-[14px] px-9 py-[17px] text-base"
              >
                <span>Reserva tu lugar</span>
              </a>
              <HeroSimulator
                buttonClassName="inline-flex items-center gap-2 text-[0.95rem] font-bold text-[#1c0f4c] transition-colors hover:text-[#a234cc]"
              />
            </div>

            {/* Respaldo del grupo */}
            <div className="mt-6 flex items-center gap-3">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-[#0d091a] p-1 shadow-sm ring-1 ring-black/10">
                <Image
                  src="/bercorp-holding.webp"
                  alt="Bercorp Holding Group"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-sm font-semibold" style={{ color: MUTED }}>
                Un proyecto de <strong style={{ color: NAVY }}>Bercorp Holding</strong>
              </span>
            </div>
          </div>

          {/* ── Columna derecha: visual (50%) ─────────────── */}

          {/* Móvil: solo la llama, sin skyline ni tarjetas */}
          <div className="relative mx-auto mb-2 mt-6 w-[340px] pb-6 sm:w-[420px] lg:hidden">
            <Image
              src="/hero-llama-mobile.webp"
              alt="Llama Platita"
              width={860}
              height={914}
              priority
              sizes="420px"
              className="relative h-auto w-full"
              style={{ filter: "drop-shadow(0 18px 24px rgba(28,15,76,.22))" }}
            />
          </div>

          {/* Desktop: composición completa (skyline + llama + aureola + tarjeta).
              Aureola centrada EXACTAMENTE en la llama (left 36%, top 50%). */}
          <div className="relative hidden lg:block lg:h-[600px]">
            {/* Siluetas de edificios detrás de todo, alineadas bajo la llama */}
            <svg
              className="pointer-events-none absolute bottom-12"
              style={{ left: "42%", transform: "translateX(-50%)", color: NAVY }}
              width="430"
              height="230"
              viewBox="0 0 430 230"
              fill="none"
              aria-hidden="true"
            >
              <g fill="currentColor" opacity="0.08">
                <rect x="6" y="118" width="52" height="112" />
                <rect x="64" y="66" width="36" height="164" />
                <rect x="106" y="146" width="70" height="84" />
                <rect x="258" y="128" width="66" height="102" />
                <rect x="332" y="88" width="32" height="142" />
                <rect x="372" y="52" width="54" height="178" />
              </g>
              <g fill="currentColor" opacity="0.12">
                <rect x="186" y="34" width="56" height="196" />
                <rect x="226" y="10" width="15" height="24" />
              </g>
              {/* ventanitas */}
              <g fill="#ffffff" opacity="0.55">
                {[0, 1, 2, 3, 4].map((r) =>
                  [0, 1, 2].map((c) => (
                    <rect key={`a${r}${c}`} x={195 + c * 15} y={50 + r * 30} width="7" height="11" />
                  ))
                )}
                {[0, 1, 2, 3].map((r) =>
                  [0].map((c) => (
                    <rect key={`b${r}${c}`} x={385 + c * 16} y={70 + r * 30} width="7" height="11" />
                  ))
                )}
              </g>
            </svg>

            {/* Resplandor */}
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                left: "36%",
                top: "50%",
                width: "340px",
                height: "340px",
                transform: "translate(-50%,-50%)",
                background:
                  "radial-gradient(circle,rgba(255,255,255,.95),rgba(240,236,255,.45) 58%,transparent)",
              }}
            />
            {/* Anillo exterior punteado — ESTÁTICO */}
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                left: "36%",
                top: "50%",
                width: "440px",
                height: "440px",
                transform: "translate(-50%,-50%)",
                border: "1.5px dashed rgba(188,69,233,.4)",
              }}
            />
            {/* Anillo interior sólido — ESTÁTICO */}
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                left: "36%",
                top: "50%",
                width: "360px",
                height: "360px",
                transform: "translate(-50%,-50%)",
                border: "1px solid rgba(108,220,255,.55)",
              }}
            />
            {/* Solo el puntito orbita: wrapper posiciona, hijo rota */}
            <div
              className="pointer-events-none absolute"
              style={{ left: "36%", top: "50%", width: "360px", height: "360px", transform: "translate(-50%,-50%)" }}
            >
              <div className="hero-anim-orbit h-full w-full">
                <span
                  className="absolute rounded-full"
                  style={{
                    left: "50%",
                    top: "-6px",
                    marginLeft: "-6px",
                    width: "12px",
                    height: "12px",
                    background: "#6cdcff",
                    boxShadow: "0 0 0 6px rgba(108,220,255,.22)",
                  }}
                />
              </div>
            </div>

            {/* Llama — desplazada a la izquierda: la tarjeta flota sobre el
                espacio libre de la derecha, no sobre el personaje. */}
            <div
              className="absolute top-1/2"
              style={{ left: "36%", transform: "translate(-50%, -50%)" }}
            >
              <div className="hero-anim-bob relative aspect-[900/959] w-[540px]">
                <Image
                  src="/hero-llama-volando.webp"
                  alt="Llama Platita"
                  fill
                  priority
                  sizes="540px"
                  style={{
                    objectFit: "contain",
                    filter: "drop-shadow(0 34px 44px rgba(28,15,76,.24))",
                  }}
                />
              </div>
            </div>

            {/* Tarjeta — proyecto · abajo a la derecha, solo roza la base de la llama.
                Versión compacta: sin fila "Demanda estimada". */}
            <div
              className="hero-anim-flt2 absolute -right-8 bottom-2 w-[258px] rounded-[18px] bg-white p-4"
              style={{ border: "1px solid rgba(28,15,76,.07)", boxShadow: "0 22px 46px rgba(28,15,76,.14)" }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-[14px] font-extrabold leading-tight" style={{ color: NAVY }}>
                  Jardines de la Colina
                </div>
                <span
                  className="shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-extrabold"
                  style={{ color: MAGENTA_TEXT, background: "rgba(188,69,233,.1)" }}
                >
                  PRE-VENTA
                </span>
              </div>
              <div className="mt-1 text-xs" style={{ color: MUTED }}>
                Jaén, Cajamarca
              </div>
              <div className="relative mt-2.5 aspect-[626/412] w-full overflow-hidden rounded-xl">
                <Image
                  src="/jardines-de-la-colina.webp"
                  alt="Proyecto Jardines de la Colina"
                  fill
                  sizes="232px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-[7px] flex-1 overflow-hidden rounded-full" style={{ background: "rgba(28,15,76,.08)" }}>
                  <div className="h-full w-[62%] rounded-full" style={{ background: "linear-gradient(90deg,#6cdcff,#bc45e9)" }} />
                </div>
                <span className="text-[11px] font-bold" style={{ color: MAGENTA_TEXT }}>62%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll (solo desktop) */}
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 lg:flex"
          style={{ color: MUTED }}
        >
          <span className="text-[0.62rem] font-bold tracking-[0.22em]">SCROLL</span>
          <svg
            className="hero-scroll-hint"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      <ToastNotifications />
    </>
  );
}
