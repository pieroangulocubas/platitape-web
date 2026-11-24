-- Tabla única de leads (registros del formulario + captadores).
-- Fuente de verdad. Google Sheets es sólo un espejo de lectura.

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id                uuid primary key default gen_random_uuid(),
  tipo              text not null check (tipo in ('registro', 'captador')),
  nombre            text not null,
  correo            text not null,
  telefono          text,
  departamento      text,
  provincia         text,
  distrito          text,
  fecha_nacimiento  date,
  mensaje           text,
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  referrer          text,
  user_agent        text,
  sheets_synced     boolean not null default false,
  sheets_synced_at  timestamptz,
  created_at        timestamptz not null default now()
);

-- Deduplicación: un mismo correo no se registra dos veces por tipo.
create unique index if not exists leads_tipo_correo_key
  on public.leads (tipo, lower(correo));

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

-- Para el reintento de espejo a Sheets (scripts/resync-sheets.mjs).
create index if not exists leads_unsynced_idx
  on public.leads (created_at)
  where sheets_synced = false;

-- RLS activo y SIN políticas: sólo la Secret Key (service role) puede
-- leer/escribir. El navegador nunca accede a esta tabla directamente.
alter table public.leads enable row level security;
