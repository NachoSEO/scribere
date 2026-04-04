"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFases, useHitos, useArcos, useEscenas, usePersonajes } from "@/lib/proyectos/hooks";
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

// ── Constants ───────────────────────────────────────────────

const HITO_TIPO_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  normalidad:           { label: "Normalidad",          bg: "bg-stone-100",  text: "text-stone-600",  dot: "bg-stone-400" },
  cambio_de_fase:       { label: "Cambio de fase",      bg: "bg-amber-50",   text: "text-amber-700",  dot: "bg-amber-500" },
  incidente_incitador:  { label: "Incidente incitador", bg: "bg-rose-50",    text: "text-rose-700",   dot: "bg-rose-500" },
};

const YBNA_COLORS: Record<string, string> = {
  si: "#a7c4a0",
  si_pero: "#d4b872",
  no_y: "#cf8a7a",
  no: "#b85c4a",
};

type FilterMode = "todo" | "hitos" | "arcos" | "escenas";

// ── Main page ───────────────────────────────────────────────

export default function EstructuraPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { personajes } = usePersonajes(projectId);
  const spineData = useSpineData(projectId);
  const {
    sortedFases, hitosByFase, unassignedHitos,
    arcoByOrigenId, orphanedArcos,
    escenasByHito, unassignedEscenas,
    fases, hitos,
    createFase, createHito, createArco, createEscena,
  } = spineData;

  const [filterMode, setFilterMode] = useState<FilterMode>("todo");
  const [filterPovId, setFilterPovId] = useState<string>("");

  // Filter spine data by POV personaje
  const filtered = useMemo(() => {
    if (!filterPovId) {
      return { sortedFases, hitosByFase, unassignedHitos, arcoByOrigenId, orphanedArcos, escenasByHito, unassignedEscenas };
    }

    const filteredHitoIds = new Set<string>();
    const filteredHitosByFase = new Map<string, Hito[]>();
    const filteredUnassignedHitos: Hito[] = [];

    for (const [faseId, faseHitos] of hitosByFase) {
      const matching = faseHitos.filter((h) => h.pov_personaje_id === filterPovId);
      if (matching.length > 0) {
        filteredHitosByFase.set(faseId, matching);
        matching.forEach((h) => filteredHitoIds.add(h.id));
      }
    }
    for (const h of unassignedHitos) {
      if (h.pov_personaje_id === filterPovId) {
        filteredUnassignedHitos.push(h);
        filteredHitoIds.add(h.id);
      }
    }

    // Only keep fases that have matching hitos
    const filteredFases = sortedFases.filter((f) => filteredHitosByFase.has(f.id));

    // Filter arcos: keep only those originating from a matching hito
    const filteredArcoByOrigenId = new Map<string, Arco>();
    for (const [hitoId, arco] of arcoByOrigenId) {
      if (filteredHitoIds.has(hitoId)) {
        filteredArcoByOrigenId.set(hitoId, arco);
      }
    }

    // Filter escenas: keep only those under matching hitos
    const filteredEscenasByHito = new Map<string, Escena[]>();
    for (const [hitoId, escenas] of escenasByHito) {
      if (filteredHitoIds.has(hitoId)) {
        filteredEscenasByHito.set(hitoId, escenas);
      }
    }

    return {
      sortedFases: filteredFases,
      hitosByFase: filteredHitosByFase,
      unassignedHitos: filteredUnassignedHitos,
      arcoByOrigenId: filteredArcoByOrigenId,
      orphanedArcos: [] as Arco[],
      escenasByHito: filteredEscenasByHito,
      unassignedEscenas: [] as Escena[],
    };
  }, [filterPovId, sortedFases, hitosByFase, unassignedHitos, arcoByOrigenId, orphanedArcos, escenasByHito, unassignedEscenas]);
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

  const nav = useCallback((path: string) => router.push(`/app/proyectos/${projectId}/${path}`), [router, projectId]);

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
    <div className="p-6">
      {/* Header + filter buttons */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Estructura</h1>
        <div className="flex items-center gap-3">
          <select
            value={filterPovId}
            onChange={(e) => setFilterPovId(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] px-2.5 py-1 text-xs text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
          >
            <option value="">Todos los POV</option>
            {personajes.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre || "Sin nombre"}</option>
            ))}
          </select>
          <div className="flex rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-0.5">
            {(["todo", "hitos", "arcos", "escenas"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  filterMode === mode
                    ? "bg-white text-[var(--color-ink)] shadow-sm"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-light)]"
                }`}
              >
                {mode === "todo" ? "Todo" : mode === "hitos" ? "Hitos" : mode === "arcos" ? "Arcos" : "Escenas"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ColumnaView
        filterMode={filterMode}
        projectId={projectId}
        sortedFases={filtered.sortedFases}
        hitosByFase={filtered.hitosByFase}
        arcoByOrigenId={filtered.arcoByOrigenId}
        escenasByHito={filtered.escenasByHito}
        unassignedHitos={filtered.unassignedHitos}
        orphanedArcos={filtered.orphanedArcos}
        unassignedEscenas={filtered.unassignedEscenas}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        nav={nav}
        creatingFase={creatingFase}
        setCreatingFase={setCreatingFase}
        newFaseName={newFaseName}
        setNewFaseName={setNewFaseName}
        handleCreateFase={handleCreateFase}
        creatingHitoIn={creatingHitoIn}
        setCreatingHitoIn={setCreatingHitoIn}
        newHitoName={newHitoName}
        setNewHitoName={setNewHitoName}
        handleCreateHito={handleCreateHito}
        creatingEscenaIn={creatingEscenaIn}
        setCreatingEscenaIn={setCreatingEscenaIn}
        newEscenaName={newEscenaName}
        setNewEscenaName={setNewEscenaName}
        handleCreateEscena={handleCreateEscena}
        handleCreateArco={handleCreateArco}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// COLUMNA VIEW (improved spine)
// ══════════════════════════════════════════════════════════════

function ColumnaView({
  filterMode,
  projectId, sortedFases, hitosByFase, arcoByOrigenId, escenasByHito,
  unassignedHitos, orphanedArcos, unassignedEscenas,
  collapsed, toggleCollapse, nav,
  creatingFase, setCreatingFase, newFaseName, setNewFaseName, handleCreateFase,
  creatingHitoIn, setCreatingHitoIn, newHitoName, setNewHitoName, handleCreateHito,
  creatingEscenaIn, setCreatingEscenaIn, newEscenaName, setNewEscenaName, handleCreateEscena,
  handleCreateArco, handleKeyDown,
}: {
  filterMode: FilterMode;
  projectId: string;
  sortedFases: Fase[];
  hitosByFase: Map<string, Hito[]>;
  arcoByOrigenId: Map<string, Arco>;
  escenasByHito: Map<string, Escena[]>;
  unassignedHitos: Hito[];
  orphanedArcos: Arco[];
  unassignedEscenas: Escena[];
  collapsed: Set<string>;
  toggleCollapse: (id: string) => void;
  nav: (path: string) => void;
  creatingFase: boolean;
  setCreatingFase: (v: boolean) => void;
  newFaseName: string;
  setNewFaseName: (v: string) => void;
  handleCreateFase: () => void;
  creatingHitoIn: string | null;
  setCreatingHitoIn: (v: string | null) => void;
  newHitoName: string;
  setNewHitoName: (v: string) => void;
  handleCreateHito: (faseId: string) => void;
  creatingEscenaIn: string | null;
  setCreatingEscenaIn: (v: string | null) => void;
  newEscenaName: string;
  setNewEscenaName: (v: string) => void;
  handleCreateEscena: (hitoId: string) => void;
  handleCreateArco: (a: string, b: string) => void;
  handleKeyDown: (e: React.KeyboardEvent, action: () => void, cancel: () => void) => void;
}) {
  // ── Arcos filter view ──────────────────────────────────
  if (filterMode === "arcos") {
    return (
      <div className="max-w-3xl space-y-3">
        {sortedFases.map((fase) => {
          const faseHitos = hitosByFase.get(fase.id) || [];
          const hasArcos = faseHitos.some((h, i) => i < faseHitos.length - 1 && arcoByOrigenId.has(h.id));
          if (!hasArcos && faseHitos.length < 2) return null;
          return (
            <div key={fase.id}>
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-2">{fase.nombre}</div>
              {faseHitos.map((hito, index) => {
                if (index >= faseHitos.length - 1) return null;
                const arco = arcoByOrigenId.get(hito.id);
                return (
                  <div key={hito.id} className="mb-3">
                    <div className="flex items-center gap-2 text-[10px] text-[var(--color-ink-muted)] mb-1">
                      <span>{hito.hito}</span>
                      <span>→</span>
                      <span>{faseHitos[index + 1].hito}</span>
                    </div>
                    <ArcoConnector
                      arco={arco}
                      onClickArco={(id) => nav(`arcos/${id}`)}
                      onCreateArco={() => handleCreateArco(hito.id, faseHitos[index + 1].id)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* Orphaned arcos */}
        {orphanedArcos.length > 0 && (
          <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-cream)] p-4">
            <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-3">Sin asignar</h3>
            <div className="flex flex-wrap gap-1.5">
              {orphanedArcos.map((a) => (
                <button key={a.id} onClick={() => nav(`arcos/${a.id}`)}
                  className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors">
                  {a.nombre || "Sin nombre"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Escenas filter view ────────────────────────────────
  if (filterMode === "escenas") {
    return (
      <div className="max-w-3xl space-y-4">
        {sortedFases.map((fase) => {
          const faseHitos = hitosByFase.get(fase.id) || [];
          const hasEscenas = faseHitos.some((h) => (escenasByHito.get(h.id) || []).length > 0);
          if (!hasEscenas) return null;
          return (
            <div key={fase.id}>
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-3">{fase.nombre}</div>
              {faseHitos.map((hito) => {
                const escenas = escenasByHito.get(hito.id) || [];
                if (escenas.length === 0) return null;
                return (
                  <div key={hito.id} className="mb-4">
                    <button onClick={() => nav(`hitos/${hito.id}`)}
                      className="text-xs font-medium text-[var(--color-ink-light)] hover:text-[var(--color-accent)] transition-colors mb-1.5">
                      {hito.hito || "Hito sin nombre"}
                    </button>
                    <div className="space-y-1 ml-3">
                      {escenas.map((esc) => (
                        <button key={esc.id} onClick={() => nav(`escenas/${esc.id}`)}
                          className="flex items-start gap-2 rounded-md px-2.5 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-ink)] transition-colors w-full text-left">
                          <span className="shrink-0 mt-1.5 h-1 w-1 rounded-full bg-[var(--color-ink-muted)] opacity-40" />
                          <span className="break-words leading-relaxed">{esc.resumen || "Sin resumen"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* Unassigned escenas */}
        {unassignedEscenas.length > 0 && (
          <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-cream)] p-4">
            <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-3">Sin asignar</h3>
            <div className="flex flex-wrap gap-1.5">
              {unassignedEscenas.map((e) => (
                <button key={e.id} onClick={() => nav(`escenas/${e.id}`)}
                  className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors">
                  {e.resumen || "Sin resumen"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Todo / Hitos view (main spine) ────────────────────
  return (
    <div className="max-w-3xl space-y-5">
      {sortedFases.map((fase) => {
        const faseHitos = hitosByFase.get(fase.id) || [];
        const isCollapsed = collapsed.has(fase.id);

        return (
          <div key={fase.id}>
            {/* Fase header */}
            <div
              className="group flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-parchment)] px-4 py-3 transition-colors hover:border-[var(--color-accent-light)]"
            >
              <button
                onClick={() => toggleCollapse(fase.id)}
                className="shrink-0 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? "" : "rotate-90"}`}>
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => nav(`fases/${fase.id}`)}
                  className="text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {fase.nombre || "Fase sin nombre"}
                </button>
                {fase.descripcion && (
                  <p className="mt-0.5 text-xs text-[var(--color-ink-muted)] break-words line-clamp-1">
                    {fase.descripcion}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-[10px] text-[var(--color-ink-muted)] tabular-nums">
                {faseHitos.length} hito{faseHitos.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Fase content */}
            {!isCollapsed && (
              <div className="relative ml-5 mt-1 pl-6 pb-2">
                {/* Vertical spine line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                  style={{ backgroundColor: "var(--color-accent-light)", opacity: 0.5 }}
                />

                {faseHitos.map((hito, index) => {
                  const tipoConfig = HITO_TIPO_CONFIG[hito.tipo] || HITO_TIPO_CONFIG.normalidad;
                  const escenas = escenasByHito.get(hito.id) || [];

                  return (
                    <div key={hito.id}>
                      {/* Hito node */}
                      <div className="relative flex items-start gap-3 py-3">
                        {/* Dot on the spine line */}
                        <div className="absolute -left-6 top-[18px] flex items-center justify-center">
                          <div className={`relative z-10 h-[11px] w-[11px] rounded-full ${tipoConfig.dot} ring-2 ring-[var(--color-cream)]`} />
                          {/* Horizontal connector */}
                          <div className="absolute left-[11px] top-1/2 w-[13px] h-[1px] bg-[var(--color-border)]" />
                        </div>

                        {/* Hito card */}
                        <button
                          onClick={() => nav(`hitos/${hito.id}`)}
                          className="group flex-1 min-w-0 rounded-lg border border-[var(--color-border)] bg-white p-3.5 text-left transition-all hover:border-[var(--color-accent-light)] hover:shadow-sm"
                        >
                          <div className="flex items-start gap-2 flex-wrap">
                            <span className="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors break-words">
                              {hito.hito || "Hito sin nombre"}
                            </span>
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${tipoConfig.bg} ${tipoConfig.text}`}>
                              {tipoConfig.label}
                            </span>
                          </div>
                          {hito.informacion && (
                            <p className="mt-1.5 text-xs text-[var(--color-ink-muted)] leading-relaxed break-words">
                              {hito.informacion}
                            </p>
                          )}

                          {/* Escenas inside hito — only in "todo" mode */}
                          {filterMode === "todo" && escenas.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-[var(--color-border-light)] space-y-0.5">
                              {escenas.map((esc) => (
                                <div
                                  key={esc.id}
                                  onClick={(e) => { e.stopPropagation(); nav(`escenas/${esc.id}`); }}
                                  className="flex items-start gap-2 rounded px-2 py-1 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
                                >
                                  <span className="shrink-0 mt-1.5 h-1 w-1 rounded-full bg-[var(--color-ink-muted)] opacity-40" />
                                  <span className="break-words leading-relaxed">{esc.resumen || "Sin resumen"}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </button>
                      </div>

                      {/* Escena creation — only in "todo" mode */}
                      {filterMode === "todo" && (
                        creatingEscenaIn === hito.id ? (
                          <div className="ml-0 mb-2 flex gap-2">
                            <input autoFocus value={newEscenaName} onChange={(e) => setNewEscenaName(e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, () => handleCreateEscena(hito.id), () => { setCreatingEscenaIn(null); setNewEscenaName(""); })}
                              placeholder="Resumen de la escena"
                              className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none" />
                            <button onClick={() => handleCreateEscena(hito.id)} disabled={!newEscenaName.trim()} className="rounded-md bg-[var(--color-accent)] px-2.5 py-1.5 text-[10px] font-medium text-white disabled:opacity-50">Crear</button>
                            <button onClick={() => { setCreatingEscenaIn(null); setNewEscenaName(""); }} className="rounded-md border border-[var(--color-border)] px-2.5 py-1.5 text-[10px] text-[var(--color-ink-light)]">Cancelar</button>
                          </div>
                        ) : (
                          <button onClick={() => { setCreatingEscenaIn(hito.id); setNewEscenaName(""); }}
                            className="ml-0 mb-1 text-[10px] text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors">
                            + Escena
                          </button>
                        )
                      )}

                      {/* Arco connector — only in "todo" mode */}
                      {filterMode === "todo" && index < faseHitos.length - 1 && (
                        <ArcoConnector
                          arco={arcoByOrigenId.get(hito.id)}
                          onClickArco={(id) => nav(`arcos/${id}`)}
                          onCreateArco={() => handleCreateArco(hito.id, faseHitos[index + 1].id)}
                        />
                      )}
                    </div>
                  );
                })}

                {/* Add hito */}
                {creatingHitoIn === fase.id ? (
                  <div className="flex gap-2 py-2">
                    <input autoFocus value={newHitoName} onChange={(e) => setNewHitoName(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleCreateHito(fase.id), () => { setCreatingHitoIn(null); setNewHitoName(""); })}
                      placeholder="Nombre del hito"
                      className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]" />
                    <button onClick={() => handleCreateHito(fase.id)} disabled={!newHitoName.trim()} className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--color-accent-dark)] disabled:opacity-50">Crear</button>
                    <button onClick={() => { setCreatingHitoIn(null); setNewHitoName(""); }} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]">Cancelar</button>
                  </div>
                ) : (
                  <button onClick={() => { setCreatingHitoIn(fase.id); setNewHitoName(""); }}
                    className="mt-1 w-full rounded-lg border border-dashed border-[var(--color-border)] px-4 py-2 text-xs text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
                    + Hito
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Unassigned */}
      {(unassignedHitos.length > 0 || orphanedArcos.length > 0 || unassignedEscenas.length > 0) && (
        <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-3">Sin asignar</h3>
          {[
            { items: unassignedHitos, label: "Hitos", getLabel: (h: Hito) => h.hito || "Sin nombre", getPath: (h: Hito) => `hitos/${h.id}` },
            { items: orphanedArcos, label: "Arcos", getLabel: (a: Arco) => a.nombre || "Sin nombre", getPath: (a: Arco) => `arcos/${a.id}` },
            { items: unassignedEscenas, label: "Escenas", getLabel: (e: Escena) => e.resumen || "Sin resumen", getPath: (e: Escena) => `escenas/${e.id}` },
          ].map(({ items, label, getLabel, getPath }) => items.length > 0 && (
            <div key={label} className="mb-3 last:mb-0">
              <p className="text-xs text-[var(--color-ink-muted)] mb-1.5">{label}:</p>
              <div className="flex flex-wrap gap-1.5">
                {(items as Array<{ id: string }>).map((item) => (
                  <button key={item.id} onClick={() => nav(getPath(item as never))}
                    className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors">
                    {getLabel(item as never)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add fase */}
      {creatingFase ? (
        <div className="flex gap-2">
          <input autoFocus value={newFaseName} onChange={(e) => setNewFaseName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, handleCreateFase, () => { setCreatingFase(false); setNewFaseName(""); })}
            placeholder="Nombre de la fase"
            className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]" />
          <button onClick={handleCreateFase} disabled={!newFaseName.trim()} className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-dark)] disabled:opacity-50">Crear</button>
          <button onClick={() => { setCreatingFase(false); setNewFaseName(""); }} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]">Cancelar</button>
        </div>
      ) : (
        <button onClick={() => setCreatingFase(true)}
          className="w-full rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-parchment)] px-4 py-3 text-sm text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
          + Fase
        </button>
      )}
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
      <div className="my-1 ml-0">
        <button onClick={onCreateArco}
          className="w-full rounded border border-dashed border-[var(--color-border)] px-3 py-1.5 text-[10px] text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
          + Arco narrativo
        </button>
      </div>
    );
  }

  const resOption = TIPO_RESOLUCION_OPTIONS.find((o) => o.value === arco.tipo_resolucion);
  const ybnaColor = arco.tipo_resolucion ? YBNA_COLORS[arco.tipo_resolucion] : undefined;

  return (
    <div className="my-2">
      <button
        onClick={() => onClickArco(arco.id)}
        className="group w-full rounded-lg p-3 text-left transition-all hover:shadow-sm"
        style={{
          backgroundColor: ybnaColor ? `${ybnaColor}18` : "var(--color-cream)",
          borderLeft: `3px solid ${ybnaColor || "var(--color-border)"}`,
        }}
      >
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">Arco</span>
          <span className="text-xs font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors break-words">
            {arco.nombre || "Sin nombre"}
          </span>
          {resOption && resOption.value && (
            <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: ybnaColor ? `${ybnaColor}40` : "#f3f4f6", color: ybnaColor ? `${ybnaColor}` : "#6b7280" }}>
              {resOption.label}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
          {arco.planteamiento && (
            <div className="break-words">
              <span className="font-medium text-[var(--color-ink-muted)]">Intención </span>
              <span className="text-[var(--color-ink-light)] leading-relaxed">{arco.planteamiento}</span>
            </div>
          )}
          {arco.nudo && (
            <div className="break-words">
              <span className="font-medium text-[var(--color-ink-muted)]">Obstáculo </span>
              <span className="text-[var(--color-ink-light)] leading-relaxed">{arco.nudo}</span>
            </div>
          )}
          {arco.desenlace && (
            <div className="break-words">
              <span className="font-medium text-[var(--color-ink-muted)]">Resolución </span>
              <span className="text-[var(--color-ink-light)] leading-relaxed">{arco.desenlace}</span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
