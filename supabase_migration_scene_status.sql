-- Migration: Scene status workflow change
-- Run this in Supabase Dashboard > SQL Editor
--
-- Changes:
-- 1. Adds fase_escritura column (keeps draft stage: 1er borrador, 2do borrador, etc.)
-- 2. Migrates existing estado values to fase_escritura
-- 3. Updates estado to new workflow values (pendiente, escribiendo, completado)

-- Step 1: Add fase_escritura column
ALTER TABLE escenas ADD COLUMN IF NOT EXISTS fase_escritura text;

-- Step 2: Copy current estado into fase_escritura
UPDATE escenas SET fase_escritura = estado WHERE estado IS NOT NULL;

-- Step 3: Map old estado values to new workflow states
UPDATE escenas SET estado = CASE
  WHEN estado = 'version_final' THEN 'completado'
  ELSE 'pendiente'
END
WHERE estado IS NOT NULL;

-- Step 4: Set default for scenes without estado
UPDATE escenas SET estado = 'pendiente' WHERE estado IS NULL;
