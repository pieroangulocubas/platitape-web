import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/navLinks";
import { COMPANY } from "@/lib/legal";
import CookiePrefsButton from "./CookiePrefsButton";

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-10 px-4 border-t overflow-hidden"
      style={{ borderColor: "rgba(28,15,76,0.10)", background: "#ffffff" }}
    >
      {/* Llama decorativa fondo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/llama-bg.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: "110%",
          width: "auto",
          filter: "brightness(0) saturate(100%) invert(7%) sepia(72%) saturate(1700%) hue-rotate(245deg)",
          opacity: 0.05,
          transform: "translateX(20%)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Isotipo */}
          <a href="#" className="flex items-center">
            <Image
              src="/isotipo.webp"
              alt="Platita.pe"
              width={256}
              height={85}
              style={{ height: "40px", width: "120px", objectFit: "contain" }}
            />
          </a>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: "rgba(15,10,46,0.66)" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="footer-link"
                style={{ color: "inherit" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Legal */}
          <p className="text-xs text-center md:text-right" style={{ color: "rgba(15,10,46,0.66)" }}>
            © {new Date().getFullYear()} Platita.pe
            <br />Todos los derechos reservados
          </p>
        </div>

        {/* Enlaces legales */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(28,15,76,0.10)" }}
        >
          <p className="text-xs text-center sm:text-left" style={{ color: "rgba(15,10,46,0.5)" }}>
            {COMPANY.razonSocial} · RUC {COMPANY.ruc}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
            <Link href="/terminos" className="footer-link" style={{ color: "rgba(15,10,46,0.66)" }}>
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="footer-link" style={{ color: "rgba(15,10,46,0.66)" }}>
              Política de Privacidad
            </Link>
            <CookiePrefsButton />
            <Link
              href="/libro-de-reclamaciones"
              className="footer-link inline-flex items-center gap-1.5 font-bold"
              style={{ color: "#1c0f4c" }}
            >
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  border: "1.5px solid #1c0f4c",
                  fontSize: 11,
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                LR
              </span>
              Libro de Reclamaciones
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
