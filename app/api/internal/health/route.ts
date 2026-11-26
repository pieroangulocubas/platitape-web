import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";
import { getFiles, signedUrl } from "@/lib/storage";
import { INTERNAL_API_SECRET, STORAGE_BUCKET, dbEnabled, storageEnabled } from "@/lib/config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

type Check = { ok: boolean; ms: number; detail?: unknown; error?: string };

async function timed(fn: () => Promise<unknown>): Promise<Check> {
  const t0 = Date.now();
  try {
    const detail = await fn();
    return { ok: true, ms: Date.now() - t0, detail };
  } catch (err) {
    return { ok: false, ms: Date.now() - t0, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Comprueba de punta a punta los servicios de Neon: Postgres (consulta real y
 * tablas de la app) y Object Storage (subir, leer, URL firmada y borrar un
 * objeto de prueba). Uso interno; requiere el header `x-internal-secret`.
 *
 *   curl https://platita.pe/api/internal/health -H 'x-internal-secret: <INTERNAL_API_SECRET>'
 */
export async function GET(req: Request) {
  const secret = req.headers.get("x-internal-secret") ?? "";
  if (!INTERNAL_API_SECRET || !safeEqual(secret, INTERNAL_API_SECRET)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const postgres: Check = dbEnabled
    ? await timed(async () => {
        const sql = getSql();
        const [row] = await sql`select current_database() as db, version() as version`;
        const tables = await sql`
          select table_name from information_schema.tables
           where table_schema = 'public'
             and table_name in ('leads', 'reclamos', 'reclamos_contador')
           order by table_name`;
        return { db: row.db, version: String(row.version).split(" ").slice(0, 2).join(" "), tables: tables.map((t) => t.table_name) };
      })
    : { ok: false, ms: 0, error: "DATABASE_URL no configurada" };

  const storage: Check = storageEnabled
    ? await timed(async () => {
        const files = getFiles();
        const key = `health/${crypto.randomUUID()}.txt`;
        const body = `platita health ${new Date().toISOString()}`;
        try {
          await files.upload(key, body, { contentType: "text/plain" });
          const read = await (await files.download(key)).text();
          if (read !== body) throw new Error("El contenido leído no coincide con el subido");
          const url = await signedUrl(key, 60);
          const viaUrl = await (await fetch(url)).text();
          if (viaUrl !== body) throw new Error("La URL firmada no devolvió el contenido");
          return { bucket: STORAGE_BUCKET, roundTrip: true, signedUrl: true };
        } finally {
          await files.delete(key).catch(() => {});
          // Confirma que el objeto de prueba no quedó en el bucket.
          if (await files.exists(key)) throw new Error("No se pudo borrar el objeto de prueba");
        }
      })
    : { ok: false, ms: 0, error: "Credenciales del bucket no configuradas" };

  const ok = postgres.ok && storage.ok;
  return NextResponse.json({ ok, postgres, storage }, { status: ok ? 200 : 503 });
}
