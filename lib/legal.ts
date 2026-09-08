// Datos legales compartidos por las páginas /terminos, /privacidad y
// /libro-de-reclamaciones. Los valores marcados como "[por completar]" los
// debe confirmar el cliente antes de publicar.

export const COMPANY = {
  /** Razón social del titular de la plataforma. */
  razonSocial: "HOLDING BERCORP GROUP S.A.C.",
  /** Nombre comercial. */
  marca: "Platita.pe",
  /** RUC — lo entrega el cliente. */
  ruc: "[por completar: RUC]",
  /** Domicilio fiscal — lo entrega el cliente. */
  domicilio: "[por completar: domicilio fiscal en el Perú]",
  /** Correo de contacto legal / atención al consumidor. */
  emailContacto: "legal@platita.pe",
  /** Correo del responsable de protección de datos personales. */
  emailDatos: "datos@platita.pe",
  /** Teléfono / WhatsApp de atención. */
  telefono: "+51 961 229 836",
} as const;

/** Fecha de última actualización de los documentos legales. */
export const LEGAL_LAST_UPDATED = "septiembre de 2026";
