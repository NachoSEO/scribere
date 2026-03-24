"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFase, useFases } from "@/lib/proyectos/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";

const fields: FieldConfig[] = [
  { key: "nombre", label: "Nombre", placeholder: "Nombre de la fase" },
  { key: "descripcion", label: "Descripción", multiline: true, rows: 4, placeholder: "Descripción de esta fase de la historia..." },
];

export default function FaseDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; faseId: string }>;
}) {
  const { projectId, faseId } = use(params);
  const router = useRouter();
  const { fase, save } = useFase(faseId);
  const { remove } = useFases(projectId);
  const [showDelete, setShowDelete] = useState(false);

  const values = useMemo((): Record<string, string> => {
    if (!fase) return {};
    return { nombre: fase.nombre, descripcion: fase.descripcion };
  }, [fase]);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await remove(faseId);
    router.push(`/app/proyectos/${projectId}/fases`);
  }, [remove, faseId, projectId, router]);

  if (!fase) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {fase.nombre || "Fase sin nombre"}
        </h1>
        <button
          onClick={() => setShowDelete(true)}
          className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">Los cambios se guardan automáticamente</p>

      <div className="mt-6">
        <EntityForm fields={fields} values={values} onChange={handleChange} />
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="fase"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
