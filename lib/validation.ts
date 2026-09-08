// Validación y normalización compartida por las API routes del formulario.
// Sin dependencias externas.

/** Límites de longitud por campo (defensa contra payloads gigantes). */
export const MAX = {
  nombre: 120,
  correo: 160,
  telefono: 20,
  ubicacion: 80,
  mensaje: 2000,
  utm: 200,
  userAgent: 400,
} as const;

// Caracteres de control ASCII (0x00-0x1F y 0x7F).
const CONTROL = new RegExp("[\\u0000-\\u001F\\u007F]", "g");

/**
 * Neutraliza inyección de fórmulas / CSV injection.
 * Un valor que empieza con = + - @ se ejecuta al abrir el CSV exportado
 * en Excel/Sheets. Le anteponemos una comilla simple.
 */
export function sanitizeForSheets(value: string): string {
  const v = String(value ?? "").replace(CONTROL, "").trim();
  if (/^[=+\-@]/.test(v)) return "'" + v;
  return v;
}

export function collapseSpaces(v: string): string {
  return String(v ?? "").replace(CONTROL, " ").replace(/\s+/g, " ").trim();
}

export function normalizeEmail(v: string): string {
  return collapseSpaces(v).toLowerCase();
}

/**
 * Normaliza un teléfono internacional a formato E.164 aproximado:
 * conserva un "+" inicial y los dígitos. `00` inicial → `+`.
 * Si no trae ni "+" ni prefijo y son 9 dígitos que empiezan por 9,
 * se asume Perú y se antepone "+51" (la mayoría de leads).
 */
export function normalizePhone(v: string): string {
  let s = String(v ?? "").trim().replace(/[^\d+]/g, "");
  s = s.replace(/(?!^)\+/g, ""); // "+" solo al inicio
  if (s.startsWith("00")) s = "+" + s.slice(2);
  if (!s.startsWith("+") && /^9\d{8}$/.test(s)) s = "+51" + s;
  return s.slice(0, 16); // "+" + hasta 15 dígitos (máximo ITU E.164)
}

// RFC 5322 simplificado — suficiente para captación de leads.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(v: string): boolean {
  return EMAIL_RE.test(v) && v.length <= MAX.correo;
}

/** Celular peruano: 9 dígitos, empieza con 9. */
export function isPeruMobile(v: string): boolean {
  return /^9\d{8}$/.test(v);
}

/**
 * Teléfono válido internacional: "+" opcional seguido de 8 a 15 dígitos.
 * Acepta números de Perú y del extranjero (inversionistas fuera del país).
 */
export function isValidPhone(v: string): boolean {
  return /^\+?\d{8,15}$/.test(v);
}

/**
 * Fecha ISO (YYYY-MM-DD) válida, con edad entre 18 y 100 años.
 * Devuelve la edad, o null si no es válida.
 */
export function ageFromISODate(iso: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return null;
  // rechaza fechas re-normalizadas por Date (ej. 2021-02-31 -> marzo)
  if (d.toISOString().slice(0, 10) !== iso) return null;
  const now = new Date();
  let age = now.getUTCFullYear() - d.getUTCFullYear();
  const m = now.getUTCMonth() - d.getUTCMonth();
  if (m < 0 || (m === 0 && now.getUTCDate() < d.getUTCDate())) age--;
  if (age < 18 || age > 100) return null;
  return age;
}

export const MONTO_INTERES_VALUES = [
  "10-25k",
  "25-50k",
  "50-100k",
  "100-250k",
  "250k+",
  "explorando",
] as const;
export type MontoInteres = (typeof MONTO_INTERES_VALUES)[number];

export interface RegistroInput {
  nombre: string;
  correo: string;
  telefono: string;
  departamento: string;
  provincia: string;
  distrito: string;
  /** "Perú" o, para leads del extranjero, texto libre "Ciudad, País". */
  pais: string;
  fechaNacimiento: string;
  montoInteres: MontoInteres;
}

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; field?: string };

function str(x: unknown): string {
  return typeof x === "string" ? x : "";
}

/** Honeypot: el campo debe llegar vacío. Los bots lo rellenan. */
export function isBot(body: Record<string, unknown>): boolean {
  const hp = str(body.website ?? body.hp ?? body.__hp);
  return hp.trim().length > 0;
}

