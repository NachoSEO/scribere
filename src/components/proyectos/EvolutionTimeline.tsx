"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PersonajeEvolucion, Arco } from "@/types/proyectos";

interface EvolutionTimelineProps {
  evoluciones: PersonajeEvolucion[];
  arcos: Arco[];
  onAdd: () => void;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onRemove: (id: string) => void;
  onReorder: (id: string, newPosicion: number) => void;
}

interface LocalState {
  nombre_etapa: string;
  descripcion: string;
  arco_id: string | null;
}

function EvolutionCard({
  evolucion,
  arcos,
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
  });
  const isTyping = useRef(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync from parent when not typing
  useEffect(() => {
    if (!isTyping.current) {
      setLocal({
        nombre_etapa: evolucion.nombre_etapa,
        descripcion: evolucion.descripcion,
        arco_id: evolucion.arco_id,
      });
    }
  }, [evolucion.nombre_etapa, evolucion.descripcion, evolucion.arco_id]);

  // Auto-grow textarea
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
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div className="relative z-10 mt-3 h-3 w-3 shrink-0 rounded-full bg-[var(--color-accent)]" />
        {/* Connecting line */}
        {!isLast && (
          <div className="absolute top-6 bottom-0 w-[2px] bg-[var(--color-border)]" />
        )}
      </div>

      {/* Card */}
      <div
        className={`flex-1 rounded-lg border bg-[var(--color-cream)] p-3 shadow-sm transition-all ${
          isDragOver
            ? "border-[var(--color-accent)] opacity-80"
            : "border-[var(--color-border-light)]"
        } cursor-grab active:cursor-grabbing`}
      >
        {/* Header row: title + remove */}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Arco selector */}
        <div className="mb-2">
          <select
            value={local.arco_id ?? ""}
            onChange={(e) => handleArcoChange(e.target.value)}
            className="w-full rounded border border-[var(--color-border)] bg-[var(--color-cream)] px-2 py-1 text-xs text-[var(--color-ink-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          >
            <option value="">Sin arco</option>
            {arcos.map((arco) => (
              <option key={arco.id} value={arco.id}>
                {arco.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
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
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
}: EvolutionTimelineProps) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      setDraggingIndex(index);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(index));
      // Apply drag opacity after a tick so the drag image captures the original state
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

      // Calculate new position based on target index
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

  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div
        className="relative pl-1"
        onDragEnd={handleDragEnd}
      >
        {evoluciones.length === 0 && (
          <p className="py-4 text-center text-sm text-[var(--color-ink-muted)]">
            No hay etapas de evolución todavía.
          </p>
        )}

        {evoluciones.map((evolucion, index) => (
          <div
            key={evolucion.id}
            className={`transition-opacity ${
              draggingIndex !== null && draggingIndex !== index
                ? "opacity-70"
                : ""
            }`}
          >
            <EvolutionCard
              evolucion={evolucion}
              arcos={arcos}
              index={index}
              total={evoluciones.length}
              onUpdate={onUpdate}
              onRemove={onRemove}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </div>
        ))}
      </div>

      {/* Add button */}
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
