-- Planificador schema: complete hierarchy
-- Execute in Supabase Dashboard SQL Editor

-- Updated_at trigger function
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =============================================================
-- PROYECTOS
-- =============================================================
create table proyectos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nombre text not null,
  descripcion text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table proyectos enable row level security;
create policy "users own proyectos" on proyectos for all using (auth.uid() = user_id);
create trigger set_updated_at before update on proyectos for each row execute function set_updated_at();

-- =============================================================
-- GENERAL (1:1 con proyecto)
-- =============================================================
create table general (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  premisa text default '',
  conflicto text default '',
  idea_controladora text default '',
  contraideas text default '',
  temas text default '',
  tono text default '',
  estilo text default '',
  estructura text default '',
  resumen text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(proyecto_id)
);

alter table general enable row level security;
create policy "users own general" on general for all using (auth.uid() = user_id);
create index idx_general_proyecto on general(proyecto_id);
create trigger set_updated_at before update on general for each row execute function set_updated_at();

-- =============================================================
-- FACCIONES
-- =============================================================
create table facciones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  nombre text not null default '',
  concepto text default '',
  objetivos text default '',
  motivacion text default '',
  complicacion text default '',
  posicion int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table facciones enable row level security;
create policy "users own facciones" on facciones for all using (auth.uid() = user_id);
create index idx_facciones_proyecto on facciones(proyecto_id);
create trigger set_updated_at before update on facciones for each row execute function set_updated_at();

-- =============================================================
-- FACCION_RELACIONES
-- =============================================================
create table faccion_relaciones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  faccion_a_id uuid not null references facciones(id) on delete cascade,
  faccion_b_id uuid not null references facciones(id) on delete cascade,
  descripcion text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  check (faccion_a_id < faccion_b_id),
  unique(faccion_a_id, faccion_b_id)
);

alter table faccion_relaciones enable row level security;
create policy "users own faccion_relaciones" on faccion_relaciones for all using (auth.uid() = user_id);
create trigger set_updated_at before update on faccion_relaciones for each row execute function set_updated_at();

-- =============================================================
-- FASES
-- =============================================================
create table fases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  nombre text not null default '',
  descripcion text default '',
  posicion int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table fases enable row level security;
create policy "users own fases" on fases for all using (auth.uid() = user_id);
create index idx_fases_proyecto on fases(proyecto_id);
create trigger set_updated_at before update on fases for each row execute function set_updated_at();

-- =============================================================
-- PERSONAJES
-- =============================================================
create table personajes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  faccion_id uuid references facciones(id) on delete set null,
  nombre text not null default '',
  imagen_url text default '',
  funcion_narrativa text default '',
  motivacion text default '',
  complicacion text default '',
  tipo text default '',
  descripcion text default '',
  posicion int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table personajes enable row level security;
create policy "users own personajes" on personajes for all using (auth.uid() = user_id);
create index idx_personajes_proyecto on personajes(proyecto_id);
create index idx_personajes_faccion on personajes(faccion_id);
create trigger set_updated_at before update on personajes for each row execute function set_updated_at();

-- =============================================================
-- PERSONAJE_RELACIONES
-- =============================================================
create table personaje_relaciones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  personaje_a_id uuid not null references personajes(id) on delete cascade,
  personaje_b_id uuid not null references personajes(id) on delete cascade,
  descripcion text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  check (personaje_a_id < personaje_b_id),
  unique(personaje_a_id, personaje_b_id)
);

alter table personaje_relaciones enable row level security;
create policy "users own personaje_relaciones" on personaje_relaciones for all using (auth.uid() = user_id);
create trigger set_updated_at before update on personaje_relaciones for each row execute function set_updated_at();

-- =============================================================
-- LUGARES
-- =============================================================
create table lugares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  nombre text not null default '',
  descripcion text default '',
  posicion int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table lugares enable row level security;
create policy "users own lugares" on lugares for all using (auth.uid() = user_id);
create index idx_lugares_proyecto on lugares(proyecto_id);
create trigger set_updated_at before update on lugares for each row execute function set_updated_at();

-- =============================================================
-- EVENTOS (for future increments, but FK references needed)
-- =============================================================
create table eventos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  nombre text not null default '',
  cronologia text default '',
  descripcion text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table eventos enable row level security;
create policy "users own eventos" on eventos for all using (auth.uid() = user_id);
create index idx_eventos_proyecto on eventos(proyecto_id);
create trigger set_updated_at before update on eventos for each row execute function set_updated_at();

-- =============================================================
-- EVENTO_PERSONAJES (junction)
-- =============================================================
create table evento_personajes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  evento_id uuid not null references eventos(id) on delete cascade,
  personaje_id uuid not null references personajes(id) on delete cascade,
  unique(evento_id, personaje_id)
);

