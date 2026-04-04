"use client";

import { useCallback, useMemo } from "react";
import { useGeneral, useProyecto } from "@/lib/proyectos/hooks";
import { useProyectosStore } from "@/lib/proyectos/store";
import { useMundos } from "@/lib/worldbuilding/hooks";
import { ESCENA_ESTADO_OPTIONS } from "@/types/proyectos";
import type { EscenaEstado } from "@/types/proyectos";
import { FormField } from "./FormField";

interface GeneralFormProps {
  projectId: string;
}

export function GeneralForm({ projectId }: GeneralFormProps) {
  const { general, save } = useGeneral(projectId);
  const { proyecto, save: saveProyecto } = useProyecto(projectId);
  const { mundos } = useMundos();

  const val = (key: string) => (general as Record<string, string> | null)?.[key] ?? "";

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleMundoChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    saveProyecto({ mundo_id: e.target.value || null });
  }, [saveProyecto]);

  const handleNombreChange = useCallback((value: string) => {
    saveProyecto({ nombre: value });
  }, [saveProyecto]);

  // Manuscript progress from store
  const escenas = useProyectosStore((s) => s.escenas);
  const progressData = useMemo(() => {
    const total = escenas.length;
    const completed = escenas.filter((e) => e.estado === "version_final").length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const byEstado = new Map<EscenaEstado, number>();
    for (const e of escenas) {
      if (e.estado) {
        byEstado.set(e.estado, (byEstado.get(e.estado) || 0) + 1);
      }
    }
    return { total, completed, pct, byEstado };
  }, [escenas]);

  return (
    <div className="p-6 max-w-4xl">
      {/* Header: Project name + Mundo badge */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <FormField
            label=""
            value={proyecto?.nombre ?? ""}
            onChange={handleNombreChange}
            placeholder="Nombre del proyecto"
          />
        </div>
        <div className="pt-1">
          <select
            value={proyecto?.mundo_id ?? ""}
            onChange={handleMundoChange}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1 text-xs text-[var(--color-accent)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
          >
            <option value="">Sin mundo</option>
            {mundos.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre || "Mundo sin nombre"}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
        Los cambios se guardan automáticamente
      </p>

      {/* Manuscript progress */}
      {progressData.total > 0 && (
        <div className="mt-6">
          <Card>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--color-ink-light)]">Progreso del manuscrito</span>
                <span className="text-xs text-[var(--color-ink-muted)] tabular-nums">
                  {progressData.completed} de {progressData.total} escenas completadas ({progressData.pct}%)
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-2 rounded-full bg-[var(--color-parchment)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressData.pct}%`,
                    backgroundColor: progressData.pct === 100 ? "#78a064" : "var(--color-accent)",
                  }}
                />
              </div>
              {/* Breakdown by estado */}
              <div className="flex flex-wrap gap-3">
                {ESCENA_ESTADO_OPTIONS.map((opt) => {
                  const count = progressData.byEstado.get(opt.value) || 0;
                  return (
                    <div key={opt.value} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: opt.color }} />
                      <span className="text-[10px] text-[var(--color-ink-muted)]">{opt.label}</span>
                      <span className="text-[10px] font-medium text-[var(--color-ink-light)] tabular-nums">{count}</span>
                    </div>
                  );
                })}
                {(() => {
                  const withoutEstado = progressData.total - Array.from(progressData.byEstado.values()).reduce((a, b) => a + b, 0);
                  return withoutEstado > 0 ? (
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full shrink-0 bg-[var(--color-border)]" />
                      <span className="text-[10px] text-[var(--color-ink-muted)]">Sin estado</span>
                      <span className="text-[10px] font-medium text-[var(--color-ink-light)] tabular-nums">{withoutEstado}</span>
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Core Story (2 cols) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <FormField
            label="Premisa"
            value={val("premisa")}
            onChange={(v) => handleChange("premisa", v)}
            multiline
            rows={3}
            placeholder="La idea central de la historia..."
          />
        </Card>
        <Card>
          <FormField
            label="Conflicto principal"
            value={val("conflicto")}
            onChange={(v) => handleChange("conflicto", v)}
            multiline
            rows={3}
            placeholder="El conflicto que impulsa la trama..."
          />
        </Card>
      </div>

      {/* Temas (3 cols) */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <FormField
            label="Idea controladora"
            value={val("idea_controladora")}
            onChange={(v) => handleChange("idea_controladora", v)}
            multiline
            rows={2}
            placeholder="La verdad que la historia demuestra..."
          />
        </Card>
        <Card>
          <FormField
            label="Contraideas"
            value={val("contraideas")}
            onChange={(v) => handleChange("contraideas", v)}
            multiline
            rows={2}
            placeholder="Las ideas opuestas..."
          />
        </Card>
        <Card>
          <FormField
            label="Temas"
            value={val("temas")}
            onChange={(v) => handleChange("temas", v)}
            multiline
            rows={2}
            placeholder="Los temas principales..."
          />
        </Card>
      </div>

      {/* Estilo (2 cols inline) */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <FormField
            label="Tono"
            value={val("tono")}
            onChange={(v) => handleChange("tono", v)}
            multiline
            rows={3}
            placeholder="El tono general de la narrativa..."
          />
        </Card>
        <Card>
          <FormField
            label="Estilo"
            value={val("estilo")}
            onChange={(v) => handleChange("estilo", v)}
            multiline
            rows={3}
            placeholder="El estilo de escritura..."
          />
        </Card>
      </div>

      {/* Full-width: Estructura + Resumen */}
      <div className="mt-4 space-y-4">
        <Card>
          <FormField
            label="Estructura"
            value={val("estructura")}
            onChange={(v) => handleChange("estructura", v)}
            multiline
            rows={4}
            placeholder="La estructura narrativa (actos, arcos, etc.)..."
          />
        </Card>
        <Card>
          <FormField
            label="Resumen"
            value={val("resumen")}
            onChange={(v) => handleChange("resumen", v)}
            multiline
            rows={5}
            placeholder="Un resumen general de la historia..."
          />
        </Card>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
      {children}
    </div>
  );
}
