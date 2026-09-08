// Central config — change these values before launch

// URL canónica del sitio (sin barra final). Sobrescribible por entorno en Vercel.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://platita.pe"
).replace(/\/$/, "");

export const WA_PHONE = "51961229836"; // reemplaza con tu número real (+51 XXX XXX XXX)
export const WA_BASE_URL = `https://wa.me/${WA_PHONE}`;
export const WA_CHANNEL_URL =
  "https://whatsapp.com/channel/0029Vb9357SEKyZ8Oqr9Ga26";

export const WA_CONTACT_MSG = encodeURIComponent(
  "Hola, me interesa saber más sobre Platita.pe y cómo puedo invertir en bienes raíces."
);
export const WA_CONTACT_URL = `${WA_BASE_URL}?text=${WA_CONTACT_MSG}`;

/* ─────────────────────────────────────────────────────────────
 * Servicios del backend del formulario.
 * Todo tiene degradación elegante: si una variable no está,
 * esa función se salta y el resto del flujo sigue.
 * Nombres de variables verificados contra la documentación oficial
 * (2026). Ver .env.example.
 * ──────────────────────────────────────────────────────────── */

// --- Supabase (fuente de verdad) -----------------------------------------
// https://supabase.com/docs/guides/api/api-keys
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY ?? // clave nueva sb_secret_...
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? // clave legacy (deprecada fin 2026)
  "";
export const NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";
export const supabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY);

// --- Cloudflare Turnstile (CAPTCHA) ------------------------------------
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY ?? "";
export const NEXT_PUBLIC_TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
// Hostnames que siteverify puede devolver (el widget cubre varios dominios).
// Si está vacío, se omite la comprobación de hostname (con aviso).
export const TURNSTILE_ALLOWED_HOSTNAMES = (
  process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? ""
)
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);
export const turnstileEnabled = Boolean(
  TURNSTILE_SECRET_KEY && NEXT_PUBLIC_TURNSTILE_SITE_KEY
);

// --- Resend (emails transaccionales) ---------------------------------
// https://resend.com/docs/send-with-nextjs
export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
// Remitente verificado en Resend (dominio propio). Fallback al sandbox de Resend.
export const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "Platita.pe <onboarding@resend.dev>";
// Bandeja del equipo que recibe el aviso de cada lead nuevo.
export const LEAD_NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL ?? "";
// Bandeja que recibe las hojas del Libro de Reclamaciones (cae a la de leads).
export const RECLAMOS_NOTIFICATION_EMAIL =
  process.env.RECLAMOS_NOTIFICATION_EMAIL ?? LEAD_NOTIFICATION_EMAIL;
export const resendEnabled = Boolean(RESEND_API_KEY);

// --- Endpoints internos (marcar teléfono verificado, resync, etc.) ---
// Header `x-internal-secret` requerido en /api/verify-phone.
export const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET ?? "";

// --- Verificación de contacto (Nivel 1) ----------------------------
// Teléfono: OFF por defecto (añade fricción y excluye a inversionistas
//   del extranjero). Con "true", la pantalla de éxito pide confirmar el
//   teléfono por WhatsApp con un código corto.
export const phoneVerificationEnabled =
  process.env.PHONE_VERIFICATION === "true";
// Correo: ON por defecto (baja fricción: solo un botón "confirmar" en el
//   correo de bienvenida, el lead ya quedó guardado). Apágalo con "false".
export const emailVerificationEnabled =
  process.env.EMAIL_VERIFICATION !== "false";

// --- Google Sheets (espejo / mirror) --------------------------------
export const sheetsEnabled = Boolean(
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
    process.env.GOOGLE_SHEETS_PRIVATE_KEY &&
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID
);
