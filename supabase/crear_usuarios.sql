-- ============================================================================
-- DENFAB Quote Generator — alta de usuarios en lote
-- ----------------------------------------------------------------------------
-- Crear usuarios uno por uno en el panel es tedioso cuando son mas de diez.
-- Este script los crea todos de una vez, ya confirmados y listos para entrar.
--
-- COMO USARLO
--   1. Editar la lista de abajo: correo, nombre y contrasena inicial.
--   2. Supabase -> SQL Editor -> New query -> pegar todo -> Run.
--   3. Entregar a cada persona su contrasena inicial por un medio seguro
--      (en persona, o por un gestor de contrasenas). NO por correo ni chat.
--
-- Es idempotente: si un correo ya existe, se omite y no se pisa su contrasena.
--
-- IMPORTANTE: estas son contrasenas TEMPORALES. Cada quien deberia cambiarla
-- la primera vez que entre. Ver la nota al final sobre como cambiarlas.
-- ============================================================================

-- Requerido para encriptar las contrasenas.
create extension if not exists pgcrypto;

do $$
declare
  nuevo record;
  uid uuid;
begin
  for nuevo in
    -- ----------------------------------------------------------------------
    -- EDITAR AQUI: una linea por persona.
    --   (correo, nombre completo, contrasena inicial)
    -- Agregar o quitar lineas segun haga falta. Ojo con las comas al final.
    -- ----------------------------------------------------------------------
    select * from (values
      ('carlos.neuman@denfablaw.com',      'Carlos Neuman',         'CambiarEsto2026!'),
      ('gonzalo.delaguardia@denfablaw.com','Gonzalo De La Guardia', 'CambiarEsto2026!'),
      ('enrique.bermudez@denfablaw.com',   'Enrique Bermudez',      'CambiarEsto2026!')
      -- ('otro.abogado@denfablaw.com',    'Nombre Apellido',       'CambiarEsto2026!'),
    ) as t(correo, nombre, clave)
  loop
    -- Si ya existe, no se toca.
    if exists (select 1 from auth.users u where lower(u.email) = lower(nuevo.correo)) then
      raise notice 'Ya existia, se omite: %', nuevo.correo;
      continue;
    end if;

    uid := gen_random_uuid();

    insert into auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at
    ) values (
      uid,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      lower(nuevo.correo),
      crypt(nuevo.clave, gen_salt('bf')),
      now(),                                    -- confirmado: entra de una
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('full_name', nuevo.nombre),
      now(), now()
    );

    -- Identidad de correo, que es lo que Supabase usa para el login.
    insert into auth.identities (
      id, user_id, provider_id, provider, identity_data, created_at, updated_at
    ) values (
      gen_random_uuid(), uid, lower(nuevo.correo), 'email',
      jsonb_build_object('sub', uid::text, 'email', lower(nuevo.correo), 'email_verified', true),
      now(), now()
    );

    -- El trigger de perfiles ya lo creo; aseguramos el nombre.
    insert into public.profiles (id, full_name)
    values (uid, nuevo.nombre)
    on conflict (id) do update set full_name = excluded.full_name;

    raise notice 'Creado: % (%)', nuevo.correo, nuevo.nombre;
  end loop;
end $$;

-- Revisar como quedo la lista:
select u.email,
       p.full_name as nombre,
       (u.email_confirmed_at is not null) as confirmado,
       u.created_at as creado
from auth.users u
left join public.profiles p on p.id = u.id
order by u.created_at;


-- ============================================================================
-- CAMBIAR LA CONTRASENA DE ALGUIEN
-- ----------------------------------------------------------------------------
-- Descomentar, poner el correo y la nueva contrasena, y correr solo esa parte:
--
--   update auth.users
--   set encrypted_password = crypt('NuevaClaveSegura2026!', gen_salt('bf')),
--       updated_at = now()
--   where lower(email) = lower('persona@denfablaw.com');
--
-- ============================================================================
-- DAR DE BAJA A ALGUIEN (por ejemplo si deja el despacho)
-- ----------------------------------------------------------------------------
-- Las cotizaciones que hizo NO se borran: quedan como registro del despacho.
-- Por eso created_by es "on delete restrict" y hay que revocarle el acceso
-- en vez de borrar el usuario. Se le cambia la contrasena por una aleatoria:
--
--   update auth.users
--   set encrypted_password = crypt(gen_random_uuid()::text, gen_salt('bf')),
--       updated_at = now()
--   where lower(email) = lower('exempleado@denfablaw.com');
--
-- ============================================================================
