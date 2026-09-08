-- Rango de inversión de interés declarado en el formulario de captación.
-- Métrica clave para validar la demanda (distribución de tickets).
alter table public.leads
  add column if not exists monto_interes text;
