import { after } from "next/server";
import {
  supabaseEnabled,
  sheetsEnabled,
  resendEnabled,
  phoneVerificationEnabled,
  emailVerificationEnabled,
} from "./config";
import { insertLead, markSheetsSynced, type LeadRow } from "./supabase";
import { mirrorRegistro } from "./google-sheets";
import { sendLeadConfirmation, sendTeamNotification } from "./email";
import type { RegistroInput, LeadMeta } from "./validation";

export interface ProcessResult {
  ok: boolean;
  duplicate: boolean;
  /** true si el lead quedó guardado en algún lado (Supabase o Sheets). */
  persisted: boolean;
  /** Código corto para el CTA de WhatsApp de la pantalla de éxito (Nivel 1). */
  verifyCode?: string;
  error?: string;
}

function metaCells(m: LeadMeta): string[] {
  return [m.utmSource, m.utmMedium, m.utmCampaign, m.referrer, m.userAgent];
}

/* ─────────────────────────── REGISTRO ─────────────────────────── */

export async function processRegistro(
  d: RegistroInput,
  m: LeadMeta
): Promise<ProcessResult> {
  const ts = new Date().toISOString();
  const sheetRow = [
    ts,
    d.nombre,
    d.correo,
    d.telefono, // internacional, con código de país
    d.departamento,
    d.provincia,
    d.distrito,
    d.fechaNacimiento,
    d.montoInteres,
    ...metaCells(m),
    d.pais, // columna al final para no desplazar las existentes
  ];

  const dbRow: LeadRow = {
    tipo: "registro",
    nombre: d.nombre,
    correo: d.correo,
    telefono: d.telefono,
    departamento: d.departamento,
    provincia: d.provincia,
    distrito: d.distrito,
    pais: d.pais,
    fecha_nacimiento: d.fechaNacimiento,
    monto_interes: d.montoInteres,
    mensaje: null,
    utm_source: m.utmSource || null,
    utm_medium: m.utmMedium || null,
    utm_campaign: m.utmCampaign || null,
    referrer: m.referrer || null,
    user_agent: m.userAgent || null,
  };

  let persisted = false;
  let duplicate = false;
  let leadId: string | undefined;
  let emailVerifyToken: string | undefined;
  let verifyCode: string | undefined;

  // 1) Fuente de verdad: Supabase
  if (supabaseEnabled) {
    const r = await insertLead(dbRow);
    if (r.ok) {
      persisted = true;
      duplicate = r.duplicate;
      leadId = r.id;
      emailVerifyToken = r.emailVerifyToken;
      verifyCode = r.verifyCode;
    } else {
      console.error("[leads] Supabase insert falló:", r.error);
      // seguimos: intentamos no perder el lead vía Sheets
    }
  }

  // 2) Espejo: Google Sheets. También actúa de fallback si Supabase no guardó.
  if (!duplicate && sheetsEnabled) {
    const mirrored = await mirrorRegistro(sheetRow);
    if (mirrored) persisted = true;
    if (leadId) after(() => markSheetsSynced(leadId!, mirrored));
  }

  // 3) Emails (tras responder, no bloquean)
  if (!duplicate && persisted && resendEnabled) {
    after(async () => {
      await sendLeadConfirmation(
        d.correo,
        d.nombre,
        emailVerificationEnabled ? emailVerifyToken : undefined
      );
      await sendTeamNotification({
        nombre: d.nombre,
        correo: d.correo,
        telefono: d.telefono,
        ubicacion:
          d.pais === "Perú"
            ? [d.distrito, d.provincia, d.departamento].filter(Boolean).join(", ") || "Perú (no especificada)"
            : d.pais,
        "fecha nac.": d.fechaNacimiento,
        "monto de interés": d.montoInteres,
        "utm source": m.utmSource,
        "utm campaign": m.utmCampaign,
        referrer: m.referrer,
      });
    });
  }

  if (!persisted) {
    return {
      ok: false,
      duplicate: false,
      persisted: false,
      error: "No se pudo guardar el registro en ningún destino.",
    };
  }
  // El código de teléfono sólo se expone si la verificación está activada.
  return {
    ok: true,
    duplicate,
    persisted,
    verifyCode: phoneVerificationEnabled ? verifyCode : undefined,
  };
}
