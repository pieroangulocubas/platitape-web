// Reintenta el espejo a Google Sheets de los leads que quedaron sin sincronizar
// (sheets_synced = false en Supabase). Ejecuta:  node scripts/resync-sheets.mjs
//
// Útil como cron en Vercel o manual tras una caída de la API de Sheets.

import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
const { mirrorRegistro } = await import("../lib/google-sheets.ts");

const { data: rows, error } = await supabase
  .from("leads")
  .select("*")
  .eq("sheets_synced", false)
  .order("created_at", { ascending: true })
  .limit(500);

if (error) {
  console.error("Error leyendo leads:", error.message);
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
    r.created_at,
    r.nombre,
    r.correo,
    r.telefono ?? "",
    r.departamento ?? "",
    r.provincia ?? "",
    r.distrito ?? "",
    r.fecha_nacimiento ?? "",
    r.monto_interes ?? "",
    ...meta,
    r.pais ?? "",
  ]);

  if (done) {
    await supabase
      .from("leads")
      .update({ sheets_synced: true, sheets_synced_at: new Date().toISOString() })
      .eq("id", r.id);
    ok++;
  } else {
    fail++;
  }
}
console.log(`Sincronizados: ${ok} | fallidos: ${fail}`);
process.exit(fail ? 1 : 0);
