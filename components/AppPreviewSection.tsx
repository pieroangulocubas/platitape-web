import Image from "next/image";

/**
 * App Preview — Rediseño integral con proporciones exactas de iPhone 16 Pro (19.5:9)
 * - Smartphone con chasis de titanio espacial, relación de aspecto física 1:2.09 (270px × 565px).
 * - Dynamic Island auténtica con lente frontal y sensor de privacidad.
 * - Pantalla completa con distribución de espacio equilibrada y estética iOS nativa.
 * - Mobile: Montaje de llama-presenta-mobile.webp asomándose en el marco superior y señalando hacia abajo.
 * - Desktop: Llama superhéroe de cuerpo entero (llama-presenta.webp) presentando hacia la derecha.
 * - Sin líneas de corte: bordes desvanecidos orgánicamente.
 * - Sin badge redundante del 20% en el interior.
 */

const miniProjects = [
  { name: "Condominio Los Andes",   location: "Cajamarca", price: "S/ 10,000", image: "/p-habilitaciones.webp" },
  { name: "Residencial Miraflores", location: "Lima",      price: "S/ 10,000", image: "/p-inmuebles.webp" },
  { name: "Paseo de las Palmeras",  location: "Chiclayo",  price: "S/ 10,000", image: "/p-construccion.webp" },
];