export function validateRegistro(
  body: Record<string, unknown>
): ValidationResult<RegistroInput> {
  const nombre = collapseSpaces(str(body.nombre));
  const correo = normalizeEmail(str(body.correo));
  const telefono = normalizePhone(str(body.telefono));
  const departamento = collapseSpaces(str(body.departamento));
  const provincia = collapseSpaces(str(body.provincia));
  const distrito = collapseSpaces(str(body.distrito));
  const fechaNacimiento = str(body.fechaNacimiento).trim();
  const montoInteres = collapseSpaces(str(body.montoInteres));
  const viveExtranjero =
    body.viveExtranjero === true || body.viveExtranjero === "true";
  const ubicacionExtranjero = collapseSpaces(str(body.ubicacionExtranjero));

  if (nombre.length < 2 || nombre.length > MAX.nombre)
    return { ok: false, error: "Ingresa tu nombre completo.", field: "nombre" };
  if (!isEmail(correo))
    return { ok: false, error: "El correo no tiene un formato válido.", field: "correo" };
  if (!isValidPhone(telefono))
    return {
      ok: false,
      error: "Ingresa un número de teléfono válido con código de país.",
      field: "telefono",
    };

  let pais = "Perú";
  if (viveExtranjero) {
    if (ubicacionExtranjero.length < 2 || ubicacionExtranjero.length > 120)
      return {
        ok: false,
        error: "Indica tu ciudad y país de residencia.",
        field: "ubicacionExtranjero",
      };
    pais = ubicacionExtranjero;
  } else {
    for (const [field, value] of [
      ["departamento", departamento],
      ["provincia", provincia],
      ["distrito", distrito],
    ] as const) {
      if (value.length < 2 || value.length > MAX.ubicacion)
        return { ok: false, error: `Selecciona ${field}.`, field };
    }
  }

  if (ageFromISODate(fechaNacimiento) === null)
    return {
      ok: false,
      error: "Debes ser mayor de edad (fecha de nacimiento inválida).",
      field: "fechaNacimiento",
    };
  if (!(MONTO_INTERES_VALUES as readonly string[]).includes(montoInteres))
    return {
      ok: false,
      error: "Selecciona cuánto te interesaría invertir.",
      field: "montoInteres",
    };

  return {
    ok: true,
    data: {
      nombre,
      correo,
      telefono,
      departamento: viveExtranjero ? "" : departamento,
      provincia: viveExtranjero ? "" : provincia,
      distrito: viveExtranjero ? "" : distrito,
      pais,
      fechaNacimiento,
      montoInteres: montoInteres as MontoInteres,
    },
  };
}

/** Metadatos de campaña/origen que envía el cliente. Se recortan y limpian. */
export interface LeadMeta {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrer: string;
  userAgent: string;
}

export function extractMeta(
  body: Record<string, unknown>,
  userAgent: string
): LeadMeta {
  const clip = (x: unknown, n: number) => collapseSpaces(str(x)).slice(0, n);
  return {
    utmSource: clip(body.utmSource ?? body.utm_source, MAX.utm),
    utmMedium: clip(body.utmMedium ?? body.utm_medium, MAX.utm),
    utmCampaign: clip(body.utmCampaign ?? body.utm_campaign, MAX.utm),
    referrer: clip(body.referrer ?? body.referer, MAX.utm),
    userAgent: clip(userAgent, MAX.userAgent),
  };
}

/* ───────────────────── Libro de Reclamaciones ───────────────────── */

export const RECLAMO_MAX = {
  nombre: 160,
  documento: 20,
  domicilio: 240,
  telefono: 20,
  bienDescripcion: 400,
  texto: 3000,
} as const;

const TIPO_DOCUMENTO = ["DNI", "CE", "PASAPORTE", "RUC"] as const;
const BIEN_TIPO = ["producto", "servicio"] as const;
const TIPO_SOLICITUD = ["reclamo", "queja"] as const;

export type TipoDocumento = (typeof TIPO_DOCUMENTO)[number];
export type BienTipo = (typeof BIEN_TIPO)[number];
export type TipoSolicitud = (typeof TIPO_SOLICITUD)[number];

export interface ReclamoInput {
  consumidorNombre: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  domicilio: string;
  correo: string;
  telefono: string;
  esMenor: boolean;
  apoderadoNombre: string;
  bienTipo: BienTipo;
  bienDescripcion: string;
  montoReclamado: number | null;
  tipoSolicitud: TipoSolicitud;
  detalle: string;
  pedido: string;
}

