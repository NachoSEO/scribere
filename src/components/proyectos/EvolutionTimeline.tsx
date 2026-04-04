"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { PersonajeEvolucion, Arco, Hito, Fase, Escena } from "@/types/proyectos";

interface EvolutionTimelineProps {
  evoluciones: PersonajeEvolucion[];
  arcos: Arco[];
  hitos: Hito[];
  fases: Fase[];
  escenas: Escena[];
  projectId: string;
  onAdd: () => void;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onRemove: (id: string) => void;
  onReorder: (id: string, newPosicion: number) => void;
}

interface LocalState {
  nombre_etapa: string;
  descripcion: string;
  arco_id: string | null;
  escena_id: string | null;
}

function EvolutionCard({
  evolucion,
  arcos,
  escenas,
  projectId,
  index,
  total,
  onUpdate,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  evolucion: PersonajeEvolucion;
  arcos: Arco[];
  escenas: Escena[];
  projectId: string;
  index: number;
  total: number;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onRemove: (id: string) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}) {
  const [local, setLocal] = useState<LocalState>({
    nombre_etapa: evolucion.nombre_etapa,
    descripcion: evolucion.descripcion,
    arco_id: evolucion.arco_id,
    escena_id: evolucion.escena_id,
  });
  const isTyping = useRef(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isTyping.current) {
      setLocal({
        nombre_etapa: evolucion.nombre_etapa,
        descripcion: evolucion.descripcion,
        arco_id: evolucion.arco_id,
        escena_id: evolucion.escena_id,
      });
    }
  }, [evolucion.nombre_etapa, evolucion.descripcion, evolucion.arco_id, evolucion.escena_id]);

  const autoGrow = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    autoGrow();
  }, [local.descripcion, autoGrow]);

  const handleTextChange = useCallback(
    (field: "nombre_etapa" | "descripcion", value: string) => {
      isTyping.current = true;
      setLocal((prev) => ({ ...prev, [field]: value }));
      onUpdate(evolucion.id, { [field]: value });
      setTimeout(() => {
        isTyping.current = false;
      }, 1000);
    },
    [onUpdate, evolucion.id]
  );

  const handleArcoChange = useCallback(
    (value: string) => {
      const arcoId = value === "" ? null : value;
      setLocal((prev) => ({ ...prev, arco_id: arcoId }));
      onUpdate(evolucion.id, { arco_id: arcoId });
    },
    [onUpdate, evolucion.id]
  );

  const handleEscenaChange = useCallback(
    (value: string) => {
      const escenaId = value === "" ? null : value;
      setLocal((prev) => ({ ...prev, escena_id: escenaId }));
      onUpdate(evolucion.id, { escena_id: escenaId });
    },
    [onUpdate, evolucion.id]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
      onDragOver(e, index);
    },
    [onDragOver, index]
  );

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      setIsDragOver(false);
      onDrop(e, index);
    },
    [onDrop, index]
  );

  const isLast = index === total - 1;

  return (
    <div
      className="relative flex gap-4 pb-8 last:pb-0"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 mt-3 h-3 w-3 shrink-0 rounded-full bg-[var(--color-accent)]" />
        {!isLast && (
          <div className="absolute top-6 bottom-0 w-[2px] bg-[var(--color-border)]" />
        )}
      </div>

      <div
        className={`flex-1 rounded-lg border bg-[var(--color-cream)] p-3 shadow-sm transition-all ${
          isDragOver
            ? "border-[var(--color-accent)] opacity-80"
            : "border-[var(--color-border-light)]"
        } cursor-grab active:cursor-grabbing`}
      >
        <div className="mb-2 flex items-start gap-2">
          <input
            type="text"
            value={local.nombre_etapa}
            onChange={(e) => handleTextChange("nombre_etapa", e.target.value)}
            placeholder="Nombre de la etapa"
            className="flex-1 bg-transparent text-sm font-semibold text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none border-b border-transparent focus:border-[var(--color-accent)] transition-colors"
          />
          <button
            type="button"
            onClick={() => onRemove(evolucion.id)}
            className="shrink-0 rounded p-0.5 text-[var(--color-ink-muted)] hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-ink)] transition-colors"
            aria-label="Eliminar etapa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Arco selector */}
        <div className="mb-2 flex items-center gap-1.5">
          <select
            value={local.arco_id ?? ""}
            onChange={(e) => handleArcoChange(e.target.value)}
            className="flex-1 rounded border border-[var(--color-border)] bg-[var(--color-cream)] px-2 py-1 text-xs text-[var(--color-ink-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            <option value="">Sin arco</option>
            {arcos.map((arco) => (
              <option key={arco.id} value={arco.id}>{arco.nombre}</option>
            ))}
          </select>
          {local.arco_id && (
            <Link
              href={`/app/proyectos/${projectId}/arcos/${local.arco_id}`}
              className="shrink-0 rounded p-1 text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors"
              title="Ir al arco"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>

        {/* Escena selector */}
        <div className="mb-2 flex items-center gap-1.5">
          <select
            value={local.escena_id ?? ""}
            onChange={(e) => handleEscenaChange(e.target.value)}
            className="flex-1 rounded border border-[var(--color-border)] bg-[var(--color-cream)] px-2 py-1 text-xs text-[var(--color-ink-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            <option value="">Sin escena</option>
            {escenas.map((esc) => (
              <option key={esc.id} value={esc.id}>{esc.resumen || "Sin resumen"}</option>
            ))}
          </select>
          {local.escena_id && (
            <Link
              href={`/app/proyectos/${projectId}/escenas/${local.escena_id}`}
              className="shrink-0 rounded p-1 text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors"
              title="Ir a la escena"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>

        <textarea
          ref={textareaRef}
          value={local.descripcion}
          onChange={(e) => handleTextChange("descripcion", e.target.value)}
          placeholder="Descripción de la evolución..."
          rows={1}
          className="w-full resize-none overflow-hidden bg-transparent text-sm text-[var(--color-ink-light)] placeholder:text-[var(--color-ink-muted)] focus:outline-none"
        />
      </div>
    </div>
  );
}

export function EvolutionTimeline({
  evoluciones,
  arcos,
  hitos,
  fases,
  escenas,
  projectId,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
}: EvolutionTimelineProps) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Group evolutions by fase
  const groupedByFase = useMemo(() => {
    const faseMap = new Map<string | null, PersonajeEvolucion[]>();

    for (const evo of evoluciones) {
      let faseId: string | null = null;
      if (evo.arco_id) {
        const arco = arcos.find((a) => a.id === evo.arco_id);
        if (arco?.hito_origen_id) {
          const hito = hitos.find((h) => h.id === arco.hito_origen_id);
          if (hito?.fase_id) faseId = hito.fase_id;
        }
      }
      const group = faseMap.get(faseId) || [];
      group.push(evo);
      faseMap.set(faseId, group);
    }

    const sortedFaseIds = [...faseMap.keys()].sort((a, b) => {
      if (a === null) return 1;
      if (b === null) return -1;
      const faseA = fases.find((f) => f.id === a);
      const faseB = fases.find((f) => f.id === b);
      return (faseA?.posicion ?? 999) - (faseB?.posicion ?? 999);
    });

    return sortedFaseIds.map((faseId) => ({
      faseId,
      faseName: faseId ? fases.find((f) => f.id === faseId)?.nombre || "Fase sin nombre" : "Sin fase",
      evoluciones: faseMap.get(faseId) || [],
    }));
  }, [evoluciones, arcos, hitos, fases]);

  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      setDraggingIndex(index);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(index));
      requestAnimationFrame(() => {
        const target = e.currentTarget as HTMLElement;
        target.style.opacity = "0.4";
      });
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, _index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault();
      const sourceIndex = Number(e.dataTransfer.getData("text/plain"));
      if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

      const draggedEvolucion = evoluciones[sourceIndex];
      if (!draggedEvolucion) return;

      const targetEvolucion = evoluciones[targetIndex];
      if (!targetEvolucion) return;

      onReorder(draggedEvolucion.id, targetEvolucion.posicion);
      setDraggingIndex(null);
    },
    [evoluciones, onReorder]
  );

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = "1";
    setDraggingIndex(null);
  }, []);

  // Flatten for drag indexing
  let globalIndex = -1;

  return (
    <div className="space-y-4">
      <div className="relative pl-1" onDragEnd={handleDragEnd}>
        {evoluciones.length === 0 && (
          <p className="py-4 text-center text-sm text-[var(--color-ink-muted)]">
            No hay etapas de evolución todavía.
          </p>
        )}

        {groupedByFase.map((group) => (
          <div key={group.faseId ?? "null"}>
            {/* Fase header */}
            {evoluciones.length > 0 && (
              <div className="flex items-center gap-2 mb-2 mt-4 first:mt-0">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
                  {group.faseName}
                </span>
                <div className="flex-1 border-t border-[var(--color-border-light)]" />
              </div>
            )}

            {group.evoluciones.map((evolucion) => {
              globalIndex++;
              const idx = globalIndex;
              return (
                <div
                  key={evolucion.id}
                  className={`transition-opacity ${
                    draggingIndex !== null && draggingIndex !== idx ? "opacity-70" : ""
                  }`}
                >
                  <EvolutionCard
                    evolucion={evolucion}
                    arcos={arcos}
                    escenas={escenas}
                    projectId={projectId}
                    index={idx}
                    total={evoluciones.length}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="w-full rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-parchment)] px-4 py-2.5 text-sm text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
      >
        + Añadir etapa
      </button>
    </div>
  );
}
