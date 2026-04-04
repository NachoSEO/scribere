"use client";

import { use, useState, useCallback, useEffect } from "react";
import { useEscenas, useManuscritoCarpetas, useHitos, useArcos, useLugares, useEventos, usePersonajes } from "@/lib/proyectos/hooks";
import { useProyectosStore } from "@/lib/proyectos/store";
import { updateEscena } from "@/lib/proyectos/queries";
import { createClient } from "@/lib/supabase/client";
import { useFocusModeStore } from "@/lib/manuscrito/focus-mode-store";
import { StatsBar } from "@/components/corrector/StatsBar";
import { FileTree } from "@/components/manuscrito/FileTree";
import { SceneEditor } from "@/components/manuscrito/SceneEditor";
import { SceneSidebar } from "@/components/manuscrito/SceneSidebar";
import { CleanPreview } from "@/components/manuscrito/CleanPreview";
import { CompileView } from "@/components/manuscrito/CompileView";

function CorrectorIcon({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke={active ? "white" : "currentColor"} strokeWidth="1.3" />
      <path d="M4 6.5l2 2 3.5-3" stroke={active ? "white" : "currentColor"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FocusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="1.5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 4.5h10M1.5 8.5h10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-white text-center px-8">
      <div className="text-4xl opacity-20 select-none">
        <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
          <rect x="2" y="2" width="44" height="52" rx="4" fill="var(--color-parchment)" stroke="var(--color-border)" strokeWidth="2" />
          <line x1="10" y1="18" x2="38" y2="18" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="26" x2="38" y2="26" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="34" x2="26" y2="34" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-sm font-medium text-[var(--color-ink-light)]">
        Selecciona una escena para empezar a escribir
      </p>
      <p className="text-xs text-[var(--color-ink-muted)]">
        Elige una escena del árbol de la izquierda o crea una nueva
      </p>
    </div>
  );
}

type ViewMode = "editor" | "preview" | "compile";

export default function ManuscritoPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  const { escenas, create: createEscena, remove: removeEscena } = useEscenas(projectId);
  const { carpetas, create: createCarpeta, update: updateCarpeta, remove: removeCarpeta } = useManuscritoCarpetas(projectId);

  // Populate store for sidebar selectors and POV display
  useHitos(projectId);
  useArcos(projectId);
  useLugares(projectId);
  useEventos(projectId);
  const { personajes } = usePersonajes(projectId);

  const [selectedEscenaId, setSelectedEscenaId] = useState<string | null>(null);
  const [correctorEnabled, setCorrectorEnabled] = useState(false);
  const [navigateFn, setNavigateFn] = useState<((s: number, e: number) => void) | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("editor");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const focusMode = useFocusModeStore((s) => s.focusMode);
  const toggleFocusMode = useFocusModeStore((s) => s.toggleFocusMode);
  const typewriterScroll = useFocusModeStore((s) => s.typewriterScroll);
  const toggleTypewriterScroll = useFocusModeStore((s) => s.toggleTypewriterScroll);

  const isPreview = viewMode === "preview";
  const isCompile = viewMode === "compile";
  const effectiveCorrectorEnabled = correctorEnabled && !focusMode && !isPreview && !isCompile;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "F") {
        e.preventDefault();
        useFocusModeStore.getState().toggleFocusMode();
        return;
      }
      if (e.key === "Escape" && useFocusModeStore.getState().focusMode) {
        useFocusModeStore.getState().exitFocusMode();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleNavigateReady = useCallback((fn: (s: number, e: number) => void) => {
    setNavigateFn(() => fn);
  }, []);

  const handleCreateEscena = useCallback(
    async (nombre: string, carpetaId: string | null) => {
      const newEscena = await createEscena({
        resumen: nombre,
        carpeta_id: carpetaId,
        posicion: escenas.length,
      });
      setSelectedEscenaId(newEscena.id);
    },
    [createEscena, escenas.length]
  );

  const handleCreateCarpeta = useCallback(
    async (nombre: string, padreId: string | null) => {
      await createCarpeta({ nombre, carpeta_padre_id: padreId, posicion: carpetas.length });
    },
    [createCarpeta, carpetas.length]
  );

  const handleDeleteCarpeta = useCallback(
    async (id: string) => {
      await removeCarpeta(id);
    },
    [removeCarpeta]
  );

  const handleRenameCarpeta = useCallback(
    async (id: string, nombre: string) => {
      await updateCarpeta(id, { nombre });
    },
    [updateCarpeta]
  );

  const handleDeleteEscena = useCallback(
    async (id: string) => {
      await removeEscena(id);
      if (selectedEscenaId === id) setSelectedEscenaId(null);
    },
    [removeEscena, selectedEscenaId]
  );

  const handleMoveEscena = useCallback(
    async (escenaId: string, carpetaId: string | null) => {
      const sb = createClient();
      const updated = await updateEscena(sb, escenaId, { carpeta_id: carpetaId });
      useProyectosStore.getState().updateEscenaInList(updated);
    },
    []
  );

  const handleToggleCorrecto = () => {
    if (focusMode || isPreview) return;
    setCorrectorEnabled((prev) => !prev);
  };

  // Focus mode: fullscreen overlay with just the editor
  if (focusMode && selectedEscenaId) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        {/* Minimal top bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border-light)] shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTypewriterScroll}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                typewriterScroll
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-parchment)] text-[var(--color-ink-muted)] border border-[var(--color-border)]"
              }`}
            >
              Typewriter
            </button>
          </div>
          <button
            onClick={toggleFocusMode}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--color-parchment)] text-[var(--color-ink-light)] hover:bg-[var(--color-border)] border border-[var(--color-border)] transition-colors"
          >
            Salir (Esc)
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <SceneEditor
            key={selectedEscenaId}
            escenaId={selectedEscenaId}
            projectId={projectId}
            correctorEnabled={false}
            onNavigateReady={handleNavigateReady}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden" style={{ minHeight: 0 }}>
      <FileTree
        escenas={escenas}
        carpetas={carpetas}
        personajes={personajes}
        selectedId={selectedEscenaId}
        onSelect={setSelectedEscenaId}
        onCreateEscena={handleCreateEscena}
        onDeleteEscena={handleDeleteEscena}
        onCreateCarpeta={handleCreateCarpeta}
        onDeleteCarpeta={handleDeleteCarpeta}
        onRenameCarpeta={handleRenameCarpeta}
        onMoveEscena={handleMoveEscena}
      />

      <div className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-cream)] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-sm font-medium text-[var(--color-ink-light)] truncate">
              {selectedEscenaId
                ? escenas.find((e) => e.id === selectedEscenaId)?.resumen || "Escena sin título"
                : "Manuscrito"}
            </div>

            <div className="flex rounded-md border border-[var(--color-border)] overflow-hidden shrink-0">
              {(["editor", "preview", "compile"] as const).map((mode, i) => {
                const labels = { editor: "Editar", preview: "Vista previa", compile: "Compilar" };
                const isActive = viewMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-2.5 py-1 text-[10px] font-medium transition-colors ${
                      i > 0 ? "border-l border-[var(--color-border)]" : ""
                    } ${
                      isActive
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-cream)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-light)]"
                    }`}
                  >
                    {labels[mode]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isPreview && (
              <button
                onClick={handleToggleCorrecto}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  effectiveCorrectorEnabled
                    ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]"
                    : "bg-[var(--color-parchment)] text-[var(--color-ink-light)] hover:bg-[var(--color-border)] border border-[var(--color-border)]"
                }`}
              >
                <CorrectorIcon active={effectiveCorrectorEnabled} />
                Corrector
              </button>
            )}

            {selectedEscenaId && (
              <button
                onClick={toggleFocusMode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--color-parchment)] text-[var(--color-ink-light)] hover:bg-[var(--color-border)] border border-[var(--color-border)] transition-colors"
                title="Modo enfoque (Cmd+Shift+F)"
              >
                <FocusIcon />
                Enfoque
              </button>
            )}

            {selectedEscenaId && !isCompile && (
              <button
                onClick={() => setSidebarOpen((p) => !p)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium bg-[var(--color-parchment)] text-[var(--color-ink-light)] hover:bg-[var(--color-border)] border border-[var(--color-border)] transition-colors"
                title={sidebarOpen ? "Ocultar panel" : "Mostrar panel"}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="1.5" x2="8" y2="11.5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {effectiveCorrectorEnabled && <StatsBar />}

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {isCompile ? (
            <CompileView projectId={projectId} carpetas={carpetas} />
          ) : selectedEscenaId ? (
            isPreview ? (
              <CleanPreview escenaId={selectedEscenaId} />
            ) : (
              <SceneEditor
                key={selectedEscenaId}
                escenaId={selectedEscenaId}
                projectId={projectId}
                correctorEnabled={effectiveCorrectorEnabled}
                onNavigateReady={handleNavigateReady}
              />
            )
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {selectedEscenaId && !isCompile && sidebarOpen && (
        <SceneSidebar
          key={selectedEscenaId}
          escenaId={selectedEscenaId}
          projectId={projectId}
          correctorEnabled={effectiveCorrectorEnabled}
          navigateFn={navigateFn}
        />
      )}
    </div>
  );
}