function oneOf<T extends readonly string[]>(
  value: string,
  allowed: T
): value is T[number] {
  return (allowed as readonly string[]).includes(value);
}

export function validateReclamo(
  body: Record<string, unknown>
): ValidationResult<ReclamoInput> {
  const consumidorNombre = collapseSpaces(str(body.consumidorNombre));
  const tipoDocumento = collapseSpaces(str(body.tipoDocumento)).toUpperCase();
  const numeroDocumento = collapseSpaces(str(body.numeroDocumento)).toUpperCase();
  const domicilio = collapseSpaces(str(body.domicilio));
  const correo = normalizeEmail(str(body.correo));
  const telefono = normalizePhone(str(body.telefono));
  const esMenor = body.esMenor === true || body.esMenor === "true";
  const apoderadoNombre = collapseSpaces(str(body.apoderadoNombre));
  const bienTipo = collapseSpaces(str(body.bienTipo)).toLowerCase();
  const bienDescripcion = collapseSpaces(str(body.bienDescripcion));
  const tipoSolicitud = collapseSpaces(str(body.tipoSolicitud)).toLowerCase();
  const detalle = collapseSpaces(str(body.detalle));
  const pedido = collapseSpaces(str(body.pedido));

  const montoRaw = str(body.montoReclamado).replace(/[^\d.]/g, "");
  const montoReclamado = montoRaw ? Math.min(9_999_999_999, Number(montoRaw)) : null;

  if (consumidorNombre.length < 3 || consumidorNombre.length > RECLAMO_MAX.nombre)
    return { ok: false, error: "Ingresa tu nombre completo.", field: "consumidorNombre" };
  if (!oneOf(tipoDocumento, TIPO_DOCUMENTO))
    return { ok: false, error: "Selecciona el tipo de documento.", field: "tipoDocumento" };
  if (numeroDocumento.length < 6 || numeroDocumento.length > RECLAMO_MAX.documento)
    return { ok: false, error: "Ingresa un número de documento válido.", field: "numeroDocumento" };
  if (!isEmail(correo))
    return { ok: false, error: "El correo no tiene un formato válido.", field: "correo" };
  if (telefono && !isValidPhone(telefono))
    return { ok: false, error: "El teléfono no tiene un formato válido.", field: "telefono" };
  if (domicilio.length > RECLAMO_MAX.domicilio)
    return { ok: false, error: "El domicilio es demasiado largo.", field: "domicilio" };
  if (esMenor && (apoderadoNombre.length < 3 || apoderadoNombre.length > RECLAMO_MAX.nombre))
    return {
      ok: false,
      error: "Indica el nombre del padre, madre o apoderado.",
      field: "apoderadoNombre",
    };
  if (!oneOf(bienTipo, BIEN_TIPO))
    return { ok: false, error: "Indica si el reclamo es por un producto o un servicio.", field: "bienTipo" };
  if (bienDescripcion.length < 3 || bienDescripcion.length > RECLAMO_MAX.bienDescripcion)
    return { ok: false, error: "Describe el producto o servicio contratado.", field: "bienDescripcion" };
  if (montoReclamado !== null && !Number.isFinite(montoReclamado))
    return { ok: false, error: "El monto reclamado no es válido.", field: "montoReclamado" };
  if (!oneOf(tipoSolicitud, TIPO_SOLICITUD))
    return { ok: false, error: "Selecciona si es un reclamo o una queja.", field: "tipoSolicitud" };
  if (detalle.length < 10 || detalle.length > RECLAMO_MAX.texto)
    return { ok: false, error: "Describe con más detalle tu reclamo o queja.", field: "detalle" };
  if (pedido.length < 5 || pedido.length > RECLAMO_MAX.texto)
    return { ok: false, error: "Indica qué solicitas como consumidor.", field: "pedido" };

  return {
    ok: true,
    data: {
      consumidorNombre,
      tipoDocumento,
      numeroDocumento,
      domicilio,
      correo,
      telefono,
      esMenor,
      apoderadoNombre: esMenor ? apoderadoNombre : "",
      bienTipo,
      bienDescripcion,
      montoReclamado,
      tipoSolicitud,
      detalle,
      pedido,
    },
  };
}
