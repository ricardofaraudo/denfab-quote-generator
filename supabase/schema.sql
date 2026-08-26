-- ============================================================================
-- DENFAB Quote Generator — esquema de base de datos
-- ----------------------------------------------------------------------------
-- Como aplicarlo:
--   1. Entrar al proyecto en supabase.com
--   2. Menu lateral -> SQL Editor -> New query
--   3. Pegar TODO este archivo y presionar Run
--
-- Es idempotente: se puede volver a correr sin romper nada.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. Perfiles — un registro por usuario, para mostrar nombres en el historial
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users on delete cascade,
  full_name  text not null default '',
  is_admin   boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.profiles is
  'Datos visibles de cada usuario. Se crea solo al dar de alta un usuario.';

-- Crear el perfil automaticamente cuando se da de alta un usuario en Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ----------------------------------------------------------------------------
-- 2. Cotizaciones — una fila por PDF generado
-- ----------------------------------------------------------------------------
create table if not exists public.quotes (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  created_by      uuid not null references auth.users on delete restrict,

  -- Datos del cliente y del abogado emisor (que puede no ser quien la genera)
  client_name     text not null,
  salutation      text,
  lawyer_name     text not null,

  -- Que se cotizo
  language        text not null check (language in ('en', 'es')),
  service_type    text not null,
  service_config  jsonb not null default '{}'::jsonb,  -- etapa, entidad, banco, dependientes...

  -- Cuanto se cotizo
  line_items      jsonb not null default '[]'::jsonb,  -- rubros finales, ya con ajustes
  total           numeric(12,2) not null,
  has_adjustments boolean not null default false,      -- true si se edito algun rubro a mano

  -- Seguimiento comercial
  status          text not null default 'generated'
                    check (status in ('generated','sent','accepted','declined','expired')),
  notes           text
);

comment on column public.quotes.line_items is
  'Rubros tal como salieron en el PDF, con los ajustes manuales ya aplicados.';
comment on column public.quotes.has_adjustments is
  'Permite revisar cuanto se esta ajustando a mano, por abogado y por periodo.';

create index if not exists quotes_created_at_idx  on public.quotes (created_at desc);
create index if not exists quotes_created_by_idx  on public.quotes (created_by, created_at desc);
create index if not exists quotes_client_name_idx on public.quotes (lower(client_name));
create index if not exists quotes_status_idx      on public.quotes (status);


-- ----------------------------------------------------------------------------
-- 3. Seguridad a nivel de fila
--    Sin sesion iniciada no se lee ni se escribe absolutamente nada.
-- ----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.quotes   enable row level security;

-- Perfiles: todos los del despacho se ven entre si; cada quien edita el suyo.
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select to authenticated using (true);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Cotizaciones: es una herramienta del despacho, asi que todos ven todo.
-- Cada quien solo puede crear cotizaciones a su propio nombre.
drop policy if exists quotes_select on public.quotes;
create policy quotes_select on public.quotes
  for select to authenticated using (true);

drop policy if exists quotes_insert_own on public.quotes;
create policy quotes_insert_own on public.quotes
  for insert to authenticated with check (created_by = auth.uid());

-- El seguimiento (estado, notas) lo edita quien la creo, o un admin.
drop policy if exists quotes_update on public.quotes;
create policy quotes_update on public.quotes
  for update to authenticated
  using (
    created_by = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
  );

-- Nadie borra cotizaciones: son el registro historico del despacho.
-- (No se define politica de DELETE, por lo que queda prohibido para todos.)


-- ----------------------------------------------------------------------------
-- 4. Vista de apoyo para el historial (une la cotizacion con quien la genero)
-- ----------------------------------------------------------------------------
create or replace view public.quotes_with_author
with (security_invoker = true) as
  select q.*, coalesce(nullif(p.full_name, ''), 'Sin nombre') as author_name
  from public.quotes q
  left join public.profiles p on p.id = q.created_by;
