-- 005 · Lugares: hierarchy, types, maps, and pins
-- Adds self-referencing parent, type classification, map image, and map pins

-- ── New columns on lugares ──────────────────────────────────

-- Place type (mundo, continente, pais, region, ciudad, pueblo, edificio, otro)
ALTER TABLE lugares ADD COLUMN IF NOT EXISTS tipo text NOT NULL DEFAULT '';

-- Self-referencing parent for hierarchy (world > continent > country > ...)
ALTER TABLE lugares ADD COLUMN IF NOT EXISTS lugar_padre_id uuid REFERENCES lugares(id) ON DELETE SET NULL;

-- Map image URL (stored in 'mapas' bucket)
ALTER TABLE lugares ADD COLUMN IF NOT EXISTS mapa_url text NOT NULL DEFAULT '';

-- Map pins: JSON array of {x, y, lugar_id} — coordinates are % based (0-100)
ALTER TABLE lugares ADD COLUMN IF NOT EXISTS mapa_pins jsonb NOT NULL DEFAULT '[]'::jsonb;

-- ── Indexes ─────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_lugares_padre ON lugares(lugar_padre_id);
CREATE INDEX IF NOT EXISTS idx_lugares_tipo ON lugares(tipo);
