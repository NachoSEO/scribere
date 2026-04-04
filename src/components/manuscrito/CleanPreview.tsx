"use client";

import { useMemo } from "react";
import { useProyectosStore } from "@/lib/proyectos/store";
import { renderCleanContent } from "@/lib/manuscrito/render-clean-html";

interface CleanPreviewProps {
  escenaId: string;
}

export function CleanPreview({ escenaId }: CleanPreviewProps) {
  const content = useProyectosStore(
    (s) => s.escenas.find((e) => e.id === escenaId)?.contenido ?? null
  );

  const rendered = useMemo(() => renderCleanContent(content), [content]);

  if (!content) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <p className="text-sm text-[var(--color-ink-muted)] italic">
          Esta escena no tiene contenido todavía
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
      <div className="clean-preview">
        {rendered}
      </div>
    </div>
  );
}
