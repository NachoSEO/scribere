"use client";

import { useState, useEffect, useMemo } from "react";
import { usePersonajes, useEscenaPersonajes, useEscenaEventos, useEscena } from "@/lib/proyectos/hooks";
import { useProyectosStore } from "@/lib/proyectos/store";
import { ENTITY_TYPE_CONFIG } from "@/lib/proyectos/entity-config";
import { getMentionEntityUrl } from "@/lib/proyectos/entity-config";
import { Sidebar as CorrectorSidebar } from "@/components/corrector/Sidebar";
import { JunctionSelector } from "@/components/proyectos/JunctionSelector";

// ── Entity detail panels ─────────────────────────────────

function PersonajeDetail({ id, projectId }: { id: string; projectId: string }) {
  const personaje = useProyectosStore((s) => s.personajes.find((p) => p.id === id));
  const faccion = useProyectosStore((s) => {
    const p = s.personajes.find((p) => p.id === id);
    return p?.faccion_id ? s.facciones.find((f) => f.id === p.faccion_id) ?? null : null;
  });
  if (!personaje) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {personaje.imagen_url ? (
          <img src={personaje.imagen_url} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
            style={{ backgroundColor: `${ENTITY_TYPE_CONFIG.personaje.color}26`, color: ENTITY_TYPE_CONFIG.personaje.color }}>
            {personaje.nombre.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[var(--color-ink)] truncate">{personaje.nombre}</p>
          {personaje.tipo && <p className="text-[10px] text-[var(--color-ink-muted)]">{personaje.tipo}</p>}
        </div>
      </div>
      {personaje.funcion_narrativa && <DetailField label="Función" value={personaje.funcion_narrativa} />}
      {personaje.motivacion && <DetailField label="Motivación" value={personaje.motivacion} />}
      {personaje.complicacion && <DetailField label="Complicación" value={personaje.complicacion} />}
      {personaje.descripcion && <DetailField label="Descripción" value={personaje.descripcion} />}
      {faccion && <DetailField label="Facción" value={faccion.nombre} />}
      <a href={getMentionEntityUrl(projectId, "personaje", id)}
        className="inline-flex items-center gap-1 text-[10px] text-[var(--color-accent)] hover:underline mt-1">
        Ver ficha completa →
      </a>
    </div>
  );
}

function LugarDetail({ id, projectId }: { id: string; projectId: string }) {
  const lugar = useProyectosStore((s) => s.lugares.find((l) => l.id === id));
  if (!lugar) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-[var(--color-ink)]">{lugar.nombre}</p>
      {lugar.tipo && <p className="text-[10px] text-[var(--color-ink-muted)] uppercase">{lugar.tipo}</p>}
      {lugar.descripcion && <DetailField label="Descripción" value={lugar.descripcion} />}
      <a href={getMentionEntityUrl(projectId, "lugar", id)}
        className="inline-flex items-center gap-1 text-[10px] text-[var(--color-accent)] hover:underline mt-1">
        Ver ficha completa →
      </a>
    </div>
  );
}

function EventoDetail({ id, projectId }: { id: string; projectId: string }) {
  const evento = useProyectosStore((s) => s.eventos.find((e) => e.id === id));
  if (!evento) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-[var(--color-ink)]">{evento.nombre}</p>
      {evento.cronologia && <p className="text-[10px] text-[var(--color-ink-muted)]">{evento.cronologia}</p>}
      {evento.descripcion && <DetailField label="Descripción" value={evento.descripcion} />}
      <a href={getMentionEntityUrl(projectId, "evento", id)}
        className="inline-flex items-center gap-1 text-[10px] text-[var(--color-accent)] hover:underline mt-1">
        Ver ficha completa →
      </a>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-[var(--color-ink-muted)] font-medium">{label}</p>
      <p className="text-xs text-[var(--color-ink-light)] break-words line-clamp-3">{value}</p>
    </div>
  );
}

// ── Expandable entity chip ───────────────────────────────

