"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useArco, useArcos } from "@/lib/proyectos/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";

const fields: FieldConfig[] = [
  { key: "nombre", label: "Nombre", placeholder: "Nombre del arco narrativo" },
  { key: "planteamiento", label: "Planteamiento", multiline: true, rows: 3, placeholder: "Cómo comienza este arco..." },
  { key: "nudo", label: "Nudo", multiline: true, rows: 3, placeholder: "El conflicto central del arco..." },
  { key: "desenlace", label: "Desenlace", multiline: true, rows: 3, placeholder: "Cómo se resuelve..." },
];

export default function ArcoDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; arcoId: string }>;
}) {
  const { projectId, arcoId } = use(params);
  const router = useRouter();
  const { arco, save } = useArco(arcoId);
  const { remove } = useArcos(projectId);
  const [showDelete, setShowDelete] = useState(false);

  const values = useMemo((): Record<string, string> => {
    if (!arco) return {};
    return {
      nombre: arco.nombre,
      planteamiento: arco.planteamiento,
      nudo: arco.nudo,
      desenlace: arco.desenlace,
    };
  }, [arco]);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await remove(arcoId);
    router.push(`/app/proyectos/${projectId}/arcos`);
  }, [remove, arcoId, projectId, router]);

  if (!arco) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {arco.nombre || "Arco sin nombre"}
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
          entityName="arco"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
