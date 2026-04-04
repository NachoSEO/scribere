-- 008 · Junction table: arco_personajes

CREATE TABLE arco_personajes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  arco_id uuid NOT NULL REFERENCES arcos(id) ON DELETE CASCADE,
  personaje_id uuid NOT NULL REFERENCES personajes(id) ON DELETE CASCADE,
  UNIQUE(arco_id, personaje_id)
);

ALTER TABLE arco_personajes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users own arco_personajes" ON arco_personajes FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_arco_personajes_arco ON arco_personajes(arco_id);
