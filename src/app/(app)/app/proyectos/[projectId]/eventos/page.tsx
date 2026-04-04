"use client";

import { use, useState } from "react";
import { useEventos } from "@/lib/proyectos/hooks";
import { EntityList } from "@/components/proyectos/EntityList";
import { EventoTimeline } from "@/components/proyectos/EventoTimeline";

type ViewMode = "lista" | "cronologia";

export default function EventosPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { eventos, create } = useEventos(projectId);
  const [view, setView] = useState<ViewMode>("lista");

  return (
    <div>
      {/* View toggle header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-0">
        <div />
        <div className="inline-flex rounded-md border border-[var(--color-border)] overflow-hidden">
          <button
            onClick={() => setView("lista")}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              view === "lista"
                ? "bg-[var(--color-accent)] text-white"
                : "bg-white text-[var(--color-ink-muted)] hover:bg-[var(--color-cream)]"
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setView("cronologia")}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              view === "cronologia"
                ? "bg-[var(--color-accent)] text-white"
                : "bg-white text-[var(--color-ink-muted)] hover:bg-[var(--color-cream)]"
            }`}
          >
            Cronologia
          </button>
        </div>
      </div>

      {view === "lista" ? (
        <EntityList
          title="Eventos"
          items={eventos}
          basePath={`/app/proyectos/${projectId}/eventos`}
          onCreate={(nombre) => create({ nombre })}
          entityLabel="evento"
        />
      ) : (
        <div className="p-6">
          <h1 className="text-lg font-semibold text-[var(--color-ink)]">
            Eventos
          </h1>
          <EventoTimeline eventos={eventos} projectId={projectId} />
        </div>
      )}
    </div>
  );
}
