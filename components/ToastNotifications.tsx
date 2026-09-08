"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/* ── Personas (pool amplio, se barajan sin repetir) ────────────── */
const GRADIENTS = [
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#22d3ee,#8b5cf6)",
  "linear-gradient(135deg,#ec4899,#f97316)",
  "linear-gradient(135deg,#06b6d4,#8b5cf6)",
  "linear-gradient(135deg,#a855f7,#22d3ee)",
  "linear-gradient(135deg,#f97316,#ec4899)",
  "linear-gradient(135deg,#22d3ee,#06b6d4)",
];

const RAW_USERS: [string, string, string][] = [
  ["JL", "José L.", "Lima"],
  ["CM", "Carlos M.", "Arequipa"],
  ["LR", "Lucía R.", "Trujillo"],
  ["AT", "Ana T.", "Chiclayo"],
  ["MP", "Miguel P.", "Cusco"],
  ["SR", "Sara R.", "Piura"],
  ["DV", "Diego V.", "Iquitos"],
  ["MG", "María G.", "Huancayo"],
  ["RQ", "Roberto Q.", "Tacna"],
  ["KF", "Karen F.", "Ica"],
  ["JV", "Javier V.", "San Miguel, Lima"],
  ["PC", "Paola C.", "Surco, Lima"],
  ["FR", "Fernando R.", "Cajamarca"],
  ["NL", "Noelia L.", "Huánuco"],
  ["GS", "Gonzalo S.", "Pucallpa"],
  ["BM", "Brenda M.", "Tarapoto"],
  ["EC", "Enzo C.", "Juliaca"],
  ["VH", "Valeria H.", "Chimbote"],
  ["RA", "Renzo A.", "Los Olivos, Lima"],
  ["CT", "Camila T.", "Ayacucho"],
  ["HL", "Hugo L.", "Puno"],
  ["MI", "Micaela I.", "Barranco, Lima"],
  ["LS", "Luis S.", "Sullana"],
  ["DR", "Daniela R.", "Moquegua"],
  ["AF", "Andrés F.", "Jesús María, Lima"],
  ["TM", "Tania M.", "Huaraz"],
];

const USERS = RAW_USERS.map(([initials, name, city], i) => ({
  initials,
  name,
  city,
  gradient: GRADIENTS[i % GRADIENTS.length],
}));

/* ── Eventos (variados, algunos con datos dinámicos) ───────────── */
const AMOUNTS = [10000, 12000, 15000, 20000, 25000, 30000, 40000, 50000];
const MONTHS = [12, 18, 24];
const soles = (n: number) => "S/ " + n.toLocaleString("es-PE");
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

const EVENT_TEMPLATES: Array<() => string> = [
  () => "se unió a la lista de espera",
  () => "reservó su lugar prioritario",
  () => "acaba de registrarse",
  () => "completó su registro",
  () => "guardó su cupo de pre-lanzamiento",
  () => `simuló una inversión de ${soles(pick(AMOUNTS))}`,
  () => `calculó su rentabilidad a ${pick(MONTHS)} meses`,
  () => `quiere invertir ${soles(pick(AMOUNTS))} al lanzamiento`,
  () => "revisó los planes de inversión",
  () => "está viendo los proyectos disponibles",
  () => "se unió al canal de WhatsApp",
  () => "comparó Platita.pe con su banco",
  () => "pidió más información",
  () => "compartió Platita.pe",
];

interface ToastItem {
  id: number;
  user: (typeof USERS)[number];
  action: string;
  entering: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ToastNotifications() {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const [reduced, setReduced] = useState(false);

  const deckRef = useRef<number[]>([]);
  const lastUserRef = useRef<number>(-1);
  const lastActionRef = useRef<string>("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  /** Índice de persona: baraja completa sin repetir; sin repetir tampoco entre barajas. */
  const nextUserIndex = useCallback(() => {
    if (deckRef.current.length === 0) {
      let deck = shuffle(USERS.map((_, i) => i));
      if (deck[deck.length - 1] === lastUserRef.current && deck.length > 1) {
        [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
      }
      deckRef.current = deck;
    }
    const idx = deckRef.current.pop()!;
    lastUserRef.current = idx;
    return idx;
  }, []);

  /** Cadencia irregular: ráfagas cortas, ritmo normal y silencios largos. */
  const nextDelay = useCallback(() => {
    const r = Math.random();
    if (r < 0.15) return 4000 + Math.random() * 5000; // ráfaga 4–9 s
    if (r < 0.8) return 14000 + Math.random() * 20000; // normal 14–34 s
    return 38000 + Math.random() * 32000; // silencio 38–70 s
  }, []);

  const scheduleNext = useCallback(
    (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    },
    []
  );

  const showToast = useCallback(() => {
    // Si la pestaña está oculta, no gastamos un evento: reintenta pronto.
    if (typeof document !== "undefined" && document.hidden) {
      scheduleNext(showToast, 8000 + Math.random() * 12000);
      return;
    }

    const user = USERS[nextUserIndex()];

    let action = pick(EVENT_TEMPLATES)();
    for (let i = 0; i < 3 && action === lastActionRef.current; i++) {
      action = pick(EVENT_TEMPLATES)();
    }
    lastActionRef.current = action;

    const id = Date.now() + Math.random();
    setToast({ id, user, action, entering: true });

    const visibleMs = 4200 + Math.random() * 1500;
    scheduleNext(
      () => setToast((prev) => (prev?.id === id ? { ...prev, entering: false } : prev)),
      visibleMs
    );
    scheduleNext(
      () => setToast((prev) => (prev?.id === id ? null : prev)),
      visibleMs + 600
    );

    scheduleNext(showToast, nextDelay());
  }, [nextUserIndex, nextDelay, scheduleNext]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);

    // Primer toast: retraso aleatorio 3.5–9.5 s.
    scheduleNext(showToast, 3500 + Math.random() * 6000);

    return () => {
      clearAll();
      mq.removeEventListener?.("change", onChange);
    };
  }, [showToast, scheduleNext]);

  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "100px",
        left: "24px",
        zIndex: 40,
        pointerEvents: "none",
        transition: reduced
          ? "opacity 0.3s ease"
          : toast.entering
            ? "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease"
            : "transform 0.35s ease-in, opacity 0.35s ease-in",
        transform: reduced
          ? "none"
          : toast.entering
            ? "translateY(0) scale(1)"
            : "translateY(16px) scale(0.94)",
        opacity: toast.entering ? 1 : 0,
      }}
    >
      <div
        style={{
          background: "rgba(18,11,48,0.96)",
          border: "1px solid rgba(139,92,246,0.35)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRadius: "18px",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          maxWidth: "260px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: toast.user.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            color: "white",
            flexShrink: 0,
          }}
        >
          {toast.user.initials}
        </div>

        {/* Text */}
        <div style={{ minWidth: 0 }}>
          <p style={{ color: "white", fontSize: "13px", fontWeight: 600, lineHeight: 1.25, margin: 0 }}>
            {toast.user.name}{" "}
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 400 }}>
              · {toast.user.city}
            </span>
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "3px", lineHeight: 1.3 }}>
            {toast.action}
          </p>
        </div>

        {/* Live dot */}
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#22d3ee",
            flexShrink: 0,
            boxShadow: "0 0 6px rgba(34,211,238,0.8)",
            animation: "pulse-dot 2s infinite",
          }}
        />
      </div>
    </div>
  );
}
