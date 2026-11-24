import type { CSSProperties } from "react";

// Convierte una cadena CSS en línea ("a:b;c:d") en el objeto de estilos de React.
// El marcado de la landing viene de Claude Design con estilos como texto; se
// cachea por cadena porque muchas se repiten en cada render.
const cache = new Map<string, CSSProperties>();

function prop(name: string): string {
  if (name.startsWith("--")) return name;
  const p = name.startsWith("-ms-") ? name.slice(1) : name;
  return p.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()).replace(/^-([a-z])/, (_, c: string) => c.toUpperCase());
}

/** Divide por ";" respetando paréntesis y comillas (url(), gradientes, data URIs). */
function split(css: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let quote = "";
  let cur = "";
  for (const ch of css) {
    if (quote) {
      if (ch === quote) quote = "";
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (ch === ";" && depth === 0) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

export function sx(css: string): CSSProperties {
  const hit = cache.get(css);
  if (hit) return hit;
  const style: Record<string, string> = {};
  for (const decl of split(css)) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const name = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!name || value === "" || value === "undefined" || value === "null") continue;
    style[prop(name)] = value;
  }
  if (cache.size > 5000) cache.clear();
  cache.set(css, style as CSSProperties);
  return style as CSSProperties;
}
