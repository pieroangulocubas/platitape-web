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
