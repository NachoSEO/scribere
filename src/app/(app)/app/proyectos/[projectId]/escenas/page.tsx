"use client";

import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useEscenas, usePersonajes } from "@/lib/proyectos/hooks";
import { EmptyState } from "@/components/proyectos/EmptyState";
import CustomSelect from "@/components/ui/CustomSelect";
import { ESCENA_ESTADO_OPTIONS } from "@/types/proyectos";
import type { Personaje } from "@/types/proyectos";

function PovBadge({ personaje }: { personaje: Personaje }) {
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

export default function EscenasPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { escenas, create } = useEscenas(projectId);
  const { personajes } = usePersonajes(projectId);
  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState("");
  const [filterPovId, setFilterPovId] = useState<string>("");
  const [filterEstado, setFilterEstado] = useState<string>("");

  const filteredEscenas = useMemo(() => {
    let result = escenas;
    if (filterPovId) result = result.filter((e) => e.pov_personaje_id === filterPovId);
    if (filterEstado) result = result.filter((e) => e.estado === filterEstado);
    return result;
  }, [escenas, filterPovId, filterEstado]);

  const povPersonajes = useMemo(() => {
    const ids = new Set(escenas.map((e) => e.pov_personaje_id).filter(Boolean));
    return personajes.filter((p) => ids.has(p.id));
  }, [escenas, personajes]);

  const handleCreate = async () => {
    if (!nombre.trim()) return;
    const entity = await create({ resumen: nombre.trim() });
    setCreating(false);
    setNombre("");
    router.push(`/app/proyectos/${projectId}/escenas/${entity.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") { setCreating(false); setNombre(""); }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Escenas</h1>
        <div className="flex items-center gap-2">
          {povPersonajes.length > 0 && (
            <CustomSelect
              value={filterPovId}
              onChange={(v) => setFilterPovId(v)}
              options={povPersonajes.map((p) => ({ value: p.id, label: p.nombre || "Sin nombre" }))}
              placeholder="Todos los POV"
              className="text-xs"
            />
          )}
          <CustomSelect
            value={filterEstado}
            onChange={(v) => setFilterEstado(v)}
            options={ESCENA_ESTADO_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            placeholder="Todos los estados"
            className="text-xs"
          />
          <button
            onClick={() => setCreating(true)}
            className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
          >
            +
          </button>
        </div>
      </div>

      {creating && (
        <div className="mt-4 flex gap-2">
          <input
            autoFocus
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Resumen de la escena"
            className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          <button onClick={handleCreate} disabled={!nombre.trim()} className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50">Crear</button>
          <button onClick={() => { setCreating(false); setNombre(""); }} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream-dark)]">Cancelar</button>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {filteredEscenas.length === 0 && !creating && (
          <EmptyState
            message={filterPovId || filterEstado ? "No hay escenas con estos filtros" : "No hay escenas todavia"}
            action="Crear escena"
            onAction={() => setCreating(true)}
          />
        )}
        {filteredEscenas.map((escena) => {
          const pov = escena.pov_personaje_id ? personajes.find((p) => p.id === escena.pov_personaje_id) : null;
          const estadoOpt = escena.estado ? ESCENA_ESTADO_OPTIONS.find((o) => o.value === escena.estado) : null;
          return (
            <button
              key={escena.id}
              onClick={() => router.push(`/app/proyectos/${projectId}/escenas/${escena.id}`)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white p-4 text-left transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center gap-2">
                {estadoOpt && <span className="shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: estadoOpt.color }} />}
                {pov && <PovBadge personaje={pov} />}
                <h3 className="text-sm font-medium text-[var(--color-ink)] flex-1 min-w-0">
                  {escena.resumen || <span className="italic text-[var(--color-ink-muted)]">Sin resumen</span>}
                </h3>
                {estadoOpt && (
                  <span className="shrink-0 text-[10px] text-[var(--color-ink-muted)]">{estadoOpt.label}</span>
                )}
              </div>
              {escena.objetivo && (
                <p className="mt-1 text-xs text-[var(--color-ink-muted)] line-clamp-2">{escena.objetivo}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
