// Prueba de conectividad y credenciales de Resend SIN dominio verificado.
//
//   node scripts/test-resend.mjs tu-correo@ejemplo.com
//
// Nota (modo sandbox de Resend): mientras no verifiques un dominio propio en
// resend.com/domains, solo puedes:
//   - enviar DESDE  onboarding@resend.dev
//   - enviar HACIA  el correo con el que creaste la cuenta de Resend
// Cualquier otro destinatario devuelve 403 "You can only send testing emails
// to your own email address".

import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());

import { Resend } from "resend";

const to = process.argv[2];
if (!to) {
  console.error("Uso: node scripts/test-resend.mjs <correo-destino>");
  process.exit(1);
}

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("Falta RESEND_API_KEY en .env.local");
  process.exit(1);
}

const resend = new Resend(apiKey);

// Estado del dominio (para saber si ya puedes usar EMAIL_FROM propio).
try {
  const domains = await resend.domains.list();
  const list = domains.data?.data ?? domains.data ?? [];
  console.log(
    "Dominios en Resend:",
    list.length ? list.map((d) => `${d.name} (${d.status})`).join(", ") : "ninguno (modo sandbox)"
  );
} catch (e) {
  console.warn("No se pudo listar dominios:", e?.message ?? e);
}

const verified =
  (await resend.domains.list().catch(() => null))?.data?.data?.some?.(
    (d) => d.status === "verified"
  ) ?? false;

const from = verified
  ? process.env.EMAIL_FROM || "Platita.pe <onboarding@resend.dev>"
  : "Platita.pe <onboarding@resend.dev>";

console.log(`\nEnviando prueba:\n  from: ${from}\n  to:   ${to}\n`);

const { data, error } = await resend.emails.send({
  from,
  to: [to],
  subject: "Prueba de Resend — Platita.pe",
  html: `<div style="font-family:system-ui,sans-serif;color:#1c0f4c">
    <h1 style="font-size:18px">Resend funciona ✅</h1>
    <p style="font-size:14px;color:#57516f">
      Enviado desde <code>${from}</code> el ${new Date().toISOString()}.
    </p>
  </div>`,
});

if (error) {
  console.error("❌ Error:", JSON.stringify(error, null, 2));
  process.exit(1);
}
console.log("✅ Enviado. id:", data?.id);
console.log("Revisa la bandeja de", to, "(y spam).");
