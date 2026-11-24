-- Contador atómico del correlativo diario del Libro de Reclamaciones
-- (LR-YYYYMMDD-NNNN). Reemplaza el cálculo por count(), que podía repetir
-- números con dos reclamos simultáneos. Un registro por día (UTC).
create table if not exists public.reclamos_contador (
  dia     date primary key,
  ultimo  integer not null
);

-- Arranca el contador desde los reclamos ya existentes (si los hay).
insert into public.reclamos_contador (dia, ultimo)
select (created_at at time zone 'utc')::date,
       max(substring(correlativo from '^LR-\d{8}-(\d+)$')::int)
  from public.reclamos
 where correlativo ~ '^LR-\d{8}-\d+$'
 group by 1
on conflict (dia) do update
  set ultimo = greatest(public.reclamos_contador.ultimo, excluded.ultimo);

alter table public.reclamos_contador enable row level security;
