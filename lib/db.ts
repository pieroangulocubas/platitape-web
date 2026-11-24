import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { DATABASE_URL, dbEnabled } from "./config";

// Cliente de Postgres (Neon) — solo servidor. Usa el driver HTTP de Neon:
// una petición por consulta, sin pool de conexiones que mantener vivo
// (ideal para funciones serverless de Vercel).
// NUNCA importar este módulo desde un componente cliente.
let _sql: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (!dbEnabled) {
    throw new Error("La base de datos no está configurada (falta DATABASE_URL).");
  }
  if (!_sql) _sql = neon(DATABASE_URL);
  return _sql;
}

/** Código de error de Postgres (ej. "23505" = unique_violation), si lo hay. */
export function pgErrorCode(err: unknown): string | undefined {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code?: unknown }).code;
    return typeof code === "string" ? code : undefined;
  }
  return undefined;
}

export interface LeadRow {
  tipo: "registro";
  nombre: string;
  correo: string;
  telefono: string | null;
  departamento: string | null;
  provincia: string | null;
  distrito: string | null;
  pais: string | null;
  fecha_nacimiento: string | null;
  monto_interes: string | null;
  mensaje: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  user_agent: string | null;
  email_verify_token?: string;
  verify_code?: string;
}

export interface InsertResult {
  ok: boolean;
  duplicate: boolean;
  id?: string;
  /** Token del enlace de confirmación de correo (para el email). */
  emailVerifyToken?: string;
  /** Código corto para el mensaje de WhatsApp. */
  verifyCode?: string;
  error?: string;
}

/** Código corto legible para el mensaje de WhatsApp (sin caracteres ambiguos). */
export function makeVerifyCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  let out = "";
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}

/**
 * Inserta un lead. Deduplica por (tipo, correo) mediante el índice único
 * de la tabla: si ya existe, devuelve `duplicate: true` sin fallar.
 * Genera el token de verificación de correo y el código de WhatsApp.
 */
export async function insertLead(row: LeadRow): Promise<InsertResult> {
  const sql = getSql();
  const emailVerifyToken = row.email_verify_token ?? crypto.randomUUID();
  const verifyCode = row.verify_code ?? makeVerifyCode();

  try {
    const rows = await sql`
      insert into public.leads (
        tipo, nombre, correo, telefono, departamento, provincia, distrito, pais,
        fecha_nacimiento, monto_interes, mensaje, utm_source, utm_medium,
        utm_campaign, referrer, user_agent, email_verify_token, verify_code
      ) values (
        ${row.tipo}, ${row.nombre}, ${row.correo}, ${row.telefono}, ${row.departamento},
        ${row.provincia}, ${row.distrito}, ${row.pais}, ${row.fecha_nacimiento},
        ${row.monto_interes}, ${row.mensaje}, ${row.utm_source}, ${row.utm_medium},
        ${row.utm_campaign}, ${row.referrer}, ${row.user_agent}, ${emailVerifyToken},
        ${verifyCode}
      )
      returning id`;
    return {
      ok: true,
      duplicate: false,
      id: rows[0]?.id as string | undefined,
      emailVerifyToken,
      verifyCode,
    };
  } catch (err) {
    // 23505 = unique_violation -> ya estaba registrado
    if (pgErrorCode(err) === "23505") return { ok: true, duplicate: true };
    return { ok: false, duplicate: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Marca el correo como verificado a partir del token del enlace. Un solo uso. */
export async function verifyEmailByToken(
  token: string
): Promise<{ ok: boolean; nombre?: string }> {
  if (!token || token.length > 100) return { ok: false };
  try {
    const rows = await getSql()`
      update public.leads
         set email_verified = true,
             email_verified_at = now(),
             email_verify_token = null -- consume el token
       where email_verify_token = ${token}
      returning nombre`;
    if (!rows.length) return { ok: false };
    return { ok: true, nombre: rows[0].nombre as string };
  } catch {
    return { ok: false };
  }
}

/** Marca el teléfono como verificado a partir del código corto. */
export async function verifyPhoneByCode(
  code: string
): Promise<{ ok: boolean; matched: number }> {
  if (!code || !/^[A-Z0-9]{4,8}$/.test(code)) return { ok: false, matched: 0 };
  try {
    const rows = await getSql()`
      update public.leads
         set phone_verified = true, phone_verified_at = now()
       where verify_code = ${code.toUpperCase()}
         and phone_verified = false
      returning id`;
    return { ok: true, matched: rows.length };
  } catch {
    return { ok: false, matched: 0 };
  }
}

/** Marca un lead como espejado (o no) en Google Sheets. Best-effort. */
export async function markSheetsSynced(id: string, synced: boolean): Promise<void> {
  try {
    await getSql()`
      update public.leads
         set sheets_synced = ${synced},
             sheets_synced_at = ${synced ? new Date().toISOString() : null}
       where id = ${id}`;
  } catch {
    /* no crítico */
  }
}
