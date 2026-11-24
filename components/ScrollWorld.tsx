"use client";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Scroll world de "¿Cómo funciona?": la sección se fija en pantalla y el
 * scroll mueve el escenario. La llama vuela por un paisaje andino y cada
 * parada es un paso del proceso.
 *
 * El progreso (0 → 1) se escribe en la variable CSS --p del escenario y las
 * capas se desplazan con transform (sin re-render por frame). El paso activo
 * solo cambia 4 veces, así que ese sí va en estado.
 *
 * Con prefers-reduced-motion se muestra `fallback` (la grilla estática).
 * Arte provisional en SVG: se reemplaza por ilustraciones finales sin tocar la lógica.
 */

export interface WorldStep {
  number: string;
  title: string;
  description: string;
}

const NAVY = "#1c0f4c";

export default function ScrollWorld({ steps, fallback }: { steps: WorldStep[]; fallback: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = outer.getBoundingClientRect();
      const total = outer.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      stage.style.setProperty("--p", p.toFixed(4));
      setActive(Math.min(steps.length - 1, Math.round(p * (steps.length - 1))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, steps.length]);

  if (reduced) return <>{fallback}</>;

  const last = steps.length - 1;

  return (
    <div ref={outerRef} data-scroll-world className="relative h-[320vh] md:h-[420vh]">
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        style={{ ["--p" as string]: 0, background: "linear-gradient(180deg, #f1f6ff 0%, #f6f1ff 55%, #fbf9ff 100%)" }}
        aria-label="Recorrido de los 4 pasos para invertir con Platita.pe"
      >
        {/* Sol */}
        <div
          className="absolute rounded-full"
          style={{
            right: "12%", top: "16%", width: "min(26vw, 220px)", aspectRatio: "1",
            background: "radial-gradient(circle, #fff6d6 0%, #ffe9a8 55%, rgba(255,233,168,0) 72%)",
            transform: "translateY(calc(var(--p) * 40px))",
          }}
        />

        {/* Nubes (capa rápida) */}
        <div className="absolute inset-x-0 top-[12%] h-[30%] pointer-events-none" style={{ width: "300vw", transform: "translateX(calc(var(--p) * -120vw))" }}>
          {[
            { l: "8vw", t: "10%", s: 1 },
            { l: "62vw", t: "40%", s: 0.7 },
            { l: "110vw", t: "5%", s: 0.9 },
            { l: "168vw", t: "35%", s: 1.1 },
            { l: "225vw", t: "12%", s: 0.8 },
            { l: "270vw", t: "45%", s: 0.6 },
          ].map((c, i) => (
            <Cloud key={i} style={{ left: c.l, top: c.t, transform: `scale(${c.s})` }} />
          ))}
        </div>

        {/* Montañas lejanas */}
        <svg
          className="absolute bottom-[24%] md:bottom-[16%] left-0 h-[44%] md:h-[48%] pointer-events-none"
          style={{ width: "160vw", transform: "translateX(calc(var(--p) * -50vw))" }}
          viewBox="0 0 1600 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 400 L0 260 L120 150 L210 230 L330 90 L450 210 L560 120 L690 250 L820 70 L960 220 L1080 130 L1210 240 L1340 100 L1470 210 L1600 150 L1600 400 Z" fill="#d6d0f5" />
          <path d="M330 90 L300 125 L318 120 L334 132 L350 118 L366 128 Z M820 70 L788 108 L808 102 L824 116 L842 100 L858 112 Z M1340 100 L1312 132 L1330 127 L1344 138 L1360 124 L1374 134 Z" fill="#ffffff" />
          <path d="M0 400 L0 300 L150 220 L280 290 L420 200 L560 280 L700 210 L850 300 L1000 230 L1150 300 L1300 220 L1450 290 L1600 240 L1600 400 Z" fill="#bfb4ef" />
        </svg>

        {/* Mundo cercano: suelo, camino y estaciones (una por pantalla) */}
        <div
          className="absolute bottom-0 left-0 h-full pointer-events-none"
          style={{ width: `${steps.length * 100}vw`, transform: `translateX(calc(var(--p) * -${last * 100}vw))` }}
        >
          {/* Colinas */}
          <svg className="absolute bottom-[19%] md:bottom-[12%] left-0 w-full h-[14%]" viewBox="0 0 1600 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 100 L0 50 Q100 10 200 45 T400 40 T600 50 T800 35 T1000 50 T1200 40 T1400 50 T1600 40 L1600 100 Z" fill="#a99be8" />
          </svg>
          {/* Suelo */}
          <div className="absolute bottom-0 left-0 w-full h-[20%] md:h-[13%]" style={{ background: "linear-gradient(180deg, #e4def9 0%, #efebfc 100%)" }} />
          {/* Camino punteado */}
          <div
            className="absolute left-0 w-full bottom-[13%] md:bottom-[6%] h-[3px]"
            style={{ backgroundImage: "linear-gradient(90deg, #bc45e9 50%, transparent 50%)", backgroundSize: "28px 3px", opacity: 0.45 }}
          />

          {steps.map((s, i) => (
            <div
              key={s.number}
              className="absolute bottom-[16%] md:bottom-[9%] flex justify-center"
              style={{ left: `${i * 100}vw`, width: "100vw" }}
            >
              <div
                className="relative ml-[22vw] md:ml-[28vw] w-[min(62vw,440px)] aspect-[400/260] transition-all duration-700"
                style={{ opacity: active === i ? 1 : 0.55, transform: active === i ? "translateY(0) scale(1)" : "translateY(12px) scale(0.94)" }}
              >
                <Station index={i} />
              </div>
            </div>
          ))}
        </div>

        {/* Llama volando (fija; el mundo pasa por debajo) */}
        <div
          className="absolute left-[2%] md:left-[42%] top-[40%] md:top-[16%] w-[min(40vw,170px)] md:w-[min(24vw,290px)] aspect-[900/959] hero-anim-bob pointer-events-none"
          style={{ filter: "drop-shadow(0 26px 30px rgba(28,15,76,.22))" }}
        >
          <Image src="/hero-llama-volando.webp" alt="" fill sizes="(max-width: 768px) 170px, 290px" style={{ objectFit: "contain" }} />
        </div>

        {/* Tarjeta del paso activo */}
        <div className="absolute left-4 right-4 md:left-[6%] md:right-auto top-[84px] md:top-[18%] md:w-[min(30vw,380px)]">
          <div
            className="rounded-3xl p-5 md:p-7"
            style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", border: "1px solid #e6e3f5", boxShadow: "0 18px 50px rgba(28,15,76,0.12)" }}
          >
            <div className="flex items-center gap-2 mb-3" aria-hidden="true">
              {steps.map((s, i) => (
                <span
                  key={s.number}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: i === active ? 28 : 10, background: i <= active ? "linear-gradient(90deg,#6cdcff,#bc45e9)" : "rgba(28,15,76,0.12)" }}
                />
              ))}
              <span className="ml-auto text-xs font-black tracking-widest" style={{ color: "#a234cc" }}>
                PASO {steps[active].number}
              </span>
            </div>
            <div key={active} className="world-step-in">
              <h3 className="font-black text-xl md:text-2xl mb-2" style={{ color: NAVY }}>{steps[active].title}</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(15,10,46,0.66)" }}>
                {steps[active].description}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs font-semibold text-center md:text-left transition-opacity duration-500" style={{ color: "rgba(28,15,76,0.5)", opacity: active === last ? 0 : 1 }}>
            Sigue bajando ↓
          </p>
        </div>
      </div>
    </div>
  );
}

