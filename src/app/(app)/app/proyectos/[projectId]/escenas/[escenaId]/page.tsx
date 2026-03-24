"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useEscena, useEscenas, useHitos, useArcos, useLugares, usePersonajes,
  useEscenaPersonajes,
} from "@/lib/proyectos/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import { JunctionSelector } from "@/components/proyectos/JunctionSelector";
import { EscenaEditor } from "@/components/proyectos/EscenaEditor";
import { useDebouncedSave } from "@/lib/hooks/use-debounced-save";

const fields: FieldConfig[] = [
  { key: "resumen", label: "Resumen", placeholder: "Resumen breve de la escena" },
  { key: "objetivo", label: "Objetivo", multiline: true, rows: 2, placeholder: "Qué debe lograr esta escena..." },
];

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

  const values = useMemo((): Record<string, string> => {
    if (!escena) return {};
    return { resumen: escena.resumen, objetivo: escena.objetivo };
  }, [escena]);

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

  // Hito items for junction (using hito field as nombre)
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

      <div className="mt-6 space-y-6">
        <EntityForm fields={fields} values={values} onChange={handleChange} />

        {/* FK selectors */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
            Hito
          </label>
          <select
            value={escena.hito_id ?? ""}
            onChange={(e) => save({ hito_id: e.target.value || null })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            <option value="">Sin hito</option>
            {hitoItems.map((h) => (
              <option key={h.id} value={h.id}>{h.nombre || "Sin nombre"}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
            Arco
          </label>
          <select
            value={escena.arco_id ?? ""}
            onChange={(e) => save({ arco_id: e.target.value || null })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            <option value="">Sin arco</option>
            {arcos.map((a) => (
              <option key={a.id} value={a.id}>{a.nombre || "Sin nombre"}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
            Lugar
          </label>
          <select
            value={escena.lugar_id ?? ""}
            onChange={(e) => save({ lugar_id: e.target.value || null })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            <option value="">Sin lugar</option>
            {lugares.map((l) => (
              <option key={l.id} value={l.id}>{l.nombre || "Sin nombre"}</option>
            ))}
          </select>
        </div>

        {/* Junction selector */}
        <JunctionSelector
          label="Personajes en la escena"
          linkedIds={personajeIds}
          options={personajes}
          onAdd={epLinks.add}
          onRemove={epLinks.remove}
          junctionMap={personajeJunctionMap}
        />

        {/* Tiptap editor */}
        <EscenaEditor
          content={escena.contenido}
          onChange={debouncedContentChange}
        />
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="escena"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
