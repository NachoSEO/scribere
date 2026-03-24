"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useProyectos } from "@/lib/proyectos/hooks";
import { useMundos } from "@/lib/worldbuilding/hooks";
import { createClient } from "@/lib/supabase/client";
import { fetchGeneralsBatch } from "@/lib/proyectos/queries";
import { BookCover } from "./BookCover";
import type { General } from "@/types/proyectos";

const GENERAL_FIELDS = ["premisa", "conflicto", "idea_controladora", "contraideas", "temas", "tono", "estilo", "estructura", "resumen"] as const;

function calcCompleteness(general: General | undefined): number {
  if (!general) return 0;
  let filled = 0;
  for (const key of GENERAL_FIELDS) {
    if ((general[key] as string)?.trim()) filled++;
  }
  return Math.round((filled / GENERAL_FIELDS.length) * 100);
}

export function ProyectoSelector() {
  const router = useRouter();
  const { proyectos, create } = useProyectos();
  const { mundos } = useMundos();
  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState("");
  const [generals, setGenerals] = useState<General[]>([]);

  const mundoMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const m of mundos) map.set(m.id, m.nombre);
    return map;
  }, [mundos]);

  // Fetch generals in batch for completeness calculation
  useEffect(() => {
    if (proyectos.length === 0) return;
    const sb = createClient();
    fetchGeneralsBatch(sb, proyectos.map((p) => p.id))
      .then(setGenerals)
      .catch(console.error);
  }, [proyectos]);

  const generalMap = useMemo(() => {
    const map = new Map<string, General>();
    for (const g of generals) map.set(g.proyecto_id, g);
    return map;
  }, [generals]);

  const handleCreate = async () => {
    if (!nombre.trim()) return;
    const proyecto = await create({ nombre: nombre.trim() });
    router.push(`/app/proyectos/${proyecto.id}/general`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") { setCreating(false); setNombre(""); }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Proyectos</h1>
      </div>

      {creating && (
        <div className="mt-4 flex gap-2">
          <input
            autoFocus
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nombre del proyecto"
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

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {proyectos.map((proyecto) => (
          <BookCover
            key={proyecto.id}
            nombre={proyecto.nombre}
            mundoNombre={proyecto.mundo_id ? mundoMap.get(proyecto.mundo_id) : undefined}
            completeness={calcCompleteness(generalMap.get(proyecto.id))}
            onClick={() => router.push(`/app/proyectos/${proyecto.id}/general`)}
          />
        ))}

        {/* New project cover */}
        <button
          onClick={() => setCreating(true)}
          className="group flex aspect-[2/3] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-cream)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-cream-dark)]"
        >
          <span className="text-3xl text-[var(--color-ink-muted)] transition-colors group-hover:text-[var(--color-accent)]">+</span>
          <span className="mt-2 text-xs text-[var(--color-ink-muted)] transition-colors group-hover:text-[var(--color-accent)]">
            Nuevo proyecto
          </span>
        </button>
      </div>
    </div>
  );
}
