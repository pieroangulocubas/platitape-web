import { after } from "next/server";
import { supabaseEnabled, resendEnabled } from "./config";
import { getSupabaseAdmin } from "./supabase";
import { sendReclamoAck, sendReclamoNotification } from "./email";
import type { ReclamoInput } from "./validation";

export interface ReclamoMeta {
  ip: string;
  userAgent: string;
}

export interface ReclamoResult {
  ok: boolean;
  correlativo?: string;
  error?: string;
}

function pad(n: number, width = 4): string {
  return String(n).padStart(width, "0");
}

/** LR-YYYYMMDD-NNNN, correlativo por día. */
function buildCorrelativo(seq: number): string {
  const d = new Date();
  const ymd =
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1, 2) +
    pad(d.getUTCDate(), 2);
  return `LR-${ymd}-${pad(seq)}`;
}

async function nextDailySeq(): Promise<number> {
  const supabase = getSupabaseAdmin();
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  const { count } = await supabase
    .from("reclamos")
    .select("id", { count: "exact", head: true })
    .gte("created_at", start.toISOString());
  return (count ?? 0) + 1;
}

/**
 * Registra una hoja de reclamación: la guarda en Supabase (fuente de verdad),
 * genera el correlativo y, tras responder, envía la copia al consumidor y el
 * aviso al equipo. No lanza si Supabase no está configurado (devuelve error).
 */
export async function processReclamo(
  d: ReclamoInput,
  m: ReclamoMeta
): Promise<ReclamoResult> {
  if (!supabaseEnabled) {
    return { ok: false, error: "El Libro de Reclamaciones no está disponible temporalmente." };
  }

  const supabase = getSupabaseAdmin();

  const rowBase = {
    consumidor_nombre: d.consumidorNombre,
    tipo_documento: d.tipoDocumento,
    numero_documento: d.numeroDocumento,
    domicilio: d.domicilio || null,
    correo: d.correo,
    telefono: d.telefono || null,
    es_menor: d.esMenor,
    apoderado_nombre: d.apoderadoNombre || null,
    bien_tipo: d.bienTipo,
    bien_descripcion: d.bienDescripcion,
    monto_reclamado: d.montoReclamado,
    tipo_solicitud: d.tipoSolicitud,
    detalle: d.detalle,
    pedido: d.pedido,
    ip: m.ip === "unknown" ? null : m.ip,
    user_agent: m.userAgent || null,
  };

  // Inserta con reintentos ante colisión del correlativo (23505).
  let seq = await nextDailySeq();
  let correlativo = "";
  let inserted = false;
  for (let attempt = 0; attempt < 4 && !inserted; attempt++) {
    correlativo =
      attempt < 3
        ? buildCorrelativo(seq + attempt)
        : buildCorrelativo(Math.floor(1000 + Math.random() * 9000));
    const { error } = await supabase
      .from("reclamos")
      .insert({ ...rowBase, correlativo })
      .select("id")
      .single();
    if (!error) {
      inserted = true;
      break;
    }
    if (error.code !== "23505") {
      console.error("[reclamos] insert falló:", error);
      return { ok: false, error: "No se pudo registrar tu reclamo. Intenta de nuevo." };
    }
  }
  if (!inserted) {
    return { ok: false, error: "No se pudo registrar tu reclamo. Intenta de nuevo." };
  }

  if (resendEnabled) {
    const finalCorrelativo = correlativo;
    after(async () => {
      await sendReclamoAck(d.correo, d, finalCorrelativo);
      await sendReclamoNotification(d, finalCorrelativo);
    });
  }

  return { ok: true, correlativo };
}
