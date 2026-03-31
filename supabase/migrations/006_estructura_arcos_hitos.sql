-- 006 · Estructura: connect arcos to hitos + resolution type

-- FK to origin hito (the milestone the arc starts from)
ALTER TABLE arcos ADD COLUMN hito_origen_id uuid REFERENCES hitos(id) ON DELETE SET NULL;

-- FK to destination hito (the milestone the arc leads to)
ALTER TABLE arcos ADD COLUMN hito_destino_id uuid REFERENCES hitos(id) ON DELETE SET NULL;

-- YBNA resolution type: si, si_pero, no_y, no
ALTER TABLE arcos ADD COLUMN tipo_resolucion text NOT NULL DEFAULT '';

-- Indexes for spine view lookups
CREATE INDEX idx_arcos_hito_origen ON arcos(hito_origen_id);
CREATE INDEX idx_arcos_hito_destino ON arcos(hito_destino_id);
