"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLugar, useLugares, useLugarMapa } from "@/lib/proyectos/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import { MapaPins } from "@/components/proyectos/MapaPins";
import { LUGAR_TIPOS } from "@/types/proyectos";
import type { LugarTipo, LugarPin } from "@/types/proyectos";

const fields: FieldConfig[] = [
  { key: "nombre", label: "Nombre", placeholder: "Nombre del lugar" },
  {
    key: "descripcion",
    label: "Descripcion",
    multiline: true,
    rows: 4,
    placeholder: "Descripcion de este lugar...",
  },
];

const TIPO_COLORS: Record<string, string> = {
  mundo: "#dbeafe",
  continente: "#d1fae5",
  pais: "#fef3c7",
  region: "#ede9fe",
  ciudad: "#ffedd5",
  pueblo: "#fce7f3",
  edificio: "#f3f4f6",
  otro: "#f3f4f6",
};

export default function LugarDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; lugarId: string }>;
}) {
  const { projectId, lugarId } = use(params);
  const router = useRouter();
  const { lugar, save } = useLugar(lugarId);
  const { lugares, remove } = useLugares(projectId);
  const { uploadMapa, removeMapa, savePins } = useLugarMapa(lugarId);
  const [showDelete, setShowDelete] = useState(false);
  const [uploadingMapa, setUploadingMapa] = useState(false);

  // Children of this lugar
  const children = useMemo(
    () => lugares.filter((l) => l.lugar_padre_id === lugarId),
    [lugares, lugarId]
  );

  // Available parents (all except self and own descendants)
  const getDescendantIds = useCallback(
    (parentId: string): Set<string> => {
      const ids = new Set<string>();
      const stack = [parentId];
      while (stack.length > 0) {
        const current = stack.pop()!;
        for (const l of lugares) {
          if (l.lugar_padre_id === current && !ids.has(l.id)) {
            ids.add(l.id);
            stack.push(l.id);
          }
        }
      }
      return ids;
    },
    [lugares]
  );

  const availableParents = useMemo(() => {
    const descendantIds = getDescendantIds(lugarId);
    return lugares.filter(
      (l) => l.id !== lugarId && !descendantIds.has(l.id)
    );
  }, [lugares, lugarId, getDescendantIds]);

  // Parent lugar
  const parent = useMemo(
    () => (lugar?.lugar_padre_id ? lugares.find((l) => l.id === lugar.lugar_padre_id) : null),
    [lugar?.lugar_padre_id, lugares]
  );

  // Breadcrumb
  const breadcrumb = useMemo(() => {
    const path: { id: string; nombre: string }[] = [];
    let currentId = lugar?.lugar_padre_id ?? null;
    while (currentId) {
      const l = lugares.find((x) => x.id === currentId);
      if (!l) break;
      path.unshift({ id: l.id, nombre: l.nombre });
      currentId = l.lugar_padre_id;
    }
    return path;
  }, [lugar?.lugar_padre_id, lugares]);

  const values = useMemo((): Record<string, string> => {
    if (!lugar) return {};
    return { nombre: lugar.nombre, descripcion: lugar.descripcion };
  }, [lugar]);

  const handleChange = useCallback(
    (key: string, value: string) => {
      save({ [key]: value });
    },
    [save]
  );

  const handleDelete = useCallback(async () => {
    await remove(lugarId);
    router.push(`/app/proyectos/${projectId}/lugares`);
  }, [remove, lugarId, projectId, router]);

  const handleUploadMapa = useCallback(
    async (file: File) => {
      setUploadingMapa(true);
      try {
        await uploadMapa(file);
      } finally {
        setUploadingMapa(false);
      }
    },
    [uploadMapa]
  );

  const handlePinsChange = useCallback(
    (pins: LugarPin[]) => {
      savePins(pins);
    },
    [savePins]
  );

  const handlePinClick = useCallback(
    (pinLugarId: string) => {
      router.push(`/app/proyectos/${projectId}/lugares/${pinLugarId}`);
    },
    [projectId, router]
  );

  if (!lugar)
    return (
      <div className="p-6 text-sm text-[var(--color-ink-muted)]">
        Cargando...
      </div>
    );

  return (
    <div className="p-6 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)] mb-4">
        <Link
          href={`/app/proyectos/${projectId}/lugares`}
          className="hover:text-[var(--color-accent)] transition-colors"
        >
          Lugares
        </Link>
        {breadcrumb.map((item) => (
          <span key={item.id} className="flex items-center gap-1">
            <span>/</span>
            <Link
              href={`/app/proyectos/${projectId}/lugares/${item.id}`}
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              {item.nombre || "Sin nombre"}
            </Link>
          </span>
        ))}
        <span>/</span>
        <span className="text-[var(--color-ink)]">{lugar.nombre || "Sin nombre"}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {lugar.nombre || "Lugar sin nombre"}
        </h1>
        <button
          onClick={() => setShowDelete(true)}
          className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
        Los cambios se guardan automaticamente
      </p>

      {/* Type selector */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1.5">
            Tipo de lugar
          </p>
          <div className="flex flex-wrap gap-1.5">
            {LUGAR_TIPOS.map((t) => {
              const isSelected = lugar.tipo === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() =>
                    save({ tipo: isSelected ? ("" as LugarTipo) : t.value })
                  }
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all border ${
                    isSelected
                      ? "border-[var(--color-accent)] text-[var(--color-ink)] shadow-sm"
                      : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-accent-light)]"
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: TIPO_COLORS[t.value] }
                      : undefined
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Parent selector */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1.5">
            Lugar padre
          </p>
          <div className="flex items-center gap-2">
            <select
              value={lugar.lugar_padre_id ?? ""}
              onChange={(e) =>
                save({
                  lugar_padre_id: e.target.value || null,
                })
              }
              className="flex-1 rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            >
              <option value="">Sin padre (raiz)</option>
              {availableParents.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.tipo
                    ? `[${LUGAR_TIPOS.find((t) => t.value === l.tipo)?.label}] `
                    : ""}
                  {l.nombre || "Sin nombre"}
                </option>
              ))}
            </select>
            {parent && (
              <Link
                href={`/app/proyectos/${projectId}/lugares/${parent.id}`}
                className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] whitespace-nowrap"
              >
                Ir &rarr;
              </Link>
            )}
          </div>
        </div>

        {/* Name and description */}
        <EntityForm fields={fields} values={values} onChange={handleChange} />

        {/* Map */}
        <MapaPins
          mapaUrl={lugar.mapa_url}
          pins={lugar.mapa_pins ?? []}
          lugares={children.map((c) => ({ id: c.id, nombre: c.nombre }))}
          onPinsChange={handlePinsChange}
          onPinClick={handlePinClick}
          onUpload={handleUploadMapa}
          onRemoveMap={removeMapa}
          uploading={uploadingMapa}
        />

        {/* Children */}
        {children.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-2">
              Sublugares ({children.length})
            </p>
            <div className="space-y-1.5">
              {children.map((child) => (
                <Link
                  key={child.id}
                  href={`/app/proyectos/${projectId}/lugares/${child.id}`}
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white p-3 text-left transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
                >
                  {child.tipo && (
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: TIPO_COLORS[child.tipo] ?? "#f3f4f6",
                      }}
                    >
                      {LUGAR_TIPOS.find((t) => t.value === child.tipo)?.label ??
                        child.tipo}
                    </span>
                  )}
                  <span className="text-sm text-[var(--color-ink)]">
                    {child.nombre || (
                      <span className="italic text-[var(--color-ink-muted)]">
                        Sin nombre
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="lugar"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
