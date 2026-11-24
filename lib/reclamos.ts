import { after } from "next/server";
import { dbEnabled, resendEnabled } from "./config";
import { getSql, pgErrorCode } from "./db";
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

/**
 * Siguiente número del día (UTC), atómico: dos reclamos simultáneos nunca
 * reciben el mismo correlativo. Usa la tabla `reclamos_contador`.
 */
async function nextDailySeq(): Promise<number> {
  const rows = await getSql()`
    insert into public.reclamos_contador (dia, ultimo)
    values ((now() at time zone 'utc')::date, 1)
    on conflict (dia) do update set ultimo = public.reclamos_contador.ultimo + 1
    returning ultimo`;
  return Number(rows[0].ultimo);
}

/**
 * Registra una hoja de reclamación: la guarda en Postgres (fuente de verdad),
 * genera el correlativo y, tras responder, envía la copia al consumidor y el
 * aviso al equipo. No lanza si la base no está configurada (devuelve error).
 */
export async function processReclamo(
  d: ReclamoInput,
  m: ReclamoMeta
): Promise<ReclamoResult> {
  if (!dbEnabled) {
    return { ok: false, error: "El Libro de Reclamaciones no está disponible temporalmente." };
  }

  const sql = getSql();

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

  // El correlativo sale de un contador atómico; el reintento solo cubre el
  // caso raro de choque con un correlativo antiguo (23505 = unique_violation).
  let correlativo = "";
  let inserted = false;
  for (let attempt = 0; attempt < 3 && !inserted; attempt++) {
    try {
      correlativo = buildCorrelativo(await nextDailySeq());
      const r = { ...rowBase, correlativo };
      await sql`
        insert into public.reclamos (
          correlativo, consumidor_nombre, tipo_documento, numero_documento,
          domicilio, correo, telefono, es_menor, apoderado_nombre, bien_tipo,
          bien_descripcion, monto_reclamado, tipo_solicitud, detalle, pedido,
          ip, user_agent
        ) values (
          ${r.correlativo}, ${r.consumidor_nombre}, ${r.tipo_documento},
          ${r.numero_documento}, ${r.domicilio}, ${r.correo}, ${r.telefono},
          ${r.es_menor}, ${r.apoderado_nombre}, ${r.bien_tipo},
          ${r.bien_descripcion}, ${r.monto_reclamado}, ${r.tipo_solicitud},
          ${r.detalle}, ${r.pedido}, ${r.ip}, ${r.user_agent}
        )`;
      inserted = true;
    } catch (err) {
      if (pgErrorCode(err) !== "23505") {
        console.error("[reclamos] insert falló:", err);
        return { ok: false, error: "No se pudo registrar tu reclamo. Intenta de nuevo." };
      }
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
