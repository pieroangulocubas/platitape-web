import type { NextConfig } from "next";

// Cabeceras de seguridad aplicadas a todas las rutas.
const securityHeaders = [
  // Fuerza HTTPS (Vercel ya la añade en dominios propios; explícita no molesta).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Impide que el navegador "adivine" el content-type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Anti-clickjacking: la página no puede incrustarse en un iframe ajeno.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  // No filtrar la URL completa como referer hacia otros orígenes.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desactiva APIs sensibles que el sitio no usa.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
