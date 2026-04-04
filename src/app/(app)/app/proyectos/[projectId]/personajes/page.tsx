"use client";

import { use, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePersonajes } from "@/lib/proyectos/hooks";
import { EmptyState } from "@/components/proyectos/EmptyState";

export default function PersonajesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { personajes, create } = usePersonajes(projectId);

  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState("");

  const handleCreate = useCallback(async () => {
    if (!nombre.trim()) return;
    const entity = await create({ nombre: nombre.trim() });
    setCreating(false);
    setNombre("");
    router.push(`/app/proyectos/${projectId}/personajes/${entity.id}`);
  }, [nombre, create, projectId, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") {
      setCreating(false);
      setNombre("");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Personajes</h1>
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
            placeholder="Nombre del personaje"
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

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {personajes.length === 0 && !creating && (
          <div className="col-span-full">
            <EmptyState
              message="No hay personajes todavia"
              action="Crear personaje"
              onAction={() => setCreating(true)}
            />
          </div>
        )}
        {personajes.map((p) => {
          const initials = p.nombre
            ? p.nombre.slice(0, 2).toUpperCase()
            : "??";

          return (
            <button
              key={p.id}
              onClick={() => router.push(`/app/proyectos/${projectId}/personajes/${p.id}`)}
              className="group relative rounded-lg border border-[var(--color-border)] bg-white text-left transition-all hover:border-[var(--color-accent-light)] hover:shadow-sm overflow-hidden"
            >
              {/* Image or initials */}
              <div className="aspect-[3/4] w-full overflow-hidden bg-[var(--color-parchment)]">
                {p.imagen_url ? (
                  <img
                    src={p.imagen_url}
                    alt={p.nombre}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl font-semibold text-[var(--color-ink-muted)]/30 select-none">
                      {initials}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3">
                {/* Type badge */}
                {p.tipo && (
                  <span className="inline-block rounded-full bg-[var(--color-cream-dark)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-ink-muted)] mb-1">
                    {p.tipo}
                  </span>
                )}

                {/* Name */}
                <h3 className="text-sm font-medium text-[var(--color-ink)] line-clamp-1">
                  {p.nombre || (
                    <span className="italic text-[var(--color-ink-muted)]">Sin nombre</span>
                  )}
                </h3>

                {/* Short description */}
                {p.descripcion && (
                  <p className="mt-0.5 text-xs text-[var(--color-ink-muted)] line-clamp-2">
                    {p.descripcion}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
