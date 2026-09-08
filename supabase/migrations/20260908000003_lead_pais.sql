-- País de residencia del lead. "Perú" por defecto; texto libre
-- ("Ciudad, País") cuando el lead marca "Vivo fuera del Perú".
-- Para leads del extranjero, departamento/provincia/distrito quedan vacíos.
alter table public.leads
  add column if not exists pais text;
