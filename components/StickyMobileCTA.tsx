"use client";
import { useState, useEffect } from "react";
import { MAX_RATE } from "@/lib/plans";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Aparece luego de scrollear 400px
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        background: "rgba(8,6,26,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        padding: "12px 16px 20px",
        paddingBottom: "max(20px, env(safe-area-inset-bottom))",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Mini badge */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "6px 10px",
            borderRadius: "10px",
            background: "rgba(34,211,238,0.08)",
            border: "1px solid rgba(34,211,238,0.2)",
          }}
        >
          <span style={{ color: "#22d3ee", fontWeight: 900, fontSize: "0.95rem", lineHeight: 1 }}>
            {Math.round(MAX_RATE * 100)}%
          </span>
          <span style={{ color: "rgba(34,211,238,0.65)", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            anual
          </span>
        </div>

        {/* CTA */}
        <a
          href="#registro"
          className="btn-gradient flex-1 text-center py-3.5 rounded-2xl font-bold text-sm"
        >
          <span>Reserva tu lugar</span>
        </a>
      </div>
    </div>
  );
}
