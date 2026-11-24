import Image from "next/image";
import { WA_BASE_URL } from "@/lib/config";

/**
 * Platita Kids — línea para niños y adolescentes de 10 a 17 años, administrada
 * por el padre, madre o representante legal. Se presenta como "Próximamente":
 * planes y tasas son una propuesta conceptual pendiente de revisión legal.
 */

const NAVY = "#1c0f4c";
const MUTED = "rgba(8,11,30,0.66)";

const KIDS_WA_URL = `${WA_BASE_URL}?text=${encodeURIComponent(
  "Hola, quiero saber más sobre Platita Kids para mi familia y unirme a la lista de espera."
)}`;

const STAGES = [
  { name: "Descubro", ages: "10 a 12 años", text: "Primeros pasos: qué es ahorrar y por qué el dinero puede crecer.", accent: "#bc45e9" },
  { name: "Aprendo", ages: "13 a 15 años", text: "Capital, rentabilidad e interés compuesto con su propio progreso.", accent: "#0ea5e9" },
  { name: "Me preparo", ages: "16 a 17 años", text: "Metas propias y planificación para dar el salto a la adultez.", accent: "#7c3aed" },
];

const KIDS_PLANS = [
  { name: "Kids Inicial", capital: "S/ 500", rate: "14%", focus: "Primer acercamiento", accent: "#bc45e9" },
  { name: "Kids Avanza", capital: "S/ 2,000", rate: "16%", focus: "Formación del hábito", accent: "#0ea5e9" },
  { name: "Kids Crece", capital: "S/ 5,000", rate: "18%", focus: "Construcción de capital", accent: "#bc45e9" },
  { name: "Kids Patrimonio", capital: "S/ 10,000", rate: "20%", focus: "Capital de largo plazo", accent: "#7c3aed" },
];

const KID_SEES = [
  "Su capital y el crecimiento acumulado",
  "Su meta financiera y el tiempo invertido",
  "Su plan actual y el progreso al siguiente nivel",
  "Contenido educativo adaptado a su edad",
];

const PARENT_CONTROLS = [
  "Tú autorizas cada operación desde tu cuenta",
  "Aportes iniciales y mensuales (ej.: S/ 500 + S/ 100 al mes)",
  "Capital aportado, rentabilidad y aportes, siempre por separado",
  "Historial de aportes, ciclos y contratos",
];

const LESSONS = [
  "¿Qué es ahorrar?",
  "¿Qué es invertir?",
  "¿Qué es el capital?",
  "¿Qué es la rentabilidad?",
  "¿Qué es el riesgo?",
  "¿Qué es el interés compuesto?",
  "¿Por qué invertir a largo plazo?",
  "¿Cómo fijar una meta financiera?",
];

