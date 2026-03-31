"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFases, useHitos, useArcos, useEscenas } from "@/lib/proyectos/hooks";
import { TIPO_RESOLUCION_OPTIONS } from "@/types/proyectos";
import type { Fase, Hito, Arco, Escena } from "@/types/proyectos";
import { EmptyState } from "@/components/proyectos/EmptyState";

// ── Spine data assembly ─────────────────────────────────────

function useSpineData(projectId: string) {
  const { fases, create: createFase } = useFases(projectId);
  const { hitos, create: createHito } = useHitos(projectId);
  const { arcos, create: createArco } = useArcos(projectId);
  const { escenas, create: createEscena } = useEscenas(projectId);

  const spine = useMemo(() => {
    const sortedFases = [...fases].sort((a, b) => a.posicion - b.posicion);

    const hitosByFase = new Map<string, Hito[]>();
    const unassignedHitos: Hito[] = [];
    for (const h of [...hitos].sort((a, b) => a.posicion - b.posicion)) {
      if (h.fase_id) {
        const group = hitosByFase.get(h.fase_id) || [];
        group.push(h);
        hitosByFase.set(h.fase_id, group);
      } else {
        unassignedHitos.push(h);
      }
    }

    const arcoByOrigenId = new Map<string, Arco>();
    const orphanedArcos: Arco[] = [];
    for (const a of arcos) {
      if (a.hito_origen_id) {
        arcoByOrigenId.set(a.hito_origen_id, a);
      } else {
        orphanedArcos.push(a);
      }
    }

    const escenasByHito = new Map<string, Escena[]>();
    const unassignedEscenas: Escena[] = [];
    for (const e of [...escenas].sort((a, b) => a.posicion - b.posicion)) {
      if (e.hito_id) {
        const group = escenasByHito.get(e.hito_id) || [];
        group.push(e);
        escenasByHito.set(e.hito_id, group);
      } else {
        unassignedEscenas.push(e);
      }
    }

    return { sortedFases, hitosByFase, unassignedHitos, arcoByOrigenId, orphanedArcos, escenasByHito, unassignedEscenas };
  }, [fases, hitos, arcos, escenas]);

  return { ...spine, fases, hitos, createFase, createHito, createArco, createEscena };
}

// ── Hito tipo colors ────────────────────────────────────────

const HITO_TIPO_COLORS: Record<string, string> = {
  normalidad: "bg-gray-100 text-gray-600",
  cambio_de_fase: "bg-blue-100 text-blue-700",
  incidente_incitador: "bg-amber-100 text-amber-700",
};

const HITO_TIPO_LABELS: Record<string, string> = {
  normalidad: "Normalidad",
  cambio_de_fase: "Cambio de fase",
  incidente_incitador: "Incidente incitador",
};

// ── Main page ───────────────────────────────────────────────

