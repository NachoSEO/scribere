"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { EmptyState } from "./EmptyState";

interface EntityListProps {
  title: string;
  items: { id: string; nombre: string; descripcion?: string }[];
  basePath: string;
  onCreate: (nombre: string) => Promise<{ id: string }>;
  entityLabel: string;
}

export function EntityList({ title, items, basePath, onCreate, entityLabel }: EntityListProps) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState("");

  const handleCreate = async () => {
    if (!nombre.trim()) return;
    const entity = await onCreate(nombre.trim());
    setCreating(false);
    setNombre("");
    router.push(`${basePath}/${entity.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") { setCreating(false); setNombre(""); }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">{title}</h1>
        <button
          onClick={() => setCreating(true)}
          className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
        >
          +
        </button>
      </div>

      {creating && (
        <div className="mt-4 flex gap-2">
          <input
            autoFocus
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Nombre del ${entityLabel}`}
            className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          <button
            onClick={handleCreate}
            disabled={!nombre.trim()}
            className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
          >
            Crear
          </button>
          <button
            onClick={() => { setCreating(false); setNombre(""); }}
            className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream-dark)]"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {items.length === 0 && !creating && (
          <EmptyState
            message={`No hay ${title.toLowerCase()} todavía`}
            action={`Crear ${entityLabel}`}
            onAction={() => setCreating(true)}
          />
        )}
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(`${basePath}/${item.id}`)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white p-4 text-left transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
          >
            <h3 className="text-sm font-medium text-[var(--color-ink)]">
              {item.nombre || <span className="italic text-[var(--color-ink-muted)]">Sin nombre</span>}
            </h3>
            {item.descripcion && (
              <p className="mt-1 text-xs text-[var(--color-ink-muted)] line-clamp-2">{item.descripcion}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
