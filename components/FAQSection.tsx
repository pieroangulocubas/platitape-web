"use client";
import { WA_CONTACT_URL } from "@/lib/config";
import { useState } from "react";

const faqs = [
  {
    q: "¿Platita.pe está regulado por la SBS o la SMV?",
    a: "Platita.pe opera bajo el marco legal peruano vigente para plataformas de crowdfunding inmobiliario. Estamos en proceso de registro ante la SMV (Superintendencia del Mercado de Valores) y trabajamos con estructuras legales respaldadas por SUNARP. Todos los contratos son notariales y los activos están inscritos en Registros Públicos.",
    cat: "Legal",
  },
  {
    q: "¿Qué pasa si un proyecto no se completa o falla?",
    a: "Cada proyecto cuenta con garantías reales sobre el activo inmobiliario. En el escenario poco probable de que un proyecto no se ejecute, activamos el protocolo de recuperación: el activo puede liquidarse para reembolsar a los inversores. Adicionalmente, cada proyecto pasa por un riguroso due diligence antes de publicarse en la plataforma.",
    cat: "Riesgos",
  },
  {
    q: "¿El 20% anual está garantizado?",
    a: "20% es la rentabilidad máxima, correspondiente al plan de mayor categoría (desde S/500,000). La tasa real va del 14% al 20% anual según el monto invertido y el plazo elegido — mira los Planes de inversión para ver el detalle por categoría. Como toda inversión, está sujeta a riesgos del mercado inmobiliario. Nunca prometemos rendimientos garantizados, pero sí transparencia total en cada paso.",
    cat: "Rentabilidad",
  },
  {
    q: "¿Cómo y cuándo recupero mi dinero?",
    a: "Al vencimiento del plazo de inversión (ej. 12 meses), recibes tu capital más los intereses generados directamente en tu cuenta bancaria peruana. No hay penalidades si decides no reinvertir. El proceso de transferencia tarda máximo 5 días hábiles.",
    cat: "Liquidez",
  },
  {
    q: "¿Puedo invertir en más de un proyecto a la vez?",
    a: "Sí, y de hecho lo recomendamos. Diversificar entre varios proyectos de diferentes ciudades, tipos y plazos reduce el riesgo y puede optimizar tu retorno total. No hay límite de proyectos simultáneos.",
    cat: "Inversión",
  },
  {
    q: "¿Cuál es el monto mínimo y máximo para invertir?",
    a: "El monto mínimo es S/ 10,000 por proyecto. No existe un límite máximo definido; sin embargo, los proyectos tienen un cupo total de financiamiento y funcionan por orden de llegada. Los primeros en reservar tienen prioridad.",
    cat: "Inversión",
  },
  {
    q: "¿Hay comisiones o costos ocultos?",
    a: "No hay comisiones de entrada ni costos ocultos. Platita.pe se financia mediante una comisión de gestión sobre la rentabilidad generada, no sobre tu capital. Esto alinea nuestros intereses con los tuyos: ganamos cuando tú ganas.",
    cat: "Costos",
  },
  {
    q: "¿Cómo se seleccionan los proyectos inmobiliarios?",
    a: "Cada proyecto pasa por un proceso de due diligence de 4 semanas que incluye evaluación legal (títulos de propiedad, permisos), análisis financiero (flujo de caja, valuación), revisión técnica (estado del inmueble, ubicación) y estudio de mercado. Solo aprobamos proyectos que cumplen todos los criterios.",
    cat: "Proyectos",
  },
  {
    q: "¿Cuándo estará disponible la plataforma?",
    a: "Estamos en fase final de desarrollo y trámites regulatorios. Los primeros en registrarse tendrán acceso anticipado antes del lanzamiento oficial, y además recibirán condiciones preferenciales en los primeros proyectos disponibles. ¡No te quedes fuera!",
    cat: "Lanzamiento",
  },
  {
    q: "¿Necesito ser experto en inversiones para usar Platita.pe?",
    a: "Para nada. Platita.pe está diseñado para personas que quieren hacer crecer su dinero sin complicaciones. Te mostramos toda la información de cada proyecto de forma clara, con el simulador puedes ver exactamente cuánto ganarías, y nuestro equipo está disponible para resolver cualquier duda.",
    cat: "General",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-4" style={{ background: "#eef2f9" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full"
            style={{ background: "rgba(28,15,76,0.07)", border: "1px solid rgba(28,15,76,0.14)", color: "#1c0f4c" }}
          >
            Preguntas frecuentes
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-5 mb-4" style={{ color: "#1c0f4c" }}>
            Resolvemos tus{" "}
            <span className="gradient-text">dudas</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(15,10,46,0.5)" }}>
            Todo lo que necesitas saber antes de dar el primer paso
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen ? "#ffffff" : "#ffffff",
                  border: isOpen
                    ? "1px solid rgba(28,15,76,0.2)"
                    : "1px solid #d2dcea",
                  boxShadow: isOpen ? "0 4px 20px rgba(28,15,76,0.08)" : "none",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left flex items-center justify-between gap-4 p-5"
                  style={{ cursor: "pointer", background: "transparent", border: "none" }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Category chip */}
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0 hidden sm:inline"
                      style={{
                        background: "rgba(28,15,76,0.06)",
                        color: "#1c0f4c",
                        border: "1px solid rgba(28,15,76,0.12)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {faq.cat}
                    </span>
                    <span
                      className="font-semibold text-sm leading-snug"
                      style={{ color: isOpen ? "#1c0f4c" : "rgba(15,10,46,0.8)" }}
                    >
                      {faq.q}
                    </span>
                  </div>
                  {/* Chevron */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isOpen ? "#1c0f4c" : "rgba(15,10,46,0.35)"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      flexShrink: 0,
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: isOpen ? "300px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <p
                    className="text-sm leading-relaxed px-5 pb-5"
                    style={{ color: "rgba(15,10,46,0.6)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm mb-4" style={{ color: "rgba(15,10,46,0.45)" }}>
            ¿Tienes más dudas? Escríbenos directamente.
          </p>
          <a
            href={WA_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm"
          >
            <span>Hablar con el equipo</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
