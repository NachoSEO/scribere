"use client";

import { useMemo, useState } from "react";
import CustomSelect from "@/components/ui/CustomSelect";

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
  /** Optional custom renderer for linked item tags */
  renderTag?: (
    item: { id: string; nombre: string },
    junctionId: string | undefined,
    onRemove: (junctionId: string) => void
  ) => React.ReactNode;
}

export function JunctionSelector({
  label,
  linkedIds,
  options,
  onAdd,
  onRemove,
  junctionMap,
  renderTag,
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

  const handleAdd = (value: string) => {
    if (value) {
      onAdd(value);
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
        <CustomSelect
          value=""
          onChange={handleAdd}
          options={available.map((o) => ({ value: o.id, label: o.nombre || "Sin nombre" }))}
          placeholder="Seleccionar..."
          className="w-full"
        />
      )}

      {linked.length === 0 && !adding && (
        <p className="text-xs text-[var(--color-ink-muted)]">Ninguno vinculado</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {linked.map((item) => {
          const junctionId = junctionMap.get(item.id);
          if (renderTag) return renderTag(item, junctionId, onRemove);
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
