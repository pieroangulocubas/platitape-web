import { verifyEmailByToken } from "@/lib/supabase";
import { supabaseEnabled } from "@/lib/config";

export const dynamic = "force-dynamic";

/** Escapa texto para interpolarlo con seguridad dentro de HTML. */
function esc(s: string): string {
  return s.replace(/[<>&"']/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

function page(title: string, body: string): Response {
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} · Platita.pe</title></head>
<body style="margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f7f8fc;color:#1c0f4c">
  <div style="max-width:460px;margin:12vh auto;padding:40px 28px;background:#fff;border:1px solid #e6e3f5;border-radius:20px;text-align:center;box-shadow:0 10px 40px rgba(28,15,76,.08)">
    <div style="width:64px;height:64px;border-radius:50%;margin:0 auto 16px;background:linear-gradient(135deg,#6cdcff,#bc45e9);display:flex;align-items:center;justify-content:center;font-size:30px">✓</div>
    <h1 style="font-size:20px;margin:0 0 8px">${title}</h1>
    <p style="font-size:14px;line-height:1.6;color:#57516f;margin:0 0 24px">${body}</p>
    <a href="/" style="display:inline-block;background:linear-gradient(135deg,#6cdcff,#bc45e9);color:#fff;text-decoration:none;padding:11px 24px;border-radius:10px;font-size:14px;font-weight:700">Volver a Platita.pe</a>
  </div>
</body></html>`;
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";

  if (!supabaseEnabled) {
    return page("Verificación no disponible", "Inténtalo más tarde o escríbenos por WhatsApp.");
  }

  const r = await verifyEmailByToken(token);
  if (!r.ok) {
    return page(
      "Enlace no válido",
      "Este enlace ya fue usado o expiró. Si ya te registraste, no necesitas hacer nada más."
    );
  }
  const first = esc((r.nombre ?? "").split(" ")[0]).slice(0, 40);
  return page(
    "¡Correo confirmado!",
    `${first ? first + ", tu" : "Tu"} lugar en la lista de espera está asegurado. Te avisaremos antes del lanzamiento.`
  );
}
