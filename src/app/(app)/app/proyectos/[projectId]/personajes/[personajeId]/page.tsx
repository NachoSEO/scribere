"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  usePersonaje,
  usePersonajes,
  usePersonajeRelaciones,
  usePersonajeEvoluciones,
  useFacciones,
  useHitos,
  useFases,
  useEscenas,
  useEscenasByPersonaje,
} from "@/lib/proyectos/hooks";
import { useProyectosStore } from "@/lib/proyectos/store";
import { PERSONAJE_TIPO_OPTIONS } from "@/types/proyectos";
import { ImageUploader } from "@/components/proyectos/ImageUploader";
import { CompactCard } from "@/components/proyectos/CompactCard";
import { EntityBadge } from "@/components/proyectos/EntityBadge";
import { CharacterRelationCard } from "@/components/proyectos/CharacterRelationCard";
import { EvolutionTimeline } from "@/components/proyectos/EvolutionTimeline";
import { FormField } from "@/components/proyectos/FormField";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";

export default function PersonajeDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; personajeId: string }>;
}) {
  const { projectId, personajeId } = use(params);
  const router = useRouter();
  const { personaje, save } = usePersonaje(personajeId);
  const { remove } = usePersonajes(projectId);
  const { relaciones: rawRelaciones, available, create: createRelacion, update: updateRelacion, remove: removeRelacion } = usePersonajeRelaciones(personajeId);
  const { evoluciones, create: createEvolucion, update: updateEvolucion, remove: removeEvolucion } = usePersonajeEvoluciones(personajeId);
  useFacciones(projectId);
  const facciones = useProyectosStore((s) => s.facciones);
  const arcos = useProyectosStore((s) => s.arcos);
  const allPersonajes = useProyectosStore((s) => s.personajes);
  const { hitos } = useHitos(projectId);
  const { fases } = useFases(projectId);
  const { escenas } = useEscenas(projectId);
  const { links: escenaPersonajeLinks } = useEscenasByPersonaje(personajeId);

  // Escenas where this personaje appears
  const escenasDelPersonaje = useMemo(() => {
    const escenaIds = new Set(escenaPersonajeLinks.map((l) => l.escena_id));
    return escenas.filter((e) => escenaIds.has(e.id));
  }, [escenas, escenaPersonajeLinks]);

  const [showDelete, setShowDelete] = useState(false);
  const [addingRelacion, setAddingRelacion] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showCustomTipo, setShowCustomTipo] = useState(false);

  // Map relaciones
  const relaciones = useMemo(() => {
    return rawRelaciones.map((rel) => {
      const otherId = rel.personaje_a_id === personajeId ? rel.personaje_b_id : rel.personaje_a_id;
      const other = allPersonajes.find((p) => p.id === otherId) ?? available.find((p) => p.id === otherId);
      return {
        id: rel.id,
        descripcion: rel.descripcion,
        tipo: rel.tipo,
        otherId,
        otherNombre: other?.nombre ?? "Desconocido",
        otherImagenUrl: (other as { imagen_url?: string })?.imagen_url ?? "",
      };
    });
  }, [rawRelaciones, personajeId, available, allPersonajes]);

  const relatedIds = new Set(relaciones.map((r) => r.otherId));
  const unrelatedOptions = available.filter((p) => !relatedIds.has(p.id));

  const handleDelete = useCallback(async () => {
    await remove(personajeId);
    router.push(`/app/proyectos/${projectId}/personajes`);
  }, [remove, personajeId, projectId, router]);

  const handleAddRelacion = useCallback(async () => {
    if (!selectedId) return;
    await createRelacion({ personaje_a_id: personajeId, personaje_b_id: selectedId });
    setSelectedId("");
    setAddingRelacion(false);
  }, [createRelacion, personajeId, selectedId]);

  const handleFaccionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    save({ faccion_id: e.target.value || null });
  }, [save]);

  const handleAddEvolucion = useCallback(async () => {
    await createEvolucion({ nombre_etapa: "Nueva etapa", posicion: evoluciones.length });
  }, [createEvolucion, evoluciones.length]);

  const handleUpdateEvolucion = useCallback((id: string, data: Record<string, unknown>) => {
    updateEvolucion({ id, ...data });
  }, [updateEvolucion]);

  const handleReorderEvolucion = useCallback(async (id: string, newPosicion: number) => {
    updateEvolucion({ id, posicion: newPosicion });
  }, [updateEvolucion]);

  // Facción badge
  const faccionNombre = useMemo(() => {
    if (!personaje?.faccion_id) return null;
    return facciones.find((f) => f.id === personaje.faccion_id)?.nombre;
  }, [personaje?.faccion_id, facciones]);

  if (!personaje) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6 max-w-4xl">
      {/* Header: Image + Name + Type + Facción */}
      <div className="flex items-start gap-4">
        <ImageUploader
          value={personaje.imagen_url}
          onChange={(url) => save({ imagen_url: url })}
          initials={personaje.nombre}
        />
        <div className="flex-1 min-w-0">
          <FormField
            label=""
            value={personaje.nombre}
            onChange={(v) => save({ nombre: v })}
            placeholder="Nombre del personaje"
          />
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">Tipo:</span>
              {showCustomTipo || (personaje.tipo && !PERSONAJE_TIPO_OPTIONS.includes(personaje.tipo)) ? (
                <input
                  value={personaje.tipo}
                  onChange={(e) => save({ tipo: e.target.value })}
                  placeholder="Tipo personalizado..."
                  className="border-0 bg-transparent text-xs text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none w-40"
                />
              ) : (
                <select
                  value={personaje.tipo}
                  onChange={(e) => {
                    if (e.target.value === "__custom__") {
                      setShowCustomTipo(true);
                      save({ tipo: "" });
                    } else {
                      save({ tipo: e.target.value });
                    }
                  }}
                  className="border-0 bg-transparent text-xs text-[var(--color-ink)] focus:outline-none cursor-pointer"
                >
                  <option value="">Sin tipo</option>
                  {PERSONAJE_TIPO_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                  <option value="__custom__">Otro...</option>
                </select>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">Facción:</span>
              {faccionNombre ? (
                <EntityBadge
                  nombre={faccionNombre}
                  href={`/app/proyectos/${projectId}/facciones/${personaje.faccion_id}`}
                />
              ) : (
                <select
                  value=""
                  onChange={handleFaccionChange}
                  className="border-0 bg-transparent text-xs text-[var(--color-ink-muted)] focus:outline-none cursor-pointer"
                >
                  <option value="">Sin facción</option>
                  {facciones.map((f) => (
                    <option key={f.id} value={f.id}>{f.nombre || "Sin nombre"}</option>
                  ))}
                </select>
              )}
              {faccionNombre && (
                <button
                  onClick={() => save({ faccion_id: null })}
                  className="text-[10px] text-[var(--color-ink-muted)] hover:text-red-500"
                >
                  x
                </button>
              )}
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-[var(--color-ink-muted)]">Los cambios se guardan automáticamente</p>
            <button
              onClick={() => setShowDelete(true)}
              className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Atributos */}
      <div className="mt-6">
        <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-2 flex items-center gap-2">
          Atributos
          <span className="flex-1 border-t border-[var(--color-border-light)]" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CompactCard
            label="Concepto"
            value={personaje.concepto}
            onChange={(v) => save({ concepto: v })}
            placeholder="El concepto central del personaje..."
            projectId={projectId}
          />
          <CompactCard
            label="Función narrativa"
            value={personaje.funcion_narrativa}
            onChange={(v) => save({ funcion_narrativa: v })}
            placeholder="El rol en la historia..."
            projectId={projectId}
          />
          <CompactCard
            label="Motivación"
            value={personaje.motivacion}
            onChange={(v) => save({ motivacion: v })}
            placeholder="Lo que impulsa al personaje..."
            projectId={projectId}
          />
          <CompactCard
            label="Complicación"
            value={personaje.complicacion}
            onChange={(v) => save({ complicacion: v })}
            placeholder="Los obstáculos..."
            projectId={projectId}
          />
          <CompactCard
            label="Descripción"
            value={personaje.descripcion}
            onChange={(v) => save({ descripcion: v })}
            placeholder="Descripción del personaje..."
            projectId={projectId}
          />
        </div>
      </div>

      {/* Relaciones */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium flex items-center gap-2">
            Relaciones
            <span className="flex-1 border-t border-[var(--color-border-light)]" />
          </h3>
          {unrelatedOptions.length > 0 && (
            <button
              onClick={() => setAddingRelacion(true)}
              className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
            >
              + Añadir
            </button>
          )}
        </div>

        {addingRelacion && (
          <div className="mb-3 flex gap-2">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
            >
              <option value="">Seleccionar personaje...</option>
              {unrelatedOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.nombre || "Sin nombre"}</option>
              ))}
            </select>
            <button
              onClick={handleAddRelacion}
              disabled={!selectedId}
              className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              Añadir
            </button>
            <button
              onClick={() => { setAddingRelacion(false); setSelectedId(""); }}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]"
            >
              Cancelar
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {relaciones.length === 0 && !addingRelacion && (
            <p className="text-xs text-[var(--color-ink-muted)] italic col-span-2">Sin relaciones</p>
          )}
          {relaciones.map((rel) => (
            <CharacterRelationCard
              key={rel.id}
              nombre={rel.otherNombre}
              imagenUrl={rel.otherImagenUrl}
              tipo={rel.tipo}
              descripcion={rel.descripcion}
              onTipoChange={(tipo) => updateRelacion({ id: rel.id, tipo })}
              onDescripcionChange={(descripcion) => updateRelacion({ id: rel.id, descripcion })}
              onDelete={() => removeRelacion(rel.id)}
            />
          ))}
        </div>
      </div>

      {/* Evolución */}
      <div className="mt-6">
        <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-2 flex items-center gap-2">
          Evolución
          <span className="flex-1 border-t border-[var(--color-border-light)]" />
        </h3>
        <EvolutionTimeline
          evoluciones={evoluciones}
          arcos={arcos}
          hitos={hitos}
          fases={fases}
          escenas={escenas}
          projectId={projectId}
          onAdd={handleAddEvolucion}
          onUpdate={handleUpdateEvolucion}
          onRemove={removeEvolucion}
          onReorder={handleReorderEvolucion}
        />
      </div>

      {/* Escenas */}
      <div className="mt-6">
        <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-2 flex items-center gap-2">
          Escenas ({escenasDelPersonaje.length})
          <span className="flex-1 border-t border-[var(--color-border-light)]" />
        </h3>
        {escenasDelPersonaje.length === 0 ? (
          <p className="text-xs text-[var(--color-ink-muted)] italic">No aparece en ninguna escena</p>
        ) : (
          <div className="space-y-1.5">
            {escenasDelPersonaje.map((esc) => (
              <Link
                key={esc.id}
                href={`/app/proyectos/${projectId}/escenas/${esc.id}`}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white p-3 text-left transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
              >
                <span className="text-sm text-[var(--color-ink)]">
                  {esc.resumen || <span className="italic text-[var(--color-ink-muted)]">Sin resumen</span>}
                </span>
                {esc.objetivo && (
                  <span className="ml-auto text-xs text-[var(--color-ink-muted)] line-clamp-1 max-w-[200px]">
                    {esc.objetivo}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Notas */}
      <div className="mt-6">
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <FormField
            label="Notas"
            value={personaje.notas}
            onChange={(v) => save({ notas: v })}
            multiline
            rows={5}
            placeholder="Notas adicionales sobre este personaje..."
          />
        </div>
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="personaje"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
