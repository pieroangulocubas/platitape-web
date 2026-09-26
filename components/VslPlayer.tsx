"use client";
import Image from "next/image";
import { useState } from "react";

const YOUTUBE_VIDEO_ID = "reGTlUyOei0";

/** Isla cliente: miniatura del VSL que al hacer clic carga el iframe de YouTube. */
export default function VslPlayer() {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`rounded-3xl overflow-hidden relative ${!active ? "vsl-glow" : ""}`}
      style={{
        aspectRatio: "16/9",
        background: "#1c0f4c",
        boxShadow: "0 24px 80px rgba(28,15,76,0.16), 0 4px 20px rgba(28,15,76,0.08)",
      }}
    >
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
          title="Video Platita.pe"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      ) : (
        <button
          type="button"
          aria-label="Reproducir video de Platita.pe"
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent border-0"
          onClick={() => setActive(true)}
        >
          {/* Thumbnail image — sin overlay, máxima nitidez */}
          <Image
            src="/miniatura-vsl.webp"
            alt="Video Platita.pe"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Botón play centrado, con anillos que invitan a hacer clic */}
          <div className="relative z-10" style={{ width: "72px", height: "72px" }}>
            <span className="play-ring" />
            <span className="play-ring play-ring-delay" />
            <span className="play-btn relative z-10">
              <svg viewBox="0 0 24 24" fill="white" width="28" height="28" style={{ marginLeft: "4px" }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