export default function EstructuraPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const {
    sortedFases, hitosByFase, unassignedHitos,
    arcoByOrigenId, orphanedArcos,
    escenasByHito, unassignedEscenas,
    fases, hitos,
    createFase, createHito, createArco, createEscena,
  } = useSpineData(projectId);

  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [creatingFase, setCreatingFase] = useState(false);
  const [newFaseName, setNewFaseName] = useState("");
  const [creatingHitoIn, setCreatingHitoIn] = useState<string | null>(null);
  const [newHitoName, setNewHitoName] = useState("");
  const [creatingEscenaIn, setCreatingEscenaIn] = useState<string | null>(null);
  const [newEscenaName, setNewEscenaName] = useState("");

  const toggleCollapse = useCallback((faseId: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(faseId)) next.delete(faseId);
      else next.add(faseId);
      return next;
    });
  }, []);

  // ── Create handlers ─────────────────────────────────────

  const handleCreateFase = useCallback(async () => {
    if (!newFaseName.trim()) return;
    const fase = await createFase({ nombre: newFaseName.trim(), posicion: fases.length });
    setCreatingFase(false);
    setNewFaseName("");
    router.push(`/app/proyectos/${projectId}/fases/${fase.id}`);
  }, [newFaseName, createFase, fases.length, projectId, router]);

  const handleCreateHito = useCallback(async (faseId: string) => {
    if (!newHitoName.trim()) return;
    const faseHitos = hitosByFase.get(faseId) || [];
    const hito = await createHito({ hito: newHitoName.trim(), fase_id: faseId, posicion: faseHitos.length });
    setCreatingHitoIn(null);
    setNewHitoName("");
    router.push(`/app/proyectos/${projectId}/hitos/${hito.id}`);
  }, [newHitoName, createHito, hitosByFase, projectId, router]);

  const handleCreateEscena = useCallback(async (hitoId: string) => {
    if (!newEscenaName.trim()) return;
    const hitoEscenas = escenasByHito.get(hitoId) || [];
    const escena = await createEscena({ resumen: newEscenaName.trim(), hito_id: hitoId, posicion: hitoEscenas.length });
    setCreatingEscenaIn(null);
    setNewEscenaName("");
    router.push(`/app/proyectos/${projectId}/escenas/${escena.id}`);
  }, [newEscenaName, createEscena, escenasByHito, projectId, router]);

  const handleCreateArco = useCallback(async (hitoOrigenId: string, hitoDestinoId: string) => {
    const origen = hitos.find((h) => h.id === hitoOrigenId);
    const destino = hitos.find((h) => h.id === hitoDestinoId);
    const nombre = `${origen?.hito || "Hito"} → ${destino?.hito || "Hito"}`;
    const arco = await createArco({
      nombre,
      hito_origen_id: hitoOrigenId,
      hito_destino_id: hitoDestinoId,
    });
    router.push(`/app/proyectos/${projectId}/arcos/${arco.id}`);
  }, [hitos, createArco, projectId, router]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void, cancel: () => void) => {
    if (e.key === "Enter") action();
    if (e.key === "Escape") cancel();
  }, []);

  // ── Empty state ─────────────────────────────────────────

  const isEmpty = sortedFases.length === 0 && unassignedHitos.length === 0;

  if (isEmpty && !creatingFase) {
    return (
      <div className="p-6">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Estructura</h1>
        <div className="mt-6">
          <EmptyState
            message="Empieza creando la primera fase de tu historia"
            action="Crear fase"
            onAction={() => setCreatingFase(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Estructura</h1>
      </div>

      <div className="space-y-4">
        {sortedFases.map((fase) => {
          const faseHitos = hitosByFase.get(fase.id) || [];
          const isCollapsed = collapsed.has(fase.id);

          return (
            <FaseSection
              key={fase.id}
              fase={fase}
              isCollapsed={isCollapsed}
              onToggle={() => toggleCollapse(fase.id)}
              onClickName={() => router.push(`/app/proyectos/${projectId}/fases/${fase.id}`)}
            >
              {!isCollapsed && (
                <div className="relative pl-6 mt-3">
                  {/* Vertical timeline line */}
                  {faseHitos.length > 0 && (
                    <div className="absolute left-[11px] top-1 bottom-8 w-[2px] bg-[var(--color-border)]" />
                  )}

                  {faseHitos.map((hito, index) => (
                    <div key={hito.id}>
                      {/* Hito node */}
                      <HitoNode
                        hito={hito}
                        escenas={escenasByHito.get(hito.id) || []}
                        onClickHito={() => router.push(`/app/proyectos/${projectId}/hitos/${hito.id}`)}
                        onClickEscena={(escenaId) => router.push(`/app/proyectos/${projectId}/escenas/${escenaId}`)}
                        isCreatingEscena={creatingEscenaIn === hito.id}
                        onStartCreateEscena={() => { setCreatingEscenaIn(hito.id); setNewEscenaName(""); }}
                        newEscenaName={newEscenaName}
                        onNewEscenaNameChange={setNewEscenaName}
                        onCreateEscena={() => handleCreateEscena(hito.id)}
                        onCancelCreateEscena={() => { setCreatingEscenaIn(null); setNewEscenaName(""); }}
                        onKeyDown={handleKeyDown}
                      />

                      {/* Arco connector between this hito and the next */}
                      {index < faseHitos.length - 1 && (
                        <ArcoConnector
                          arco={arcoByOrigenId.get(hito.id)}
                          onClickArco={(arcoId) => router.push(`/app/proyectos/${projectId}/arcos/${arcoId}`)}
                          onCreateArco={() => handleCreateArco(hito.id, faseHitos[index + 1].id)}
                        />
                      )}
                    </div>
                  ))}

                  {/* Add hito button */}
                  {creatingHitoIn === fase.id ? (
                    <div className="relative flex items-center gap-2 pb-4 pl-5 pt-2">
                      <input
                        autoFocus
                        value={newHitoName}
                        onChange={(e) => setNewHitoName(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, () => handleCreateHito(fase.id), () => { setCreatingHitoIn(null); setNewHitoName(""); })}
                        placeholder="Nombre del hito"
                        className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                      />
                      <button onClick={() => handleCreateHito(fase.id)} disabled={!newHitoName.trim()} className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50">Crear</button>
                      <button onClick={() => { setCreatingHitoIn(null); setNewHitoName(""); }} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]">Cancelar</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setCreatingHitoIn(fase.id); setNewHitoName(""); }}
                      className="relative ml-5 mt-2 w-[calc(100%-20px)] rounded-lg border border-dashed border-[var(--color-border)] px-4 py-2 text-xs text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      + Hito
                    </button>
                  )}
                </div>
              )}
            </FaseSection>
          );
        })}

        {/* Unassigned elements */}
        {(unassignedHitos.length > 0 || orphanedArcos.length > 0 || unassignedEscenas.length > 0) && (
          <div className="mt-8 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-cream)] p-4">
            <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-3">
              Sin asignar
            </h3>
            {unassignedHitos.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-[var(--color-ink-muted)] mb-1">Hitos:</p>
                <div className="flex flex-wrap gap-2">
                  {unassignedHitos.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => router.push(`/app/proyectos/${projectId}/hitos/${h.id}`)}
                      className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
                    >
                      {h.hito || "Sin nombre"}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {orphanedArcos.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-[var(--color-ink-muted)] mb-1">Arcos:</p>
                <div className="flex flex-wrap gap-2">
                  {orphanedArcos.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => router.push(`/app/proyectos/${projectId}/arcos/${a.id}`)}
                      className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
                    >
                      {a.nombre || "Sin nombre"}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {unassignedEscenas.length > 0 && (
              <div>
                <p className="text-xs text-[var(--color-ink-muted)] mb-1">Escenas:</p>
                <div className="flex flex-wrap gap-2">
                  {unassignedEscenas.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => router.push(`/app/proyectos/${projectId}/escenas/${e.id}`)}
                      className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
                    >
                      {e.resumen || "Sin resumen"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Add fase */}
        {creatingFase ? (
          <div className="flex gap-2 mt-4">
            <input
              autoFocus
              value={newFaseName}
              onChange={(e) => setNewFaseName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleCreateFase, () => { setCreatingFase(false); setNewFaseName(""); })}
              placeholder="Nombre de la fase"
              className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
            <button onClick={handleCreateFase} disabled={!newFaseName.trim()} className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50">Crear</button>
            <button onClick={() => { setCreatingFase(false); setNewFaseName(""); }} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]">Cancelar</button>
          </div>
        ) : (
          <button
            onClick={() => setCreatingFase(true)}
            className="w-full rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-parchment)] px-4 py-3 text-sm text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          >
            + Fase
          </button>
        )}
      </div>
    </div>
  );
}

// ── FaseSection ─────────────────────────────────────────────

function FaseSection({
  fase,
  isCollapsed,
  onToggle,
  onClickName,
  children,
}: {
  fase: Fase;
  isCollapsed: boolean;
  onToggle: () => void;
  onClickName: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-parchment)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          onClick={onToggle}
          className="shrink-0 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-4 w-4 transition-transform ${isCollapsed ? "" : "rotate-90"}`}
          >
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={onClickName}
          className="flex-1 text-left text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors truncate"
        >
          {fase.nombre || "Fase sin nombre"}
        </button>
        {fase.descripcion && (
          <span className="hidden sm:block text-xs text-[var(--color-ink-muted)] truncate max-w-[200px]">
            {fase.descripcion}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ── HitoNode ────────────────────────────────────────────────

function HitoNode({
  hito,
  escenas,
  onClickHito,
  onClickEscena,
  isCreatingEscena,
  onStartCreateEscena,
  newEscenaName,
  onNewEscenaNameChange,
  onCreateEscena,
  onCancelCreateEscena,
  onKeyDown,
}: {
  hito: Hito;
  escenas: Escena[];
  onClickHito: () => void;
  onClickEscena: (id: string) => void;
  isCreatingEscena: boolean;
  onStartCreateEscena: () => void;
  newEscenaName: string;
  onNewEscenaNameChange: (v: string) => void;
  onCreateEscena: () => void;
  onCancelCreateEscena: () => void;
  onKeyDown: (e: React.KeyboardEvent, action: () => void, cancel: () => void) => void;
}) {
  return (
    <div className="relative flex gap-3 pb-4">
      {/* Timeline dot */}
      <div className="relative z-10 mt-2 h-3 w-3 shrink-0 rounded-full bg-[var(--color-accent)]" />

      {/* Card */}
      <div className="flex-1 min-w-0">
        <button
          onClick={onClickHito}
          className="group w-full text-left rounded-lg border border-[var(--color-border)] bg-white p-3 hover:border-[var(--color-accent-light)] hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors truncate">
              {hito.hito || "Hito sin nombre"}
            </span>
            {hito.tipo && (
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${HITO_TIPO_COLORS[hito.tipo] || "bg-gray-100 text-gray-600"}`}>
                {HITO_TIPO_LABELS[hito.tipo] || hito.tipo}
              </span>
            )}
          </div>
          {hito.informacion && (
            <p className="mt-1 text-xs text-[var(--color-ink-muted)] line-clamp-2">{hito.informacion}</p>
          )}
        </button>

        {/* Escenas inside the hito */}
        {(escenas.length > 0 || isCreatingEscena) && (
          <div className="mt-2 ml-2 space-y-1">
            {escenas.map((escena) => (
              <button
                key={escena.id}
                onClick={() => onClickEscena(escena.id)}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-ink)] transition-colors w-full text-left"
              >
                <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-[var(--color-border)]" />
                <span className="truncate">{escena.resumen || "Sin resumen"}</span>
              </button>
            ))}

            {isCreatingEscena && (
              <div className="flex gap-2 pt-1">
                <input
                  autoFocus
                  value={newEscenaName}
                  onChange={(e) => onNewEscenaNameChange(e.target.value)}
                  onKeyDown={(e) => onKeyDown(e, onCreateEscena, onCancelCreateEscena)}
                  placeholder="Resumen de la escena"
                  className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-2 py-1 text-xs text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none"
                />
                <button onClick={onCreateEscena} disabled={!newEscenaName.trim()} className="rounded-md bg-[var(--color-accent)] px-2 py-1 text-[10px] font-medium text-white disabled:opacity-50">Crear</button>
                <button onClick={onCancelCreateEscena} className="rounded-md border border-[var(--color-border)] px-2 py-1 text-[10px] text-[var(--color-ink-light)]">Cancelar</button>
              </div>
            )}
          </div>
        )}

        {/* Add escena trigger */}
        {!isCreatingEscena && (
          <button
            onClick={onStartCreateEscena}
            className="mt-1 ml-2 text-[10px] text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            + Escena
          </button>
        )}
      </div>
    </div>
  );
}

// ── ArcoConnector ───────────────────────────────────────────

function ArcoConnector({
  arco,
  onClickArco,
  onCreateArco,
}: {
  arco: Arco | undefined;
  onClickArco: (id: string) => void;
  onCreateArco: () => void;
}) {
  if (!arco) {
    return (
      <div className="relative flex gap-3 pb-4">
        <div className="relative z-10 mt-2 h-3 w-3 shrink-0 flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full border border-dashed border-[var(--color-border)]" />
        </div>
        <button
          onClick={onCreateArco}
          className="flex-1 rounded-lg border border-dashed border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors text-center"
        >
          + Arco narrativo
        </button>
      </div>
    );
  }

  const resOption = TIPO_RESOLUCION_OPTIONS.find((o) => o.value === arco.tipo_resolucion);

  return (
    <div className="relative flex gap-3 pb-4">
      {/* Small dot on timeline */}
      <div className="relative z-10 mt-2 h-3 w-3 shrink-0 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-[var(--color-border)]" />
      </div>

      {/* Arco card */}
      <button
        onClick={() => onClickArco(arco.id)}
        className="group flex-1 rounded-lg border border-[var(--color-border-light)] bg-[var(--color-cream)] p-3 hover:border-[var(--color-accent-light)] hover:shadow-sm transition-all text-left"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">Arco</span>
          <span className="text-xs font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors truncate">
            {arco.nombre || "Sin nombre"}
          </span>
          {resOption && resOption.value && (
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: resOption.color }}
            >
              {resOption.label}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-[11px]">
          {arco.planteamiento && (
            <div>
              <span className="text-[var(--color-ink-muted)]">Intención: </span>
              <span className="text-[var(--color-ink-light)] line-clamp-2">{arco.planteamiento}</span>
            </div>
          )}
          {arco.nudo && (
            <div>
              <span className="text-[var(--color-ink-muted)]">Obstáculo: </span>
              <span className="text-[var(--color-ink-light)] line-clamp-2">{arco.nudo}</span>
            </div>
          )}
          {arco.desenlace && (
            <div>
              <span className="text-[var(--color-ink-muted)]">Resolución: </span>
              <span className="text-[var(--color-ink-light)] line-clamp-2">{arco.desenlace}</span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
