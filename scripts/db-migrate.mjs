// Aplica las migraciones SQL de db/migrations/ a la base de Neon, en orden.
// Cada archivo se aplica una sola vez (se registra en public._migraciones)
// y dentro de una transacción: si falla, no queda a medias.
//
//   npm run db:migrate
//
// Usa DATABASE_URL de .env.local (o del entorno).

import { loadEnvConfig } from "@next/env";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { Client, neonConfig } from "@neondatabase/serverless";

loadEnvConfig(process.cwd());
neonConfig.webSocketConstructor = globalThis.WebSocket;

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Falta DATABASE_URL (cadena de conexión de Neon).");
  process.exit(1);
}

const dir = path.join(process.cwd(), "db", "migrations");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

const client = new Client(url);
await client.connect();
try {
  await client.query(`
    create table if not exists public._migraciones (
      archivo     text primary key,
      aplicada_at timestamptz not null default now()
    )`);
  const { rows } = await client.query("select archivo from public._migraciones");
  const done = new Set(rows.map((r) => r.archivo));

  let applied = 0;
  for (const f of files) {
    if (done.has(f)) continue;
    const sql = await readFile(path.join(dir, f), "utf8");
    process.stdout.write(`→ ${f} … `);
    await client.query("begin");
    try {
      await client.query(sql);
      await client.query("insert into public._migraciones (archivo) values ($1)", [f]);
      await client.query("commit");
      console.log("ok");
      applied++;
    } catch (err) {
      await client.query("rollback");
      console.log("FALLÓ");
      throw err;
    }
  }
  console.log(applied ? `Migraciones aplicadas: ${applied}` : "La base ya está al día.");
} finally {
  await client.end();
}