const IconCheck = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function KidsSection() {
  return (
    <section
      id="kids"
      className="relative py-14 md:py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #faf5ff 45%, #f3f7ff 100%)" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-12%", top: "4%", width: "48%", height: "45%",
          background: "radial-gradient(ellipse, rgba(236,72,153,0.12) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-12%", bottom: "6%", width: "45%", height: "45%",
          background: "radial-gradient(ellipse, rgba(108,220,255,0.14) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* ── Intro + tarjetas ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(188,69,233,0.10)", color: "#a234cc" }}
            >
              <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: "#ec4899" }} />
              Próximamente · Platita Kids
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4 leading-tight" style={{ color: NAVY }}>
              Aprende hoy.
              <br />
              <span className="gradient-text">Invierte para tu futuro.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: MUTED }}>
              La línea de Platita.pe para niños y adolescentes de <strong style={{ color: NAVY }}>10 a 17 años</strong>.
              Tu familia empieza un capital para tu hijo o hija y lo convierte en años de educación financiera
              práctica: no solo le das dinero, le enseñas a hacerlo crecer.
            </p>
            <p className="text-sm mt-4 max-w-xl" style={{ color: MUTED }}>
              El padre, madre o representante legal administra la cuenta. El menor tiene su propio perfil, visual y
              educativo, adaptado a su edad.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <a
                href={KIDS_WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient px-7 py-4 rounded-full font-bold text-center"
              >
                <span>Quiero Platita Kids para mi familia</span>
              </a>
              <a
                href="#kids-planes"
                className="px-7 py-4 rounded-full font-bold text-center transition-colors hover:bg-white"
                style={{ border: "1.5px solid rgba(28,15,76,0.18)", color: NAVY }}
              >
                Ver planes Kids
              </a>
            </div>
          </div>

          {/* Tarjetas Kids en abanico */}
          <div className="relative mx-auto w-full max-w-[520px] aspect-[520/440]">
            <div
              className="absolute left-0 top-0 w-[82%] -rotate-6 transition-transform duration-500 hover:-rotate-3"
              style={{ filter: "drop-shadow(0 18px 30px rgba(236,72,153,0.22))" }}
            >
              <Image
                src="/card-kid-girl.jpeg"
                alt="Tarjeta Platita Kids con llama rosada: Sueña, aprende, logra"
                width={1280}
                height={853}
                sizes="(max-width: 640px) 80vw, 430px"
                className="h-auto w-full rounded-[22px]"
              />
            </div>
            <div
              className="absolute right-0 bottom-0 w-[82%] rotate-6 transition-transform duration-500 hover:rotate-3"
              style={{ filter: "drop-shadow(0 22px 34px rgba(28,15,76,0.30))" }}
            >
              <Image
                src="/card-kid-boy.jpeg"
                alt="Tarjeta Platita Kids con llama en skate: Pequeños sueños, grandes posibilidades"
                width={1280}
                height={853}
                sizes="(max-width: 640px) 80vw, 430px"
                className="h-auto w-full rounded-[22px]"
              />
            </div>
          </div>
        </div>

        {/* ── Etapas por edad ── */}
        <div className="grid sm:grid-cols-3 gap-4 mt-14 md:mt-20" data-reveal>
          {STAGES.map((s, i) => (
            <div
              key={s.name}
              className="rounded-3xl p-6 bg-white"
              style={{ border: "1px solid #e6e0f5", boxShadow: "0 8px 24px rgba(8,10,30,0.05)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white"
                  style={{ background: s.accent }}
                >
                  {i + 1}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${s.accent}14`, color: s.accent }}>
                  {s.ages}
                </span>
              </div>
              <p className="text-xl font-black mt-4" style={{ color: NAVY }}>{s.name}</p>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: MUTED }}>{s.text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-center mt-4" style={{ color: MUTED }}>
          A los <strong style={{ color: NAVY }}>18 años</strong>, el capital pasa al ecosistema de inversión para adultos de Platita.pe.
        </p>

        {/* ── Planes Kids ── */}
        <div id="kids-planes" className="mt-14 md:mt-20 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: "rgba(28,15,76,0.15)" }} />
            <span className="text-sm font-black tracking-widest uppercase shrink-0" style={{ color: "#5b3fa8" }}>
              Planes Kids
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(28,15,76,0.15)" }} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5" data-reveal>
            {KIDS_PLANS.map((p) => (
              <div
                key={p.name}
                className="rounded-3xl p-5 sm:p-6 bg-white flex flex-col gap-3 text-center transition-transform duration-300 hover:-translate-y-1.5"
                style={{ border: "1px solid #d2dcea", boxShadow: "0 8px 24px rgba(8,10,30,0.06)" }}
              >
                <p className="text-xs sm:text-sm font-black tracking-widest uppercase" style={{ color: p.accent }}>{p.name}</p>
                <div>
                  <p className="text-[0.7rem] font-semibold" style={{ color: MUTED }}>Capital inicial</p>
                  <p className="text-xl sm:text-2xl font-black" style={{ color: NAVY }}>{p.capital}</p>
                </div>
                <div className="h-px w-full" style={{ background: "rgba(28,15,76,0.08)" }} />
                <div>
                  <p className="text-4xl sm:text-5xl font-black leading-none" style={{ color: p.accent }}>{p.rate}*</p>
                  <p className="text-[0.7rem] font-semibold mt-1" style={{ color: MUTED }}>tasa anual propuesta</p>
                </div>
                <p className="text-xs font-bold px-2 py-1.5 rounded-full" style={{ background: `${p.accent}12`, color: p.accent }}>
                  {p.focus}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 max-w-3xl mx-auto text-center leading-relaxed" style={{ color: "rgba(8,11,30,0.55)" }}>
            *Tasas referenciales de una propuesta de producto en desarrollo. No constituyen promesa ni garantía de
            rentabilidad; las condiciones definitivas se publicarán al lanzamiento, tras su revisión legal y regulatoria.
            Al terminar cada ciclo, el capital acumulado puede pasar a un plan superior con nuevo contrato.
          </p>
        </div>

        {/* ── Experiencia del menor + control parental ── */}
        <div className="grid md:grid-cols-2 gap-5 mt-14 md:mt-20">
          <div className="rounded-3xl p-6 md:p-8" style={{ background: "rgba(236,72,153,0.06)", border: "1px solid rgba(236,72,153,0.22)" }}>
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: "#db2777" }}>Para tu hijo o hija</p>
            <p className="text-2xl font-black mt-2 mb-4" style={{ color: NAVY }}>Ve cómo crece su platita</p>
            <ul className="flex flex-col gap-2.5">
              {KID_SEES.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm" style={{ color: "#3a3357" }}>
                  <IconCheck color="#db2777" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl p-6 md:p-8" style={{ background: "rgba(108,220,255,0.08)", border: "1px solid rgba(14,165,233,0.25)" }}>
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: "#0284c7" }}>Para ti</p>
            <p className="text-2xl font-black mt-2 mb-4" style={{ color: NAVY }}>Tú tienes el control</p>
            <ul className="flex flex-col gap-2.5">
              {PARENT_CONTROLS.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm" style={{ color: "#3a3357" }}>
                  <IconCheck color="#0284c7" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Educación financiera ── */}
        <div className="mt-10 rounded-3xl p-6 md:p-8 bg-white" style={{ border: "1px solid #e6e0f5" }}>
          <p className="font-black text-lg mb-4" style={{ color: NAVY }}>
            Lo que aprenderá, a su ritmo
          </p>
          <div className="flex flex-wrap gap-2">
            {LESSONS.map((l) => (
              <span
                key={l}
                className="text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-full"
                style={{ background: "#f5f3fc", border: "1px solid #e0ddf2", color: "#3a3357" }}
              >
                {l}
              </span>
            ))}
          </div>
          <p className="text-xs mt-5" style={{ color: "rgba(8,11,30,0.55)" }}>
            Platita Kids se diseña con protección reforzada de datos de menores, conforme a la normativa peruana aplicable.
          </p>
        </div>
      </div>
    </section>
  );
}
