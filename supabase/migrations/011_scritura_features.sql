-- ══════════════════════════════════════════════════════════════
-- Migration 011: New features (estado, POV, versions, tasks, ideas, routes)
-- ══════════════════════════════════════════════════════════════

-- ── Scene status + POV ──────────────────────────────────────
ALTER TABLE escenas ADD COLUMN IF NOT EXISTS estado text DEFAULT 'primer_borrador';
ALTER TABLE escenas ADD CONSTRAINT escenas_estado_check
  CHECK (estado IN ('primer_borrador','segundo_borrador','tercer_borrador','version_final'));
ALTER TABLE escenas ADD COLUMN IF NOT EXISTS pov_personaje_id uuid REFERENCES personajes(id) ON DELETE SET NULL;

-- ── Scene versions (immutable snapshots) ────────────────────
CREATE TABLE IF NOT EXISTS escena_versiones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  escena_id uuid REFERENCES escenas(id) ON DELETE CASCADE NOT NULL,
  contenido jsonb,
  nombre text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE escena_versiones ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Users can manage their own escena_versiones"
    ON escena_versiones FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── Tasks per scene ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS escena_tareas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  escena_id uuid REFERENCES escenas(id) ON DELETE CASCADE NOT NULL,
  proyecto_id uuid REFERENCES proyectos(id) ON DELETE CASCADE NOT NULL,
  titulo text NOT NULL DEFAULT '',
  descripcion text DEFAULT '',
  estado text DEFAULT 'pendiente',
  posicion int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE escena_tareas ADD CONSTRAINT escena_tareas_estado_check
  CHECK (estado IN ('pendiente','en_progreso','completada'));
ALTER TABLE escena_tareas ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Users can manage their own escena_tareas"
    ON escena_tareas FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TRIGGER set_updated_at BEFORE UPDATE ON escena_tareas
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── Ideas ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  proyecto_id uuid REFERENCES proyectos(id) ON DELETE CASCADE NOT NULL,
  titulo text NOT NULL DEFAULT '',
  descripcion text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Users can manage their own ideas"
    ON ideas FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TRIGGER set_updated_at BEFORE UPDATE ON ideas
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS escena_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  escena_id uuid REFERENCES escenas(id) ON DELETE CASCADE NOT NULL,
  idea_id uuid REFERENCES ideas(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(escena_id, idea_id)
);
ALTER TABLE escena_ideas ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Users can manage their own escena_ideas"
    ON escena_ideas FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── Character routes on map ─────────────────────────────────
CREATE TABLE IF NOT EXISTS lugar_rutas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  proyecto_id uuid REFERENCES proyectos(id) ON DELETE CASCADE NOT NULL,
  lugar_id uuid REFERENCES lugares(id) ON DELETE CASCADE NOT NULL,
  personaje_id uuid REFERENCES personajes(id) ON DELETE CASCADE NOT NULL,
  nombre text DEFAULT '',
  color text DEFAULT '#8b6f47',
  puntos jsonb DEFAULT '[]'::jsonb,
  posicion int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE lugar_rutas ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Users can manage their own lugar_rutas"
    ON lugar_rutas FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TRIGGER set_updated_at BEFORE UPDATE ON lugar_rutas
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
