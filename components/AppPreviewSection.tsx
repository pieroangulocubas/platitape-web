"use client";
import Image from "next/image";
import { MAX_RATE } from "@/lib/plans";
/** App Preview — phone mockup centrado, dominante, con toasts flotantes descriptivos */

const miniProjects = [
  { name: "Condominio Los Andes",    location: "Cajamarca", price: "S/. 10,000", image: "/p-habilitaciones.PNG" },
  { name: "Residencial Miraflores",  location: "Lima",      price: "S/. 10,000", image: "/p-inmuebles.PNG" },
  { name: "Paseo de las Palmeras",   location: "Chiclayo",  price: "S/. 10,000", image: "/p-construccion.PNG" },
];

const NavIconHome = ({ c }: { c: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
  </svg>
);
const NavIconInvertir = ({ c }: { c: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 6" /><polyline points="15 6 21 6 21 12" />
  </svg>
);
const NavIconCartera = ({ c }: { c: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7h18v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const NavIconPerfil = ({ c }: { c: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.2-3.2 4-5 7-5s5.8 1.8 7 5" />
  </svg>
);
const IconStar = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
);
const IconPinTiny = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(15,10,46,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

function PhoneMockup() {
  return (
    <div
      style={{
        width: "300px",
        borderRadius: "38px",
        background: "#0a0818",
        border: "1.5px solid rgba(255,255,255,0.12)",
        padding: "6px",
        boxShadow:
          "0 48px 96px rgba(28,15,76,0.35), 0 0 0 1px rgba(255,255,255,0.03), inset 0 0 0 1px rgba(255,255,255,0.05)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Botones laterales */}
      <div style={{ position: "absolute", left: "-1.5px", top: "108px", width: "1.5px", height: "28px", background: "rgba(255,255,255,0.14)", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: "-1.5px", top: "148px", width: "1.5px", height: "50px", background: "rgba(255,255,255,0.14)", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", right: "-1.5px", top: "130px", width: "1.5px", height: "62px", background: "rgba(255,255,255,0.14)", borderRadius: "0 2px 2px 0" }} />

      <div style={{ borderRadius: "33px", overflow: "hidden", position: "relative" }}>
        {/* Status bar / notch */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0", position: "relative", zIndex: 3 }}>
          <div style={{ width: "84px", height: "22px", background: "#000", borderRadius: "11px" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 20px", fontSize: "0.58rem", color: "rgba(255,255,255,0.35)", position: "relative", zIndex: 3 }}>
          <span>9:41</span><span>●●●  100%</span>
        </div>

        {/* Screen content — fondo claro, como la app real */}
        <div style={{ background: "#f7f8fc", padding: "12px 14px 14px", position: "relative", overflow: "hidden" }}>

          {/* Llama superhéroe — asoma en la esquina superior derecha, por encima del texto, sin fondo */}
          <div style={{ position: "absolute", top: "-4px", right: "-6px", width: "46%", aspectRatio: "615 / 943", zIndex: 5, pointerEvents: "none" }}>
            <Image
              src="/llama-cutout.png"
              alt=""
              fill
              sizes="170px"
              style={{ objectFit: "contain", objectPosition: "center top" }}
            />
          </div>

          {/* Header: avatar + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", position: "relative", zIndex: 2 }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", overflow: "hidden", position: "relative", flexShrink: 0, background: "#1c0f4c" }}>
              <Image src="/isotipo.png" alt="" fill sizes="26px" style={{ objectFit: "cover", objectPosition: "left center" }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: "0.8rem", color: "#1c0f4c" }}>
              platita<span style={{ color: "#bc45e9" }}>.pe</span>
            </span>
          </div>

          {/* Bienvenida */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "62%" }}>
            <p style={{ fontWeight: 900, fontSize: "1.05rem", lineHeight: 1.15, color: "#0f0a2e", margin: "0 0 2px" }}>
              Bienvenido a<br />platita.pe
            </p>
            <p style={{ fontSize: "0.6rem", color: "rgba(15,10,46,0.42)", margin: "0 0 10px", fontWeight: 600 }}>
              Inversiones que Dan Gusto
            </p>
          </div>

          {/* Promo card */}
          <div style={{ borderRadius: "14px", padding: "12px 14px", marginBottom: "12px", maxWidth: "64%", background: "linear-gradient(135deg, #bc45e9 0%, #8b2fc9 100%)", position: "relative", zIndex: 2 }}>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 1px" }}>Gana</p>
            <p style={{ color: "white", fontWeight: 900, fontSize: "1.4rem", margin: "0 0 4px", lineHeight: 1 }}>{Math.round(MAX_RATE * 100)}% Anual</p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.58rem", lineHeight: 1.3, margin: 0, fontWeight: 600 }}>
              En todos nuestros proyectos inmobiliarios en Perú
          </p>
        </div>

        {/* Explora proyectos */}
        <p style={{ fontWeight: 800, fontSize: "0.68rem", color: "#0f0a2e", margin: "0 0 7px" }}>Explora proyectos disponibles</p>
        <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
          {miniProjects.map((p) => (
            <div key={p.name} style={{ flex: 1, minWidth: 0, borderRadius: "10px", overflow: "hidden", background: "#ffffff", border: "1px solid rgba(28,15,76,0.08)" }}>
              <div style={{ position: "relative", height: "42px" }}>
                <Image src={p.image} alt="" fill sizes="90px" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "3px", right: "3px" }}><IconStar /></div>
              </div>
              <div style={{ padding: "4px 5px" }}>
                <p style={{ fontSize: "0.5rem", fontWeight: 800, color: "#0f0a2e", margin: 0, lineHeight: 1.2 }}>{p.name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "2px", margin: "2px 0" }}>
                  <IconPinTiny /><span style={{ fontSize: "0.44rem", color: "rgba(15,10,46,0.42)", fontWeight: 600 }}>{p.location}</span>
                </div>
                <p style={{ fontSize: "0.48rem", fontWeight: 800, color: "#bc45e9", margin: 0 }}>{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Saldo + chart */}
        <div style={{ borderRadius: "12px", padding: "10px 12px", background: "#ffffff", border: "1px solid rgba(28,15,76,0.08)" }}>
          <p style={{ fontSize: "0.55rem", color: "rgba(15,10,46,0.45)", fontWeight: 600, margin: "0 0 2px" }}>Saldo en soles:</p>
          <p style={{ fontSize: "1rem", fontWeight: 900, color: "#0f0a2e", margin: "0 0 6px" }}>S/. 45,670.80</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
            <span style={{ fontSize: "0.42rem", color: "rgba(15,10,46,0.32)", fontWeight: 600 }}>S/2,000</span>
            <svg viewBox="0 0 140 30" style={{ flex: 1, height: "26px" }} preserveAspectRatio="none">
              <polyline points="0,27 20,22 40,24 60,16 80,18 100,9 120,11 140,3" fill="none" stroke="#bc45e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="0,27 20,22 40,24 60,16 80,18 100,9 120,11 140,3 140,30 0,30" fill="url(#balanceGrad)" opacity="0.14" />
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bc45e9" /><stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontSize: "0.42rem", color: "rgba(15,10,46,0.32)", fontWeight: 600 }}>S/15,000</span>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "9px 8px 12px", background: "#ffffff", borderTop: "1px solid rgba(28,15,76,0.07)" }}>
        {[
          { label: "Inicio",   icon: NavIconHome,     active: true },
          { label: "Invertir", icon: NavIconInvertir, active: false },
          { label: "Cartera",  icon: NavIconCartera,  active: false },
          { label: "Perfil",   icon: NavIconPerfil,   active: false },
        ].map((n) => {
          const NavIcon = n.icon;
          const color = n.active ? "#bc45e9" : "rgba(15,10,46,0.35)";
          return (
            <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
              <NavIcon c={color} />
              <span style={{ fontSize: "0.42rem", fontWeight: 700, color }}>{n.label}</span>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

/* Floating toast card */
interface ToastProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: string;
  floatClass: string;
  style?: React.CSSProperties;
}

function Toast({ icon, title, desc, accent, floatClass, style }: ToastProps) {
  return (
    <div
      className={`${floatClass} absolute hidden md:flex items-start gap-3.5 pointer-events-none`}
      style={{
        background: "#ffffff",
        border: "1px solid #d2dcea",
        boxShadow: "0 8px 28px rgba(8,10,30,0.11)",
        borderRadius: "16px",
        padding: "16px 18px",
        maxWidth: "260px",
        zIndex: 10,
        ...style,
      }}
    >
      {/* accent bar */}
      <div style={{ width: "4px", alignSelf: "stretch", borderRadius: "99px", background: accent, flexShrink: 0 }} />
      <div style={{ minWidth: 0 }}>
        <div className="flex items-center gap-2.5 mb-1.5">
          <div
            style={{
              width: "40px", height: "40px", borderRadius: "11px",
              background: `${accent}14`, border: `1px solid ${accent}30`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <p style={{ color: "#1c0f4c", fontWeight: 800, fontSize: "0.88rem", lineHeight: 1.25 }}>{title}</p>
        </div>
        <p style={{ color: "rgba(8,11,30,0.5)", fontSize: "0.75rem", lineHeight: 1.45, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

export default function AppPreviewSection() {
  return (
    <section
      className="py-12 md:py-20 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #f5f3fc 30%, #eefbff 65%, #ffffff 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#1c0f4c" }}
          >
            La plataforma
          </span>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full inline-block ml-2"
            style={{ background: "rgba(188,69,233,0.10)", border: "1px solid rgba(188,69,233,0.28)", color: "#bc45e9" }}
          >
            Próximamente
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-3" style={{ color: "#1c0f4c" }}>
            Todo en la palma{" "}
            <span className="gradient-text">de tu mano</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(8,11,30,0.50)" }}>
            Una plataforma diseñada para que invertir en bienes raíces sea tan fácil como operar en línea
          </p>
        </div>

        {/* ── Centered phone + floating toasts ── */}
        <div className="relative flex justify-center" style={{ minHeight: "580px", alignItems: "center" }}>

          {/* Glow detrás del teléfono */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              height: "300px",
              background: "radial-gradient(ellipse, rgba(188,69,233,0.18) 0%, rgba(108,180,255,0.12) 50%, transparent 75%)",
              filter: "blur(32px)",
            }}
          />

          {/* Toast 1 — Dashboard (top-left) */}
          <Toast
            floatClass="float-a"
            style={{ top: "-4%", left: "-4%" }}
            accent="#6cdcff"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0097b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            }
            title="Dashboard en tiempo real"
            desc="Rendimiento, ganancias y proyecciones actualizadas al instante"
          />

          {/* Toast 2 — Alertas (top-right) */}
          <Toast
            floatClass="float-b"
            style={{ top: "2%", right: "-4%" }}
            accent="#bc45e9"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bc45e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            }
            title="Alertas inteligentes"
            desc="Notificaciones de hitos, nuevas oportunidades y cobros de retorno"
          />

          {/* Toast 3 — Documentos (bottom-left) */}
          <Toast
            floatClass="float-c"
            style={{ bottom: "16%", left: "-2%" }}
            accent="#6cdcff"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0097b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            }
            title="Documentación digital"
            desc="Contratos, estados financieros y reportes de cada proyecto"
          />

          {/* Toast 4 — Seguridad (bottom-right) */}
          <Toast
            floatClass="float-a"
            style={{ bottom: "6%", right: "-2%", animationDelay: "1.4s" }}
            accent="#bc45e9"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bc45e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            }
            title="Seguridad bancaria"
            desc="Cifrado de extremo a extremo, 2FA y autenticación biométrica"
          />

          {/* Toast 5 — Contratos (mid-left) — solo en pantallas grandes */}
          <Toast
            floatClass="float-b"
            style={{ top: "40%", left: "-8%", animationDelay: "0.7s" }}
            accent="#1c0f4c"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c0f4c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
              </svg>
            }
            title="Contratos notariales"
            desc="Cada inversión respaldada con contrato legal verificado"
          />

          {/* Phone mockup — centro y dominante */}
          <div className="relative z-10">
            {/* Shadow bajo el teléfono */}
            <div
              style={{
                position: "absolute",
                bottom: "-32px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "200px",
                height: "40px",
                background: "radial-gradient(ellipse, rgba(28,15,76,0.28), transparent 70%)",
                filter: "blur(16px)",
                pointerEvents: "none",
              }}
            />
            <PhoneMockup />
          </div>
        </div>

        {/* Stats row — debajo del teléfono */}
        <div className="grid grid-cols-3 gap-4 mt-16 max-w-xl mx-auto">
          {[
            { value: "2 min", label: "Para registrarte" },
            { value: "100%", label: "Online" },
            { value: "S/10K", label: "Inversión mínima" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center rounded-xl py-4 px-3"
              style={{ background: "#ffffff", border: "1px solid #d2dcea", boxShadow: "0 1px 3px rgba(8,10,30,0.04)" }}
            >
              <p className="text-xl font-black gradient-text">{s.value}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: "rgba(8,11,30,0.45)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
