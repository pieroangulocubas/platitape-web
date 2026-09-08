import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_SECRET_KEY, supabaseEnabled } from "./config";

// Cliente administrador (solo servidor) — usa la Secret Key, salta RLS.
// NUNCA importar este módulo desde un componente cliente.
let _admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseEnabled) {
    throw new Error(
      "Supabase no está configurado (falta NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY)."
    );
  }
  if (!_admin) {
    _admin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _admin;
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
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

/**
 * Inserta un lead. Deduplica por (tipo, correo) mediante el índice único
 * de la tabla: si ya existe, devuelve `duplicate: true` sin fallar.
 * Genera el token de verificación de correo y el código de WhatsApp.
 */
export async function insertLead(row: LeadRow): Promise<InsertResult> {
  const supabase = getSupabaseAdmin();
  const emailVerifyToken = row.email_verify_token ?? crypto.randomUUID();
  const verifyCode = row.verify_code ?? makeVerifyCode();

  const { data, error } = await supabase
    .from("leads")
    .insert({ ...row, email_verify_token: emailVerifyToken, verify_code: verifyCode })
    .select("id")
    .single();

  if (error) {
    // 23505 = unique_violation -> ya estaba registrado
    if (error.code === "23505") return { ok: true, duplicate: true };
    return { ok: false, duplicate: false, error: error.message };
  }
  return {
    ok: true,
    duplicate: false,
    id: data?.id as string | undefined,
    emailVerifyToken,
    verifyCode,
  };
}

/** Marca el correo como verificado a partir del token del enlace. Un solo uso. */
export async function verifyEmailByToken(
  token: string
): Promise<{ ok: boolean; nombre?: string }> {
  if (!token || token.length > 100) return { ok: false };
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .update({
      email_verified: true,
      email_verified_at: new Date().toISOString(),
      email_verify_token: null, // consume el token
    })
    .eq("email_verify_token", token)
    .select("nombre")
    .maybeSingle();

  if (error || !data) return { ok: false };
  return { ok: true, nombre: data.nombre as string };
}

/** Marca el teléfono como verificado a partir del código corto. */
export async function verifyPhoneByCode(
  code: string
): Promise<{ ok: boolean; matched: number }> {
  if (!code || !/^[A-Z0-9]{4,8}$/.test(code)) return { ok: false, matched: 0 };
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .update({ phone_verified: true, phone_verified_at: new Date().toISOString() })
    .eq("verify_code", code.toUpperCase())
    .eq("phone_verified", false)
    .select("id");

  if (error) return { ok: false, matched: 0 };
  return { ok: true, matched: data?.length ?? 0 };
}

/** Marca un lead como espejado (o no) en Google Sheets. Best-effort. */
export async function markSheetsSynced(id: string, synced: boolean): Promise<void> {
  try {
    await getSupabaseAdmin()
      .from("leads")
      .update({ sheets_synced: synced, sheets_synced_at: synced ? new Date().toISOString() : null })
      .eq("id", id);
  } catch {
    /* no crítico */
  }
}
