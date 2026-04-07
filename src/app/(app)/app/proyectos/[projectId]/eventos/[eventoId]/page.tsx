"use client";

import { use, useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useEvento, useEventos, usePersonajes, useLugares, useHitos, useEscenas, useEventoPersonajes, useEventoLugares, useEventoHitos, useEventoEscenas } from "@/lib/proyectos/hooks";
import { FormField } from "@/components/proyectos/FormField";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import { JunctionSelector } from "@/components/proyectos/JunctionSelector";

const inputClasses =
  "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors";

function InlineInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [local, setLocal] = useState(value);
  const isTyping = useRef(false);

  useEffect(() => {
    if (!isTyping.current) {
      setLocal(value);
    }
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      isTyping.current = true;
      const newValue = e.target.value;
      setLocal(newValue);
      onChange(newValue);
      setTimeout(() => { isTyping.current = false; }, 1000);
    },
    [onChange]
  );

  return (
    <input
      type="text"
      value={local}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}

export default function EventoDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; eventoId: string }>;
}) {
  const { projectId, eventoId } = use(params);
  const router = useRouter();
  const { evento, save } = useEvento(eventoId);
  const { remove } = useEventos(projectId);
  const { personajes } = usePersonajes(projectId);
  const { lugares } = useLugares(projectId);
  const { hitos } = useHitos(projectId);
  const { escenas } = useEscenas(projectId);
  const epLinks = useEventoPersonajes(eventoId);
  const elLinks = useEventoLugares(eventoId);
  const ehLinks = useEventoHitos(eventoId);
  const eeLinks = useEventoEscenas(eventoId);
  const [showDelete, setShowDelete] = useState(false);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await remove(eventoId);
    router.push(`/app/proyectos/${projectId}/eventos`);
  }, [remove, eventoId, projectId, router]);

  // Personaje junction
  const personajeIds = useMemo(() => epLinks.links.map((l) => l.personaje_id), [epLinks.links]);
  const personajeJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of epLinks.links) map.set(l.personaje_id, l.id);
    return map;
  }, [epLinks.links]);

  // Lugar junction
  const lugarIds = useMemo(() => elLinks.links.map((l) => l.lugar_id), [elLinks.links]);
  const lugarJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of elLinks.links) map.set(l.lugar_id, l.id);
    return map;
  }, [elLinks.links]);

  // Hito junction
  const hitoIds = useMemo(() => ehLinks.links.map((l) => l.hito_id), [ehLinks.links]);
  const hitoJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of ehLinks.links) map.set(l.hito_id, l.id);
    return map;
  }, [ehLinks.links]);
  const hitoItems = useMemo(() => hitos.map((h) => ({ id: h.id, nombre: h.hito })), [hitos]);

  // Escena junction
  const escenaIds = useMemo(() => eeLinks.links.map((l) => l.escena_id), [eeLinks.links]);
  const escenaJunctionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of eeLinks.links) map.set(l.escena_id, l.id);
    return map;
  }, [eeLinks.links]);
  const escenaItems = useMemo(() => escenas.map((e) => ({ id: e.id, nombre: e.resumen })), [escenas]);

  if (!evento) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-[var(--color-ink)]">
            {evento.nombre || "Evento sin nombre"}
          </h1>
          <button
            onClick={() => setShowDelete(true)}
            className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
        <p className="mt-1 text-xs text-[var(--color-ink-muted)]">Los cambios se guardan automáticamente</p>

        {/* Nombre + Cronologia inline */}
        <div className="mt-4 flex gap-3">
          <div className="flex-1">
            <InlineInput
              value={evento.nombre ?? ""}
              onChange={(v) => handleChange("nombre", v)}
              placeholder="Nombre del evento"
              className={inputClasses}
            />
          </div>
          <div className="w-40">
            <InlineInput
              value={evento.cronologia ?? ""}
              onChange={(v) => handleChange("cronologia", v)}
              placeholder="Ej: 1547, Era 3..."
              className={inputClasses}
            />
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {/* Causa y efecto card */}
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
            <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-2">
              Causa y efecto
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Causa directa"
                value={evento.causa_directa ?? ""}
                onChange={(v) => handleChange("causa_directa", v)}
                multiline
                rows={3}
                placeholder="Qué provoca este evento..."
                projectId={projectId}
              />
              <FormField
                label="Consecuencia directa"
                value={evento.consecuencia_directa ?? ""}
                onChange={(v) => handleChange("consecuencia_directa", v)}
                multiline
                rows={3}
                placeholder="Qué consecuencias tiene este evento..."
                projectId={projectId}
              />
            </div>
          </div>

          {/* Detalle card */}
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
            <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-2">
              Detalle
            </h2>
            <div className="space-y-3">
              <FormField
                label="Función"
                value={evento.funcion ?? ""}
                onChange={(v) => handleChange("funcion", v)}
                placeholder="Qué función cumple este evento en la historia..."
                projectId={projectId}
              />
              <FormField
                label="Descripción"
                value={evento.descripcion ?? ""}
                onChange={(v) => handleChange("descripcion", v)}
                multiline
                rows={4}
                placeholder="Qué sucede en este evento..."
                projectId={projectId}
              />
            </div>
          </div>

          {/* Relaciones card */}
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
            <h2 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold mb-2">
              Relaciones
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <JunctionSelector
                label="Personajes involucrados"
                linkedIds={personajeIds}
                options={personajes}
                onAdd={epLinks.add}
                onRemove={epLinks.remove}
                junctionMap={personajeJunctionMap}
              />

              <JunctionSelector
                label="Lugares"
                linkedIds={lugarIds}
                options={lugares}
                onAdd={elLinks.add}
                onRemove={elLinks.remove}
                junctionMap={lugarJunctionMap}
              />

              <JunctionSelector
                label="Hitos relacionados"
                linkedIds={hitoIds}
                options={hitoItems}
                onAdd={ehLinks.add}
                onRemove={ehLinks.remove}
                junctionMap={hitoJunctionMap}
              />

              <JunctionSelector
                label="Escenas relacionadas"
                linkedIds={escenaIds}
                options={escenaItems}
                onAdd={eeLinks.add}
                onRemove={eeLinks.remove}
                junctionMap={escenaJunctionMap}
              />
            </div>
          </div>
        </div>
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="evento"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
