-- Libro de Reclamaciones virtual (D.S. N.° 011-2011-PCM y modificatorias).
-- Fuente de verdad de las hojas de reclamación. RLS activo sin políticas:
-- sólo la Secret Key (service role) accede. El navegador nunca lee esta tabla.

create extension if not exists "pgcrypto";

create table if not exists public.reclamos (
  id                 uuid primary key default gen_random_uuid(),
  -- Correlativo visible de la hoja de reclamación (ej. LR-20260908-0001).
  correlativo        text not null unique,

  -- Identificación del consumidor
  consumidor_nombre  text not null,
  tipo_documento     text not null check (tipo_documento in ('DNI','CE','PASAPORTE','RUC')),
  numero_documento   text not null,
  domicilio          text,
  correo             text not null,
  telefono           text,
  es_menor           boolean not null default false,
  apoderado_nombre   text,

  -- Identificación del bien contratado
  bien_tipo          text not null check (bien_tipo in ('producto','servicio')),
  bien_descripcion   text not null,
  monto_reclamado    numeric(12,2),

  -- Detalle
  tipo_solicitud     text not null check (tipo_solicitud in ('reclamo','queja')),
  detalle            text not null,
  pedido             text not null,

  -- Estado de gestión interna
  estado             text not null default 'pendiente'
                       check (estado in ('pendiente','en_proceso','resuelto','cerrado')),
  respuesta          text,
  respondido_at      timestamptz,

  -- Metadatos
  ip                 text,
  user_agent         text,
  created_at         timestamptz not null default now()
);

create index if not exists reclamos_created_at_idx
  on public.reclamos (created_at desc);

create index if not exists reclamos_estado_idx
  on public.reclamos (estado)
  where estado in ('pendiente','en_proceso');

alter table public.reclamos enable row level security;
