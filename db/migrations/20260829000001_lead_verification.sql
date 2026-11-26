-- Nivel 1: verificación blanda de correo y teléfono (sin fricción en el form).
-- El lead entra igual; estos campos se marcan después, de forma opcional.

alter table public.leads
  add column if not exists email_verified      boolean not null default false,
  add column if not exists email_verified_at   timestamptz,
  add column if not exists email_verify_token  text,
  add column if not exists phone_verified      boolean not null default false,
  add column if not exists phone_verified_at   timestamptz,
  add column if not exists verify_code         text;

-- El token del enlace de confirmación es único y se busca por él.
create unique index if not exists leads_email_verify_token_key
  on public.leads (email_verify_token)
  where email_verify_token is not null;

-- El código corto (para el mensaje de WhatsApp) también se busca.
create index if not exists leads_verify_code_idx
  on public.leads (verify_code)
  where verify_code is not null;
