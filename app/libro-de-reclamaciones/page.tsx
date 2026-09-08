import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";
import ReclamoForm from "@/components/ReclamoForm";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Libro de Reclamaciones virtual de Platita.pe. Registra tu reclamo o queja conforme al Código de Protección y Defensa del Consumidor (Ley N.° 29571).",
  alternates: { canonical: "/libro-de-reclamaciones" },
  robots: { index: true, follow: true },
};

export default function LibroDeReclamacionesPage() {
  return (
    <LegalShell
      title="Libro de Reclamaciones"
      updated={false}
      intro={
        <>
          <p>
            Conforme al Código de Protección y Defensa del Consumidor (Ley N.°
            29571) y al Decreto Supremo N.° 011-2011-PCM, {COMPANY.razonSocial}{" "}
            pone a tu disposición este Libro de Reclamaciones virtual.
          </p>
          <p>
            Completa el formulario y recibirás una copia de tu hoja de
            reclamación en el correo que indiques, junto con un número de
            registro. Daremos respuesta en un plazo no mayor de{" "}
            <strong>quince (15) días hábiles</strong>.
          </p>
          <div className="legal-note">
            <strong>Reclamo</strong>: disconformidad relacionada con los productos
            o servicios. <strong>Queja</strong>: malestar o descontento respecto
            de la atención al público, no vinculado a los productos o servicios.
          </div>
        </>
      }
    >
      <ReclamoForm />
    </LegalShell>
  );
}
