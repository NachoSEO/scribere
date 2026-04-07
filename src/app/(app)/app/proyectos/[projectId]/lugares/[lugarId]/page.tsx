"use client";

import { use, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLugar, useLugares, useLugarMapa, useLugarRutas, useEscenas } from "@/lib/proyectos/hooks";
import { useProyectosStore } from "@/lib/proyectos/store";
import { updateLugar as updateLugarQuery } from "@/lib/proyectos/queries";
import { createClient } from "@/lib/supabase/client";
import CustomSelect from "@/components/ui/CustomSelect";
import { EntityForm, type FieldConfig } from "@/components/proyectos/EntityForm";
import { DeleteConfirm } from "@/components/proyectos/DeleteConfirm";
import { MapaPins } from "@/components/proyectos/MapaPins";
import { RouteManager } from "@/components/proyectos/RouteManager";
import { LUGAR_TIPOS } from "@/types/proyectos";
import type { LugarTipo, LugarPin } from "@/types/proyectos";

const fields: FieldConfig[] = [
  {
    key: "descripcion",
    label: "Descripcion",
    multiline: true,
    rows: 4,
    placeholder: "Descripcion de este lugar...",
  },
];

const TIPO_COLORS: Record<string, string> = {
  mundo: "#dbeafe",
  continente: "#d1fae5",
  pais: "#fef3c7",
  region: "#ede9fe",
  ciudad: "#ffedd5",
  pueblo: "#fce7f3",
  edificio: "#f3f4f6",
  otro: "#f3f4f6",
};

