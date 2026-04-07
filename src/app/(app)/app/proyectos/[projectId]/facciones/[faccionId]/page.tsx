"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFaccion, useFacciones, useFaccionRelaciones, usePersonajes } from "@/lib/proyectos/hooks";
import { useProyectosStore } from "@/lib/proyectos/store";
import { updatePersonaje } from "@/lib/proyectos/queries";
import { createClient } from "@/lib/supabase/client";
import { ImageUploader } from "@/components/proyectos/ImageUploader";
import { CompactCard } from "@/components/proyectos/CompactCard";
import { EntityBadge } from "@/components/proyectos/EntityBadge";
import { TipoSelector } from "@/components/proyectos/TipoSelector";
import { FormField } from "@/components/proyectos/FormField";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import CustomSelect from "@/components/ui/CustomSelect";

const FACCION_TIPO_OPTIONS = ["aliada", "enemiga", "rival", "neutral", "subordinada"];

export default function FaccionDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; faccionId: string }>;
}) {
  const { projectId, faccionId } = use(params);
  const router = useRouter();
  const { faccion, save } = useFaccion(faccionId);
  const { remove, create: createFaccion } = useFacciones(projectId);
  const { relaciones: rawRelaciones, available, create: createRelacion, update: updateRelacion, remove: removeRelacion } = useFaccionRelaciones(faccionId);
  const { create: createPersonaje } = usePersonajes(projectId);
  const personajes = useProyectosStore((s) => s.personajes);
  const updatePersonajeInList = useProyectosStore((s) => s.updatePersonajeInList);
  const [showDelete, setShowDelete] = useState(false);
  const [addingRelacion, setAddingRelacion] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [addingMember, setAddingMember] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [creatingMember, setCreatingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [creatingRelFaccion, setCreatingRelFaccion] = useState(false);
  const [newRelFaccionName, setNewRelFaccionName] = useState("");

  // Members: personajes belonging to this facción
  const members = useMemo(
    () => personajes.filter((p) => p.faccion_id === faccionId),
    [personajes, faccionId]
  );

  // Personajes not yet in this faction
  const availableMembers = useMemo(
    () => personajes.filter((p) => p.faccion_id !== faccionId),
    [personajes, faccionId]
  );

  const handleAddMember = useCallback(async () => {
    if (!selectedMemberId) return;
    const sb = createClient();
    const updated = await updatePersonaje(sb, selectedMemberId, { faccion_id: faccionId });
    updatePersonajeInList(updated);
    setSelectedMemberId("");
    setAddingMember(false);
  }, [selectedMemberId, faccionId, updatePersonajeInList]);

  const handleRemoveMember = useCallback(async (personajeId: string) => {
    const sb = createClient();
    const updated = await updatePersonaje(sb, personajeId, { faccion_id: null });
    updatePersonajeInList(updated);
  }, [updatePersonajeInList]);

  // Map relaciones for display
  const relaciones = useMemo(() => {
    return rawRelaciones.map((rel) => {
      const otherId = rel.faccion_a_id === faccionId ? rel.faccion_b_id : rel.faccion_a_id;
      const other = available.find((f) => f.id === otherId);
      return {
        id: rel.id,
        descripcion: rel.descripcion,
        tipo: rel.tipo,
        otherId,
        otherNombre: other?.nombre ?? "Desconocido",
      };
    });
  }, [rawRelaciones, faccionId, available]);

  // Filter out already-related factions
  const relatedIds = new Set(relaciones.map((r) => r.otherId));
  const unrelatedOptions = available.filter((f) => !relatedIds.has(f.id));

  const handleDelete = useCallback(async () => {
    await remove(faccionId);
    router.push(`/app/proyectos/${projectId}/facciones`);
  }, [remove, faccionId, projectId, router]);

  const handleAddRelacion = useCallback(async () => {
    if (!selectedId) return;
    await createRelacion({ faccion_a_id: faccionId, faccion_b_id: selectedId });
    setSelectedId("");
    setAddingRelacion(false);
  }, [createRelacion, faccionId, selectedId]);

  const handleCreateMember = useCallback(async () => {
    if (!newMemberName.trim()) return;
    await createPersonaje({ nombre: newMemberName.trim(), faccion_id: faccionId });
    setNewMemberName("");
    setCreatingMember(false);
  }, [newMemberName, createPersonaje, faccionId]);

  const handleCreateRelFaccion = useCallback(async () => {
    if (!newRelFaccionName.trim()) return;
    const newF = await createFaccion({ nombre: newRelFaccionName.trim() });
    await createRelacion({ faccion_a_id: faccionId, faccion_b_id: newF.id });
    setNewRelFaccionName("");
    setCreatingRelFaccion(false);
  }, [newRelFaccionName, createFaccion, createRelacion, faccionId]);

  if (!faccion) return <div className="p-6 text-sm text-[var(--color-ink-muted)]">Cargando...</div>;

  return (
    <div className="p-6 max-w-4xl">
      {/* Header: Image + Name */}
      <div className="flex items-start gap-4">
        <ImageUploader
          value={faccion.imagen_url}
          onChange={(url) => save({ imagen_url: url })}
          initials={faccion.nombre}
        />
        <div className="flex-1 min-w-0">
          <FormField
            label=""
            value={faccion.nombre}
            onChange={(v) => save({ nombre: v })}
            placeholder="Nombre de la facción"
          />
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-[var(--color-ink-muted)]">Los cambios se guardan automáticamente</p>
            <button
              onClick={() => setShowDelete(true)}
              className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Compact attribute cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <CompactCard
          label="Concepto"
          value={faccion.concepto}
          onChange={(v) => save({ concepto: v })}
          placeholder="El concepto central..."
          projectId={projectId}
        />
        <CompactCard
          label="Objetivos"
          value={faccion.objetivos}
          onChange={(v) => save({ objetivos: v })}
          placeholder="Los objetivos..."
          projectId={projectId}
        />
        <CompactCard
          label="Motivación"
          value={faccion.motivacion}
          onChange={(v) => save({ motivacion: v })}
          placeholder="La motivación principal..."
          projectId={projectId}
        />
        <CompactCard
          label="Complicación"
          value={faccion.complicacion}
          onChange={(v) => save({ complicacion: v })}
          placeholder="Los obstáculos..."
          projectId={projectId}
        />
      </div>

      {/* Members */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
            Miembros
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreatingMember(true)}
              className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
            >
              + Crear
            </button>
            {availableMembers.length > 0 && (
              <button
                onClick={() => setAddingMember(true)}
                className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
              >
                + Añadir existente
              </button>
            )}
          </div>
        </div>

        {creatingMember && (
          <div className="mb-3 flex gap-2">
            <input
              autoFocus
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleCreateMember(); if (e.key === "Escape") { setCreatingMember(false); setNewMemberName(""); } }}
              placeholder="Nombre del nuevo personaje..."
              className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
            />
            <button
              onClick={handleCreateMember}
              disabled={!newMemberName.trim()}
              className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              Crear
            </button>
            <button
              onClick={() => { setCreatingMember(false); setNewMemberName(""); }}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]"
            >
              Cancelar
            </button>
          </div>
        )}

        {addingMember && (
          <div className="mb-3 flex gap-2">
            <CustomSelect
              value={selectedMemberId}
              onChange={(v) => setSelectedMemberId(v)}
              options={availableMembers.map((p) => ({ value: p.id, label: p.nombre || "Sin nombre" }))}
              placeholder="Seleccionar personaje..."
              className="flex-1"
            />
            <button
              onClick={handleAddMember}
              disabled={!selectedMemberId}
              className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              Añadir
            </button>
            <button
              onClick={() => { setAddingMember(false); setSelectedMemberId(""); }}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]"
            >
              Cancelar
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {members.length === 0 && !addingMember && (
            <p className="text-xs text-[var(--color-ink-muted)] italic">Sin miembros asignados</p>
          )}
          {members.map((p) => (
            <EntityBadge
              key={p.id}
              nombre={p.nombre || "Sin nombre"}
              href={`/app/proyectos/${projectId}/personajes/${p.id}`}
              onRemove={() => handleRemoveMember(p.id)}
            />
          ))}
        </div>
      </div>

      {/* Faction Relations */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
            Relaciones con facciones
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreatingRelFaccion(true)}
              className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
            >
              + Crear facción
            </button>
            {unrelatedOptions.length > 0 && (
              <button
                onClick={() => setAddingRelacion(true)}
                className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
              >
                + Añadir existente
              </button>
            )}
          </div>
        </div>

        {creatingRelFaccion && (
          <div className="mb-3 flex gap-2">
            <input
              autoFocus
              value={newRelFaccionName}
              onChange={(e) => setNewRelFaccionName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleCreateRelFaccion(); if (e.key === "Escape") { setCreatingRelFaccion(false); setNewRelFaccionName(""); } }}
              placeholder="Nombre de la nueva facción..."
              className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
            />
            <button
              onClick={handleCreateRelFaccion}
              disabled={!newRelFaccionName.trim()}
              className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              Crear
            </button>
            <button
              onClick={() => { setCreatingRelFaccion(false); setNewRelFaccionName(""); }}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]"
            >
              Cancelar
            </button>
          </div>
        )}

        {addingRelacion && (
          <div className="mb-3 flex gap-2">
            <CustomSelect
              value={selectedId}
              onChange={(v) => setSelectedId(v)}
              options={unrelatedOptions.map((opt) => ({ value: opt.id, label: opt.nombre || "Sin nombre" }))}
              placeholder="Seleccionar facción..."
              className="flex-1"
            />
            <button
              onClick={handleAddRelacion}
              disabled={!selectedId}
              className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              Añadir
            </button>
            <button
              onClick={() => { setAddingRelacion(false); setSelectedId(""); }}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream-dark)]"
            >
              Cancelar
            </button>
          </div>
        )}

        <div className="space-y-2">
          {relaciones.length === 0 && !addingRelacion && (
            <p className="text-xs text-[var(--color-ink-muted)] italic">Sin relaciones</p>
          )}
          {relaciones.map((rel) => (
            <FaccionRelacionCard
              key={rel.id}
              nombre={rel.otherNombre}
              tipo={rel.tipo}
              descripcion={rel.descripcion}
              onTipoChange={(tipo) => updateRelacion({ id: rel.id, tipo })}
              onDescripcionChange={(descripcion) => updateRelacion({ id: rel.id, descripcion })}
              onDelete={() => removeRelacion(rel.id)}
            />
          ))}
        </div>
      </div>

      {/* Notas */}
      <div className="mt-6">
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <FormField
            label="Notas"
            value={faccion.notas}
            onChange={(v) => save({ notas: v })}
            multiline
            rows={5}
            placeholder="Notas adicionales sobre esta facción..."
          />
        </div>
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="facción"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}

function FaccionRelacionCard({
  nombre,
  tipo,
  descripcion,
  onTipoChange,
  onDescripcionChange,
  onDelete,
}: {
  nombre: string;
  tipo: string;
  descripcion: string;
  onTipoChange: (tipo: string) => void;
  onDescripcionChange: (descripcion: string) => void;
  onDelete: () => void;
}) {
  const borderColor = {
    aliada: "border-l-green-500",
    enemiga: "border-l-red-500",
    rival: "border-l-orange-500",
    neutral: "border-l-gray-400",
    subordinada: "border-l-blue-500",
  }[tipo] || "border-l-gray-300";

  return (
    <div className={`rounded-lg border border-[var(--color-border)] bg-white p-3 border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-ink)]">{nombre}</span>
          <TipoSelector
            value={tipo}
            onChange={onTipoChange}
            options={FACCION_TIPO_OPTIONS}
          />
        </div>
        <button
          onClick={onDelete}
          className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
      <textarea
        value={descripcion}
        onChange={(e) => onDescripcionChange(e.target.value)}
        placeholder="Describe la relación..."
        rows={1}
        className="mt-2 w-full resize-none rounded border-0 bg-transparent px-0 py-0 text-xs text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:ring-0"
      />
    </div>
  );
}
