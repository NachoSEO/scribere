"use client";

import { useState, useCallback } from "react";

interface Relacion {
  id: string;
  descripcion: string;
  otherId: string;
  otherNombre: string;
}

interface EntityOption {
  id: string;
  nombre: string;
}

interface RelacionesManagerProps {
  entityId: string;
  relaciones: Relacion[];
  available: EntityOption[];
  onCreate: (otherId: string) => Promise<void>;
  onUpdateDescripcion: (id: string, descripcion: string) => void;
  onDelete: (id: string) => void;
  label: string;
}

export function RelacionesManager({
  entityId,
  relaciones,
  available,
  onCreate,
  onUpdateDescripcion,
  onDelete,
  label,
}: RelacionesManagerProps) {
  const [adding, setAdding] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  // Filter out already-related entities
  const relatedIds = new Set(relaciones.map((r) => r.otherId));
  const unrelatedOptions = available.filter((e) => !relatedIds.has(e.id));

  const handleAdd = useCallback(async () => {
    if (!selectedId) return;
    await onCreate(selectedId);
    setSelectedId("");
    setAdding(false);
  }, [selectedId, onCreate]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-light)]">
          Relaciones con {label}
        </h3>
        {unrelatedOptions.length > 0 && (
          <button
            onClick={() => setAdding(true)}
            className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
          >
            + Añadir
          </button>
        )}
      </div>

      {adding && (
        <div className="mt-2 flex gap-2">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
          >
            <option value="">Seleccionar...</option>
            {unrelatedOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.nombre || "Sin nombre"}
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            disabled={!selectedId}
            className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
          >
            Añadir
          </button>
          <button
            onClick={() => { setAdding(false); setSelectedId(""); }}
            className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="mt-3 space-y-2">
        {relaciones.length === 0 && !adding && (
          <p className="text-xs text-[var(--color-ink-muted)] italic">Sin relaciones</p>
        )}
        {relaciones.map((rel) => (
          <RelacionCard
            key={rel.id}
            relacion={rel}
            entityId={entityId}
            onUpdateDescripcion={onUpdateDescripcion}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

function RelacionCard({
  relacion,
  entityId,
  onUpdateDescripcion,
  onDelete,
}: {
  relacion: Relacion;
  entityId: string;
  onUpdateDescripcion: (id: string, descripcion: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-ink)]">
          {relacion.otherNombre || "Sin nombre"}
        </span>
        <button
          onClick={() => onDelete(relacion.id)}
          className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
      <textarea
        value={relacion.descripcion}
        onChange={(e) => onUpdateDescripcion(relacion.id, e.target.value)}
        placeholder="Describe la relación..."
        rows={2}
        className="mt-2 w-full resize-y rounded border border-[var(--color-border-light)] bg-[var(--color-cream)] px-2 py-1.5 text-xs text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}
