-- 009 · Junction table: escena_eventos

CREATE TABLE escena_eventos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  escena_id uuid NOT NULL REFERENCES escenas(id) ON DELETE CASCADE,
  evento_id uuid NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
  UNIQUE(escena_id, evento_id)
);

ALTER TABLE escena_eventos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users own escena_eventos" ON escena_eventos FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_escena_eventos_escena ON escena_eventos(escena_id);
