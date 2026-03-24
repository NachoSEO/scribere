"use client";

import { useCallback } from "react";
import { useMundo } from "@/lib/worldbuilding/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { MapUpload } from "./MapUpload";

const fields: FieldConfig[] = [
  { key: "nombre", label: "Nombre", placeholder: "Nombre del mundo" },
  { key: "descripcion", label: "Descripción", multiline: true, rows: 4, placeholder: "Descripción general del mundo..." },
];

interface GeneralMundoFormProps {
  mundoId: string;
}

export function GeneralMundoForm({ mundoId }: GeneralMundoFormProps) {
  const { mundo, save, saveImmediate } = useMundo(mundoId);

  const values: Record<string, string> = {};
  for (const field of fields) {
    values[field.key] = (mundo as Record<string, string> | null)?.[field.key] ?? "";
  }

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleMapUploaded = useCallback((url: string) => {
    saveImmediate({ mapa_url: url });
  }, [saveImmediate]);

  const handleMapDeleted = useCallback(() => {
    saveImmediate({ mapa_url: "" });
  }, [saveImmediate]);

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold text-[var(--color-ink)]">General</h1>
      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
        Los cambios se guardan automáticamente
      </p>
      <div className="mt-6 space-y-6">
        <EntityForm fields={fields} values={values} onChange={handleChange} />
        <MapUpload
          mapaUrl={mundo?.mapa_url ?? ""}
          onUploaded={handleMapUploaded}
          onDeleted={handleMapDeleted}
        />
      </div>
    </div>
  );
}
