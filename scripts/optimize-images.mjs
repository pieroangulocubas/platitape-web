// Optimiza las imágenes de /public: redimensiona al ancho de display real
// y convierte a WebP. Reejecutable — si llegan imágenes nuevas del cliente,
// añádelas a JOBS y corre `node scripts/optimize-images.mjs`.
//
// Requiere `sharp` (viene con Next.js). No borra los originales salvo que
// pases --replace; por defecto solo escribe el .webp al lado.

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.resolve("public");
const REPLACE = process.argv.includes("--replace");

// width = ancho máximo de salida en px (2x del display). quality = 1-100.
const JOBS = [
  // Fotos de proyectos — se muestran en tarjetas, ~600px de ancho
  { in: "p-habilitaciones.PNG", out: "p-habilitaciones.webp", width: 1200, quality: 78 },
  { in: "p-inmuebles.PNG",      out: "p-inmuebles.webp",      width: 1200, quality: 78 },
  { in: "p-construccion.PNG",   out: "p-construccion.webp",   width: 1200, quality: 78 },
  { in: "p-subastas.PNG",       out: "p-subastas.webp",       width: 1200, quality: 78 },

  // Fondo del hero — CSS background-image, Next no lo optimiza
  { in: "llama-hero-bg.png", out: "llama-hero-bg.webp", width: 1600, quality: 80 },

  // Miniatura del VSL
  { in: "miniatura-vsl.png", out: "miniatura-vsl.webp", width: 1400, quality: 78 },

  // Recorte de llama con transparencia (WebP conserva alpha)
  { in: "llama-cutout.png", out: "llama-cutout.webp", width: 800, quality: 82 },
  { in: "llama-bg.png",     out: "llama-bg.webp",     width: 480, quality: 82 },
  // Llama voladora del hero — upscale lanczos + sharpen para nitidez
  { in: "llama-volando.png", out: "hero-llama-volando.webp", width: 900, quality: 90, sharpen: true },
  { in: "hero-llama-mobile.png", out: "hero-llama-mobile.webp", width: 860, quality: 88, sharpen: true },

  // Logo / isotipo — wordmark ancho, siempre se muestra pequeño
  { in: "isotipo.png", out: "isotipo.webp", width: 1000, quality: 88 },

  // Sellos de respaldo — se muestran a 28px de alto en un ticker, 240px sobra
  { in: "respaldo/indecopi.PNG", out: "respaldo/indecopi.webp", width: 240, quality: 82 },
  { in: "respaldo/sunarp.PNG",   out: "respaldo/sunarp.webp",   width: 240, quality: 82 },
  { in: "respaldo/sunat.PNG",    out: "respaldo/sunat.webp",    width: 240, quality: 82 },
  { in: "respaldo/notaria.PNG",  out: "respaldo/notaria.webp",  width: 240, quality: 82 },

  // Iconos del comparativo (ya son 400x400, solo cambia el formato)
  { in: "icons/banco-norm.png",       out: "icons/banco-norm.webp",       width: 400, quality: 84 },
  { in: "icons/cajas-norm.png",       out: "icons/cajas-norm.webp",       width: 400, quality: 84 },
  { in: "icons/fondos-norm.png",      out: "icons/fondos-norm.webp",      width: 400, quality: 84 },
  { in: "icons/acciones-norm.png",    out: "icons/acciones-norm.webp",    width: 400, quality: 84 },
  { in: "icons/informacion-norm.png", out: "icons/informacion-norm.webp", width: 400, quality: 84 },

  // Iconos de planes (1536x1024 -> se muestran chicos)
  { in: "icons/cartera-magenta.png",  out: "icons/cartera-magenta.webp",  width: 600, quality: 84 },
  { in: "icons/cartera-blue.png",     out: "icons/cartera-blue.webp",     width: 600, quality: 84 },
  { in: "icons/diamante-magenta.png", out: "icons/diamante-magenta.webp", width: 600, quality: 84 },
];

let before = 0;
let after = 0;
let done = 0;

for (const job of JOBS) {
  const src = path.join(PUBLIC, job.in);
  const dst = path.join(PUBLIC, job.out);
  if (!fs.existsSync(src)) {
    console.warn(`SKIP  ${job.in} (no existe)`);
    continue;
  }
  const srcBytes = fs.statSync(src).size;
  await sharp(src)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(dst);
  const dstBytes = fs.statSync(dst).size;
  before += srcBytes;
  after += dstBytes;
  done++;
  const pct = ((1 - dstBytes / srcBytes) * 100).toFixed(0);
  console.log(
    `OK    ${job.in.padEnd(30)} ${(srcBytes / 1024).toFixed(0).padStart(6)} KB -> ${(dstBytes / 1024).toFixed(0).padStart(5)} KB  (-${pct}%)`
  );
  if (REPLACE && path.resolve(src) !== path.resolve(dst)) fs.rmSync(src);
}

console.log(
  `\n${done} imágenes  ${(before / 1024 / 1024).toFixed(1)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB` +
    `  (-${((1 - after / before) * 100).toFixed(0)}%)`
);
if (!REPLACE) console.log("Originales conservados. Corre con --replace para borrarlos.");
