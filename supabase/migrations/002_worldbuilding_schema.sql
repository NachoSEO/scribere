-- ============================================================
-- 002 · Worldbuilding schema
-- ============================================================

-- ── Mundos ───────────────────────────────────────────────────

create table mundos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  nombre      text not null default '',
  descripcion text not null default '',
  mapa_url    text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger set_updated_at before update on mundos
  for each row execute function set_updated_at();

alter table mundos enable row level security;
create policy "users own mundos" on mundos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Cronología: Eras ─────────────────────────────────────────

create table cronologia_eras (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  mundo_id    uuid not null references mundos(id) on delete cascade,
  nombre      text not null default '',
  descripcion text not null default '',
  posicion    int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_cronologia_eras_mundo on cronologia_eras(mundo_id);

create trigger set_updated_at before update on cronologia_eras
  for each row execute function set_updated_at();

alter table cronologia_eras enable row level security;
create policy "users own cronologia_eras" on cronologia_eras
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Cronología: Eventos (hijos de era) ───────────────────────

create table cronologia_eventos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  era_id      uuid not null references cronologia_eras(id) on delete cascade,
  nombre      text not null default '',
  descripcion text not null default '',
  posicion    int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_cronologia_eventos_era on cronologia_eventos(era_id);

create trigger set_updated_at before update on cronologia_eventos
  for each row execute function set_updated_at();

alter table cronologia_eventos enable row level security;
create policy "users own cronologia_eventos" on cronologia_eventos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Regiones (jerárquicas: region_padre_id) ──────────────────

create table regiones (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  mundo_id        uuid not null references mundos(id) on delete cascade,
  region_padre_id uuid references regiones(id) on delete set null,
  nombre          text not null default '',
  tipo            text not null default '',
  descripcion     text not null default '',
  posicion        int  not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_regiones_mundo on regiones(mundo_id);
create index idx_regiones_padre on regiones(region_padre_id);

create trigger set_updated_at before update on regiones
  for each row execute function set_updated_at();

alter table regiones enable row level security;
create policy "users own regiones" on regiones
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Culturas ─────────────────────────────────────────────────

create table culturas (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  mundo_id      uuid not null references mundos(id) on delete cascade,
  nombre        text not null default '',
  descripcion   text not null default '',
  costumbres    text not null default '',
  lengua        text not null default '',
  organizacion  text not null default '',
  posicion      int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_culturas_mundo on culturas(mundo_id);

create trigger set_updated_at before update on culturas
  for each row execute function set_updated_at();

alter table culturas enable row level security;
create policy "users own culturas" on culturas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Sistemas ─────────────────────────────────────────────────

create table sistemas (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  mundo_id      uuid not null references mundos(id) on delete cascade,
  nombre        text not null default '',
  tipo          text not null default '',
  descripcion   text not null default '',
  reglas        text not null default '',
  limitaciones  text not null default '',
  posicion      int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_sistemas_mundo on sistemas(mundo_id);

create trigger set_updated_at before update on sistemas
  for each row execute function set_updated_at();

alter table sistemas enable row level security;
create policy "users own sistemas" on sistemas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Vincular proyectos con mundos ────────────────────────────

alter table proyectos
  add column mundo_id uuid references mundos(id) on delete set null;

-- ── Storage: bucket mapas ────────────────────────────────────

insert into storage.buckets (id, name, public) values ('mapas', 'mapas', true)
  on conflict (id) do nothing;

create policy "users upload mapas" on storage.objects
  for insert with check (
    bucket_id = 'mapas' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "users update mapas" on storage.objects
  for update using (
    bucket_id = 'mapas' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "users delete mapas" on storage.objects
  for delete using (
    bucket_id = 'mapas' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "public read mapas" on storage.objects
  for select using (bucket_id = 'mapas');
