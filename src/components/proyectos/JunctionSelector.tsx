"use client";

import { useMemo, useState } from "react";

interface JunctionSelectorProps {
  label: string;
  /** IDs currently linked */
  linkedIds: string[];
  /** All available options to select from */
  options: { id: string; nombre: string }[];
  onAdd: (id: string) => void;
  onRemove: (junctionId: string) => void;
  /** Map from option ID to junction record ID for removal */
  junctionMap: Map<string, string>;
}

export function JunctionSelector({
  label,
  linkedIds,
  options,
  onAdd,
  onRemove,
  junctionMap,
}: JunctionSelectorProps) {
  const [adding, setAdding] = useState(false);

  const available = useMemo(
    () => options.filter((o) => !linkedIds.includes(o.id)),
    [options, linkedIds]
  );

  const linked = useMemo(
    () => options.filter((o) => linkedIds.includes(o.id)),
    [options, linkedIds]
  );

  const handleAdd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      onAdd(e.target.value);
      setAdding(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
          {label}
        </label>
        {available.length > 0 && (
          <button
            onClick={() => setAdding(true)}
            className="rounded-md bg-[var(--color-accent)] px-2 py-0.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
          >
            +
          </button>
        )}
      </div>

      {adding && (
        <select
          autoFocus
          onChange={handleAdd}
          onBlur={() => setAdding(false)}
          defaultValue=""
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
        >
          <option value="" disabled>Seleccionar...</option>
          {available.map((o) => (
            <option key={o.id} value={o.id}>{o.nombre || "Sin nombre"}</option>
          ))}
        </select>
      )}

      {linked.length === 0 && !adding && (
        <p className="text-xs text-[var(--color-ink-muted)]">Ninguno vinculado</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {linked.map((item) => {
          const junctionId = junctionMap.get(item.id);
          return (
            <span
              key={item.id}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-white px-2.5 py-1 text-xs text-[var(--color-ink)]"
            >
              {item.nombre || "Sin nombre"}
              {junctionId && (
                <button
                  onClick={() => onRemove(junctionId)}
                  className="text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
                >
                  &times;
                </button>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
