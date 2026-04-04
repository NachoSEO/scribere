"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import type { Escena, ManuscritoCarpeta } from "@/types/proyectos";
import { ESCENA_ESTADO_OPTIONS } from "@/types/proyectos";

// ── Icons ────────────────────────────────────────────────────

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={`shrink-0 text-[var(--color-ink-muted)] transition-transform ${collapsed ? "" : "rotate-90"}`}
    >
      <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FolderIcon({ small }: { small?: boolean }) {
  const size = small ? 12 : 13;
  return (
    <svg width={size} height={size} viewBox="0 0 14 12" fill="none" className="shrink-0 text-[var(--color-accent-light)]">
      <path d="M1 3a1 1 0 0 1 1-1h3l1.5 1.5H12a1 1 0 0 1 1 1V10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function PageIcon({ selected }: { selected: boolean }) {
  return (
    <svg width="11" height="12" viewBox="0 0 11 13" fill="none" className="shrink-0">
      <rect x="0.5" y="0.5" width="10" height="12" rx="1.5" fill={selected ? "rgba(255,255,255,0.3)" : "var(--color-parchment)"} stroke={selected ? "rgba(255,255,255,0.5)" : "var(--color-border)"} />
      <line x1="2.5" y1="4" x2="8.5" y2="4" stroke={selected ? "rgba(255,255,255,0.6)" : "var(--color-ink-muted)"} strokeWidth="1" strokeLinecap="round" />
      <line x1="2.5" y1="6.5" x2="8.5" y2="6.5" stroke={selected ? "rgba(255,255,255,0.6)" : "var(--color-ink-muted)"} strokeWidth="1" strokeLinecap="round" />
      <line x1="2.5" y1="9" x2="6" y2="9" stroke={selected ? "rgba(255,255,255,0.6)" : "var(--color-ink-muted)"} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// ── Sub-components ────────────────────────────────────────────

function EscenaRow({ escena, selected, paddingLeft, onSelect, onDelete }: {
  escena: Escena;
  selected: boolean;
  paddingLeft: number;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div
      className={`flex items-center w-full py-1.5 pr-1 text-xs transition-colors group ${
        selected
          ? "bg-[var(--color-accent)] text-white"
          : "text-[var(--color-ink)] hover:bg-[var(--color-parchment)]"
      }`}
      style={{ paddingLeft }}
    >
      <button onClick={() => onSelect(escena.id)} className="flex items-center gap-2 flex-1 min-w-0 text-left">
        <PageIcon selected={selected} />
        {escena.estado && (() => {
          const opt = ESCENA_ESTADO_OPTIONS.find((o) => o.value === escena.estado);
          return opt ? <span className="shrink-0 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: selected ? 'rgba(255,255,255,0.6)' : opt.color }} /> : null;
        })()}
        <span className="truncate flex-1">{escena.resumen || "Sin título"}</span>
      </button>
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(escena.id); }}
          className={`shrink-0 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
            selected ? "hover:bg-white/20 text-white" : "hover:bg-[var(--color-border)] text-[var(--color-ink-muted)]"
          }`}
          title="Eliminar escena"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

function InlineInput({ inputRef, value, onChange, onKeyDown, onBlur, paddingLeft, placeholder }: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onBlur: () => void;
  paddingLeft: number;
  placeholder: string;
}) {
  return (
    <div style={{ paddingLeft }} className="pr-2 py-1">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full text-xs border border-[var(--color-accent)] rounded px-2 py-1 bg-white text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
      />
    </div>
  );
}

// ── Main FileTree ─────────────────────────────────────────────

export interface FileTreeProps {
  escenas: Escena[];
  carpetas: ManuscritoCarpeta[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreateEscena: (nombre: string, carpetaId: string | null) => Promise<void>;
  onDeleteEscena?: (id: string) => Promise<void>;
  onCreateCarpeta: (nombre: string, padreId: string | null) => Promise<void>;
  onDeleteCarpeta?: (id: string) => Promise<void>;
  onRenameCarpeta?: (id: string, nombre: string) => Promise<void>;
}

export function FileTree({
  escenas, carpetas,
  selectedId, onSelect,
  onCreateEscena, onDeleteEscena,
  onCreateCarpeta, onDeleteCarpeta, onRenameCarpeta,
}: FileTreeProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState<{ type: "escena" | "carpeta"; parentId: string | null } | null>(null);
  const [newName, setNewName] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const renameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (creating && inputRef.current) inputRef.current.focus();
  }, [creating]);

  useEffect(() => {
    if (renaming && renameRef.current) renameRef.current.focus();
  }, [renaming]);

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleCreate = useCallback(async () => {
    const name = newName.trim();
    if (!name || !creating) { setCreating(null); setNewName(""); return; }
    if (creating.type === "escena") {
      await onCreateEscena(name, creating.parentId);
    } else {
      await onCreateCarpeta(name, creating.parentId);
    }
    setCreating(null);
    setNewName("");
  }, [newName, creating, onCreateEscena, onCreateCarpeta]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") { setCreating(null); setNewName(""); }
  };

  const handleRename = useCallback(async () => {
    if (renaming && renameValue.trim() && onRenameCarpeta) {
      await onRenameCarpeta(renaming, renameValue.trim());
    }
    setRenaming(null);
    setRenameValue("");
  }, [renaming, renameValue, onRenameCarpeta]);

  // Group data
  const escenasByCarpeta = useMemo(() => {
    const map = new Map<string, Escena[]>();
    for (const escena of escenas) {
      if (!escena.carpeta_id) continue;
      if (!map.has(escena.carpeta_id)) map.set(escena.carpeta_id, []);
      map.get(escena.carpeta_id)!.push(escena);
    }
    for (const arr of map.values()) arr.sort((a, b) => a.posicion - b.posicion);
    return map;
  }, [escenas]);

  const rootCarpetas = useMemo(() => carpetas.filter((c) => !c.carpeta_padre_id).sort((a, b) => a.posicion - b.posicion), [carpetas]);
  const childCarpetas = useMemo(() => {
    const map = new Map<string, ManuscritoCarpeta[]>();
    for (const c of carpetas) {
      if (!c.carpeta_padre_id) continue;
      if (!map.has(c.carpeta_padre_id)) map.set(c.carpeta_padre_id, []);
      map.get(c.carpeta_padre_id)!.push(c);
    }
    for (const arr of map.values()) arr.sort((a, b) => a.posicion - b.posicion);
    return map;
  }, [carpetas]);

  const sueltas = useMemo(
    () => escenas.filter((e) => !e.carpeta_id).sort((a, b) => a.posicion - b.posicion),
    [escenas]
  );

  function renderCarpeta(carpeta: ManuscritoCarpeta, depth: number) {
    const pl = 12 + depth * 16;
    const isCollapsed = collapsed.has(carpeta.id);
    const subCarpetas = childCarpetas.get(carpeta.id) ?? [];
    const carpetaEscenas = escenasByCarpeta.get(carpeta.id) ?? [];

    return (
      <div key={carpeta.id}>
        <div className="flex items-center group">
          <button
            onClick={() => toggleCollapse(carpeta.id)}
            className="flex items-center gap-1.5 flex-1 min-w-0 py-1.5 text-left hover:bg-[var(--color-parchment)] transition-colors"
            style={{ paddingLeft: pl }}
          >
            <ChevronIcon collapsed={isCollapsed} />
            <FolderIcon small={depth > 0} />
            {renaming === carpeta.id ? (
              <input
                ref={renameRef}
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleRename(); if (e.key === "Escape") setRenaming(null); }}
                onBlur={handleRename}
                className="text-xs bg-white border border-[var(--color-accent)] rounded px-1 py-0.5 outline-none flex-1 min-w-0"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="text-xs font-medium text-[var(--color-ink)] truncate flex-1">
                {carpeta.nombre || "Sin nombre"}
              </span>
            )}
          </button>
          <div className="flex items-center gap-0.5 pr-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => { setRenaming(carpeta.id); setRenameValue(carpeta.nombre); }}
              className="p-0.5 rounded hover:bg-[var(--color-border)] text-[var(--color-ink-muted)]"
              title="Renombrar"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7 1.5l1.5 1.5L3 8.5H1.5V7L7 1.5z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>
            </button>
            {onDeleteCarpeta && (
              <button
                onClick={() => onDeleteCarpeta(carpeta.id)}
                className="p-0.5 rounded hover:bg-[var(--color-border)] text-[var(--color-ink-muted)]"
                title="Eliminar carpeta"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
              </button>
            )}
          </div>
        </div>
        {!isCollapsed && (
          <div>
            {subCarpetas.map((sub) => renderCarpeta(sub, depth + 1))}
            {carpetaEscenas.map((escena) => (
              <EscenaRow key={escena.id} escena={escena} selected={escena.id === selectedId} paddingLeft={pl + 20} onSelect={onSelect} onDelete={onDeleteEscena} />
            ))}
            {creating?.type === "escena" && creating.parentId === carpeta.id && (
              <InlineInput inputRef={inputRef} value={newName} onChange={setNewName} onKeyDown={handleKeyDown} onBlur={handleCreate} paddingLeft={pl + 20} placeholder="Nombre de la escena..." />
            )}
            {creating?.type === "carpeta" && creating.parentId === carpeta.id && (
              <InlineInput inputRef={inputRef} value={newName} onChange={setNewName} onKeyDown={handleKeyDown} onBlur={handleCreate} paddingLeft={pl + 20} placeholder="Nombre de la carpeta..." />
            )}
            <div className="flex gap-2" style={{ paddingLeft: pl + 20 }}>
              <button
                onClick={() => setCreating({ type: "escena", parentId: carpeta.id })}
                className="py-0.5 text-[10px] text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                + Escena
              </button>
              <button
                onClick={() => setCreating({ type: "carpeta", parentId: carpeta.id })}
                className="py-0.5 text-[10px] text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                + Subcarpeta
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border-r border-[var(--color-border)]" style={{ width: 240, minWidth: 240, background: "var(--color-cream-dark)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[var(--color-border)]">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-light)]">Manuscrito</span>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-1">
        {/* Carpetas */}
        {rootCarpetas.map((c) => renderCarpeta(c, 0))}

        {/* Sueltas (scenes without folder) */}
        {sueltas.map((escena) => (
          <EscenaRow key={escena.id} escena={escena} selected={escena.id === selectedId} paddingLeft={12} onSelect={onSelect} onDelete={onDeleteEscena} />
        ))}
      </div>

      {/* Bottom: create buttons */}
      <div className="border-t border-[var(--color-border)] p-2 space-y-1">
        {creating?.parentId === null && creating?.type === "escena" && (
          <InlineInput inputRef={inputRef} value={newName} onChange={setNewName} onKeyDown={handleKeyDown} onBlur={handleCreate} paddingLeft={8} placeholder="Nombre de la escena..." />
        )}
        {creating?.parentId === null && creating?.type === "carpeta" && (
          <InlineInput inputRef={inputRef} value={newName} onChange={setNewName} onKeyDown={handleKeyDown} onBlur={handleCreate} paddingLeft={8} placeholder="Nombre de la carpeta..." />
        )}
        {!creating && (
          <div className="flex gap-2">
            <button
              onClick={() => setCreating({ type: "escena", parentId: null })}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-parchment)] transition-colors"
            >
              + Escena
            </button>
            <button
              onClick={() => setCreating({ type: "carpeta", parentId: null })}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-parchment)] transition-colors"
            >
              + Carpeta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
