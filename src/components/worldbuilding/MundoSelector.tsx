"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMundos } from "@/lib/worldbuilding/hooks";
import { EmptyState } from "@/components/proyectos/EmptyState";

export function MundoSelector() {
  const router = useRouter();
  const { mundos, create } = useMundos();
  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState("");

  const handleCreate = async () => {
    if (!nombre.trim()) return;
    const mundo = await create({ nombre: nombre.trim() });
    router.push(`/app/worldbuilding/${mundo.id}/general`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") { setCreating(false); setNombre(""); }
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Mundos</h1>
        <button
          onClick={() => setCreating(true)}
          className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
        >
          Nuevo mundo
        </button>
      </div>

      {creating && (
        <div className="mt-4 flex gap-2">
          <input
            autoFocus
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nombre del mundo"
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

      <div className="mt-6 space-y-2">
        {mundos.length === 0 && !creating && (
          <EmptyState
            message="No tienes mundos todavía"
            action="Crear primer mundo"
            onAction={() => setCreating(true)}
          />
        )}
        {mundos.map((mundo) => (
          <button
            key={mundo.id}
            onClick={() => router.push(`/app/worldbuilding/${mundo.id}/general`)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white p-4 text-left transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
          >
            <h3 className="text-sm font-medium text-[var(--color-ink)]">{mundo.nombre}</h3>
            {mundo.descripcion && (
              <p className="mt-1 text-xs text-[var(--color-ink-muted)] line-clamp-2">{mundo.descripcion}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
