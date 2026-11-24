"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * App Preview — Rediseño integral con proporciones exactas de iPhone 16 Pro (19.5:9)
 * - Smartphone con chasis de titanio espacial, relación de aspecto física 1:2.09 (270px × 565px).
 * - Dynamic Island auténtica con lente frontal y sensor de privacidad.
 * - Pantalla completa con distribución de espacio equilibrada y estética iOS nativa.
 * - Mobile: Montaje de llama-asomada.webp asomándose en el marco superior y señalando hacia abajo.
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

/** screen: 0 dashboard · 1 alerta de abono · 2 garantía · 3 reinversión/retiro */
function PhoneMockup({ screen = 0 }: { screen?: number }) {
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
          <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            className="demo-screen"
            style={{ padding: "0 12px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around", opacity: screen <= 1 ? 1 : 0, transform: screen <= 1 ? "none" : "translateX(-12px)" }}
            aria-hidden={screen > 1}
          >

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
          {screen === 1 && <AlertBanner />}
          <DemoScreen show={screen === 2}><GarantiaScreen /></DemoScreen>
          <DemoScreen show={screen === 3}><RetiroScreen /></DemoScreen>
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
                { label: "Inicio",   icon: NavIconHome,     active: screen <= 1 },
                { label: "Invertir", icon: NavIconInvertir, active: screen === 3 },
                { label: "Cartera",  icon: NavIconCartera,  active: screen === 2 },
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

/* ── Pantallas del feature demo (se superponen al dashboard) ── */

function DemoScreen({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className="demo-screen"
      style={{
        position: "absolute",
        inset: 0,
        padding: "4px 12px 8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        background: "#f8f9fc",
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateX(12px)",
        pointerEvents: show ? "auto" : "none",
      }}
      aria-hidden={!show}
    >
      {children}
    </div>
  );
}

const demoTitle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 900, color: "#1c0f4c", margin: "4px 0 0" };
const demoCard: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "14px",
  border: "1px solid rgba(28,15,76,0.08)",
  boxShadow: "0 4px 12px rgba(28,15,76,0.06)",
  padding: "10px",
};
const demoRow: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid rgba(28,15,76,0.06)" };
const demoLabel: React.CSSProperties = { fontSize: "0.48rem", color: "rgba(15,10,46,0.6)", fontWeight: 600 };
const demoValue: React.CSSProperties = { fontSize: "0.5rem", color: "#1c0f4c", fontWeight: 800 };
const demoBtn: React.CSSProperties = {
  marginTop: "auto",
  textAlign: "center",
  fontSize: "0.56rem",
  fontWeight: 800,
  color: "#ffffff",
  padding: "9px 0",
  borderRadius: "9999px",
  background: "linear-gradient(135deg,#6cdcff,#bc45e9)",
};

/** Notificación iOS de abono mensual sobre el dashboard. */
function AlertBanner() {
  return (
    <div
      className="demo-banner-drop"
      style={{
        position: "absolute",
        top: "2px",
        left: "8px",
        right: "8px",
        zIndex: 30,
        display: "flex",
        gap: "8px",
        alignItems: "flex-start",
        padding: "9px 10px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 10px 28px rgba(28,15,76,0.22)",
        border: "1px solid rgba(28,15,76,0.06)",
      }}
    >
      <div style={{ width: "24px", height: "24px", borderRadius: "7px", flexShrink: 0, background: "linear-gradient(135deg,#6cdcff,#bc45e9)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.62rem", fontWeight: 900 }}>
        P
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "6px" }}>
          <span style={{ fontSize: "0.5rem", fontWeight: 800, color: "#1c0f4c" }}>Platita.pe</span>
          <span style={{ fontSize: "0.44rem", color: "rgba(15,10,46,0.5)" }}>ahora</span>
        </div>
        <p style={{ fontSize: "0.52rem", fontWeight: 800, color: "#1c0f4c", margin: "1px 0 0" }}>💸 Abono recibido: S/ 116.67</p>
        <p style={{ fontSize: "0.46rem", color: "rgba(15,10,46,0.66)", margin: "1px 0 0" }}>
          Tu rendimiento mensual del Plan Inicial ya está en tu cuenta.
        </p>
      </div>
    </div>
  );
}

