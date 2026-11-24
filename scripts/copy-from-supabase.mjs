// Copia ÚNICA de los datos de Supabase a Neon (tablas leads y reclamos).
// Conserva los ids y todas las columnas. Se puede correr varias veces: lo que
// ya existe en Neon (mismo id) se salta.
//
// Requisitos en .env.local:
//   DATABASE_URL                 → Neon (destino)
//   NEXT_PUBLIC_SUPABASE_URL     → Supabase (origen; el proyecto debe estar activo)
//   SUPABASE_SECRET_KEY          → clave secreta de Supabase (o SUPABASE_SERVICE_ROLE_KEY)
//
// Antes: npm run db:migrate   (crea las tablas en Neon)
// Luego: npm run db:copy-from-supabase
//
// Tras la migración, borra las variables de Supabase y este script.

import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { Client, neonConfig } from "@neondatabase/serverless";

loadEnvConfig(process.cwd());
neonConfig.webSocketConstructor = globalThis.WebSocket;

const neonUrl = process.env.DATABASE_URL;
const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const sbKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!neonUrl || !sbUrl || !sbKey) {
  console.error("Faltan DATABASE_URL, NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SECRET_KEY.");
  process.exit(1);
}

const supabase = createClient(sbUrl, sbKey, { auth: { persistSession: false } });
const neon = new Client(neonUrl);
await neon.connect();

const PAGE = 500;

async function copyTable(table) {
  const { rows: cols } = await neon.query(
    `select column_name from information_schema.columns
      where table_schema = 'public' and table_name = $1`,
    [table]
  );
  const neonCols = new Set(cols.map((c) => c.column_name));

  let read = 0;
  let inserted = 0;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`Supabase (${table}): ${error.message}`);
    if (!data.length) break;

    for (const row of data) {
      const keys = Object.keys(row).filter((k) => neonCols.has(k));
      const missing = Object.keys(row).filter((k) => !neonCols.has(k));
      if (missing.length && read === 0) {
        console.warn(`  ⚠ ${table}: columnas solo en Supabase (se omiten): ${missing.join(", ")}`);
      }
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
      const res = await neon.query(
        `insert into public.${table} (${keys.map((k) => `"${k}"`).join(", ")})
         values (${placeholders})
         on conflict (id) do nothing`,
        keys.map((k) => row[k])
      );
      read++;
      inserted += res.rowCount ?? 0;
    }
    if (data.length < PAGE) break;
  }
  console.log(`  ${table}: leídos ${read}, copiados ${inserted}, ya existían ${read - inserted}`);
  return read;
}

try {
  console.log("Copiando de Supabase a Neon…");
  const leads = await copyTable("leads");
  const reclamos = await copyTable("reclamos");

  // Pone el contador de correlativos al día con los reclamos copiados.
  await neon.query(`
    insert into public.reclamos_contador (dia, ultimo)
    select (created_at at time zone 'utc')::date,
           max(substring(correlativo from '^LR-\\d{8}-(\\d+)$')::int)
      from public.reclamos
     where correlativo ~ '^LR-\\d{8}-\\d+$'
     group by 1
    on conflict (dia) do update
      set ultimo = greatest(public.reclamos_contador.ultimo, excluded.ultimo)`);

  // Comprobación final: los conteos de Neon deben cubrir lo leído en Supabase.
  const { rows } = await neon.query(
    "select (select count(*) from public.leads)::int as leads, (select count(*) from public.reclamos)::int as reclamos"
  );
  console.log(`Neon ahora tiene: leads ${rows[0].leads}, reclamos ${rows[0].reclamos}`);
  if (rows[0].leads < leads || rows[0].reclamos < reclamos) {
    console.error("✗ Neon tiene menos filas que Supabase. Revisa los avisos de arriba.");
    process.exitCode = 1;
  } else {
    console.log("✓ Copia completa.");
  }
} finally {
  await neon.end();
}
