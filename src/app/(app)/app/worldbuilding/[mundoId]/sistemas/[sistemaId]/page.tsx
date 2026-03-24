"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSistema, useSistemas } from "@/lib/worldbuilding/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";

const fields: FieldConfig[] = [
  { key: "nombre", label: "Nombre", placeholder: "Nombre del sistema" },
  { key: "tipo", label: "Tipo", placeholder: "Magia, tecnología, economía, religión..." },
  { key: "descripcion", label: "Descripción", multiline: true, rows: 3, placeholder: "Descripción general del sistema..." },
  { key: "reglas", label: "Reglas", multiline: true, rows: 3, placeholder: "Las reglas fundamentales de este sistema..." },
  { key: "limitaciones", label: "Limitaciones", multiline: true, rows: 3, placeholder: "Restricciones y limitaciones..." },
];

export default function SistemaDetailPage({
  params,
}: {
  params: Promise<{ mundoId: string; sistemaId: string }>;
}) {
  const { mundoId, sistemaId } = use(params);
  const router = useRouter();
  const { sistema, save } = useSistema(sistemaId);
  const { remove } = useSistemas(mundoId);
  const [showDelete, setShowDelete] = useState(false);

  const values = useMemo((): Record<string, string> => {
    if (!sistema) return {};
    return {
      nombre: sistema.nombre,
      tipo: sistema.tipo,
      descripcion: sistema.descripcion,
      reglas: sistema.reglas,
      limitaciones: sistema.limitaciones,
    };
  }, [sistema]);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await remove(sistemaId);
    router.push(`/app/worldbuilding/${mundoId}/sistemas`);
  }, [remove, sistemaId, mundoId, router]);

  if (!sistema) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {sistema.nombre || "Sistema sin nombre"}
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
          entityName="sistema"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
