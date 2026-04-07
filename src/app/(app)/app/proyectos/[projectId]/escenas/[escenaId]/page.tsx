"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useEscena, useEscenas, useHitos, useArcos, useLugares, usePersonajes,
  useEscenaPersonajes,
} from "@/lib/proyectos/hooks";
import { FormField } from "@/components/proyectos/FormField";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import { JunctionSelector } from "@/components/proyectos/JunctionSelector";
import { EscenaEditor } from "@/components/proyectos/EscenaEditor";
import { LinkedEntities } from "@/components/proyectos/LinkedEntities";
import { EntityPreviewPanel } from "@/components/proyectos/EntityPreviewPanel";
import type { MentionType } from "@/lib/proyectos/entity-config";
import { useDebouncedSave } from "@/lib/hooks/use-debounced-save";
import CustomSelect from "@/components/ui/CustomSelect";

export default function EscenaDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; escenaId: string }>;
}) {
  const { projectId, escenaId } = use(params);
  const router = useRouter();
  const { escena, save } = useEscena(escenaId);
  const { remove } = useEscenas(projectId);
  const { hitos } = useHitos(projectId);
  const { arcos } = useArcos(projectId);
  const { lugares } = useLugares(projectId);
  const { personajes } = usePersonajes(projectId);
  const epLinks = useEscenaPersonajes(escenaId);
  const [showDelete, setShowDelete] = useState(false);
  const [previewEntity, setPreviewEntity] = useState<{ id: string; type: MentionType } | null>(null);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleContentChange = useCallback((content: Record<string, unknown>) => {
    save({ contenido: content });
  }, [save]);

  const debouncedContentChange = useDebouncedSave(
    useCallback(async (content: Record<string, unknown>) => {
      handleContentChange(content);
    }, [handleContentChange])
  );

  const handleDelete = useCallback(async () => {
    await remove(escenaId);
    router.push(`/app/proyectos/${projectId}/escenas`);
  }, [remove, escenaId, projectId, router]);

  // Junction maps
  const personajeIds = useMemo(() => epLinks.links.map((l) => l.personaje_id), [epLinks.links]);
  const personajeJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of epLinks.links) map.set(l.personaje_id, l.id);
    return map;
  }, [epLinks.links]);

  // Hito items for display (using hito field as nombre)
  const hitoItems = useMemo(() => hitos.map((h) => ({ id: h.id, nombre: h.hito })), [hitos]);

  if (!escena) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {escena.resumen || "Escena sin resumen"}
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
        {/* Resumen + Objetivo — 2-column grid */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Resumen"
            value={escena.resumen ?? ""}
            onChange={(v) => handleChange("resumen", v)}
            placeholder="Resumen breve de la escena"
            projectId={projectId}
          />
          <FormField
            label="Objetivo"
            value={escena.objetivo ?? ""}
            onChange={(v) => handleChange("objetivo", v)}
            multiline
            rows={2}
            placeholder="Qué debe lograr esta escena..."
            projectId={projectId}
          />
        </div>

        {/* Contexto card */}
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-3">
            Contexto
          </h2>
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-ink-light)] mb-1">Hito</label>
                <CustomSelect
                  value={escena.hito_id ?? ""}
                  onChange={(v) => save({ hito_id: v || null })}
                  options={hitoItems.map((h) => ({ value: h.id, label: h.nombre || "Sin nombre" }))}
                  placeholder="Sin hito"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-ink-light)] mb-1">Arco</label>
                <CustomSelect
                  value={escena.arco_id ?? ""}
                  onChange={(v) => save({ arco_id: v || null })}
                  options={arcos.map((a) => ({ value: a.id, label: a.nombre || "Sin nombre" }))}
                  placeholder="Sin arco"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-ink-light)] mb-1">Lugar</label>
              <CustomSelect
                value={escena.lugar_id ?? ""}
                onChange={(v) => save({ lugar_id: v || null })}
                options={lugares.map((l) => ({ value: l.id, label: l.nombre || "Sin nombre" }))}
                placeholder="Sin lugar"
              />
            </div>
          </div>
        </div>

        {/* Personajes card */}
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-2">
            Personajes
          </h2>
          <JunctionSelector
            label="Personajes en la escena"
            linkedIds={personajeIds}
            options={personajes}
            onAdd={epLinks.add}
            onRemove={epLinks.remove}
            junctionMap={personajeJunctionMap}
          />
        </div>

        {/* Linked entities summary */}
        <LinkedEntities
          projectId={projectId}
          personajeIds={personajeIds}
          lugarIds={escena.lugar_id ? [escena.lugar_id] : []}
          eventoIds={[]}
          onEntityClick={(id, type) => setPreviewEntity({ id, type: type as MentionType })}
        />

        {/* Tiptap editor — full width */}
        <EscenaEditor
          content={escena.contenido}
          onChange={debouncedContentChange}
          projectId={projectId}
        />
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="escena"
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
