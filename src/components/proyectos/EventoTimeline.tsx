"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { Evento } from "@/types/proyectos";

interface EventoTimelineProps {
  eventos: Evento[];
  projectId: string;
}

export function EventoTimeline({ eventos, projectId }: EventoTimelineProps) {
  const sorted = useMemo(() => {
    return [...eventos].sort((a, b) => {
      if (!a.cronologia && !b.cronologia) return 0;
      if (!a.cronologia) return 1;
      if (!b.cronologia) return -1;
      return a.cronologia.localeCompare(b.cronologia, undefined, { numeric: true });
    });
  }, [eventos]);

  if (eventos.length === 0) {
    return (
      <p className="text-xs text-[var(--color-ink-muted)] italic mt-4">
        No hay eventos todavia
      </p>
    );
  }

  return (
    <div className="relative mt-4 ml-3">
      {/* Vertical timeline line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-border)]"
        style={{ left: "3px" }}
      />

      <div className="space-y-4">
        {sorted.map((evento) => (
          <div key={evento.id} className="relative pl-8">
            {/* Timeline dot */}
            <div
              className="absolute w-2 h-2 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-cream)]"
              style={{ left: 0, top: "14px" }}
            />
            {/* Horizontal connector */}
            <div
              className="absolute h-[2px] bg-[var(--color-border)]"
              style={{ left: "8px", top: "17px", width: "12px" }}
            />

            <Link
              href={`/app/proyectos/${projectId}/eventos/${evento.id}`}
              className="block rounded-lg border border-[var(--color-border)] bg-white p-3 transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
            >
              {/* Cronologia badge */}
              {evento.cronologia && (
                <span className="inline-block rounded-full bg-[var(--color-accent-light)]/20 border border-[var(--color-accent-light)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)] mb-1.5">
                  {evento.cronologia}
                </span>
              )}

              {/* Event name */}
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                {evento.nombre || (
                  <span className="italic text-[var(--color-ink-muted)]">
                    Sin nombre
                  </span>
                )}
              </p>

              {/* Cause -> Event -> Consequence chain */}
              {(evento.causa_directa || evento.consecuencia_directa) && (
                <div className="mt-2 flex items-center gap-1.5 flex-wrap text-xs text-[var(--color-ink-muted)]">
                  {evento.causa_directa && (
                    <>
                      <span className="rounded bg-[var(--color-cream-dark)] px-1.5 py-0.5 line-clamp-1 max-w-[180px]">
                        {evento.causa_directa}
                      </span>
                      <span className="text-[var(--color-border)]">&rarr;</span>
                    </>
                  )}
                  <span className="rounded bg-[var(--color-accent-light)]/10 px-1.5 py-0.5 font-medium text-[var(--color-ink-light)] line-clamp-1 max-w-[120px]">
                    {evento.nombre || "Evento"}
                  </span>
                  {evento.consecuencia_directa && (
                    <>
                      <span className="text-[var(--color-border)]">&rarr;</span>
                      <span className="rounded bg-[var(--color-cream-dark)] px-1.5 py-0.5 line-clamp-1 max-w-[180px]">
                        {evento.consecuencia_directa}
                      </span>
                    </>
                  )}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
