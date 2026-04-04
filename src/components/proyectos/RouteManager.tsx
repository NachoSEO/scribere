"use client";

import { useCallback, useState } from "react";
import { useLugarRutas, usePersonajes } from "@/lib/proyectos/hooks";

const PRESET_COLORS = [
  "#8b6f47",
  "#bd5749",
  "#55699b",
  "#78a064",
  "#93709e",
  "#cc853d",
  "#589b9b",
  "#af556e",
];

interface RouteManagerProps {
  lugarId: string;
  projectId: string;
  editingRouteId: string | null;
  onEditRoute: (routeId: string | null) => void;
}

export function RouteManager({
  lugarId,
  projectId,
  editingRouteId,
  onEditRoute,
}: RouteManagerProps) {
  const { rutas, create, update, remove } = useLugarRutas(lugarId);
  const { personajes } = usePersonajes(projectId);

  const [showCreate, setShowCreate] = useState(false);
  const [selectedPersonajeId, setSelectedPersonajeId] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [routeName, setRouteName] = useState("");

  const handleCreate = useCallback(async () => {
    if (!selectedPersonajeId) return;
    const personaje = personajes.find((p) => p.id === selectedPersonajeId);
    const ruta = await create({
      personaje_id: selectedPersonajeId,
      nombre: routeName.trim() || personaje?.nombre || "Ruta",
      color: selectedColor,
      puntos: [],
    });
    setShowCreate(false);
    setSelectedPersonajeId("");
    setSelectedColor(PRESET_COLORS[0]);
    setRouteName("");
    onEditRoute(ruta.id);
  }, [selectedPersonajeId, selectedColor, routeName, personajes, create, onEditRoute]);

  const handleFinishEditing = useCallback(async () => {
    onEditRoute(null);
  }, [onEditRoute]);

  const handleRemoveLastPoint = useCallback(async () => {
    if (!editingRouteId) return;
    const ruta = rutas.find((r) => r.id === editingRouteId);
    if (!ruta || ruta.puntos.length === 0) return;
    await update(editingRouteId, { puntos: ruta.puntos.slice(0, -1) });
  }, [editingRouteId, rutas, update]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (editingRouteId === id) onEditRoute(null);
      await remove(id);
    },
    [editingRouteId, onEditRoute, remove]
  );

  const getPersonajeName = (personajeId: string) =>
    personajes.find((p) => p.id === personajeId)?.nombre ?? "?";

  const editingRuta = editingRouteId
    ? rutas.find((r) => r.id === editingRouteId)
    : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
          Rutas ({rutas.length})
        </p>
        {!showCreate && !editingRouteId && (
          <button
            onClick={() => setShowCreate(true)}
            className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
          >
            + Nueva ruta
          </button>
        )}
      </div>

      {/* Editing mode banner */}
      {editingRuta && (
        <div className="flex items-center gap-2 rounded-lg border border-[var(--color-accent-light)] bg-[var(--color-cream)] p-2">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: editingRuta.color }}
          />
          <span className="text-xs text-[var(--color-ink)] font-medium flex-1">
            Editando: {editingRuta.nombre}
          </span>
          <span className="text-xs text-[var(--color-ink-muted)]">
            {editingRuta.puntos.length} puntos
          </span>
          {editingRuta.puntos.length > 0 && (
            <button
              onClick={handleRemoveLastPoint}
              className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
            >
              Deshacer
            </button>
          )}
          <button
            onClick={handleFinishEditing}
            className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-medium transition-colors"
          >
            Finalizar
          </button>
        </div>
      )}

      {/* Create form */}
      {showCreate && (
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-3 space-y-3">
          {/* Personaje selector */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium block mb-1">
              Personaje
            </label>
            <select
              value={selectedPersonajeId}
              onChange={(e) => {
                setSelectedPersonajeId(e.target.value);
                if (!routeName.trim()) {
                  const p = personajes.find((p) => p.id === e.target.value);
                  if (p) setRouteName(p.nombre);
                }
              }}
              className="w-full rounded-md border border-[var(--color-border)] bg-white px-2 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
            >
              <option value="">Selecciona un personaje...</option>
              {personajes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre || "Sin nombre"}
                </option>
              ))}
            </select>
          </div>

          {/* Color picker */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium block mb-1">
              Color
            </label>
            <div className="flex gap-1.5">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="w-6 h-6 rounded-full transition-transform"
                  style={{
                    backgroundColor: color,
                    outline:
                      selectedColor === color
                        ? `2px solid ${color}`
                        : "2px solid transparent",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium block mb-1">
              Nombre (opcional)
            </label>
            <input
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Nombre de la ruta..."
              className="w-full rounded-md border border-[var(--color-border)] bg-white px-2 py-1.5 text-xs text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={!selectedPersonajeId}
              className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
            >
              Crear
            </button>
            <button
              onClick={() => {
                setShowCreate(false);
                setSelectedPersonajeId("");
                setSelectedColor(PRESET_COLORS[0]);
                setRouteName("");
              }}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream-dark)]"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Route list */}
      {rutas.length > 0 && !showCreate && (
        <div className="space-y-1.5">
          {rutas.map((ruta) => (
            <div
              key={ruta.id}
              className={`flex items-center gap-2 rounded-lg border p-2.5 transition-colors ${
                editingRouteId === ruta.id
                  ? "border-[var(--color-accent-light)] bg-[var(--color-cream)]"
                  : "border-[var(--color-border)] bg-white"
              }`}
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: ruta.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--color-ink)] truncate">
                  {ruta.nombre}
                </p>
                <p className="text-[10px] text-[var(--color-ink-muted)]">
                  {getPersonajeName(ruta.personaje_id)} &middot;{" "}
                  {ruta.puntos.length} puntos
                </p>
              </div>
              {editingRouteId !== ruta.id && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditRoute(ruta.id)}
                    className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(ruta.id)}
                    className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {rutas.length === 0 && !showCreate && (
        <p className="text-xs text-[var(--color-ink-muted)] italic">
          Sin rutas de personaje
        </p>
      )}
    </div>
  );
}
