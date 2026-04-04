"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useArcos, usePersonajes } from "@/lib/proyectos/hooks";
import { fetchArcoPersonajes } from "@/lib/proyectos/queries";
import { createClient } from "@/lib/supabase/client";
import { EmptyState } from "@/components/proyectos/EmptyState";
import { TIPO_RESOLUCION_OPTIONS } from "@/types/proyectos";
import type { Personaje, ArcoPersonaje } from "@/types/proyectos";

function PersonajeBadge({ personaje }: { personaje: Personaje }) {
  if (personaje.imagen_url) {
    return <img src={personaje.imagen_url} alt={personaje.nombre} title={personaje.nombre} className="w-5 h-5 rounded-full object-cover shrink-0" />;
  }
  return (
    <span
      title={personaje.nombre}
      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
      style={{ backgroundColor: "#8b6f4726", color: "#8b6f47" }}
    >
      {personaje.nombre.charAt(0).toUpperCase()}
    </span>
  );
}

const YBNA_COLORS: Record<string, string> = {
  si: "#a7c4a0",
  si_pero: "#d4b872",
  no_y: "#cf8a7a",
  no: "#b85c4a",
};

export default function ArcosPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { arcos, create } = useArcos(projectId);
  const { personajes } = usePersonajes(projectId);
  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState("");

  // Fetch arco_personajes for all arcos
  const [arcoPersonajesMap, setArcoPersonajesMap] = useState<Map<string, ArcoPersonaje[]>>(new Map());

  useEffect(() => {
    if (arcos.length === 0) return;
    const sb = createClient();
    Promise.all(arcos.map((a) => fetchArcoPersonajes(sb, a.id).then((links) => [a.id, links] as const)))
      .then((results) => {
        const map = new Map<string, ArcoPersonaje[]>();
        for (const [arcoId, links] of results) {
          map.set(arcoId, links);
        }
        setArcoPersonajesMap(map);
      })
      .catch(console.error);
  }, [arcos]);

  const handleCreate = async () => {
    if (!nombre.trim()) return;
    const entity = await create({ nombre: nombre.trim() });
    setCreating(false);
    setNombre("");
    router.push(`/app/proyectos/${projectId}/arcos/${entity.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") { setCreating(false); setNombre(""); }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Arcos</h1>
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
            placeholder="Nombre del arco"
            className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          <button onClick={handleCreate} disabled={!nombre.trim()} className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50">Crear</button>
          <button onClick={() => { setCreating(false); setNombre(""); }} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream-dark)]">Cancelar</button>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {arcos.length === 0 && !creating && (
          <EmptyState
            message="No hay arcos todavia"
            action="Crear arco"
            onAction={() => setCreating(true)}
          />
        )}
        {arcos.map((arco) => {
          const links = arcoPersonajesMap.get(arco.id) || [];
          const arcoPersonajes = links.map((l) => personajes.find((p) => p.id === l.personaje_id)).filter(Boolean) as Personaje[];
          const resOption = TIPO_RESOLUCION_OPTIONS.find((o) => o.value === arco.tipo_resolucion);
          const ybnaColor = arco.tipo_resolucion ? YBNA_COLORS[arco.tipo_resolucion] : undefined;
          return (
            <button
              key={arco.id}
              onClick={() => router.push(`/app/proyectos/${projectId}/arcos/${arco.id}`)}
              className="w-full rounded-lg border bg-white p-4 text-left transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
              style={{
                borderColor: ybnaColor || "var(--color-border)",
                borderLeftWidth: "3px",
                borderLeftColor: ybnaColor || "var(--color-border)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-[var(--color-ink)] flex-1 min-w-0">
                  {arco.nombre || <span className="italic text-[var(--color-ink-muted)]">Sin nombre</span>}
                </h3>
                {resOption && resOption.value && (
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ backgroundColor: ybnaColor ? `${ybnaColor}40` : "#f3f4f6", color: ybnaColor || "#6b7280" }}
                  >
                    {resOption.label}
                  </span>
                )}
              </div>
              {arcoPersonajes.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[10px] text-[var(--color-ink-muted)]">Personajes:</span>
                  <div className="flex items-center gap-1">
                    {arcoPersonajes.map((p) => (
                      <PersonajeBadge key={p.id} personaje={p} />
                    ))}
                  </div>
                </div>
              )}
              {arco.planteamiento && (
                <p className="mt-1 text-xs text-[var(--color-ink-muted)] line-clamp-2">{arco.planteamiento}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
