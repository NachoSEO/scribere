-- Phase 1: Evolucionar Planificador a Proyectos
-- Add new columns and personaje_evoluciones table

-- ── New columns ──────────────────────────────────────────
ALTER TABLE facciones ADD COLUMN IF NOT EXISTS imagen_url text DEFAULT '';
ALTER TABLE facciones ADD COLUMN IF NOT EXISTS notas text DEFAULT '';
ALTER TABLE personajes ADD COLUMN IF NOT EXISTS notas text DEFAULT '';
ALTER TABLE personaje_relaciones ADD COLUMN IF NOT EXISTS tipo text DEFAULT '';
ALTER TABLE faccion_relaciones ADD COLUMN IF NOT EXISTS tipo text DEFAULT '';

-- ── Personaje evoluciones ────────────────────────────────
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

CREATE INDEX IF NOT EXISTS idx_personaje_evoluciones_personaje ON personaje_evoluciones(personaje_id);
CREATE INDEX IF NOT EXISTS idx_personaje_evoluciones_arco ON personaje_evoluciones(arco_id);

-- RLS
ALTER TABLE personaje_evoluciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own personaje_evoluciones"
  ON personaje_evoluciones FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- updated_at trigger
CREATE TRIGGER set_updated_at_personaje_evoluciones
  BEFORE UPDATE ON personaje_evoluciones
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ── Storage bucket for images ────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('imagenes', 'imagenes', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload to their own folder in imagenes"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'imagenes'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own files in imagenes"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'imagenes'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own files in imagenes"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'imagenes'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Anyone can read imagenes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'imagenes');
