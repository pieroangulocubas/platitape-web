import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import { SITE_URL, WA_CHANNEL_URL } from "@/lib/config";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const TITLE = "Platita.pe — Haz crecer tu dinero en bienes raíces";
const DESCRIPTION =
  "Invierte desde S/10,000 en proyectos inmobiliarios seleccionados del Perú. Rentabilidades de hasta 20% anual según el monto. 100% online, con contrato notarial.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Platita.pe",
  },
  description: DESCRIPTION,
  applicationName: "Platita.pe",
  keywords: [
    "inversión",
    "bienes raíces",
    "Perú",
    "inmobiliaria",
    "rentabilidad",
    "fintech",
    "invertir en Perú",
    "contrato mutuo",
  ],
  authors: [{ name: "Platita.pe" }],
  creator: "Platita.pe",
  publisher: "Platita.pe",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE_URL,
    siteName: "Platita.pe",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Platita.pe — invierte en bienes raíces en Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1c0f4c",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Platita.pe",
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      description: DESCRIPTION,
      sameAs: [WA_CHANNEL_URL],
      areaServed: {
        "@type": "Country",
        name: "Perú",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Platita.pe",
      inLanguage: "es-PE",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ScrollReveal />
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
