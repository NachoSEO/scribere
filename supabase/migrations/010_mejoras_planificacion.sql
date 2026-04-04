-- 010_mejoras_planificacion.sql
-- Fix personaje_evoluciones + nuevos campos

-- ── Fix personaje_evoluciones (idempotente) ─────────────────
CREATE TABLE IF NOT EXISTS personaje_evoluciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  personaje_id uuid NOT NULL REFERENCES personajes(id) ON DELETE CASCADE,
  arco_id uuid REFERENCES arcos(id) ON DELETE SET NULL,
  escena_id uuid REFERENCES escenas(id) ON DELETE SET NULL,
  nombre_etapa text NOT NULL DEFAULT '',
  descripcion text DEFAULT '',
  posicion int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pe_personaje ON personaje_evoluciones(personaje_id);
CREATE INDEX IF NOT EXISTS idx_pe_arco ON personaje_evoluciones(arco_id);

ALTER TABLE personaje_evoluciones ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "users_own_personaje_evoluciones"
    ON personaje_evoluciones FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Trigger (use set_updated_at from migration 001)
DO $$ BEGIN
  CREATE TRIGGER set_updated_at_personaje_evoluciones
    BEFORE UPDATE ON personaje_evoluciones
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Fix tipo columns from migration 004 (may not have been applied) ──
ALTER TABLE personaje_relaciones ADD COLUMN IF NOT EXISTS tipo text DEFAULT '';
ALTER TABLE faccion_relaciones ADD COLUMN IF NOT EXISTS tipo text DEFAULT '';
ALTER TABLE facciones ADD COLUMN IF NOT EXISTS imagen_url text DEFAULT '';
ALTER TABLE facciones ADD COLUMN IF NOT EXISTS notas text DEFAULT '';
ALTER TABLE personajes ADD COLUMN IF NOT EXISTS notas text DEFAULT '';

-- ── Manuscrito carpetas ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS manuscrito_carpetas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  proyecto_id uuid NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
  nombre text NOT NULL DEFAULT '',
  carpeta_padre_id uuid REFERENCES manuscrito_carpetas(id) ON DELETE CASCADE,
  posicion int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mc_proyecto ON manuscrito_carpetas(proyecto_id);
ALTER TABLE manuscrito_carpetas ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "users_own_manuscrito_carpetas"
    ON manuscrito_carpetas FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER set_updated_at_manuscrito_carpetas
    BEFORE UPDATE ON manuscrito_carpetas
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Add carpeta_id to escenas for manuscript organization
ALTER TABLE escenas ADD COLUMN IF NOT EXISTS carpeta_id uuid REFERENCES manuscrito_carpetas(id) ON DELETE SET NULL;

-- ── Concepto en personajes ──────────────────────────────────
ALTER TABLE personajes ADD COLUMN IF NOT EXISTS concepto text DEFAULT '';

-- ── Mapa principal en lugares ───────────────────────────────
ALTER TABLE lugares ADD COLUMN IF NOT EXISTS es_mapa_principal boolean DEFAULT false;

-- ── Nuevos campos en eventos ────────────────────────────────
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS funcion text DEFAULT '';
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS causa_directa text DEFAULT '';
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS consecuencia_directa text DEFAULT '';
