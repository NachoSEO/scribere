"use client";

import { useCallback } from "react";
import { useGeneral, useProyecto } from "@/lib/proyectos/hooks";
import { useMundos } from "@/lib/worldbuilding/hooks";
import { FormField } from "./FormField";

interface GeneralFormProps {
  projectId: string;
}

export function GeneralForm({ projectId }: GeneralFormProps) {
  const { general, save } = useGeneral(projectId);
  const { proyecto, save: saveProyecto } = useProyecto(projectId);
  const { mundos } = useMundos();

  const val = (key: string) => (general as Record<string, string> | null)?.[key] ?? "";

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleMundoChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    saveProyecto({ mundo_id: e.target.value || null });
  }, [saveProyecto]);

  const handleNombreChange = useCallback((value: string) => {
    saveProyecto({ nombre: value });
  }, [saveProyecto]);

  return (
    <div className="p-6 max-w-4xl">
      {/* Header: Project name + Mundo badge */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <FormField
            label=""
            value={proyecto?.nombre ?? ""}
            onChange={handleNombreChange}
            placeholder="Nombre del proyecto"
          />
        </div>
        <div className="pt-1">
          <select
            value={proyecto?.mundo_id ?? ""}
            onChange={handleMundoChange}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1 text-xs text-[var(--color-accent)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
          >
            <option value="">Sin mundo</option>
            {mundos.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre || "Mundo sin nombre"}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
        Los cambios se guardan automáticamente
      </p>

      {/* Core Story (2 cols) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <FormField
            label="Premisa"
            value={val("premisa")}
            onChange={(v) => handleChange("premisa", v)}
            multiline
            rows={3}
            placeholder="La idea central de la historia..."
          />
        </Card>
        <Card>
          <FormField
            label="Conflicto principal"
            value={val("conflicto")}
            onChange={(v) => handleChange("conflicto", v)}
            multiline
            rows={3}
            placeholder="El conflicto que impulsa la trama..."
          />
        </Card>
      </div>

      {/* Temas (3 cols) */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <FormField
            label="Idea controladora"
            value={val("idea_controladora")}
            onChange={(v) => handleChange("idea_controladora", v)}
            multiline
            rows={2}
            placeholder="La verdad que la historia demuestra..."
          />
        </Card>
        <Card>
          <FormField
            label="Contraideas"
            value={val("contraideas")}
            onChange={(v) => handleChange("contraideas", v)}
            multiline
            rows={2}
            placeholder="Las ideas opuestas..."
          />
        </Card>
        <Card>
          <FormField
            label="Temas"
            value={val("temas")}
            onChange={(v) => handleChange("temas", v)}
            multiline
            rows={2}
            placeholder="Los temas principales..."
          />
        </Card>
      </div>

      {/* Estilo (2 cols inline) */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <FormField
            label="Tono"
            value={val("tono")}
            onChange={(v) => handleChange("tono", v)}
            multiline
            rows={3}
            placeholder="El tono general de la narrativa..."
          />
        </Card>
        <Card>
          <FormField
            label="Estilo"
            value={val("estilo")}
            onChange={(v) => handleChange("estilo", v)}
            multiline
            rows={3}
            placeholder="El estilo de escritura..."
          />
        </Card>
      </div>

      {/* Full-width: Estructura + Resumen */}
      <div className="mt-4 space-y-4">
        <Card>
          <FormField
            label="Estructura"
            value={val("estructura")}
            onChange={(v) => handleChange("estructura", v)}
            multiline
            rows={4}
            placeholder="La estructura narrativa (actos, arcos, etc.)..."
          />
        </Card>
        <Card>
          <FormField
            label="Resumen"
            value={val("resumen")}
            onChange={(v) => handleChange("resumen", v)}
            multiline
            rows={5}
            placeholder="Un resumen general de la historia..."
          />
        </Card>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
      {children}
    </div>
  );
}
