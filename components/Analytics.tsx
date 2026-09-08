"use client";
import { useEffect } from "react";
import { GA_ID, analyticsAllowed, track } from "@/lib/analytics";

let gaLoaded = false;

function loadGA() {
  if (gaLoaded || !GA_ID) return;
  gaLoaded = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  const w = window as unknown as {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, { anonymize_ip: true });
}

/**
 * Carga GA4 solo tras consentimiento y registra eventos globales:
 * clic en los CTA de registro y profundidad de scroll.
 * El evento `lead_submit` y los del simulador se disparan desde sus componentes.
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;

    // Opt-out: carga salvo rechazo explícito previo.
    if (analyticsAllowed()) loadGA();
    const onConsent = (e: Event) => {
      const v = (e as CustomEvent).detail;
      if (v === "granted") loadGA();
      if (v === "denied" && GA_ID) {
        (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
      }
    };
    window.addEventListener("platita:consent", onConsent);

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest?.('a[href*="#registro"]')) track("cta_registro_click");
    };
    document.addEventListener("click", onClick, true);

    const seen = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = ((doc.scrollTop || window.scrollY) / max) * 100;
      for (const m of [25, 50, 75, 100]) {
        if (pct >= m && !seen.has(m)) {
          seen.add(m);
          track("scroll_depth", { percent: m });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("platita:consent", onConsent);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
