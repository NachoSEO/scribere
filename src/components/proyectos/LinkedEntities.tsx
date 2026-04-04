"use client";

import { useMemo } from "react";
import { useProyectosStore } from "@/lib/proyectos/store";
import { ENTITY_TYPE_CONFIG } from "@/lib/proyectos/entity-config";
import { EntityBadge } from "./EntityBadge";

interface LinkedEntitiesProps {
  projectId: string;
  personajeIds: string[];
  lugarIds: string[];
  eventoIds: string[];
  onEntityClick?: (entityId: string, entityType: string) => void;
}

export function LinkedEntities({ projectId, personajeIds, lugarIds, eventoIds, onEntityClick }: LinkedEntitiesProps) {
  const personajes = useProyectosStore((s) => s.personajes);
  const lugares = useProyectosStore((s) => s.lugares);
  const eventos = useProyectosStore((s) => s.eventos);
  const facciones = useProyectosStore((s) => s.facciones);

  const linked = useMemo(() => {
    const linkedPersonajes = personajes.filter((p) => personajeIds.includes(p.id));
    const linkedLugares = lugares.filter((l) => lugarIds.includes(l.id));
    const linkedEventos = eventos.filter((e) => eventoIds.includes(e.id));

    // Derive facciones from personajes
    const faccionIdSet = new Set<string>();
    for (const p of linkedPersonajes) {
      if (p.faccion_id) faccionIdSet.add(p.faccion_id);
    }
    const linkedFacciones = facciones.filter((f) => faccionIdSet.has(f.id));

    return { linkedPersonajes, linkedFacciones, linkedLugares, linkedEventos };
  }, [personajeIds, lugarIds, eventoIds, personajes, lugares, eventos, facciones]);

  const hasAny =
    linked.linkedPersonajes.length > 0 ||
    linked.linkedFacciones.length > 0 ||
    linked.linkedLugares.length > 0 ||
    linked.linkedEventos.length > 0;

  if (!hasAny) return null;

  const base = `/app/proyectos/${projectId}`;

  const rows: { label: string; type: string; items: { id: string; nombre: string; href: string }[] }[] = [
    {
      label: "Personajes",
      type: "personaje",
      items: linked.linkedPersonajes.map((p) => ({ id: p.id, nombre: p.nombre, href: `${base}/personajes/${p.id}` })),
    },
    {
      label: "Facciones",
      type: "faccion",
      items: linked.linkedFacciones.map((f) => ({ id: f.id, nombre: f.nombre, href: `${base}/facciones/${f.id}` })),
    },
    {
      label: "Lugares",
      type: "lugar",
      items: linked.linkedLugares.map((l) => ({ id: l.id, nombre: l.nombre, href: `${base}/lugares/${l.id}` })),
    },
    {
      label: "Eventos",
      type: "evento",
      items: linked.linkedEventos.map((e) => ({ id: e.id, nombre: e.nombre, href: `${base}/eventos/${e.id}` })),
    },
  ];

  return (
    <div className="rounded-lg border border-[var(--color-border-light)] bg-[var(--color-cream)] p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
          Elementos vinculados
        </span>
        <div className="flex-1 border-t border-[var(--color-border-light)]" />
      </div>

      <div className="space-y-2.5">
        {rows
          .filter((r) => r.items.length > 0)
          .map((row) => (
            <div key={row.label} className="flex items-start gap-3">
              <span className="shrink-0 w-20 text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)] font-medium pt-1">
                {row.label}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {row.items.map((item) => (
                  <EntityBadge
                    key={item.id}
                    nombre={item.nombre || "Sin nombre"}
                    href={onEntityClick ? undefined : item.href}
                    color={ENTITY_TYPE_CONFIG[row.type as keyof typeof ENTITY_TYPE_CONFIG]?.color}
                    onClick={onEntityClick ? () => onEntityClick(item.id, row.type) : undefined}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
