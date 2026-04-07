"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useHito, useHitos, useFases, useLugares, usePersonajes, useEventos,
  useHitoPersonajes, useHitoEventos,
} from "@/lib/proyectos/hooks";
import CustomSelect from "@/components/ui/CustomSelect";
import { FormField } from "@/components/proyectos/FormField";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import { JunctionSelector } from "@/components/proyectos/JunctionSelector";
import { LinkedEntities } from "@/components/proyectos/LinkedEntities";
import { EntityPreviewPanel } from "@/components/proyectos/EntityPreviewPanel";
import type { MentionType } from "@/lib/proyectos/entity-config";

const tipoOptions = [
  { value: "normalidad", label: "Normalidad", color: "#f3f4f6" },
  { value: "cambio_de_fase", label: "Cambio de fase", color: "#fef3c7" },
  { value: "incidente_incitador", label: "Incidente incitador", color: "#fee2e2" },
];

export default function HitoDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; hitoId: string }>;
}) {
  const { projectId, hitoId } = use(params);
  const router = useRouter();
  const { hito, save } = useHito(hitoId);
  const { remove } = useHitos(projectId);
  const { fases } = useFases(projectId);
  const { lugares } = useLugares(projectId);
  const { personajes } = usePersonajes(projectId);
  const { eventos } = useEventos(projectId);
  const hpLinks = useHitoPersonajes(hitoId);
  const heLinks = useHitoEventos(hitoId);
  const [showDelete, setShowDelete] = useState(false);
  const [previewEntity, setPreviewEntity] = useState<{ id: string; type: MentionType } | null>(null);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await remove(hitoId);
    router.push(`/app/proyectos/${projectId}/hitos`);
  }, [remove, hitoId, projectId, router]);

  // Junction maps
  const personajeIds = useMemo(() => hpLinks.links.map((l) => l.personaje_id), [hpLinks.links]);
  const personajeJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of hpLinks.links) map.set(l.personaje_id, l.id);
    return map;
  }, [hpLinks.links]);

  const eventoIds = useMemo(() => heLinks.links.map((l) => l.evento_id), [heLinks.links]);
  const eventoJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of heLinks.links) map.set(l.evento_id, l.id);
    return map;
  }, [heLinks.links]);

  if (!hito) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {hito.hito || "Hito sin nombre"}
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
        {/* Descripción card */}
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-2">
            Descripción
          </h2>
          <div className="space-y-3">
            <FormField
              label="Hito"
              value={hito.hito ?? ""}
              onChange={(v) => handleChange("hito", v)}
              placeholder="Qué sucede en este punto de la historia"
              projectId={projectId}
            />
            <FormField
              label="Información"
              value={hito.informacion ?? ""}
              onChange={(v) => handleChange("informacion", v)}
              multiline
              rows={2}
              placeholder="Qué información se revela..."
              projectId={projectId}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Efecto"
                value={hito.efecto ?? ""}
                onChange={(v) => handleChange("efecto", v)}
                multiline
                rows={2}
                placeholder="Qué efecto tiene en la historia..."
                projectId={projectId}
              />
              <FormField
                label="Origen de la información"
                value={hito.origen_informacion ?? ""}
                onChange={(v) => handleChange("origen_informacion", v)}
                multiline
                rows={2}
                placeholder="Cómo se descubre esta información..."
                projectId={projectId}
              />
            </div>
          </div>
        </div>

        {/* Clasificación + Contexto — 2-column grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Clasificación card */}
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
            <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-3">
              Clasificación
            </h2>
            <div className="flex flex-wrap gap-2">
              {tipoOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => save({ tipo: opt.value as typeof hito.tipo })}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    hito.tipo === opt.value
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

          {/* Contexto card */}
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
            <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-3">
              Contexto
            </h2>
            <div className="space-y-2.5">
              <div>
                <label className="block text-xs font-medium text-[var(--color-ink-light)] mb-1">Fase</label>
                <CustomSelect
                  value={hito.fase_id ?? ""}
                  onChange={(v) => save({ fase_id: v || null })}
                  options={fases.map((f) => ({ value: f.id, label: f.nombre || "Sin nombre" }))}
                  placeholder="Sin fase"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-ink-light)] mb-1">Lugar</label>
                <CustomSelect
                  value={hito.lugar_id ?? ""}
                  onChange={(v) => save({ lugar_id: v || null })}
                  options={lugares.map((l) => ({ value: l.id, label: l.nombre || "Sin nombre" }))}
                  placeholder="Sin lugar"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-ink-light)] mb-1">POV Personaje</label>
                <CustomSelect
                  value={hito.pov_personaje_id ?? ""}
                  onChange={(v) => save({ pov_personaje_id: v || null })}
                  options={personajes.map((p) => ({ value: p.id, label: p.nombre || "Sin nombre" }))}
                  placeholder="Sin POV"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Relaciones card */}
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-2">
            Relaciones
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <JunctionSelector
              label="Personajes involucrados"
              linkedIds={personajeIds}
              options={personajes}
              onAdd={hpLinks.add}
              onRemove={hpLinks.remove}
              junctionMap={personajeJunctionMap}
            />
            <JunctionSelector
              label="Eventos relacionados"
              linkedIds={eventoIds}
              options={eventos}
              onAdd={heLinks.add}
              onRemove={heLinks.remove}
              junctionMap={eventoJunctionMap}
            />
          </div>
        </div>

        {/* Linked entities summary */}
        <LinkedEntities
          projectId={projectId}
          personajeIds={personajeIds}
          lugarIds={hito.lugar_id ? [hito.lugar_id] : []}
          eventoIds={eventoIds}
          onEntityClick={(id, type) => setPreviewEntity({ id, type: type as MentionType })}
        />
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="hito"
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
