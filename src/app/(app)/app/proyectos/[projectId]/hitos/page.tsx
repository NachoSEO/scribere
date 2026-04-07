"use client";

import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useHitos, usePersonajes } from "@/lib/proyectos/hooks";
import { EmptyState } from "@/components/proyectos/EmptyState";
import CustomSelect from "@/components/ui/CustomSelect";
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

const HITO_TIPO_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  normalidad:           { label: "Normalidad",          bg: "bg-stone-100",  text: "text-stone-600" },
  cambio_de_fase:       { label: "Cambio de fase",      bg: "bg-amber-50",   text: "text-amber-700" },
  incidente_incitador:  { label: "Incidente incitador", bg: "bg-rose-50",    text: "text-rose-700" },
};

export default function HitosPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { hitos, create } = useHitos(projectId);
  const { personajes } = usePersonajes(projectId);
  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState("");
  const [filterPovId, setFilterPovId] = useState<string>("");

  const filteredHitos = useMemo(() => {
    if (!filterPovId) return hitos;
    return hitos.filter((h) => h.pov_personaje_id === filterPovId);
  }, [hitos, filterPovId]);

  // Personajes that are used as POV in at least one hito
  const povPersonajes = useMemo(() => {
    const ids = new Set(hitos.map((h) => h.pov_personaje_id).filter(Boolean));
    return personajes.filter((p) => ids.has(p.id));
  }, [hitos, personajes]);

  const handleCreate = async () => {
    if (!nombre.trim()) return;
    const entity = await create({ hito: nombre.trim() });
    setCreating(false);
    setNombre("");
    router.push(`/app/proyectos/${projectId}/hitos/${entity.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") { setCreating(false); setNombre(""); }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Hitos</h1>
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
            placeholder="Nombre del hito"
            className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          <button onClick={handleCreate} disabled={!nombre.trim()} className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50">Crear</button>
          <button onClick={() => { setCreating(false); setNombre(""); }} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream-dark)]">Cancelar</button>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {filteredHitos.length === 0 && !creating && (
          <EmptyState
            message={filterPovId ? "No hay hitos con este POV" : "No hay hitos todavia"}
            action="Crear hito"
            onAction={() => setCreating(true)}
          />
        )}
        {filteredHitos.map((hito) => {
          const pov = hito.pov_personaje_id ? personajes.find((p) => p.id === hito.pov_personaje_id) : null;
          const tipoConfig = HITO_TIPO_CONFIG[hito.tipo] || HITO_TIPO_CONFIG.normalidad;
          return (
            <button
              key={hito.id}
              onClick={() => router.push(`/app/proyectos/${projectId}/hitos/${hito.id}`)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white p-4 text-left transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center gap-2">
                {pov && <PovBadge personaje={pov} />}
                <h3 className="text-sm font-medium text-[var(--color-ink)] flex-1 min-w-0">
                  {hito.hito || <span className="italic text-[var(--color-ink-muted)]">Sin nombre</span>}
                </h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${tipoConfig.bg} ${tipoConfig.text}`}>
                  {tipoConfig.label}
                </span>
              </div>
              {hito.informacion && (
                <p className="mt-1 text-xs text-[var(--color-ink-muted)] line-clamp-2">{hito.informacion}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
