"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useEvento, useEventos, usePersonajes, useLugares, useEventoPersonajes, useEventoLugares } from "@/lib/proyectos/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import { JunctionSelector } from "@/components/proyectos/JunctionSelector";

const fields: FieldConfig[] = [
  { key: "nombre", label: "Nombre", placeholder: "Nombre del evento" },
  { key: "cronologia", label: "Cronología", placeholder: "Cuándo ocurre este evento..." },
  { key: "descripcion", label: "Descripción", multiline: true, rows: 4, placeholder: "Qué sucede en este evento..." },
];

export default function EventoDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; eventoId: string }>;
}) {
  const { projectId, eventoId } = use(params);
  const router = useRouter();
  const { evento, save } = useEvento(eventoId);
  const { remove } = useEventos(projectId);
  const { personajes } = usePersonajes(projectId);
  const { lugares } = useLugares(projectId);
  const epLinks = useEventoPersonajes(eventoId);
  const elLinks = useEventoLugares(eventoId);
  const [showDelete, setShowDelete] = useState(false);

  const values = useMemo((): Record<string, string> => {
    if (!evento) return {};
    return { nombre: evento.nombre, cronologia: evento.cronologia, descripcion: evento.descripcion };
  }, [evento]);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await remove(eventoId);
    router.push(`/app/proyectos/${projectId}/eventos`);
  }, [remove, eventoId, projectId, router]);

  // Junction maps
  const personajeIds = useMemo(() => epLinks.links.map((l) => l.personaje_id), [epLinks.links]);
  const personajeJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of epLinks.links) map.set(l.personaje_id, l.id);
    return map;
  }, [epLinks.links]);

  const lugarIds = useMemo(() => elLinks.links.map((l) => l.lugar_id), [elLinks.links]);
  const lugarJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of elLinks.links) map.set(l.lugar_id, l.id);
    return map;
  }, [elLinks.links]);

  if (!evento) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {evento.nombre || "Evento sin nombre"}
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

        <JunctionSelector
          label="Personajes involucrados"
          linkedIds={personajeIds}
          options={personajes}
          onAdd={epLinks.add}
          onRemove={epLinks.remove}
          junctionMap={personajeJunctionMap}
        />

        <JunctionSelector
          label="Lugares"
          linkedIds={lugarIds}
          options={lugares}
          onAdd={elLinks.add}
          onRemove={elLinks.remove}
          junctionMap={lugarJunctionMap}
        />
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="evento"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