function EntityChip({
  id,
  nombre,
  type,
  color,
  expandedId,
  onToggle,
  onRemove,
  projectId,
}: {
  id: string;
  nombre: string;
  type: string;
  color: string;
  expandedId: string | null;
  onToggle: (id: string) => void;
  onRemove?: (id: string) => void;
  projectId: string;
}) {
  const isExpanded = expandedId === id;

  return (
    <div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onToggle(id)}
          className={`flex items-center gap-1.5 flex-1 min-w-0 rounded px-2 py-1.5 text-xs transition-colors text-left ${
            isExpanded ? "bg-white border border-[var(--color-border)]" : "hover:bg-[var(--color-parchment)]"
          }`}
        >
          <span className="shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-[var(--color-ink)] truncate">{nombre || "Sin nombre"}</span>
        </button>
        {onRemove && (
          <button
            onClick={() => onRemove(id)}
            className="shrink-0 text-[var(--color-ink-muted)] hover:text-red-600 text-xs px-1 transition-colors"
          >
            &times;
          </button>
        )}
      </div>
      {isExpanded && (
        <div className="ml-3 mt-1 mb-2 pl-3 border-l-2 border-[var(--color-border)]">
          {type === "personaje" && <PersonajeDetail id={id} projectId={projectId} />}
          {type === "lugar" && <LugarDetail id={id} projectId={projectId} />}
          {type === "evento" && <EventoDetail id={id} projectId={projectId} />}
        </div>
      )}
    </div>
  );
}

// ── Main sidebar ─────────────────────────────────────────

export interface SceneSidebarProps {
  escenaId: string;
  projectId: string;
  correctorEnabled: boolean;
  navigateFn: ((s: number, e: number) => void) | null;
}

