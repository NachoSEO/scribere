"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { usePersonajes, useEscenaPersonajes, useEscenaEventos, useEscena, useEscenaVersiones, useEscenaTareas, useIdeas, useEscenaIdeas } from "@/lib/proyectos/hooks";
import { ESCENA_ESTADO_OPTIONS } from "@/types/proyectos";
import type { EscenaEstado } from "@/types/proyectos";
import { useProyectosStore } from "@/lib/proyectos/store";
import { ENTITY_TYPE_CONFIG } from "@/lib/proyectos/entity-config";
import { getMentionEntityUrl } from "@/lib/proyectos/entity-config";
import { renderCleanContent } from "@/lib/manuscrito/render-clean-html";
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
  const [activeTab, setActiveTab] = useState<"elementos" | "corrector" | "versiones">(
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
  const versiones = useEscenaVersiones(escenaId);
  const tareasHook = useEscenaTareas(escenaId);
  const ideasHook = useIdeas(projectId);
  const escenaIdeasHook = useEscenaIdeas(escenaId);

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
        <button
          onClick={() => setActiveTab("versiones")}
          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
            activeTab === "versiones"
              ? "text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-light)]"
          }`}
        >
          Versiones
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === "corrector" ? (
          <CorrectorSidebar onNavigateToIssue={navigateFn ?? undefined} />
        ) : activeTab === "versiones" ? (
          <VersionesTab
            escenaId={escenaId}
            escena={escena ?? null}
            versiones={versiones}
            saveEscena={saveEscena}
          />
        ) : (
          <div className="p-3 space-y-4">
            {/* Scene info — editable */}
            <EditableField
              label="Resumen"
              value={escena?.resumen ?? ""}
              placeholder="Resumen de la escena..."
              onSave={(v) => saveEscena({ resumen: v })}
            />
            <EditableField
              label="Objetivo"
              value={escena?.objetivo ?? ""}
              placeholder="Objetivo narrativo..."
              onSave={(v) => saveEscena({ objetivo: v })}
            />

            {/* Estado */}
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1.5">Estado</h4>
              <div className="flex flex-wrap gap-1">
                {ESCENA_ESTADO_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => saveEscena({ estado: opt.value })}
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors"
                    style={{
                      backgroundColor: escena?.estado === opt.value ? `${opt.color}30` : 'transparent',
                      color: escena?.estado === opt.value ? opt.color : 'var(--color-ink-muted)',
                      border: `1px solid ${escena?.estado === opt.value ? opt.color : 'var(--color-border)'}`,
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* POV */}
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1">POV</h4>
              <select
                value={escena?.pov_personaje_id ?? ""}
                onChange={(e) => {
                  const pid = e.target.value || null;
                  saveEscena({ pov_personaje_id: pid });
                  if (pid && !personajeIds.includes(pid)) {
                    epLinks.add(pid);
                  }
                }}
                className="w-full rounded border border-[var(--color-border)] bg-[var(--color-cream)] px-2 py-1 text-[11px] text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
              >
                <option value="">Sin POV</option>
                {personajes.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>

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

            {/* ── Tareas ── */}
            <TareasSection tareas={tareasHook} />

            {/* ── Ideas ── */}
            <IdeasSection
              projectId={projectId}
              ideasHook={ideasHook}
              escenaIdeasHook={escenaIdeasHook}
              expandedId={expandedId}
              onToggle={toggleExpand}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Versiones tab ────────────────────────────────────────

function VersionesTab({
  escenaId,
  escena,
  versiones,
  saveEscena,
}: {
  escenaId: string;
  escena: { contenido: Record<string, unknown> | null } | null;
  versiones: ReturnType<typeof useEscenaVersiones>;
  saveEscena: (data: { contenido?: Record<string, unknown> | null }) => void;
}) {
  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

  const handleCreate = async () => {
    const trimmed = nombre.trim();
    if (!trimmed) return;
    await versiones.create({ nombre: trimmed, contenido: escena?.contenido ?? null });
    setNombre("");
    setCreating(false);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${dd}/${mm} ${hh}:${min}`;
  };

  return (
    <div className="p-3 space-y-3">
      {creating ? (
        <div className="space-y-2">
          <input
            autoFocus
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
              if (e.key === "Escape") { setCreating(false); setNombre(""); }
            }}
            placeholder="Nombre de la versión..."
            className="w-full rounded border border-[var(--color-border)] bg-[var(--color-cream)] px-2 py-1.5 text-xs text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none"
          />
          <div className="flex gap-1.5">
            <button
              onClick={handleCreate}
              disabled={!nombre.trim()}
              className="flex-1 rounded bg-[var(--color-accent)] px-2 py-1 text-[11px] font-medium text-white hover:bg-[var(--color-accent-dark)] disabled:opacity-50 transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={() => { setCreating(false); setNombre(""); }}
              className="rounded border border-[var(--color-border)] px-2 py-1 text-[11px] text-[var(--color-ink-muted)] hover:bg-[var(--color-cream-dark)] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="w-full rounded border border-dashed border-[var(--color-border)] bg-transparent px-2 py-1.5 text-[11px] text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
        >
          Guardar versión
        </button>
      )}

      {versiones.versiones.length === 0 && (
        <p className="text-[11px] text-[var(--color-ink-muted)] italic text-center py-2">
          Sin versiones guardadas
        </p>
      )}

      <div className="space-y-1">
        {versiones.versiones.map((v) => (
          <div key={v.id} className="rounded border border-[var(--color-border)] bg-white">
            <div className="flex items-center gap-1.5 px-2 py-1.5">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--color-ink)] truncate">{v.nombre}</p>
                <p className="text-[10px] text-[var(--color-ink-muted)]">{formatDate(v.created_at)}</p>
              </div>
              <button
                onClick={() => setPreviewId(previewId === v.id ? null : v.id)}
                className="shrink-0 text-[10px] text-[var(--color-accent)] hover:underline"
                title="Vista previa"
              >
                {previewId === v.id ? "Ocultar" : "Ver"}
              </button>
              <button
                onClick={() => {
                  if (confirm("¿Restaurar esta versión? El contenido actual se reemplazará.")) {
                    saveEscena({ contenido: v.contenido });
                  }
                }}
                className="shrink-0 text-[10px] text-[var(--color-ink-light)] hover:text-[var(--color-accent)]"
                title="Restaurar"
              >
                ↩
              </button>
              <button
                onClick={() => versiones.remove(v.id)}
                className="shrink-0 text-[10px] text-[var(--color-ink-muted)] hover:text-red-600"
                title="Eliminar"
              >
                &times;
              </button>
            </div>
            {previewId === v.id && (
              <div className="border-t border-[var(--color-border)] px-2 py-2 max-h-48 overflow-y-auto custom-scrollbar">
                <div className="clean-preview text-xs text-[var(--color-ink-light)]">
                  {v.contenido ? renderCleanContent(v.contenido) : (
                    <p className="italic text-[var(--color-ink-muted)]">Sin contenido</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tareas section ───────────────────────────────────────

function TareasSection({
  tareas: { tareas, create, update, remove },
}: {
  tareas: ReturnType<typeof useEscenaTareas>;
}) {
  const [newTitulo, setNewTitulo] = useState("");

  const handleCreate = async () => {
    const trimmed = newTitulo.trim();
    if (!trimmed) return;
    await create({ titulo: trimmed });
    setNewTitulo("");
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="shrink-0 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#6b7280" }} />
        <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">Tareas</h4>
        {tareas.length > 0 && (
          <span className="text-[9px] bg-[var(--color-parchment)] text-[var(--color-ink-muted)] rounded-full px-1.5 py-0.5 font-medium">
            {tareas.length}
          </span>
        )}
      </div>
      <div className="space-y-0.5">
        {tareas.map((t) => (
          <div key={t.id} className="group flex items-center gap-1.5 px-1 py-1 rounded hover:bg-[var(--color-parchment)] transition-colors">
            <button
              onClick={() =>
                update(t.id, { estado: t.estado === "completada" ? "pendiente" : "completada" })
              }
              className={`shrink-0 w-3.5 h-3.5 rounded border transition-colors flex items-center justify-center ${
                t.estado === "completada"
                  ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {t.estado === "completada" && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span
              className={`flex-1 text-xs truncate ${
                t.estado === "completada"
                  ? "line-through text-[var(--color-ink-muted)]"
                  : "text-[var(--color-ink)]"
              }`}
            >
              {t.titulo}
            </span>
            <button
              onClick={() => remove(t.id)}
              className="shrink-0 text-[var(--color-ink-muted)] hover:text-red-600 text-xs px-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        value={newTitulo}
        onChange={(e) => setNewTitulo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCreate();
        }}
        placeholder="Nueva tarea..."
        className="w-full rounded border border-dashed border-[var(--color-border)] bg-transparent px-2 py-1 text-[11px] text-[var(--color-ink-muted)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}

// ── Ideas section ────────────────────────────────────────

function IdeaDetail({ idea }: { idea: { titulo: string; descripcion: string } }) {
  return (
    <div className="space-y-1">
      {idea.descripcion && (
        <p className="text-xs text-[var(--color-ink-light)] break-words line-clamp-3">{idea.descripcion}</p>
      )}
    </div>
  );
}

function IdeasSection({
  projectId,
  ideasHook,
  escenaIdeasHook,
  expandedId,
  onToggle,
}: {
  projectId: string;
  ideasHook: ReturnType<typeof useIdeas>;
  escenaIdeasHook: ReturnType<typeof useEscenaIdeas>;
  expandedId: string | null;
  onToggle: (id: string) => void;
}) {
  const [newTitulo, setNewTitulo] = useState("");
  const ideaColor = "#e07c3e";

  const linkedIdeaIds = useMemo(
    () => escenaIdeasHook.links.map((l) => l.idea_id),
    [escenaIdeasHook.links]
  );
  const ideaJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of escenaIdeasHook.links) map.set(l.idea_id, l.id);
    return map;
  }, [escenaIdeasHook.links]);

  const linkedIdeas = useMemo(
    () => ideasHook.ideas.filter((i) => linkedIdeaIds.includes(i.id)),
    [ideasHook.ideas, linkedIdeaIds]
  );

  const unlinkedIdeas = useMemo(
    () => ideasHook.ideas.filter((i) => !linkedIdeaIds.includes(i.id)),
    [ideasHook.ideas, linkedIdeaIds]
  );

  const handleCreate = async () => {
    const trimmed = newTitulo.trim();
    if (!trimmed) return;
    const idea = await ideasHook.create({ titulo: trimmed });
    await escenaIdeasHook.add(idea.id);
    setNewTitulo("");
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="shrink-0 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ideaColor }} />
        <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">Ideas</h4>
        {linkedIdeas.length > 0 && (
          <span className="text-[9px] bg-[var(--color-parchment)] text-[var(--color-ink-muted)] rounded-full px-1.5 py-0.5 font-medium">
            {linkedIdeas.length}
          </span>
        )}
      </div>
      <div className="space-y-0.5">
        {linkedIdeas.map((idea) => {
          const isExpanded = expandedId === idea.id;
          return (
            <div key={idea.id}>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onToggle(idea.id)}
                  className={`flex items-center gap-1.5 flex-1 min-w-0 rounded px-2 py-1.5 text-xs transition-colors text-left ${
                    isExpanded ? "bg-white border border-[var(--color-border)]" : "hover:bg-[var(--color-parchment)]"
                  }`}
                >
                  <span className="shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: ideaColor }} />
                  <span className="text-[var(--color-ink)] truncate">{idea.titulo}</span>
                </button>
                <button
                  onClick={() => {
                    const jid = ideaJunctionMap.get(idea.id);
                    if (jid) escenaIdeasHook.remove(jid);
                  }}
                  className="shrink-0 text-[var(--color-ink-muted)] hover:text-red-600 text-xs px-1 transition-colors"
                >
                  &times;
                </button>
              </div>
              {isExpanded && (
                <div className="ml-3 mt-1 mb-2 pl-3 border-l-2 border-[var(--color-border)]">
                  <IdeaDetail idea={idea} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <AddEntityDropdown
        placeholder="+ Idea existente"
        options={unlinkedIdeas.map((i) => ({ id: i.id, nombre: i.titulo }))}
        onAdd={escenaIdeasHook.add}
      />
      <input
        value={newTitulo}
        onChange={(e) => setNewTitulo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCreate();
        }}
        placeholder="Nueva idea..."
        className="w-full rounded border border-dashed border-[var(--color-border)] bg-transparent px-2 py-1 text-[11px] text-[var(--color-ink-muted)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none"
      />
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

function EditableField({
  label,
  value,
  placeholder,
  onSave,
}: {
  label: string;
  value: string;
  placeholder: string;
  onSave: (value: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  useEffect(() => { setLocal(value); }, [value]);

  const handleChange = useCallback((v: string) => {
    setLocal(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSaveRef.current(v), 500);
  }, []);

  return (
    <div>
      <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1">{label}</h4>
      <textarea
        value={local}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full rounded border border-[var(--color-border)] bg-[var(--color-cream)] px-2 py-1.5 text-xs text-[var(--color-ink-light)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none resize-none"
      />
    </div>
  );
}