alter table evento_personajes enable row level security;
create policy "users own evento_personajes" on evento_personajes for all using (auth.uid() = user_id);

-- =============================================================
-- EVENTO_LUGARES (junction)
-- =============================================================
create table evento_lugares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  evento_id uuid not null references eventos(id) on delete cascade,
  lugar_id uuid not null references lugares(id) on delete cascade,
  unique(evento_id, lugar_id)
);

alter table evento_lugares enable row level security;
create policy "users own evento_lugares" on evento_lugares for all using (auth.uid() = user_id);

-- =============================================================
-- HITOS
-- =============================================================
create table hitos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  fase_id uuid references fases(id) on delete set null,
  lugar_id uuid references lugares(id) on delete set null,
  pov_personaje_id uuid references personajes(id) on delete set null,
  hito text not null default '',
  informacion text default '',
  efecto text default '',
  origen_informacion text default '',
  tipo text default 'normalidad' check (tipo in ('normalidad', 'cambio_de_fase', 'incidente_incitador')),
  posicion int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table hitos enable row level security;
create policy "users own hitos" on hitos for all using (auth.uid() = user_id);
create index idx_hitos_proyecto on hitos(proyecto_id);
create index idx_hitos_fase on hitos(fase_id);
create trigger set_updated_at before update on hitos for each row execute function set_updated_at();

-- =============================================================
-- HITO_PERSONAJES (junction)
-- =============================================================
create table hito_personajes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hito_id uuid not null references hitos(id) on delete cascade,
  personaje_id uuid not null references personajes(id) on delete cascade,
  unique(hito_id, personaje_id)
);

alter table hito_personajes enable row level security;
create policy "users own hito_personajes" on hito_personajes for all using (auth.uid() = user_id);

-- =============================================================
-- HITO_EVENTOS (junction)
-- =============================================================
create table hito_eventos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hito_id uuid not null references hitos(id) on delete cascade,
  evento_id uuid not null references eventos(id) on delete cascade,
  unique(hito_id, evento_id)
);

alter table hito_eventos enable row level security;
create policy "users own hito_eventos" on hito_eventos for all using (auth.uid() = user_id);

-- =============================================================
-- HITO_RELACIONES
-- =============================================================
create table hito_relaciones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hito_id uuid not null references hitos(id) on delete cascade,
  hito_anterior_id uuid not null references hitos(id) on delete cascade,
  descripcion text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table hito_relaciones enable row level security;
create policy "users own hito_relaciones" on hito_relaciones for all using (auth.uid() = user_id);
create trigger set_updated_at before update on hito_relaciones for each row execute function set_updated_at();

-- =============================================================
-- ARCOS
-- =============================================================
create table arcos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  nombre text not null default '',
  planteamiento text default '',
  nudo text default '',
  desenlace text default '',
  posicion int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table arcos enable row level security;
create policy "users own arcos" on arcos for all using (auth.uid() = user_id);
create index idx_arcos_proyecto on arcos(proyecto_id);
create trigger set_updated_at before update on arcos for each row execute function set_updated_at();

-- =============================================================
-- ARCO_EVENTOS (junction)
-- =============================================================
create table arco_eventos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  arco_id uuid not null references arcos(id) on delete cascade,
  evento_id uuid not null references eventos(id) on delete cascade,
  unique(arco_id, evento_id)
);

alter table arco_eventos enable row level security;
create policy "users own arco_eventos" on arco_eventos for all using (auth.uid() = user_id);

-- =============================================================
-- ESCENAS
-- =============================================================
create table escenas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  hito_id uuid references hitos(id) on delete set null,
  arco_id uuid references arcos(id) on delete set null,
  lugar_id uuid references lugares(id) on delete set null,
  resumen text default '',
  objetivo text default '',
  contenido jsonb,
  posicion int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table escenas enable row level security;
create policy "users own escenas" on escenas for all using (auth.uid() = user_id);
create index idx_escenas_proyecto on escenas(proyecto_id);
create trigger set_updated_at before update on escenas for each row execute function set_updated_at();

-- =============================================================
-- ESCENA_PERSONAJES (junction)
-- =============================================================
create table escena_personajes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  escena_id uuid not null references escenas(id) on delete cascade,
  personaje_id uuid not null references personajes(id) on delete cascade,
  unique(escena_id, personaje_id)
);

alter table escena_personajes enable row level security;
create policy "users own escena_personajes" on escena_personajes for all using (auth.uid() = user_id);

-- =============================================================
-- ARCO_ESCENAS (junction)
-- =============================================================
create table arco_escenas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  arco_id uuid not null references arcos(id) on delete cascade,
  escena_id uuid not null references escenas(id) on delete cascade,
  unique(arco_id, escena_id)
);

alter table arco_escenas enable row level security;
create policy "users own arco_escenas" on arco_escenas for all using (auth.uid() = user_id);
