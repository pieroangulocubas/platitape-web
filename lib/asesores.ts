import { sheetsEnabled, resendEnabled } from "./config";
import { mirrorAsesor } from "./google-sheets";
import { sendTeamNotification } from "./email";
import type { AsesorInput, LeadMeta } from "./validation";

export interface AsesorResult {
  ok: boolean;
  error?: string;
}

const EXPERIENCIA_LABEL: Record<string, string> = {
  ninguna: "Sin experiencia",
  "menos-1": "Menos de 1 año",
  "1-3": "De 1 a 3 años",
  "3-mas": "Más de 3 años",
};

/**
 * Registra una postulación al Programa de Asesores. Toda postulación entra
 * como "Pendiente de aprobación": nadie opera como asesor sin aprobación
 * del equipo. Destinos: pestaña "Asesores" de Sheets + aviso al equipo.
 */
export async function processAsesor(d: AsesorInput, m: LeadMeta): Promise<AsesorResult> {
  // Opción de la landing anterior -> etiqueta; texto libre (landing v2) -> tal cual.
  const experiencia = EXPERIENCIA_LABEL[d.experiencia] ?? d.experiencia;

  let persisted = false;
  if (sheetsEnabled) {
    persisted = await mirrorAsesor([
      new Date().toISOString(),
      d.nombre,
      d.dni,
      d.telefono,
      d.correo,
      d.ciudad,
      experiencia,
      "Pendiente de aprobación",
      m.utmSource,
      m.utmMedium,
      m.utmCampaign,
      m.referrer,
      m.userAgent,
      d.cci, // al final para no desplazar las columnas existentes
    ]);
  }

  if (resendEnabled) {
    await sendTeamNotification({
      tipo: "Postulación al Programa de Asesores",
      nombre: d.nombre,
      dni: d.dni,
      celular: d.telefono,
      correo: d.correo,
      ciudad: d.ciudad,
      experiencia,
      cci: d.cci,
      "utm source": m.utmSource,
      "utm campaign": m.utmCampaign,
    });
    // Sin Sheets, el aviso por correo es el único registro de la postulación.
    if (!sheetsEnabled) persisted = true;
  }

  if (!persisted) {
    return { ok: false, error: "No se pudo registrar la postulación." };
  }
  return { ok: true };
}
