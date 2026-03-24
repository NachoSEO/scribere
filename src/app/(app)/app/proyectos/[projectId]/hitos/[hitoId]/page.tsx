"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useHito, useHitos, useFases, useLugares, usePersonajes, useEventos,
  useHitoPersonajes, useHitoEventos,
} from "@/lib/proyectos/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import { JunctionSelector } from "@/components/proyectos/JunctionSelector";

const fields: FieldConfig[] = [
  { key: "hito", label: "Hito", placeholder: "Qué sucede en este punto de la historia" },
  { key: "informacion", label: "Información", multiline: true, rows: 3, placeholder: "Qué información se revela..." },
  { key: "efecto", label: "Efecto", multiline: true, rows: 2, placeholder: "Qué efecto tiene en la historia..." },
  { key: "origen_informacion", label: "Origen de la información", placeholder: "Cómo se descubre esta información..." },
];

const tipoOptions = [
  { value: "normalidad", label: "Normalidad" },
  { value: "cambio_de_fase", label: "Cambio de fase" },
  { value: "incidente_incitador", label: "Incidente incitador" },
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

  const values = useMemo((): Record<string, string> => {
    if (!hito) return {};
    return {
      hito: hito.hito,
      informacion: hito.informacion,
      efecto: hito.efecto,
      origen_informacion: hito.origen_informacion,
    };
  }, [hito]);

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

      <div className="mt-6 space-y-6">
        <EntityForm fields={fields} values={values} onChange={handleChange} />

        {/* Tipo selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
            Tipo
          </label>
          <select
            value={hito.tipo}
            onChange={(e) => save({ tipo: e.target.value as typeof hito.tipo })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            {tipoOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* FK selectors */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
            Fase
          </label>
          <select
            value={hito.fase_id ?? ""}
            onChange={(e) => save({ fase_id: e.target.value || null })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            <option value="">Sin fase</option>
            {fases.map((f) => (
              <option key={f.id} value={f.id}>{f.nombre || "Sin nombre"}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
            Lugar
          </label>
          <select
            value={hito.lugar_id ?? ""}
            onChange={(e) => save({ lugar_id: e.target.value || null })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            <option value="">Sin lugar</option>
            {lugares.map((l) => (
              <option key={l.id} value={l.id}>{l.nombre || "Sin nombre"}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
            POV Personaje
          </label>
          <select
            value={hito.pov_personaje_id ?? ""}
            onChange={(e) => save({ pov_personaje_id: e.target.value || null })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            <option value="">Sin POV</option>
            {personajes.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre || "Sin nombre"}</option>
            ))}
          </select>
        </div>

        {/* Junction selectors */}
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

      {showDelete && (
        <DeleteConfirm
          entityName="hito"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