export function SceneSidebar({
  escenaId,
  projectId,
  correctorEnabled,
  navigateFn,
}: SceneSidebarProps) {
  const [activeTab, setActiveTab] = useState<"elementos" | "corrector">(
    correctorEnabled ? "corrector" : "elementos"
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (correctorEnabled) setActiveTab("corrector");
  }, [correctorEnabled]);

  const escena = useProyectosStore((s) => s.escenas.find((e) => e.id === escenaId));
  const { save: saveEscena } = useEscena(escenaId);
  const hitos = useProyectosStore((s) => s.hitos);
  const arcos = useProyectosStore((s) => s.arcos);
  const lugares = useProyectosStore((s) => s.lugares);
  const eventos = useProyectosStore((s) => s.eventos);
  const { personajes } = usePersonajes(projectId);
  const epLinks = useEscenaPersonajes(escenaId);
  const eeLinks = useEscenaEventos(escenaId);

  const personajeIds = useMemo(
    () => epLinks.links.map((l) => l.personaje_id),
    [epLinks.links]
  );
  const personajeJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of epLinks.links) map.set(l.personaje_id, l.id);
    return map;
  }, [epLinks.links]);

  const linkedPersonajes = useMemo(
    () => personajes.filter((p) => personajeIds.includes(p.id)),
    [personajes, personajeIds]
  );

  const eventoIds = useMemo(
    () => eeLinks.links.map((l) => l.evento_id),
    [eeLinks.links]
  );
  const eventoJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of eeLinks.links) map.set(l.evento_id, l.id);
    return map;
  }, [eeLinks.links]);
  const linkedEventos = useMemo(
    () => eventos.filter((e) => eventoIds.includes(e.id)),
    [eventos, eventoIds]
  );

  const linkedHito = escena?.hito_id ? hitos.find((h) => h.id === escena.hito_id) : null;
  const linkedArco = escena?.arco_id ? arcos.find((a) => a.id === escena.arco_id) : null;
  const linkedLugar = escena?.lugar_id ? lugares.find((l) => l.id === escena.lugar_id) : null;

  const toggleExpand = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div
      className="flex flex-col h-full border-l border-[var(--color-border)] bg-[var(--color-cream-dark)]"
      style={{ width: 300, minWidth: 300 }}
    >
      <div className="flex border-b border-[var(--color-border)] shrink-0">
        <button
          onClick={() => setActiveTab("elementos")}
          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
            activeTab === "elementos"
              ? "text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-light)]"
          }`}
        >
          Elementos
        </button>
        <button
          onClick={() => setActiveTab("corrector")}
          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
            activeTab === "corrector"
              ? "text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-light)]"
          }`}
        >
          Corrector
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === "corrector" ? (
          <CorrectorSidebar onNavigateToIssue={navigateFn ?? undefined} />
        ) : (
          <div className="p-3 space-y-4">
            {/* Scene info */}
            {escena?.resumen && (
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1">Resumen</h4>
                <p className="text-xs text-[var(--color-ink-light)] break-words">{escena.resumen}</p>
              </div>
            )}
            {escena?.objetivo && (
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1">Objetivo</h4>
                <p className="text-xs text-[var(--color-ink-light)] break-words">{escena.objetivo}</p>
              </div>
            )}

            {/* Context selectors */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">Contexto</h4>

              <ContextSelector
                label="Hito"
                value={escena?.hito_id ?? ""}
                options={hitos.map((h) => ({ id: h.id, nombre: h.hito || "Sin nombre" }))}
                onChange={(v) => saveEscena({ hito_id: v || null })}
                color="#d97706"
              />
              <ContextSelector
                label="Arco"
                value={escena?.arco_id ?? ""}
                options={arcos.map((a) => ({ id: a.id, nombre: a.nombre || "Sin nombre" }))}
                onChange={(v) => saveEscena({ arco_id: v || null })}
                color="#78716c"
              />
            </div>

            {/* ── Personajes ── */}
            <EntitySection
              title="Personajes"
              color={ENTITY_TYPE_CONFIG.personaje.color}
            >
              {linkedPersonajes.map((p) => (
                <EntityChip
                  key={p.id}
                  id={p.id}
                  nombre={p.nombre}
                  type="personaje"
                  color={ENTITY_TYPE_CONFIG.personaje.color}
                  expandedId={expandedId}
                  onToggle={toggleExpand}
                  onRemove={(pid) => {
                    const jid = personajeJunctionMap.get(pid);
                    if (jid) epLinks.remove(jid);
                  }}
                  projectId={projectId}
                />
              ))}
              <AddEntityDropdown
                placeholder="+ Personaje"
                options={personajes.filter((p) => !personajeIds.includes(p.id))}
                onAdd={epLinks.add}
              />
            </EntitySection>

            {/* ── Lugares ── */}
            <EntitySection
              title="Lugares"
              color={ENTITY_TYPE_CONFIG.lugar.color}
            >
              {linkedLugar && (
                <EntityChip
                  id={linkedLugar.id}
                  nombre={linkedLugar.nombre}
                  type="lugar"
                  color={ENTITY_TYPE_CONFIG.lugar.color}
                  expandedId={expandedId}
                  onToggle={toggleExpand}
                  onRemove={() => saveEscena({ lugar_id: null })}
                  projectId={projectId}
                />
              )}
              {!linkedLugar && (
                <AddEntityDropdown
                  placeholder="+ Lugar"
                  options={lugares}
                  onAdd={(id) => saveEscena({ lugar_id: id })}
                />
              )}
            </EntitySection>

            {/* ── Eventos ── */}
            <EntitySection
              title="Eventos"
              color={ENTITY_TYPE_CONFIG.evento.color}
            >
              {linkedEventos.map((ev) => (
                <EntityChip
                  key={ev.id}
                  id={ev.id}
                  nombre={ev.nombre}
                  type="evento"
                  color={ENTITY_TYPE_CONFIG.evento.color}
                  expandedId={expandedId}
                  onToggle={toggleExpand}
                  onRemove={(eid) => {
                    const jid = eventoJunctionMap.get(eid);
                    if (jid) eeLinks.remove(jid);
                  }}
                  projectId={projectId}
                />
              ))}
              <AddEntityDropdown
                placeholder="+ Evento"
                options={eventos.filter((e) => !eventoIds.includes(e.id))}
                onAdd={eeLinks.add}
              />
            </EntitySection>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────

function EntitySection({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="shrink-0 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
        <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">{title}</h4>
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function ContextSelector({
  label,
  value,
  options,
  onChange,
  color,
}: {
  label: string;
  value: string;
  options: { id: string; nombre: string }[];
  onChange: (value: string) => void;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      <label className="text-[10px] text-[var(--color-ink-muted)] font-medium shrink-0 w-8">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-w-0 rounded border border-[var(--color-border)] bg-[var(--color-cream)] px-1.5 py-1 text-[11px] text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
      >
        <option value="">—</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>{o.nombre}</option>
        ))}
      </select>
    </div>
  );
}

function AddEntityDropdown({
  placeholder,
  options,
  onAdd,
}: {
  placeholder: string;
  options: { id: string; nombre: string }[];
  onAdd: (id: string) => void;
}) {
  if (options.length === 0) return null;

  return (
    <select
      value=""
      onChange={(e) => { if (e.target.value) onAdd(e.target.value); }}
      className="w-full rounded border border-dashed border-[var(--color-border)] bg-transparent px-2 py-1 text-[11px] text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none cursor-pointer"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>{o.nombre}</option>
      ))}
    </select>
  );
}
