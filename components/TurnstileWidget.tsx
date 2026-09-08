"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { NEXT_PUBLIC_TURNSTILE_SITE_KEY } from "@/lib/config";

// Tipado mínimo del API global de Turnstile.
interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      action?: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
      size?: "normal" | "flexible" | "compact";
    }
  ) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export interface TurnstileHandle {
  /** Descarta el token consumido y pide uno nuevo. */
  reset: () => void;
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar Turnstile"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

interface Props {
  /** Identificador de superficie (1–32 chars): p. ej. "registro". */
  action?: string;
  onToken: (token: string | null) => void;
}

/**
 * Widget de Cloudflare Turnstile (render explícito).
 * No renderiza nada si no hay site key — el formulario sigue funcionando
 * y el servidor omite la verificación.
 */
const TurnstileWidget = forwardRef<TurnstileHandle, Props>(function TurnstileWidget(
  { action, onToken },
  ref
) {
  const boxRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | null>(null);

  useImperativeHandle(ref, () => ({
    reset() {
      try {
        if (idRef.current && window.turnstile) {
          window.turnstile.reset(idRef.current);
          onToken(null);
        }
      } catch {
        /* noop */
      }
    },
  }));

  useEffect(() => {
    if (!NEXT_PUBLIC_TURNSTILE_SITE_KEY || !boxRef.current) return;
    let cancelled = false;
    const box = boxRef.current;

    loadScript()
      .then(() => {
        if (cancelled || !window.turnstile || !box) return;
        idRef.current = window.turnstile.render(box, {
          sitekey: NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          action,
          theme: "light",
          size: "flexible",
          callback: (token) => onToken(token),
          "expired-callback": () => onToken(null),
          "error-callback": () => onToken(null),
        });
      })
      .catch(() => onToken(null));

    return () => {
      cancelled = true;
      try {
        if (idRef.current && window.turnstile) window.turnstile.remove(idRef.current);
      } catch {
        /* noop */
      }
    };
  }, [action, onToken]);

  if (!NEXT_PUBLIC_TURNSTILE_SITE_KEY) return null;
  return <div ref={boxRef} className="mt-1" />;
});

export default TurnstileWidget;
