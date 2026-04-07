"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useRegion, useRegiones } from "@/lib/worldbuilding/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import CustomSelect from "@/components/ui/CustomSelect";

const fields: FieldConfig[] = [
  { key: "nombre", label: "Nombre", placeholder: "Nombre de la región" },
  { key: "tipo", label: "Tipo", placeholder: "Continente, país, ciudad, pueblo..." },
  { key: "descripcion", label: "Descripción", multiline: true, rows: 4, placeholder: "Descripción de esta región..." },
];

export default function RegionDetailPage({
  params,
}: {
  params: Promise<{ mundoId: string; regionId: string }>;
}) {
  const { mundoId, regionId } = use(params);
  const router = useRouter();
  const { region, save } = useRegion(regionId);
  const { regiones, remove } = useRegiones(mundoId);
  const [showDelete, setShowDelete] = useState(false);

  const values = useMemo((): Record<string, string> => {
    if (!region) return {};
    return { nombre: region.nombre, tipo: region.tipo, descripcion: region.descripcion };
  }, [region]);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await remove(regionId);
    router.push(`/app/worldbuilding/${mundoId}/regiones`);
  }, [remove, regionId, mundoId, router]);

  const handlePadreChange = useCallback((v: string) => {
    save({ region_padre_id: v || null });
  }, [save]);

  // Available parent regions (exclude self)
  const parentOptions = useMemo(
    () => regiones.filter((r) => r.id !== regionId),
    [regiones, regionId]
  );

  if (!region) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {region.nombre || "Región sin nombre"}
        </h1>
        <button
          onClick={() => setShowDelete(true)}
          className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">Los cambios se guardan automáticamente</p>

      <div className="mt-6 space-y-4">
        <EntityForm fields={fields} values={values} onChange={handleChange} />

        {/* Parent region selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
            Región padre
          </label>
          <CustomSelect
            value={region.region_padre_id ?? ""}
            onChange={handlePadreChange}
            options={parentOptions.map((r) => ({ value: r.id, label: r.nombre || "Sin nombre" }))}
            placeholder="Sin región padre"
          />
        </div>
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="región"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