function Cloud({ style }: { style: React.CSSProperties }) {
  return (
    <svg className="absolute w-[min(22vw,180px)]" style={style} viewBox="0 0 180 70" aria-hidden="true">
      <path d="M30 60 Q8 60 10 44 Q12 30 30 32 Q34 12 58 14 Q74 0 96 12 Q122 4 132 28 Q160 24 166 44 Q170 60 148 60 Z" fill="#ffffff" opacity="0.95" />
    </svg>
  );
}

/* ── Estaciones (arte provisional) ── */
function Station({ index }: { index: number }) {
  const common = { viewBox: "0 0 400 260", className: "w-full h-full", "aria-hidden": true } as const;

  if (index === 0) {
    // Registro: celular gigante con perfil verificado
    return (
      <svg {...common}>
        <ellipse cx="200" cy="252" rx="120" ry="8" fill="rgba(28,15,76,0.10)" />
        <rect x="140" y="20" width="120" height="232" rx="22" fill={NAVY} />
        <rect x="149" y="32" width="102" height="208" rx="15" fill="#ffffff" />
        <rect x="182" y="38" width="36" height="8" rx="4" fill={NAVY} />
        <circle cx="200" cy="96" r="24" fill="#efe9fd" />
        <circle cx="200" cy="90" r="9" fill="#bc45e9" />
        <path d="M184 112 Q200 98 216 112" fill="#bc45e9" />
        <rect x="166" y="134" width="68" height="9" rx="4.5" fill="#e4def9" />
        <rect x="166" y="152" width="68" height="9" rx="4.5" fill="#e4def9" />
        <rect x="166" y="176" width="68" height="20" rx="10" fill="url(#gBtn0)" />
        <circle cx="238" cy="70" r="16" fill="#10b981" />
        <path d="M231 70 l5 5 l9 -10" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="gBtn0" x1="0" x2="1"><stop offset="0" stopColor="#6cdcff" /><stop offset="1" stopColor="#bc45e9" /></linearGradient>
        </defs>
      </svg>
    );
  }

  if (index === 1) {
    // Inversión: lote cercado con cartel y obra
    return (
      <svg {...common}>
        <ellipse cx="200" cy="252" rx="170" ry="8" fill="rgba(28,15,76,0.10)" />
        <path d="M40 250 L90 200 L360 200 L330 250 Z" fill="#cfe9c9" />
        <path d="M40 250 L90 200 L360 200 L330 250 Z" fill="none" stroke="#8b7fd6" strokeWidth="3" strokeDasharray="8 6" />
        {/* Grúa */}
        <rect x="282" y="60" width="8" height="140" fill="#f59e0b" />
        <rect x="222" y="60" width="110" height="7" fill="#f59e0b" />
        <line x1="236" y1="67" x2="236" y2="112" stroke={NAVY} strokeWidth="2" />
        <rect x="226" y="112" width="20" height="14" fill="#bc45e9" />
        {/* Casa en obra */}
        <path d="M150 200 L150 150 L190 118 L230 150 L230 200 Z" fill="#ffffff" stroke={NAVY} strokeWidth="3" />
        <rect x="178" y="166" width="24" height="34" fill="#efe9fd" />
        {/* Cartel */}
        <rect x="70" y="120" width="6" height="90" fill={NAVY} />
        <rect x="40" y="96" width="96" height="48" rx="10" fill="url(#gBtn1)" />
        <text x="88" y="117" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">Invierte</text>
        <text x="88" y="135" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">S/ 10,000</text>
        <defs>
          <linearGradient id="gBtn1" x1="0" x2="1"><stop offset="0" stopColor="#6cdcff" /><stop offset="1" stopColor="#bc45e9" /></linearGradient>
        </defs>
      </svg>
    );
  }

  if (index === 2) {
    // Firma notarial: notaría con contrato y sello
    return (
      <svg {...common}>
        <ellipse cx="200" cy="252" rx="160" ry="8" fill="rgba(28,15,76,0.10)" />
        <path d="M90 92 L200 40 L310 92 Z" fill={NAVY} />
        <rect x="96" y="92" width="208" height="14" fill="#2c1a6b" />
        {[118, 162, 206, 250].map((x) => (
          <rect key={x} x={x} y="106" width="22" height="128" fill="#ffffff" stroke="#d6d0f5" strokeWidth="2" />
        ))}
        <rect x="86" y="234" width="228" height="16" fill="#2c1a6b" />
        <text x="200" y="85" textAnchor="middle" fontSize="13" fontWeight="900" letterSpacing="2" fill="#ffffff">NOTARÍA</text>
        {/* Contrato con sello */}
        <g transform="translate(278 120) rotate(8)">
          <rect width="78" height="100" rx="8" fill="#ffffff" stroke={NAVY} strokeWidth="3" />
          <rect x="12" y="16" width="54" height="6" rx="3" fill="#d6d0f5" />
          <rect x="12" y="30" width="54" height="6" rx="3" fill="#d6d0f5" />
          <rect x="12" y="44" width="38" height="6" rx="3" fill="#d6d0f5" />
          <circle cx="54" cy="76" r="15" fill="#bc45e9" />
          <path d="M47 76 l5 5 l9 -10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  }

  // Ganancias: casa terminada y monedas
  return (
    <svg {...common}>
      <ellipse cx="200" cy="252" rx="170" ry="8" fill="rgba(28,15,76,0.10)" />
      <path d="M90 250 L90 150 L170 90 L250 150 L250 250 Z" fill="#ffffff" stroke={NAVY} strokeWidth="3" />
      <path d="M78 156 L170 84 L262 156" fill="none" stroke="#bc45e9" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="150" y="190" width="40" height="60" rx="4" fill="#efe9fd" stroke={NAVY} strokeWidth="2" />
      <rect x="108" y="168" width="28" height="26" rx="3" fill="#cfefff" stroke={NAVY} strokeWidth="2" />
      <rect x="204" y="168" width="28" height="26" rx="3" fill="#cfefff" stroke={NAVY} strokeWidth="2" />
      {/* Monedas */}
      {[0, 1, 2, 3].map((k) => (
        <ellipse key={`a${k}`} cx="300" cy={244 - k * 12} rx="26" ry="9" fill={k === 3 ? "#ffd75e" : "#f5b82e"} stroke="#d99a12" strokeWidth="2" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <ellipse key={`b${k}`} cx="350" cy={244 - k * 12} rx="26" ry="9" fill={k === 5 ? "#ffd75e" : "#f5b82e"} stroke="#d99a12" strokeWidth="2" />
      ))}
      <text x="350" y="178" textAnchor="middle" fontSize="15" fontWeight="900" fill="#a2700a">S/</text>
      <path d="M300 150 L300 112 M288 124 L300 112 L312 124" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