function GarantiaScreen() {
  return (
    <>
      <p style={demoTitle}>Mi contrato</p>
      <div style={demoCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "8px", background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>📄</div>
            <div>
              <p style={{ fontSize: "0.54rem", fontWeight: 900, color: "#1c0f4c", margin: 0 }}>Contrato de mutuo</p>
              <p style={{ fontSize: "0.44rem", color: "rgba(15,10,46,0.55)", margin: 0 }}>Con validación notarial</p>
            </div>
          </div>
          <span style={{ fontSize: "0.44rem", fontWeight: 800, color: "#047857", background: "rgba(16,185,129,0.12)", padding: "3px 7px", borderRadius: "9999px" }}>Firmado ✓</span>
        </div>
        <div style={demoRow}><span style={demoLabel}>Monto</span><span style={demoValue}>S/ 10,000.00</span></div>
        <div style={demoRow}><span style={demoLabel}>Plazo</span><span style={demoValue}>12 meses</span></div>
        <div style={demoRow}><span style={demoLabel}>Partida SUNARP</span><span style={demoValue}>11094181</span></div>
        <div style={{ ...demoRow, borderBottom: "none" }}><span style={demoLabel}>Garantía</span><span style={demoValue}>Lotes · Condominio Los Andes</span></div>
      </div>
      <div style={{ ...demoCard, display: "flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.25)" }}>
        <span style={{ fontSize: "0.8rem" }}>🛡️</span>
        <p style={{ fontSize: "0.47rem", color: "#065f46", fontWeight: 700, margin: 0 }}>
          Tu inversión está respaldada por activos inmobiliarios inscritos en registros públicos.
        </p>
      </div>
      <div style={demoBtn}>Descargar contrato (PDF)</div>
    </>
  );
}

function RetiroScreen() {
  return (
    <>
      <p style={demoTitle}>Reinvierte o retira</p>
      <div style={{ ...demoCard, background: "linear-gradient(135deg,#1c0f4c,#4a1d8f)", border: "none" }}>
        <p style={{ fontSize: "0.46rem", color: "rgba(255,255,255,0.7)", margin: 0, fontWeight: 700 }}>Ganancias disponibles</p>
        <p style={{ fontSize: "1.05rem", color: "#ffffff", margin: "2px 0 0", fontWeight: 900 }}>S/ 1,400.00</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
        <div style={{ ...demoCard, border: "1.5px solid #bc45e9", padding: "8px" }}>
          <p style={{ fontSize: "0.54rem", fontWeight: 900, color: "#a234cc", margin: 0 }}>Reinvertir</p>
          <p style={{ fontSize: "0.44rem", color: "rgba(15,10,46,0.6)", margin: "2px 0 0" }}>Suma a tu capital y sube de plan</p>
        </div>
        <div style={{ ...demoCard, padding: "8px" }}>
          <p style={{ fontSize: "0.54rem", fontWeight: 900, color: "#1c0f4c", margin: 0 }}>Retirar</p>
          <p style={{ fontSize: "0.44rem", color: "rgba(15,10,46,0.6)", margin: "2px 0 0" }}>Directo a tu cuenta bancaria</p>
        </div>
      </div>
      <div style={demoCard}>
        <p style={{ ...demoLabel, margin: "0 0 6px" }}>Banco de destino</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {["BCP", "BBVA", "Interbank", "Scotiabank"].map((b, i) => (
            <span
              key={b}
              style={{
                fontSize: "0.46rem",
                fontWeight: 800,
                padding: "4px 8px",
                borderRadius: "9999px",
                color: i === 0 ? "#ffffff" : "#1c0f4c",
                background: i === 0 ? "#1c0f4c" : "#f1eff9",
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
      <div style={demoBtn}>Confirmar</div>
    </>
  );
}

const previewFeatures = [
  {
    title: "Dashboard en tiempo real",
    short: "Dashboard",
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
    short: "Alertas",
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
    short: "Garantía",
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
    short: "Retiros",
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
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Desktop: el bloque que cruza la franja central de la pantalla define la pantalla del iPhone.
  useEffect(() => {
    const els = blockRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Móvil: avance automático mientras el demo está en vista (se detiene al tocar una pestaña).
  useEffect(() => {
    const el = mobileRef.current;
    if (!el || !autoplay || window.matchMedia("(min-width: 768px), (prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(() => setActive((a) => (a + 1) % previewFeatures.length), 3500);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = undefined;
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [autoplay]);

  return (
    <section
      id="app"
      className="relative py-16 md:py-24 px-4 overflow-x-clip"
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

        {/* ── FEATURE DEMO ──
            Móvil (< md): llama asomada + iPhone; las pestañas bajo el teléfono cambian la pantalla
            (avanzan solas mientras la sección está en vista, hasta que el usuario toca una).
            Tablet/desktop (>= md): el iPhone queda fijo (sticky) y cada bloque de texto que entra
            en vista cambia la pantalla del teléfono. */}

        {/* MÓVIL */}
        <div ref={mobileRef} className="flex flex-col items-center justify-center md:hidden my-2 relative">
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

          {/* Pestañas del demo */}
          <div className="relative z-30 mb-6 w-full max-w-sm" role="tablist" aria-label="Funciones de la app">
            <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl" style={{ background: "#f1eff9" }}>
              {previewFeatures.map((f, i) => (
                <button
                  key={f.title}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => {
                    setAutoplay(false);
                    setActive(i);
                  }}
                  className="py-2 rounded-xl text-[0.7rem] font-bold transition-all"
                  style={{
                    background: active === i ? "#ffffff" : "transparent",
                    color: active === i ? "#1c0f4c" : "rgba(15,10,46,0.6)",
                    boxShadow: active === i ? "0 2px 8px rgba(28,15,76,0.10)" : "none",
                  }}
                >
                  {f.short}
                </button>
              ))}
            </div>
            <div key={active} className="world-step-in mt-4 text-center px-2" role="tabpanel">
              <h3 className="text-base font-black" style={{ color: "#1c0f4c" }}>{previewFeatures[active].title}</h3>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(8,11,30,0.66)" }}>{previewFeatures[active].desc}</p>
            </div>
          </div>

          {/* Llama asomándose sobre el marco superior, apoyando las manos y señalando la pantalla */}
          <div className="relative z-20 -mb-4 w-[248px] aspect-[523/477]">
            <Image
              src="/llama-asomada.webp"
              alt="Llama Platita señalando la aplicación móvil"
              fill
              priority
              sizes="248px"
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 14px 22px rgba(28,15,76,0.20))",
              }}
            />
          </div>

          <div className="relative z-10">
            <PhoneMockup screen={active} />
          </div>

        </div>

        {/* TABLET Y DESKTOP */}
        <div className="hidden md:grid grid-cols-[1fr_auto] gap-10 lg:gap-14 mt-4 relative">
          {/* Bloques de texto: el que cruza el centro de la pantalla manda */}
          <div className="py-[12vh]">
            {previewFeatures.map((f, i) => (
              <div
                key={f.title}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                data-index={i}
                className="min-h-[62vh] flex items-center"
              >
                <div
                  className="rounded-3xl p-7 lg:p-8 transition-all duration-500 max-w-md"
                  style={{
                    background: active === i ? "#ffffff" : "transparent",
                    border: `1px solid ${active === i ? "#d2dcea" : "transparent"}`,
                    boxShadow: active === i ? "0 18px 50px rgba(28,15,76,0.10)" : "none",
                    opacity: active === i ? 1 : 0.4,
                    transform: active === i ? "none" : "scale(0.97)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${f.accent}14`, border: `1px solid ${f.accent}30` }}
                  >
                    {f.icon}
                  </div>
                  <p className="text-xs font-black tracking-widest uppercase mb-1.5" style={{ color: "#a234cc" }}>
                    {String(i + 1).padStart(2, "0")} · {f.short}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-black mb-2" style={{ color: "#1c0f4c" }}>{f.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(8,11,30,0.66)" }}>{f.desc}</p>
                  <div className="w-10 h-1 rounded-full mt-5" style={{ background: f.accent }} />
                </div>
              </div>
            ))}
          </div>

          {/* Escenario fijo: llama (lg+) presentando + iPhone */}
          <div className="relative">
            <div className="sticky top-[max(88px,calc(50vh-282px))] flex items-end">
              <div
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "620px",
                  height: "520px",
                  background: "radial-gradient(ellipse, rgba(108,220,255,0.24) 0%, rgba(188,69,233,0.22) 45%, transparent 70%)",
                  filter: "blur(50px)",
                }}
              />
              <div className="hidden lg:block relative z-10 shrink-0 -mr-6 w-[230px] aspect-[408/612]">
                <Image
                  src="/llama-presenta.png"
                  alt="Llama Superhéroe Platita presentando la aplicación"
                  fill
                  sizes="230px"
                  style={{
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 32px rgba(188,69,233,0.28)) drop-shadow(0 10px 18px rgba(28,15,76,0.16))",
                  }}
                />
              </div>
              <div className="relative z-10 shrink-0">
                <PhoneMockup screen={active} />
              </div>
            </div>
          </div>
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