const NavIconHome = ({ c }: { c: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
  </svg>
);
const NavIconInvertir = ({ c }: { c: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 6" /><polyline points="15 6 21 6 21 12" />
  </svg>
);
const NavIconCartera = ({ c }: { c: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7h18v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const NavIconPerfil = ({ c }: { c: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.2-3.2 4-5 7-5s5.8 1.8 7 5" />
  </svg>
);
const IconStar = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconPinTiny = () => (
  <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="rgba(15,10,46,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

function PhoneMockup() {
  return (
    <div className="relative flex justify-center">
      {/* Sombra de contacto suave bajo el iPhone */}
      <div
        style={{
          position: "absolute",
          bottom: "-24px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "210px",
          height: "30px",
          background: "radial-gradient(ellipse, rgba(28,15,76,0.38), transparent 70%)",
          filter: "blur(14px)",
          pointerEvents: "none",
        }}
      />

      {/* 
        Chasis iPhone 16 Pro:
        Dimensiones exactas: ancho 270px, alto 565px (relación física 1:2.09, pantalla 19.5:9)
      */}
      <div
        className="relative select-none"
        style={{
          width: "270px",
          height: "565px",
          borderRadius: "44px",
          background: "linear-gradient(165deg, #302e3b 0%, #1c1a25 40%, #0d0c14 100%)",
          padding: "7px",
          boxShadow:
            "0 36px 90px -15px rgba(28, 15, 76, 0.40), 0 16px 36px -10px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.35)",
          flexShrink: 0,
        }}
      >
        {/* ── Botones de hardware laterales (Titanio maquinado 3D) ── */}
        {/* Botón de acción */}
        <div
          style={{
            position: "absolute",
            left: "-2.5px",
            top: "82px",
            width: "2.5px",
            height: "20px",
            background: "linear-gradient(to bottom, #454352, #211f2a)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
          }}
        />
        {/* Volumen + */}
        <div
          style={{
            position: "absolute",
            left: "-2.5px",
            top: "116px",
            width: "2.5px",
            height: "42px",
            background: "linear-gradient(to bottom, #454352, #211f2a)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
          }}
        />
        {/* Volumen - */}
        <div
          style={{
            position: "absolute",
            left: "-2.5px",
            top: "168px",
            width: "2.5px",
            height: "42px",
            background: "linear-gradient(to bottom, #454352, #211f2a)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
          }}
        />
        {/* Botón de encendido / bloqueo */}
        <div
          style={{
            position: "absolute",
            right: "-2.5px",
            top: "130px",
            width: "2.5px",
            height: "60px",
            background: "linear-gradient(to bottom, #454352, #211f2a)",
            borderRadius: "0 2px 2px 0",
            boxShadow: "1px 0 2px rgba(0,0,0,0.5)",
          }}
        />

        {/* ── Bandas de antena ── */}
        <div style={{ position: "absolute", left: "-1px", top: "52px", width: "1px", height: "4px", background: "rgba(0,0,0,0.7)" }} />
        <div style={{ position: "absolute", left: "-1px", bottom: "52px", width: "1px", height: "4px", background: "rgba(0,0,0,0.7)" }} />
        <div style={{ position: "absolute", right: "-1px", top: "52px", width: "1px", height: "4px", background: "rgba(0,0,0,0.7)" }} />
        <div style={{ position: "absolute", right: "-1px", bottom: "52px", width: "1px", height: "4px", background: "rgba(0,0,0,0.7)" }} />

        {/* ── Microranura de auricular / Speaker superior ── */}
        <div
          style={{
            position: "absolute",
            top: "4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "38px",
            height: "2.5px",
            background: "#08070d",
            borderRadius: "2px",
            border: "0.5px solid rgba(255,255,255,0.08)",
            zIndex: 30,
          }}
        />

        {/* ── Pantalla iPhone Super Retina XDR (alto 551px, radio 37px) ── */}
        <div
          style={{
            width: "256px",
            height: "551px",
            borderRadius: "37px",
            overflow: "hidden",
            position: "relative",
            background: "#f8f9fc",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.35)",
          }}
        >
          {/* ── Reflejo fotorealista de cristal diagonal ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(130deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 28%, transparent 48%)",
              pointerEvents: "none",
              zIndex: 25,
            }}
          />

          {/* ── Header con Dynamic Island & Status Bar ── */}
          <div style={{ position: "relative", zIndex: 20, paddingTop: "8px" }}>
            {/* Dynamic Island */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "78px",
                  height: "21px",
                  background: "#000000",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                {/* Lente con reflejo óptico */}
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 35% 35%, #2a2745 0%, #0a0914 80%)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "1px",
                      right: "1px",
                      width: "2px",
                      height: "2px",
                      borderRadius: "50%",
                      background: "#6cdcff",
                      opacity: 0.9,
                    }}
                  />
                </div>
                {/* Indicador de privacidad */}
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 5px #10b981",
                  }}
                />
              </div>
            </div>

            {/* iOS Status bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "3px 14px 4px",
                fontSize: "0.55rem",
                color: "#0f0a2e",
                fontWeight: 800,
                letterSpacing: "0.02em",
              }}
            >
              <span>9:41</span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <svg width="11" height="8" viewBox="0 0 14 10" fill="currentColor">
                  <rect x="0" y="7" width="2.2" height="3" rx="0.5" />
                  <rect x="3.6" y="5" width="2.2" height="5" rx="0.5" />
                  <rect x="7.2" y="2.5" width="2.2" height="7.5" rx="0.5" />
                  <rect x="10.8" y="0" width="2.2" height="10" rx="0.5" />
                </svg>
                <span style={{ fontSize: "0.50rem", fontWeight: 700 }}>5G</span>
                <div
                  style={{
                    width: "16px",
                    height: "8px",
                    border: "1.1px solid #0f0a2e",
                    borderRadius: "2px",
                    padding: "1px",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    marginLeft: "1px",
                  }}
                >
                  <div style={{ width: "100%", height: "100%", background: "#0f0a2e", borderRadius: "1px" }} />
                  <div style={{ position: "absolute", right: "-2px", top: "1.5px", width: "1.2px", height: "3px", background: "#0f0a2e", borderRadius: "0 1px 1px 0" }} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Cuerpo del App (Fintech Platita) con proporciones nativas ── */}
          <div style={{ padding: "0 12px", position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>

            {/* Header usuario */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "2px 0 4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    background: "#1c0f4c",
                    padding: "2px",
                    boxShadow: "0 2px 5px rgba(28,15,76,0.18)",
                  }}
                >
                  <Image src="/isotipo.webp" alt="Platita" fill sizes="28px" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.58rem", color: "rgba(15,10,46,0.6)", margin: 0, fontWeight: 600 }}>
                    Hola, Inversionista 👋
                  </p>
                  <p style={{ fontSize: "0.74rem", color: "#1c0f4c", margin: 0, fontWeight: 900 }}>
                    Portafolio Verificado
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  border: "1px solid rgba(28,15,76,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: "0.65rem" }}>🔔</span>
                <span
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "3px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#bc45e9",
                  }}
                />
              </div>
            </div>

            {/* Tarjeta de Portafolio Principal */}
            <div
              style={{
                borderRadius: "16px",
                padding: "12px 12px 10px",
                background: "linear-gradient(140deg, #1c0f4c 0%, #291254 60%, #15093b 100%)",
                color: "#ffffff",
                boxShadow: "0 10px 24px rgba(28,15,76,0.30)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "-12px",
                  top: "-12px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(108,220,255,0.35), transparent 70%)",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                <div>
                  <p style={{ fontSize: "0.50rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.72)", margin: 0, fontWeight: 700 }}>
                    Capital en Inversión
                  </p>
                  <p style={{ fontSize: "1.25rem", fontWeight: 900, color: "#ffffff", margin: "2px 0 0", lineHeight: 1.1 }}>
                    S/ 45,670.80
                  </p>
                </div>
                <div style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.45)", borderRadius: "6px", padding: "2px 6px" }}>
                  <span style={{ fontSize: "0.48rem", color: "#34d399", fontWeight: 800 }}>↗ +S/ 2,450 (+5.4%)</span>
                </div>
              </div>

              {/* Sparkline chart */}
              <div style={{ display: "flex", alignItems: "flex-end", margin: "6px 0 8px" }}>
                <svg viewBox="0 0 140 24" style={{ width: "100%", height: "22px" }} preserveAspectRatio="none">
                  <polyline points="0,20 20,16 40,18 60,11 80,13 100,6 120,8 140,2" fill="none" stroke="#6cdcff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="0,20 20,16 40,18 60,11 80,13 100,6 120,8 140,2 140,24 0,24" fill="url(#balanceGradIphone)" opacity="0.28" />
                  <defs>
                    <linearGradient id="balanceGradIphone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6cdcff" /><stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Botones de acción rápida iOS */}
              <div style={{ display: "flex", gap: "5px", paddingTop: "7px", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 0", textAlign: "center", fontSize: "0.48rem", fontWeight: 800, color: "#ffffff" }}>
                  ⚡ Invertir
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 0", textAlign: "center", fontSize: "0.48rem", fontWeight: 800, color: "#ffffff" }}>
                  📥 Reinvertir
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "5px 0", textAlign: "center", fontSize: "0.48rem", fontWeight: 800, color: "#ffffff" }}>
                  📄 Contratos
                </div>
              </div>
            </div>

            {/* Próximo Abono strip */}
            <div
              style={{
                borderRadius: "11px",
                padding: "8px 10px",
                background: "rgba(188,69,233,0.08)",
                border: "1px solid rgba(188,69,233,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "0.65rem" }}>📅</span>
                <span style={{ fontSize: "0.52rem", color: "#1c0f4c", fontWeight: 700 }}>Próximo abono: 15 de Oct</span>
              </div>
              <span style={{ fontSize: "0.56rem", fontWeight: 900, color: "#a234cc" }}>S/ 680.00</span>
            </div>

            {/* Proyectos respaldados */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <p style={{ fontWeight: 800, fontSize: "0.60rem", color: "#1c0f4c", margin: 0 }}>Proyectos en cartera</p>
                <span style={{ fontSize: "0.46rem", color: "#a234cc", fontWeight: 700 }}>Ver todos (8) →</span>
              </div>

              <div style={{ display: "flex", gap: "5px" }}>
                {miniProjects.map((p) => (
                  <div
                    key={p.name}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      borderRadius: "9px",
                      overflow: "hidden",
                      background: "#ffffff",
                      border: "1px solid rgba(28,15,76,0.08)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div style={{ position: "relative", height: "40px" }}>
                      <Image src={p.image} alt="" fill sizes="80px" style={{ objectFit: "cover" }} />
                      <div style={{ position: "absolute", top: "2px", right: "2px" }}><IconStar /></div>
                    </div>
                    <div style={{ padding: "4px 4px 3px" }}>
                      <p style={{ fontSize: "0.44rem", fontWeight: 800, color: "#0f0a2e", margin: 0, lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {p.name}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "2px", margin: "1px 0" }}>
                        <IconPinTiny />
                        <span style={{ fontSize: "0.40rem", color: "rgba(15,10,46,0.66)", fontWeight: 600 }}>{p.location}</span>
                      </div>
                      <p style={{ fontSize: "0.44rem", fontWeight: 800, color: "#a234cc", margin: 0 }}>{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro-garantía legal inside app */}
            <div
              style={{
                borderRadius: "8px",
                padding: "5px 8px",
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <span style={{ fontSize: "0.55rem" }}>🛡️</span>
              <span style={{ fontSize: "0.44rem", fontWeight: 700, color: "#047857" }}>
                Garantía Inmobiliaria · Partida SUNARP 11094181
              </span>
            </div>

          </div>

          {/* ── Bottom Tab Bar iOS + Home Indicator ── */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              background: "#ffffff",
              borderTop: "1px solid rgba(28,15,76,0.08)",
              paddingTop: "6px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "0 4px 4px" }}>
              {[
                { label: "Inicio",   icon: NavIconHome,     active: true },
                { label: "Invertir", icon: NavIconInvertir, active: false },
                { label: "Cartera",  icon: NavIconCartera,  active: false },
                { label: "Perfil",   icon: NavIconPerfil,   active: false },
              ].map((n) => {
                const NavIcon = n.icon;
                const color = n.active ? "#a234cc" : "rgba(15,10,46,0.66)";
                return (
                  <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                    <NavIcon c={color} />
                    <span style={{ fontSize: "0.42rem", fontWeight: 700, color }}>{n.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Barra física Home Indicator (iOS standard 94px x 3.5px) */}
            <div style={{ display: "flex", justifyContent: "center", padding: "4px 0 7px" }}>
              <div style={{ width: "94px", height: "3.5px", background: "rgba(15,10,46,0.35)", borderRadius: "9999px" }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const previewFeatures = [
  {
    title: "Dashboard en tiempo real",
    desc: "Monitorea tus rendimientos, abonos y proyecciones actualizadas al segundo.",
    accent: "#6cdcff",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0097b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    title: "Alertas inteligentes de abono",
    desc: "Notificaciones inmediatas cuando tus ganancias mensuales caen a tu cuenta.",
    accent: "#bc45e9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bc45e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
  },
  {
    title: "Garantía Notarial y SUNARP",
    desc: "Contrato de mutuo legalizado con partida registral 11094181 y respaldo en lotes.",
    accent: "#10b981",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    title: "Reinversión y retiros ágiles",
    desc: "Abonos directos a tus cuentas en BCP, BBVA, Interbank o Scotiabank sin fricción.",
    accent: "#f59e0b",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
];

export default function AppPreviewSection() {
  return (
    <section
      id="app"
      className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(108,220,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 85% 65%, rgba(188,69,233,0.12) 0%, transparent 60%), radial-gradient(ellipse at 15% 80%, rgba(108,220,255,0.10) 0%, transparent 55%), #ffffff",
      }}
    >
      {/* Matriz de puntos decorativa */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(28,15,76,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Encabezado de la Sección */}
        <div className="text-center mb-10 sm:mb-14">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: "#1c0f4c" }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#6cdcff",
                boxShadow: "0 0 8px #6cdcff",
              }}
            />
            Experiencia Digital Platita.pe
          </span>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full inline-block ml-2"
            style={{ background: "rgba(188,69,233,0.10)", border: "1px solid rgba(188,69,233,0.28)", color: "#a234cc" }}
          >
            Próximamente · MVP
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 mb-3" style={{ color: "#1c0f4c" }}>
            Tu platita con superpoderes,{" "}
            <span className="gradient-text">todo en tu celular</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "rgba(8,11,30,0.66)" }}>
            Una plataforma diseñada para que invertir en bienes raíces sea tan intuitivo, seguro y rápido como revisar tus aplicaciones favoritas.
          </p>
        </div>

        {/* ── STAGE CENTRAL: Llama Superhéroe + iPhone 16 Pro Mockup (19.5:9) ── */}

        {/* MÓVIL (< md): Montaje de Llama peeking sobre el marco superior del iPhone señalando hacia la pantalla */}
        <div className="flex flex-col items-center justify-center md:hidden my-2 relative">
          {/* Aura sutil ambiental */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "280px",
              height: "280px",
              top: "16%",
              background: "radial-gradient(circle, rgba(108,220,255,0.26) 0%, rgba(188,69,233,0.20) 50%, transparent 70%)",
              filter: "blur(38px)",
            }}
          />

          {/* Llama asomándose sobre el marco superior: sin líneas de corte, apoyando la pata y señalando hacia abajo */}
          <div className="relative z-20 -mb-9 sm:-mb-10 w-[248px] sm:w-[268px] aspect-[484/442]">
            <Image
              src="/llama-presenta-mobile.webp"
              alt="Llama Platita señalando la aplicación móvil"
              fill
              priority
              sizes="(max-width: 640px) 248px, 268px"
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 14px 22px rgba(28,15,76,0.20))",
              }}
            />
          </div>

          {/* iPhone 16 Pro realista debajo de la llama */}
          <div className="relative z-10">
            <PhoneMockup />
          </div>
        </div>

        {/* TABLET Y DESKTOP (>= md): Llama de cuerpo entero a la izquierda presentando hacia el iPhone a la derecha */}
        <div className="hidden md:flex flex-row items-center justify-center gap-8 lg:gap-14 my-6 relative">
          {/* Aura central grande */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "820px",
              height: "500px",
              background: "radial-gradient(ellipse, rgba(108,220,255,0.24) 0%, rgba(188,69,233,0.22) 45%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          {/* Llama Superhéroe de pie a cuerpo completo presentando con ambas manos hacia la derecha (más grande y protagónica) */}
          <div className="relative flex flex-col items-center z-10 shrink-0">
            <div className="relative w-[320px] md:w-[350px] lg:w-[410px] aspect-[408/612]">
              <Image
                src="/llama-presenta.png"
                alt="Llama Superhéroe Platita presentando la aplicación"
                fill
                priority
                sizes="(max-width: 1024px) 350px, 410px"
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 32px rgba(188,69,233,0.28)) drop-shadow(0 10px 18px rgba(28,15,76,0.16))",
                }}
              />
            </div>
          </div>

          {/* iPhone 16 Pro Mockup a la derecha */}
          <div className="relative z-10 shrink-0">
            <PhoneMockup />
          </div>
        </div>

        {/* ── 4 Feature Cards con diseño contemporáneo ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          {previewFeatures.map((f) => (
            <div
              key={f.title}
              className="flex flex-col justify-between rounded-2xl p-5 bg-white border border-[#d2dcea] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5"
                  style={{ background: `${f.accent}14`, border: `1px solid ${f.accent}30` }}
                >
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold mb-1.5" style={{ color: "#1c0f4c" }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(8,11,30,0.66)" }}>
                  {f.desc}
                </p>
              </div>
              <div className="w-8 h-1 rounded-full mt-4" style={{ background: f.accent }} />
            </div>
          ))}
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-4 mt-8 max-w-xl mx-auto">
          {[
            { value: "2 min", label: "Para registrarte" },
            { value: "100%", label: "Online sin colas" },
            { value: "S/10K", label: "Inversión mínima" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center rounded-xl py-4 px-3"
              style={{ background: "#ffffff", border: "1px solid #d2dcea", boxShadow: "0 1px 3px rgba(8,10,30,0.04)" }}
            >
              <p className="text-lg sm:text-xl font-black gradient-text">{s.value}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: "rgba(8,11,30,0.66)" }}>{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
