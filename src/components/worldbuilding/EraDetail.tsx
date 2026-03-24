"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useEra, useEras, useEventos } from "@/lib/worldbuilding/hooks";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { FormField } from "@/components/proyectos/FormField";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";

const eraFields: FieldConfig[] = [
  { key: "nombre", label: "Nombre", placeholder: "Nombre de la era" },
  { key: "descripcion", label: "Descripción", multiline: true, rows: 3, placeholder: "Descripción de esta era..." },
];

interface EraDetailProps {
  mundoId: string;
  eraId: string;
}

export function EraDetail({ mundoId, eraId }: EraDetailProps) {
  const router = useRouter();
  const { era, save } = useEra(eraId);
  const { remove: removeEra } = useEras(mundoId);
  const { eventos, create: createEvento, update: updateEvento, remove: removeEvento } = useEventos(eraId);

  const [showDelete, setShowDelete] = useState(false);
  const [creatingEvento, setCreatingEvento] = useState(false);
  const [nuevoEventoNombre, setNuevoEventoNombre] = useState("");

  const values = useMemo((): Record<string, string> => {
    if (!era) return {};
    return { nombre: era.nombre, descripcion: era.descripcion };
  }, [era]);

  const handleChange = useCallback((key: string, value: string) => {
    save({ [key]: value });
  }, [save]);

  const handleDelete = useCallback(async () => {
    await removeEra(eraId);
    router.push(`/app/worldbuilding/${mundoId}/cronologia`);
  }, [removeEra, eraId, mundoId, router]);

  const handleCreateEvento = useCallback(async () => {
    if (!nuevoEventoNombre.trim()) return;
    await createEvento({ nombre: nuevoEventoNombre.trim() });
    setCreatingEvento(false);
    setNuevoEventoNombre("");
  }, [nuevoEventoNombre, createEvento]);

  const handleEventoKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreateEvento();
    if (e.key === "Escape") { setCreatingEvento(false); setNuevoEventoNombre(""); }
  };

  if (!era) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {era.nombre || "Era sin nombre"}
        </h1>
        <button
          onClick={() => setShowDelete(true)}
          className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">Los cambios se guardan automáticamente</p>

      <div className="mt-6">
        <EntityForm fields={eraFields} values={values} onChange={handleChange} />
      </div>

      {/* Eventos inline */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[var(--color-ink)]">Eventos</h2>
          <button
            onClick={() => setCreatingEvento(true)}
            className="rounded-md bg-[var(--color-accent)] px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
          >
            +
          </button>
        </div>

        {creatingEvento && (
          <div className="mt-3 flex gap-2">
            <input
              autoFocus
              value={nuevoEventoNombre}
              onChange={(e) => setNuevoEventoNombre(e.target.value)}
              onKeyDown={handleEventoKeyDown}
              placeholder="Nombre del evento"
              className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
            <button
              onClick={handleCreateEvento}
              disabled={!nuevoEventoNombre.trim()}
              className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              Crear
            </button>
            <button
              onClick={() => { setCreatingEvento(false); setNuevoEventoNombre(""); }}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream-dark)]"
            >
              Cancelar
            </button>
          </div>
        )}

        <div className="mt-3 space-y-3">
          {eventos.length === 0 && !creatingEvento && (
            <p className="py-4 text-center text-xs text-[var(--color-ink-muted)]">
              No hay eventos en esta era
            </p>
          )}
          {eventos.map((evento) => (
            <EventoCard
              key={evento.id}
              id={evento.id}
              nombre={evento.nombre}
              descripcion={evento.descripcion}
              onUpdate={updateEvento}
              onDelete={() => removeEvento(evento.id)}
            />
          ))}
        </div>
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="era"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}

function EventoCard({
  id,
  nombre,
  descripcion,
  onUpdate,
  onDelete,
}: {
  id: string;
  nombre: string;
  descripcion: string;
  onUpdate: (data: { id: string; nombre?: string; descripcion?: string }) => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <FormField
            label="Nombre"
            value={nombre}
            onChange={(value) => onUpdate({ id, nombre: value })}
            placeholder="Nombre del evento"
          />
        </div>
        <button
          onClick={onDelete}
          className="mt-5 text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors flex-shrink-0"
        >
          Eliminar
        </button>
      </div>
      <FormField
        label="Descripción"
        value={descripcion}
        onChange={(value) => onUpdate({ id, descripcion: value })}
        multiline
        rows={2}
        placeholder="Descripción del evento..."
      />
    </div>
  );
}