export default function LugarDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; lugarId: string }>;
}) {
  const { projectId, lugarId } = use(params);
  const router = useRouter();
  const { lugar, save } = useLugar(lugarId);
  const { lugares, remove, create: createLugar } = useLugares(projectId);
  const { uploadMapa, removeMapa, savePins } = useLugarMapa(lugarId);
  const { escenas } = useEscenas(projectId);
  const { rutas, update: updateRuta } = useLugarRutas(lugarId);
  const [showDelete, setShowDelete] = useState(false);
  const [uploadingMapa, setUploadingMapa] = useState(false);
  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);

  // Escenas set in this lugar
  const escenasDelLugar = useMemo(
    () => escenas.filter((e) => e.lugar_id === lugarId),
    [escenas, lugarId]
  );

  // Children of this lugar
  const children = useMemo(
    () => lugares.filter((l) => l.lugar_padre_id === lugarId),
    [lugares, lugarId]
  );

  // All descendants (for map pins)
  const allDescendants = useMemo(() => {
    const result: typeof lugares = [];
    const stack = [lugarId];
    while (stack.length > 0) {
      const parentId = stack.pop()!;
      for (const l of lugares) {
        if (l.lugar_padre_id === parentId) {
          result.push(l);
          stack.push(l.id);
        }
      }
    }
    return result;
  }, [lugares, lugarId]);

  // Available parents (all except self and own descendants)
  const getDescendantIds = useCallback(
    (parentId: string): Set<string> => {
      const ids = new Set<string>();
      const stack = [parentId];
      while (stack.length > 0) {
        const current = stack.pop()!;
        for (const l of lugares) {
          if (l.lugar_padre_id === current && !ids.has(l.id)) {
            ids.add(l.id);
            stack.push(l.id);
          }
        }
      }
      return ids;
    },
    [lugares]
  );

  const availableParents = useMemo(() => {
    const descendantIds = getDescendantIds(lugarId);
    return lugares.filter(
      (l) => l.id !== lugarId && !descendantIds.has(l.id)
    );
  }, [lugares, lugarId, getDescendantIds]);

  // Parent lugar
  const parent = useMemo(
    () => (lugar?.lugar_padre_id ? lugares.find((l) => l.id === lugar.lugar_padre_id) : null),
    [lugar?.lugar_padre_id, lugares]
  );

  // Breadcrumb
  const breadcrumb = useMemo(() => {
    const path: { id: string; nombre: string }[] = [];
    let currentId = lugar?.lugar_padre_id ?? null;
    while (currentId) {
      const l = lugares.find((x) => x.id === currentId);
      if (!l) break;
      path.unshift({ id: l.id, nombre: l.nombre });
      currentId = l.lugar_padre_id;
    }
    return path;
  }, [lugar?.lugar_padre_id, lugares]);

  const values = useMemo((): Record<string, string> => {
    if (!lugar) return {};
    return { nombre: lugar.nombre, descripcion: lugar.descripcion };
  }, [lugar]);

  const handleChange = useCallback(
    (key: string, value: string) => {
      save({ [key]: value });
    },
    [save]
  );

  const handleDelete = useCallback(async () => {
    await remove(lugarId);
    router.push(`/app/proyectos/${projectId}/lugares`);
  }, [remove, lugarId, projectId, router]);

  const handleUploadMapa = useCallback(
    async (file: File) => {
      setUploadingMapa(true);
      try {
        await uploadMapa(file);
      } finally {
        setUploadingMapa(false);
      }
    },
    [uploadMapa]
  );

  const handlePinsChange = useCallback(
    (pins: LugarPin[]) => {
      savePins(pins);
    },
    [savePins]
  );

  const handlePinClick = useCallback(
    (pinLugarId: string) => {
      router.push(`/app/proyectos/${projectId}/lugares/${pinLugarId}`);
    },
    [projectId, router]
  );

  const updateLugarInList = useProyectosStore((s) => s.updateLugarInList);

  const handleToggleMapaPrincipal = useCallback(async () => {
    const sb = createClient();
    // Desactivar otros mapas principales del proyecto
    if (!lugar?.es_mapa_principal) {
      for (const l of lugares) {
        if (l.es_mapa_principal && l.id !== lugarId) {
          const updated = await updateLugarQuery(sb, l.id, { es_mapa_principal: false });
          updateLugarInList(updated);
        }
      }
    }
    save({ es_mapa_principal: !lugar?.es_mapa_principal });
  }, [lugar?.es_mapa_principal, lugares, lugarId, save, updateLugarInList]);

  const handleRouteMapClick = useCallback(
    async (x: number, y: number) => {
      if (!editingRouteId) return;
      const ruta = rutas.find((r) => r.id === editingRouteId);
      if (!ruta) return;
      // Check if this point snapped to a pin (exact coordinate match)
      const snappedPin = (lugar?.mapa_pins ?? []).find((p) => p.x === x && p.y === y);
      await updateRuta(editingRouteId, {
        puntos: [...ruta.puntos, { x, y, lugar_id: snappedPin?.lugar_id }],
      });
    },
    [editingRouteId, rutas, updateRuta, lugar?.mapa_pins]
  );

  const handleCreateSublugar = useCallback(async () => {
    const newLugar = await createLugar({ nombre: "Nuevo sublugar", lugar_padre_id: lugarId });
    router.push(`/app/proyectos/${projectId}/lugares/${newLugar.id}`);
  }, [createLugar, lugarId, projectId, router]);

  if (!lugar)
    return (
      <div className="p-6 text-sm text-[var(--color-ink-muted)]">
        Cargando...
      </div>
    );

  return (
    <div className="p-6 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)] mb-4">
        <Link
          href={`/app/proyectos/${projectId}/lugares`}
          className="hover:text-[var(--color-accent)] transition-colors"
        >
          Lugares
        </Link>
        {breadcrumb.map((item) => (
          <span key={item.id} className="flex items-center gap-1">
            <span>/</span>
            <Link
              href={`/app/proyectos/${projectId}/lugares/${item.id}`}
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              {item.nombre || "Sin nombre"}
            </Link>
          </span>
        ))}
        <span>/</span>
        <span className="text-[var(--color-ink)]">{lugar.nombre || "Sin nombre"}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">
          {lugar.nombre || "Lugar sin nombre"}
        </h1>
        <button
          onClick={() => setShowDelete(true)}
          className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
        Los cambios se guardan automaticamente
      </p>

      {/* Type selector */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1.5">
            Tipo de lugar
          </p>
          <div className="flex flex-wrap gap-1.5">
            {LUGAR_TIPOS.map((t) => {
              const isSelected = lugar.tipo === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() =>
                    save({ tipo: isSelected ? ("" as LugarTipo) : t.value })
                  }
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all border ${
                    isSelected
                      ? "border-[var(--color-accent)] text-[var(--color-ink)] shadow-sm"
                      : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-accent-light)]"
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: TIPO_COLORS[t.value] }
                      : undefined
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Parent selector */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1.5">
            Lugar padre
          </p>
          <div className="flex items-center gap-2">
            <CustomSelect
              value={lugar.lugar_padre_id ?? ""}
              onChange={(v) => save({ lugar_padre_id: v || null })}
              options={availableParents.map((l) => ({
                value: l.id,
                label: `${l.tipo ? `[${LUGAR_TIPOS.find((t) => t.value === l.tipo)?.label}] ` : ""}${l.nombre || "Sin nombre"}`,
              }))}
              placeholder="Sin padre (raiz)"
              className="flex-1"
            />
            {parent && (
              <Link
                href={`/app/proyectos/${projectId}/lugares/${parent.id}`}
                className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] whitespace-nowrap"
              >
                Ir &rarr;
              </Link>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
            Nombre
          </label>
          <input
            type="text"
            value={values.nombre ?? ""}
            onChange={(e) => handleChange("nombre", e.target.value)}
            placeholder="Nombre del lugar"
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          />
        </div>

        {/* Description */}
        <EntityForm fields={fields} values={values} onChange={handleChange} projectId={projectId} />

        {/* Map */}
        <MapaPins
          mapaUrl={lugar.mapa_url}
          pins={lugar.mapa_pins ?? []}
          lugares={allDescendants.map((c) => ({ id: c.id, nombre: c.nombre }))}
          lugarPreviews={allDescendants.map((c) => ({ id: c.id, nombre: c.nombre, descripcion: c.descripcion, tipo: c.tipo }))}
          onPinsChange={handlePinsChange}
          onPinClick={handlePinClick}
          onUpload={handleUploadMapa}
          onRemoveMap={removeMapa}
          uploading={uploadingMapa}
          rutas={rutas}
          onMapClick={handleRouteMapClick}
          isPlacingRoutePoint={!!editingRouteId}
        />

        {/* Mapa principal toggle */}
        {lugar.mapa_url && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMapaPrincipal}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all border ${
                lugar.es_mapa_principal
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-accent-light)]"
              }`}
            >
              {lugar.es_mapa_principal ? "★ Mapa principal" : "Marcar como mapa principal"}
            </button>
          </div>
        )}

        {/* Routes */}
        {lugar.mapa_url && (
          <RouteManager
            lugarId={lugarId}
            projectId={projectId}
            editingRouteId={editingRouteId}
            onEditRoute={setEditingRouteId}
          />
        )}

        {/* Children */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
              Sublugares ({children.length})
            </p>
            <button
              onClick={handleCreateSublugar}
              className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
            >
              + Crear sublugar
            </button>
          </div>
          {children.length > 0 ? (
            <div className="space-y-1.5">
              {children.map((child) => (
                <Link
                  key={child.id}
                  href={`/app/proyectos/${projectId}/lugares/${child.id}`}
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white p-3 text-left transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
                >
                  {child.tipo && (
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: TIPO_COLORS[child.tipo] ?? "#f3f4f6",
                      }}
                    >
                      {LUGAR_TIPOS.find((t) => t.value === child.tipo)?.label ??
                        child.tipo}
                    </span>
                  )}
                  <span className="text-sm text-[var(--color-ink)]">
                    {child.nombre || (
                      <span className="italic text-[var(--color-ink-muted)]">
                        Sin nombre
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--color-ink-muted)] italic">Sin sublugares</p>
          )}
        </div>

        {/* Escenas */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-2">
            Escenas ({escenasDelLugar.length})
          </p>
          {escenasDelLugar.length === 0 ? (
            <p className="text-xs text-[var(--color-ink-muted)] italic">Ninguna escena transcurre en este lugar</p>
          ) : (
            <div className="space-y-1.5">
              {escenasDelLugar.map((esc) => (
                <Link
                  key={esc.id}
                  href={`/app/proyectos/${projectId}/escenas/${esc.id}`}
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white p-3 text-left transition-colors hover:border-[var(--color-accent-light)] hover:bg-[var(--color-cream)]"
                >
                  <span className="text-sm text-[var(--color-ink)]">
                    {esc.resumen || <span className="italic text-[var(--color-ink-muted)]">Sin resumen</span>}
                  </span>
                  {esc.objetivo && (
                    <span className="ml-auto text-xs text-[var(--color-ink-muted)] line-clamp-1 max-w-[200px]">
                      {esc.objetivo}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {showDelete && (
        <DeleteConfirm
          entityName="lugar"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
