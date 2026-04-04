"use client";

import { use, useCallback } from "react";
import { useProyectoTareas } from "@/lib/proyectos/hooks";
import { useProyectosStore } from "@/lib/proyectos/store";
import type { TareaEstado } from "@/types/proyectos";

const COLUMNS: { estado: TareaEstado; label: string; color: string }[] = [
  { estado: "pendiente", label: "Pendiente", color: "#9e9590" },
  { estado: "en_progreso", label: "En progreso", color: "#55699b" },
  { estado: "completada", label: "Completada", color: "#78a064" },
];

function getAdjacentEstado(current: TareaEstado, direction: "left" | "right"): TareaEstado | null {
  const order: TareaEstado[] = ["pendiente", "en_progreso", "completada"];
  const idx = order.indexOf(current);
  if (direction === "left" && idx > 0) return order[idx - 1];
  if (direction === "right" && idx < order.length - 1) return order[idx + 1];
  return null;
}

export default function TareasPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { tareas, update } = useProyectoTareas(projectId);
  const escenas = useProyectosStore((s) => s.escenas);

  const getEscenaNombre = useCallback(
    (escenaId: string) => {
      const escena = escenas.find((e) => e.id === escenaId);
      return escena?.resumen || "Sin título";
    },
    [escenas]
  );

  const handleMove = useCallback(
    (id: string, current: TareaEstado, direction: "left" | "right") => {
      const next = getAdjacentEstado(current, direction);
      if (next) update(id, { estado: next });
    },
    [update]
  );

  return (
    <div className="flex flex-col h-full p-6 overflow-hidden">
      <h1 className="text-lg font-semibold text-[var(--color-ink)] mb-4 shrink-0">Tareas</h1>

      <div className="flex-1 flex gap-4 min-h-0 overflow-x-auto">
        {COLUMNS.map((col) => {
          const columnTareas = tareas.filter((t) => t.estado === col.estado);
          return (
            <div
              key={col.estado}
              className="flex flex-col flex-1 min-w-[240px] max-w-[360px] rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-dark)] overflow-hidden"
            >
              {/* Column header */}
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[var(--color-border)] shrink-0">
                <span
                  className="shrink-0 h-2 w-2 rounded-full"
                  style={{ backgroundColor: col.color }}
                />
                <h2 className="text-xs font-semibold text-[var(--color-ink)]">
                  {col.label}
                </h2>
                <span className="text-[10px] text-[var(--color-ink-muted)] bg-[var(--color-parchment)] rounded-full px-1.5 py-0.5 font-medium">
                  {columnTareas.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                {columnTareas.length === 0 && (
                  <p className="text-[11px] text-[var(--color-ink-muted)] italic text-center py-4">
                    Sin tareas
                  </p>
                )}
                {columnTareas.map((tarea) => {
                  const canLeft = getAdjacentEstado(tarea.estado, "left") !== null;
                  const canRight = getAdjacentEstado(tarea.estado, "right") !== null;

                  return (
                    <div
                      key={tarea.id}
                      className="rounded-md border border-[var(--color-border)] bg-white p-3 space-y-2 transition-shadow hover:shadow-sm"
                    >
                      <p className="text-xs font-medium text-[var(--color-ink)] break-words">
                        {tarea.titulo}
                      </p>

                      {tarea.escena_id && (
                        <span
                          className="inline-block text-[10px] rounded px-1.5 py-0.5 font-medium truncate max-w-full"
                          style={{
                            backgroundColor: `${col.color}18`,
                            color: col.color,
                          }}
                        >
                          {getEscenaNombre(tarea.escena_id)}
                        </span>
                      )}

                      <div className="flex items-center gap-1">
                        {canLeft && (
                          <button
                            onClick={() => handleMove(tarea.id, tarea.estado, "left")}
                            className="rounded border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] text-[var(--color-ink-muted)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)] transition-colors"
                          >
                            ←
                          </button>
                        )}
                        {canRight && (
                          <button
                            onClick={() => handleMove(tarea.id, tarea.estado, "right")}
                            className="rounded border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] text-[var(--color-ink-muted)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)] transition-colors"
                          >
                            →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
