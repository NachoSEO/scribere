"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useArco, useArcos, useHitos, useArcoPersonajes, usePersonajes } from "@/lib/proyectos/hooks";
import { FormField } from "@/components/proyectos/FormField";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import { TIPO_RESOLUCION_OPTIONS } from "@/types/proyectos";
import { JunctionSelector } from "@/components/proyectos/JunctionSelector";
import { LinkedEntities } from "@/components/proyectos/LinkedEntities";
import { EntityPreviewPanel } from "@/components/proyectos/EntityPreviewPanel";
import type { MentionType } from "@/lib/proyectos/entity-config";

const selectClasses =
  "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors";

export default function ArcoDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; arcoId: string }>;
}) {
  const { projectId, arcoId } = use(params);
  const router = useRouter();
  const { arco, save } = useArco(arcoId);
  const { remove } = useArcos(projectId);
  const { hitos } = useHitos(projectId);
  const [showDelete, setShowDelete] = useState(false);
  const [previewEntity, setPreviewEntity] = useState<{ id: string; type: MentionType } | null>(null);

  const { personajes } = usePersonajes(projectId);
  const apLinks = useArcoPersonajes(arcoId);

  const personajeIds = useMemo(() => apLinks.links.map((l) => l.personaje_id), [apLinks.links]);
  const personajeJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of apLinks.links) map.set(l.personaje_id, l.id);
    return map;
  }, [apLinks.links]);

  // Derive lugares from connected hitos
  const lugarIds = useMemo(() => {
    const ids: string[] = [];
    if (arco?.hito_origen_id) {
      const h = hitos.find((h) => h.id === arco.hito_origen_id);
      if (h?.lugar_id) ids.push(h.lugar_id);
    }
    if (arco?.hito_destino_id) {
      const h = hitos.find((h) => h.id === arco.hito_destino_id);
      if (h?.lugar_id) ids.push(h.lugar_id);
    }
    return [...new Set(ids)];
  }, [arco, hitos]);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await remove(arcoId);
    router.push(`/app/proyectos/${projectId}/estructura`);
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

      <div className="mt-5 space-y-4">
        {/* Nombre — full width */}
        <FormField
          label="Nombre"
          value={arco.nombre ?? ""}
          onChange={(v) => handleChange("nombre", v)}
          placeholder="Nombre del arco narrativo"
          projectId={projectId}
        />

        {/* Estructura narrativa card — 3-column grid */}
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-2">
            Estructura narrativa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Intención"
              value={arco.planteamiento ?? ""}
              onChange={(v) => handleChange("planteamiento", v)}
              multiline
              rows={3}
              placeholder="Cómo el personaje planea lograr su objetivo a corto plazo..."
              projectId={projectId}
            />
            <FormField
              label="Obstáculo"
              value={arco.nudo ?? ""}
              onChange={(v) => handleChange("nudo", v)}
              multiline
              rows={3}
              placeholder="Qué barreras se interponen..."
              projectId={projectId}
            />
            <FormField
              label="Resolución"
              value={arco.desenlace ?? ""}
              onChange={(v) => handleChange("desenlace", v)}
              multiline
              rows={3}
              placeholder="El resultado y la nueva información revelada..."
              projectId={projectId}
            />
          </div>
        </div>

        {/* Resolución card — YBNA pill buttons */}
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-3">
            Resolución
          </h2>
          <div className="flex flex-wrap gap-2">
            {TIPO_RESOLUCION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => save({ tipo_resolucion: opt.value })}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  arco.tipo_resolucion === opt.value
                    ? "ring-2 ring-[var(--color-accent)] ring-offset-1"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{ backgroundColor: opt.color }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hitos + Personajes — 2-column grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Hitos card */}
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
            <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-3">
              Hitos
            </h2>
            <div className="space-y-2.5">
              <div>
                <label className="block text-xs font-medium text-[var(--color-ink-light)] mb-1">Hito de origen</label>
                <select
                  value={arco.hito_origen_id ?? ""}
                  onChange={(e) => save({ hito_origen_id: e.target.value || null })}
                  className={selectClasses}
                >
                  <option value="">Sin hito de origen</option>
                  {hitos.map((h) => (
                    <option key={h.id} value={h.id}>{h.hito || "Sin nombre"}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-ink-light)] mb-1">Hito de destino</label>
                <select
                  value={arco.hito_destino_id ?? ""}
                  onChange={(e) => save({ hito_destino_id: e.target.value || null })}
                  className={selectClasses}
                >
                  <option value="">Sin hito de destino</option>
                  {hitos.map((h) => (
                    <option key={h.id} value={h.id}>{h.hito || "Sin nombre"}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Personajes card */}
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
            <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-2">
              Personajes
            </h2>
            <JunctionSelector
              label="Personajes involucrados"
              linkedIds={personajeIds}
              options={personajes}
              onAdd={apLinks.add}
              onRemove={apLinks.remove}
              junctionMap={personajeJunctionMap}
            />
          </div>
        </div>

        {/* Linked entities summary */}
        <LinkedEntities
          projectId={projectId}
          personajeIds={personajeIds}
          lugarIds={lugarIds}
          eventoIds={[]}
          onEntityClick={(id, type) => setPreviewEntity({ id, type: type as MentionType })}
        />
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="arco"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {previewEntity && (
        <EntityPreviewPanel
          entityId={previewEntity.id}
          entityType={previewEntity.type}
          projectId={projectId}
          onClose={() => setPreviewEntity(null)}
        />
      )}
    </div>
  );
}
