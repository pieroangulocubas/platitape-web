import { google } from "googleapis";
import { sanitizeForSheets } from "./validation";
import { sheetsEnabled } from "./config";

function getAuth() {
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const key = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) {
    throw new Error(
      "Faltan GOOGLE_SHEETS_CLIENT_EMAIL / GOOGLE_SHEETS_PRIVATE_KEY en las variables de entorno."
    );
  }
  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function quoteSheetName(sheetName: string) {
  return `'${sheetName.replace(/'/g, "''")}'`;
}

/** Índice 0 -> "A", 25 -> "Z", 26 -> "AA". */
function colLetter(index: number): string {
  let s = "";
  let n = index;
  do {
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return s;
}

async function appendRow(sheetName: string, headers: string[], row: string[]) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Falta GOOGLE_SHEETS_SPREADSHEET_ID en las variables de entorno.");
  }

  const sheets = google.sheets({ version: "v4", auth: getAuth() });
  const quoted = quoteSheetName(sheetName);
  const lastCol = colLetter(headers.length - 1);
  const headerRange = `${quoted}!A1:${lastCol}1`;

  // Asegura la fila de encabezados sin crear filas duplicadas:
  // `update` escribe siempre en las MISMAS celdas (A1:X1), así que dos
  // peticiones concurrentes escriben lo mismo, sin duplicar. (El patrón
  // anterior hacía `append` de headers y en carrera metía 2 filas de títulos.)
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });
  const current = existing.data.values?.[0] ?? [];
  const headersMatch =
    current.length === headers.length &&
    headers.every((h, i) => current[i] === h);
  if (!headersMatch) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });
  }

  const safeRow = row.map(sanitizeForSheets);
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${quoted}!A:${lastCol}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [safeRow] },
  });
}

const META_HEADERS = ["UTM source", "UTM medium", "UTM campaign", "Referrer", "User agent"];

const REGISTRO_HEADERS = [
  "Fecha de registro",
  "Nombre",
  "Correo",
  "Teléfono",
  "Departamento",
  "Provincia",
  "Distrito",
  "Fecha de nacimiento",
  "Monto de interés",
  ...META_HEADERS,
  "País",
];

export async function appendRegistro(row: string[]) {
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Registros";
  return appendRow(sheetName, REGISTRO_HEADERS, row);
}

/* ─────────────────────────────────────────────────────────────
 * Espejo (mirror). Google Sheets NO es la fuente de verdad cuando
 * Supabase está activo: es una copia de lectura para el equipo.
 * Estas funciones nunca lanzan; devuelven true/false y reintentan.
 * ──────────────────────────────────────────────────────────── */

async function withRetry(fn: () => Promise<void>, tries = 2): Promise<boolean> {
  for (let i = 0; i < tries; i++) {
    try {
      await fn();
      return true;
    } catch (err) {
      console.error(`[sheets] intento ${i + 1}/${tries} falló:`, err);
      if (i < tries - 1) await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
  return false;
}

export async function mirrorRegistro(row: string[]): Promise<boolean> {
  if (!sheetsEnabled) return false;
  return withRetry(() => appendRegistro(row).then(() => undefined));
}
