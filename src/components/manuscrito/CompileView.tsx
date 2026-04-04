"use client";

import { useMemo } from "react";
import { useProyectosStore } from "@/lib/proyectos/store";
import { renderCleanContent } from "@/lib/manuscrito/render-clean-html";
import type { Escena, ManuscritoCarpeta } from "@/types/proyectos";

interface CompileViewProps {
  projectId: string;
  carpetas: ManuscritoCarpeta[];
}

interface ChapterBlock {
  title: string;
  scenes: Escena[];
}

function buildChapters(carpetas: ManuscritoCarpeta[], escenas: Escena[]): ChapterBlock[] {
  const rootCarpetas = carpetas
    .filter((c) => !c.carpeta_padre_id)
    .sort((a, b) => a.posicion - b.posicion);

  const childCarpetasMap = new Map<string, ManuscritoCarpeta[]>();
  for (const c of carpetas) {
    if (!c.carpeta_padre_id) continue;
    if (!childCarpetasMap.has(c.carpeta_padre_id)) childCarpetasMap.set(c.carpeta_padre_id, []);
    childCarpetasMap.get(c.carpeta_padre_id)!.push(c);
  }
  for (const arr of childCarpetasMap.values()) arr.sort((a, b) => a.posicion - b.posicion);

  const escenasByCarpeta = new Map<string, Escena[]>();
  const loose: Escena[] = [];
  for (const e of escenas) {
    if (e.carpeta_id) {
      if (!escenasByCarpeta.has(e.carpeta_id)) escenasByCarpeta.set(e.carpeta_id, []);
      escenasByCarpeta.get(e.carpeta_id)!.push(e);
    } else {
      loose.push(e);
    }
  }
  for (const arr of escenasByCarpeta.values()) arr.sort((a, b) => a.posicion - b.posicion);
  loose.sort((a, b) => a.posicion - b.posicion);

  const chapters: ChapterBlock[] = [];

  function collectCarpeta(carpeta: ManuscritoCarpeta) {
    const scenes = escenasByCarpeta.get(carpeta.id) ?? [];
    const children = childCarpetasMap.get(carpeta.id) ?? [];

    if (scenes.length > 0 || children.length === 0) {
      chapters.push({ title: carpeta.nombre, scenes });
    }
    for (const child of children) {
      collectCarpeta(child);
    }
  }

  for (const root of rootCarpetas) {
    collectCarpeta(root);
  }

  if (loose.length > 0) {
    chapters.push({ title: "Escenas sueltas", scenes: loose });
  }

  return chapters;
}

export function CompileView({ projectId, carpetas }: CompileViewProps) {
  const escenas = useProyectosStore((s) => s.escenas);
  const chapters = useMemo(() => buildChapters(carpetas, escenas), [carpetas, escenas]);

  const hasContent = chapters.some((ch) => ch.scenes.some((s) => s.contenido));

  if (!hasContent) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <p className="text-sm text-[var(--color-ink-muted)] italic">
          No hay escenas con contenido para compilar
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
      <div className="compile-view clean-preview">
        {chapters.map((chapter, ci) => (
          <div key={ci}>
            {ci > 0 && <hr />}
            <h2>{chapter.title}</h2>
            {chapter.scenes.map((scene) => (
              <div key={scene.id}>
                {scene.contenido ? renderCleanContent(scene.contenido) : null}
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        .compile-view {
          max-width: 680px;
          margin: 0 auto;
          padding: 3rem 2rem 6rem;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.1rem;
          line-height: 1.9;
          color: var(--color-ink);
        }
        .compile-view h2 {
          font-size: 1.4rem;
          font-weight: 700;
          text-align: center;
          margin: 3rem 0 2rem;
          letter-spacing: 0.02em;
        }
        .compile-view h2:first-child {
          margin-top: 0;
        }
        .compile-view h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 2rem 0 1rem;
          color: var(--color-ink-light);
        }
        .compile-view p {
          text-indent: 1.5em;
          margin-bottom: 0;
        }
        .compile-view h2 + p,
        .compile-view h3 + p,
        .compile-view hr + p {
          text-indent: 0;
        }
        .compile-view blockquote {
          border-left: 3px solid var(--color-border);
          padding-left: 1.5em;
          margin: 1.5em 0;
          font-style: italic;
          color: var(--color-ink-light);
        }
        .compile-view blockquote p {
          text-indent: 0;
        }
        .compile-view hr {
          border: none;
          text-align: center;
          margin: 3rem 0;
        }
        .compile-view hr::after {
          content: "\\2726  \\2726  \\2726";
          color: var(--color-ink-muted);
          font-size: 0.9rem;
          letter-spacing: 0.5em;
        }
        @media print {
          .compile-view {
            max-width: none;
            padding: 0;
          }
          .compile-view hr {
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
}
