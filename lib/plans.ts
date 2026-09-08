// Planes de inversión escalonados — la tasa depende del monto invertido.
// Cuando un inversionista incrementa su capital y cruza a una nueva categoría,
// su saldo total se consolida en un nuevo contrato de 12 meses a la tasa de esa categoría.

export interface PlanTier {
  id: number;
  min: number;
  max: number | null; // null = sin tope
  rate: number; // tasa anual, ej. 0.16 = 16%
  label: string;
}

export const PLAN_TIERS: PlanTier[] = [
  { id: 1, min: 10000, max: 49999, rate: 0.14, label: "Plan 1" },
  { id: 2, min: 50000, max: 99999, rate: 0.16, label: "Plan 2" },
  { id: 3, min: 100000, max: 499999, rate: 0.18, label: "Plan 3" },
  { id: 4, min: 500000, max: null, rate: 0.20, label: "Plan 4" },
];

export const MIN_INVESTMENT = PLAN_TIERS[0].min;
export const MAX_RATE = PLAN_TIERS[PLAN_TIERS.length - 1].rate;
export const MIN_RATE = PLAN_TIERS[0].rate;

export function getPlanForAmount(amount: number): PlanTier {
  for (const tier of PLAN_TIERS) {
    if (amount >= tier.min && (tier.max === null || amount <= tier.max)) return tier;
  }
  return amount > PLAN_TIERS[PLAN_TIERS.length - 1].min
    ? PLAN_TIERS[PLAN_TIERS.length - 1]
    : PLAN_TIERS[0];
}

/* ── Slider del simulador ──────────────────────────────────────────
 * Escala por TRAMOS: cada segmento de igual longitud en el slider
 * corresponde a un tramo de plan. Así las etiquetas (S/10K · S/50K ·
 * S/100K · S/500K · S/1M) caen exactamente en 0/25/50/75/100 % y
 * arrastrar es intuitivo (cada cuarto = un plan).
 */
export const SLIDER_STOPS = [10_000, 50_000, 100_000, 500_000, 1_000_000];
const SEGMENTS = SLIDER_STOPS.length - 1;

/** Posición 0–1 del slider → monto (redondeado al step). */
export function sliderPosToAmount(pos: number, step = 1000): number {
  const p = Math.min(1, Math.max(0, pos));
  const seg = Math.min(SEGMENTS - 1, Math.floor(p * SEGMENTS));
  const localT = p * SEGMENTS - seg;
  const raw = SLIDER_STOPS[seg] + localT * (SLIDER_STOPS[seg + 1] - SLIDER_STOPS[seg]);
  return Math.round(raw / step) * step;
}

/** Monto → posición 0–1 del slider. */
export function amountToSliderPos(amount: number): number {
  const a = Math.min(SLIDER_STOPS[SEGMENTS], Math.max(SLIDER_STOPS[0], amount));
  for (let i = 0; i < SEGMENTS; i++) {
    if (a <= SLIDER_STOPS[i + 1]) {
      const localT = (a - SLIDER_STOPS[i]) / (SLIDER_STOPS[i + 1] - SLIDER_STOPS[i]);
      return (i + localT) / SEGMENTS;
    }
  }
  return 1;
}
