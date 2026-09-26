import { Resend } from "resend";
import {
  RESEND_API_KEY,
  EMAIL_FROM,
  LEAD_NOTIFICATION_EMAIL,
  RECLAMOS_NOTIFICATION_EMAIL,
  resendEnabled,
  WA_CHANNEL_URL,
  SITE_URL,
} from "./config";
import type { ReclamoInput } from "./validation";

let _resend: Resend | null = null;
function client(): Resend {
  if (!_resend) _resend = new Resend(RESEND_API_KEY);
  return _resend;
}

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!);
}

/**
 * Email de confirmación al lead con botón para verificar el correo (Nivel 1).
 * No lanza: cualquier fallo se registra.
 */
export async function sendLeadConfirmation(
  to: string,
  nombre: string,
  emailVerifyToken?: string
): Promise<void> {
  if (!resendEnabled) return;
  const first = esc(nombre.split(" ")[0] || nombre);
  const confirmUrl = emailVerifyToken
    ? `${SITE_URL}/api/verify-email?token=${encodeURIComponent(emailVerifyToken)}`
    : null;
  try {
    await client().emails.send({
      from: EMAIL_FROM,
      to: [to],
      subject: "¡Estás en la lista de espera de Platita.pe!",
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;color:#1c0f4c">
          <h1 style="font-size:20px;margin:0 0 12px">Hola ${first}, ¡gracias por registrarte!</h1>
          <p style="font-size:14px;line-height:1.6;color:#3a3357">
            Recibimos tus datos. Guardaremos tu contacto y te avisaremos las mejores oportunidades
            de inversión con acceso prioritario.
          </p>
          ${
            confirmUrl
              ? `<p style="font-size:14px;line-height:1.6;color:#3a3357">
                   Confirma tu correo para asegurar tu lugar en la lista:
                 </p>
                 <p style="margin:20px 0">
                   <a href="${confirmUrl}" style="background:linear-gradient(135deg,#6cdcff,#bc45e9);color:#fff;text-decoration:none;padding:11px 22px;border-radius:10px;font-size:14px;font-weight:700;display:inline-block">
                     Confirmar mi correo
                   </a>
                 </p>`
              : ""
          }
          <p style="font-size:14px;line-height:1.6;color:#3a3357">
            Únete también a nuestro canal de WhatsApp para novedades y tips:
          </p>
          <p style="margin:16px 0">
            <a href="${WA_CHANNEL_URL}" style="background:#0C7A3E;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-size:14px;font-weight:700;display:inline-block">
              Unirme al canal de WhatsApp
            </a>
          </p>
          <p style="font-size:12px;color:#8a85a0;margin-top:28px">
            Si no te registraste en Platita.pe, ignora este mensaje.
          </p>
        </div>`,
    });
  } catch (err) {
    console.error("[email] fallo al enviar confirmación al lead:", err);
  }
}

/* ─────────────────── Libro de Reclamaciones ─────────────────── */

const TIPO_LABEL: Record<string, string> = {
  reclamo: "Reclamo (disconformidad con el producto o servicio)",
  queja: "Queja (malestar respecto de la atención)",
};

function reclamoRows(d: ReclamoInput, correlativo: string): string {
  const pairs: [string, string][] = [
    ["Hoja N.°", correlativo],
    ["Consumidor", d.consumidorNombre],
    ["Documento", `${d.tipoDocumento} ${d.numeroDocumento}`],
    ["Correo", d.correo],
    ["Teléfono", d.telefono ? `+51 ${d.telefono}` : "—"],
    ["Domicilio", d.domicilio || "—"],
    ["Menor de edad", d.esMenor ? `Sí — apoderado: ${d.apoderadoNombre}` : "No"],
    ["Bien contratado", `${d.bienTipo} — ${d.bienDescripcion}`],
    ["Monto reclamado", d.montoReclamado != null ? `S/ ${d.montoReclamado.toFixed(2)}` : "—"],
    ["Tipo", TIPO_LABEL[d.tipoSolicitud] ?? d.tipoSolicitud],
    ["Detalle", d.detalle],
    ["Pedido del consumidor", d.pedido],
  ];
  return pairs
    .map(
      ([k, v]) =>
        `<tr><td style="padding:5px 10px;color:#8a85a0;font-size:12px;vertical-align:top;white-space:nowrap">${esc(
          k
        )}</td><td style="padding:5px 10px;font-size:13px">${esc(v)}</td></tr>`
    )
    .join("");
}

/** Copia de la hoja de reclamación al consumidor. No lanza. */
export async function sendReclamoAck(
  to: string,
  d: ReclamoInput,
  correlativo: string
): Promise<void> {
  if (!resendEnabled) return;
  const first = esc(d.consumidorNombre.split(" ")[0] || d.consumidorNombre);
  try {
    await client().emails.send({
      from: EMAIL_FROM,
      to: [to],
      subject: `Recibimos tu ${d.tipoSolicitud} — Hoja ${correlativo}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#1c0f4c">
          <h1 style="font-size:20px;margin:0 0 12px">Hola ${first}, registramos tu ${esc(
            d.tipoSolicitud
          )}</h1>
          <p style="font-size:14px;line-height:1.6;color:#3a3357">
            Tu hoja del Libro de Reclamaciones quedó registrada con el número
            <strong>${esc(correlativo)}</strong>. Guarda este correo como constancia.
          </p>
          <p style="font-size:14px;line-height:1.6;color:#3a3357">
            Te daremos respuesta en un plazo no mayor de <strong>quince (15) días
            hábiles</strong>, conforme al Código de Protección y Defensa del
            Consumidor (Ley N.° 29571).
          </p>
          <table style="border-collapse:collapse;margin:16px 0;background:#faf9ff;border-radius:10px">
            ${reclamoRows(d, correlativo)}
          </table>
          <p style="font-size:12px;color:#8a85a0;margin-top:20px">
            La presentación de este reclamo no impide acudir a otras vías de
            solución de controversias ni constituye un requisito previo para
            interponer una denuncia ante INDECOPI.
          </p>
        </div>`,
    });
  } catch (err) {
    console.error("[email] fallo al enviar copia del reclamo:", err);
  }
}

/** Aviso al equipo de una nueva hoja de reclamación. No lanza. */
export async function sendReclamoNotification(
  d: ReclamoInput,
  correlativo: string
): Promise<void> {
  if (!resendEnabled || !RECLAMOS_NOTIFICATION_EMAIL) return;
  try {
    await client().emails.send({
      from: EMAIL_FROM,
      to: [RECLAMOS_NOTIFICATION_EMAIL],
      subject: `[Libro de Reclamaciones] ${correlativo} — ${d.consumidorNombre}`,
      html: `<div style="font-family:system-ui,sans-serif">
        <h2 style="font-size:16px;margin:0 0 8px">Nueva hoja del Libro de Reclamaciones</h2>
        <p style="font-size:13px;color:#8a85a0;margin:0 0 10px">
          Plazo de respuesta: 15 días hábiles desde hoy.
        </p>
        <table style="border-collapse:collapse">${reclamoRows(d, correlativo)}</table>
      </div>`,
    });
  } catch (err) {
    console.error("[email] fallo al enviar aviso de reclamo al equipo:", err);
  }
}

/** Aviso al equipo de un lead nuevo. No lanza. */
export async function sendTeamNotification(fields: Record<string, string>): Promise<void> {
  if (!resendEnabled || !LEAD_NOTIFICATION_EMAIL) return;
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 10px;color:#8a85a0;font-size:12px">${esc(k)}</td><td style="padding:4px 10px;font-size:13px">${esc(v)}</td></tr>`
    )
    .join("");
  try {
    await client().emails.send({
      from: EMAIL_FROM,
      to: [LEAD_NOTIFICATION_EMAIL],
      subject: `Nuevo lead: ${fields.nombre || fields.correo || "sin nombre"}`,
      html: `<div style="font-family:system-ui,sans-serif">
        <h2 style="font-size:16px;margin:0 0 8px">Nuevo lead en Platita.pe</h2>
        <table style="border-collapse:collapse">${rows}</table>
      </div>`,
    });
  } catch (err) {
    console.error("[email] fallo al enviar aviso al equipo:", err);
  }
}
