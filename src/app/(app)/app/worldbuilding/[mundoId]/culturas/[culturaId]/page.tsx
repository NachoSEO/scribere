"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCultura, useCulturas } from "@/lib/worldbuilding/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";

const fields: FieldConfig[] = [
  { key: "nombre", label: "Nombre", placeholder: "Nombre de la cultura" },
  { key: "descripcion", label: "Descripción", multiline: true, rows: 3, placeholder: "Descripción general de esta cultura..." },
  { key: "costumbres", label: "Costumbres", multiline: true, rows: 3, placeholder: "Costumbres y tradiciones..." },
  { key: "lengua", label: "Lengua", placeholder: "Idioma o dialecto..." },
  { key: "organizacion", label: "Organización", multiline: true, rows: 3, placeholder: "Estructura social y política..." },
];

export default function CulturaDetailPage({
  params,
}: {
  params: Promise<{ mundoId: string; culturaId: string }>;
}) {
  const { mundoId, culturaId } = use(params);
  const router = useRouter();
  const { cultura, save } = useCultura(culturaId);
  const { remove } = useCulturas(mundoId);
  const [showDelete, setShowDelete] = useState(false);

  const values = useMemo((): Record<string, string> => {
    if (!cultura) return {};
    return {
      nombre: cultura.nombre,
      descripcion: cultura.descripcion,
      costumbres: cultura.costumbres,
      lengua: cultura.lengua,
      organizacion: cultura.organizacion,
    };
  }, [cultura]);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await remove(culturaId);
    router.push(`/app/worldbuilding/${mundoId}/culturas`);
  }, [remove, culturaId, mundoId, router]);

  if (!cultura) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {cultura.nombre || "Cultura sin nombre"}
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
          entityName="cultura"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
