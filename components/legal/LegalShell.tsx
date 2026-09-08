import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

/**
 * Marco común de las páginas legales: cabecera mínima con logo + volver,
 * contenedor de lectura y footer del sitio.
 */
export default function LegalShell({
  title,
  intro,
  updated = true,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  updated?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          borderColor: "rgba(28,15,76,0.10)",
        }}
      >
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Ir al inicio">
            <Image
              src="/isotipo.webp"
              alt="Platita.pe"
              width={256}
              height={85}
              style={{ height: "36px", width: "108px", objectFit: "contain" }}
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-bold"
            style={{ color: "#a234cc" }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="px-5 py-12 md:py-16" style={{ background: "#ffffff" }}>
        <article className="legal-prose max-w-3xl mx-auto">
          <h1
            className="text-3xl md:text-4xl font-black mb-3"
            style={{ color: "#1c0f4c", letterSpacing: "-0.02em" }}
          >
            {title}
          </h1>
          {updated && (
            <p className="text-sm mb-8" style={{ color: "rgba(15,10,46,0.55)" }}>
              Última actualización: {LEGAL_LAST_UPDATED}
            </p>
          )}
          {intro && <div className="legal-intro mb-8">{intro}</div>}
          {children}
        </article>
      </main>

      <Footer />

      {/* Estilos de lectura, sólo para páginas legales */}
      <style>{`
        .legal-prose { color: #3a3357; font-size: 15px; line-height: 1.7; }
        .legal-prose h2 {
          color: #1c0f4c; font-weight: 800; font-size: 1.15rem;
          margin: 2.4rem 0 0.75rem; letter-spacing: -0.01em;
        }
        .legal-prose h3 {
          color: #1c0f4c; font-weight: 700; font-size: 1rem;
          margin: 1.6rem 0 0.5rem;
        }
        .legal-prose p { margin: 0 0 0.9rem; }
        .legal-prose ul { margin: 0 0 1rem; padding-left: 1.25rem; list-style: disc; }
        .legal-prose ol { margin: 0 0 1rem; padding-left: 1.35rem; list-style: decimal; }
        .legal-prose li { margin: 0.3rem 0; }
        .legal-prose a { color: #a234cc; font-weight: 600; text-decoration: underline; }
        .legal-prose strong { color: #1c0f4c; font-weight: 700; }
        .legal-prose hr { border: none; border-top: 1px solid rgba(28,15,76,0.10); margin: 2rem 0; }
        .legal-prose blockquote {
          margin: 1.2rem 0; padding: 0.9rem 1.1rem; border-left: 3px solid #6cdcff;
          background: rgba(108,220,255,0.08); border-radius: 8px; font-style: italic;
        }
        .legal-intro { color: #3a3357; font-size: 15px; line-height: 1.7; }
        .legal-note {
          margin: 1.2rem 0; padding: 0.9rem 1.1rem; border-radius: 10px;
          background: rgba(188,69,233,0.06); border: 1px solid rgba(188,69,233,0.18);
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
