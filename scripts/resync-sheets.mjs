// Reintenta el espejo a Google Sheets de los leads que quedaron sin sincronizar
// (sheets_synced = false en la base). Ejecuta:  node scripts/resync-sheets.mjs
//
// Útil como cron en Vercel o manual tras una caída de la API de Sheets.

import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Falta DATABASE_URL");
  process.exit(1);
}

const sql = neon(url);
const { mirrorRegistro } = await import("../lib/google-sheets.ts");

let rows;
try {
  rows = await sql`
    select *, to_char(fecha_nacimiento, 'YYYY-MM-DD') as fecha_txt from public.leads
     where sheets_synced = false
     order by created_at asc
     limit 500`;
} catch (err) {
  console.error("Error leyendo leads:", err.message);
  process.exit(1);
}
if (!rows.length) {
  console.log("Nada que sincronizar.");
  process.exit(0);
}

let ok = 0;
let fail = 0;
for (const r of rows) {
  const meta = [r.utm_source, r.utm_medium, r.utm_campaign, r.referrer, r.user_agent].map(
    (x) => x ?? ""
  );
  const done = await mirrorRegistro([
    new Date(r.created_at).toISOString(),
    r.nombre,
    r.correo,
    r.telefono ?? "",
    r.departamento ?? "",
    r.provincia ?? "",
    r.distrito ?? "",
    r.fecha_txt ?? "",
    r.monto_interes ?? "",
    ...meta,
    r.pais ?? "",
  ]);

  if (done) {
    await sql`
      update public.leads
         set sheets_synced = true, sheets_synced_at = now()
       where id = ${r.id}`;
    ok++;
  } else {
    fail++;
  }
}
console.log(`Sincronizados: ${ok} | fallidos: ${fail}`);
process.exit(fail ? 1 : 0);
