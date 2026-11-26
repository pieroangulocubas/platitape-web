import { Files } from "files-sdk";
import { neon } from "files-sdk/neon";
import {
  STORAGE_ACCESS_KEY_ID,
  STORAGE_BUCKET,
  STORAGE_ENDPOINT,
  STORAGE_REGION,
  STORAGE_SECRET_ACCESS_KEY,
  storageEnabled,
} from "./config";

// Object Storage de Neon (bucket privado, S3-compatible) — solo servidor.
// Se guarda la KEY del objeto en Postgres y se firma una URL al leer.
// NUNCA importar este módulo desde un componente cliente.
let _files: Files | null = null;

export function getFiles(): Files {
  if (!storageEnabled) {
    throw new Error(
      "Object Storage no está configurado (faltan NEON_STORAGE_* o AWS_* del bucket)."
    );
  }
  if (!_files) {
    _files = new Files({
      adapter: neon({
        bucket: STORAGE_BUCKET,
        endpoint: STORAGE_ENDPOINT,
        region: STORAGE_REGION,
        accessKeyId: STORAGE_ACCESS_KEY_ID,
        secretAccessKey: STORAGE_SECRET_ACCESS_KEY,
      }),
    });
  }
  return _files;
}

/** URL firmada de lectura para un objeto privado (por defecto, 1 hora). */
export function signedUrl(key: string, expiresIn = 3600): Promise<string> {
  return getFiles().url(key, { expiresIn });
}
