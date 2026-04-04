"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useProyectosStore } from "@/lib/proyectos/store";
import { ENTITY_TYPE_CONFIG, type MentionType } from "@/lib/proyectos/entity-config";

interface EntityPreviewPanelProps {
  entityId: string;
  entityType: MentionType;
  projectId: string;
  onClose: () => void;
}

export function EntityPreviewPanel({ entityId, entityType, projectId, onClose }: EntityPreviewPanelProps) {
  const config = ENTITY_TYPE_CONFIG[entityType];

  const entity = useProyectosStore((s) => {
    switch (entityType) {
      case "personaje": return s.personajes.find((p) => p.id === entityId);
      case "lugar": return s.lugares.find((l) => l.id === entityId);
      case "faccion": return s.facciones.find((f) => f.id === entityId);
      case "evento": return s.eventos.find((e) => e.id === entityId);
      default: return null;
    }
  });

  const href = useMemo(() => {
    const plural = entityType === "faccion" ? "facciones" : `${entityType}s`;
    return `/app/proyectos/${projectId}/${plural}/${entityId}`;
  }, [entityType, entityId, projectId]);

  if (!entity) return null;

  const fields = getEntityFields(entity as unknown as Record<string, unknown>, entityType);

  return (
    <div className="fixed right-0 top-0 z-40 h-full w-80 bg-white border-l border-[var(--color-border)] shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="shrink-0 h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: config.color }}>
            {config.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors text-sm"
        >
          &times;
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <h3 className="text-sm font-semibold text-[var(--color-ink)]">
          {(entity as { nombre?: string }).nombre || "Sin nombre"}
        </h3>

        {fields.map(({ label, value }) =>
          value ? (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-0.5">
                {label}
              </p>
              <p className="text-xs text-[var(--color-ink)] whitespace-pre-wrap">{value}</p>
            </div>
          ) : null
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--color-border)] px-4 py-3">
        <Link
          href={href}
          className="block w-full rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-[var(--color-accent-dark)] transition-colors"
        >
          Abrir ficha completa
        </Link>
      </div>
    </div>
  );
}

function getEntityFields(entity: Record<string, unknown>, type: MentionType): { label: string; value: string }[] {
  switch (type) {
    case "personaje":
      return [
        { label: "Tipo", value: entity.tipo as string },
        { label: "Concepto", value: entity.concepto as string },
        { label: "Función narrativa", value: entity.funcion_narrativa as string },
        { label: "Motivación", value: entity.motivacion as string },
        { label: "Complicación", value: entity.complicacion as string },
        { label: "Descripción", value: entity.descripcion as string },
      ];
    case "lugar":
      return [
        { label: "Tipo", value: entity.tipo as string },
        { label: "Descripción", value: entity.descripcion as string },
      ];
    case "faccion":
      return [
        { label: "Concepto", value: entity.concepto as string },
        { label: "Objetivos", value: entity.objetivos as string },
        { label: "Motivación", value: entity.motivacion as string },
      ];
    case "evento":
      return [
        { label: "Función", value: entity.funcion as string },
        { label: "Causa directa", value: entity.causa_directa as string },
        { label: "Consecuencia directa", value: entity.consecuencia_directa as string },
        { label: "Descripción", value: entity.descripcion as string },
      ];
    default:
      return [];
  }
}
