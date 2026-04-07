"use client";

import { use, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLugares, useLugarMapa } from "@/lib/proyectos/hooks";
import { LUGAR_TIPOS } from "@/types/proyectos";
import type { Lugar, LugarTipo, LugarPin } from "@/types/proyectos";
import { EmptyState } from "@/components/proyectos/EmptyState";
import CustomSelect from "@/components/ui/CustomSelect";
import { MapaPins } from "@/components/proyectos/MapaPins";
import type { LugarPreviewData } from "@/components/proyectos/MapaPins";

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

const TIPO_ICONS: Record<string, string> = {
  mundo: "🌍",
  continente: "🗺️",
  pais: "🏳️",
  region: "⛰️",
  ciudad: "🏙️",
  pueblo: "🏘️",
  edificio: "🏛️",
  otro: "📍",
};

function WorldMap({
  mundo,
  lugares,
  projectId,
}: {
  mundo: Lugar;
  lugares: Lugar[];
  projectId: string;
}) {
  const router = useRouter();
  const { uploadMapa, removeMapa, savePins } = useLugarMapa(mundo.id);
  const [uploading, setUploading] = useState(false);

  // All descendants (not just direct children) for pin selection
  const allDescendants = useMemo(() => {
    const result: Lugar[] = [];
    const stack = [mundo.id];
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
  }, [lugares, mundo.id]);

  const lugarPreviews: LugarPreviewData[] = useMemo(
    () =>
      allDescendants.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        descripcion: c.descripcion,
        tipo: c.tipo,
        mapa_url: c.mapa_url,
      })),
    [allDescendants]
  );

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        await uploadMapa(file);
      } finally {
        setUploading(false);
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
    (lugarId: string) => {
      router.push(`/app/proyectos/${projectId}/lugares/${lugarId}`);
    },
    [projectId, router]
  );

  return (
    <div className="mb-6">
      <MapaPins
        mapaUrl={mundo.mapa_url}
        pins={mundo.mapa_pins ?? []}
        lugares={allDescendants.map((c) => ({ id: c.id, nombre: c.nombre }))}
        lugarPreviews={lugarPreviews}
        onPinsChange={handlePinsChange}
        onPinClick={handlePinClick}
        onUpload={handleUpload}
        onRemoveMap={removeMapa}
        uploading={uploading}
      />
    </div>
  );
}

export default function LugaresPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { lugares, create } = useLugares(projectId);

  const [creating, setCreating] = useState(false);
  const [nombre, setNombre] = useState("");
  const [filterTipo, setFilterTipo] = useState<LugarTipo | "todos">("todos");
  const [viewParentId, setViewParentId] = useState<string | null>(null);

  // Build breadcrumb path
  const breadcrumb = useMemo(() => {
    const path: Lugar[] = [];
    let currentId = viewParentId;
    while (currentId) {
      const lugar = lugares.find((l) => l.id === currentId);
      if (!lugar) break;
      path.unshift(lugar);
      currentId = lugar.lugar_padre_id;
    }
    return path;
  }, [viewParentId, lugares]);

  // Filter lugares by current parent and type filter
  const filteredLugares = useMemo(() => {
    let filtered = lugares.filter((l) =>
      viewParentId
        ? l.lugar_padre_id === viewParentId
        : !l.lugar_padre_id
    );
    if (filterTipo !== "todos") {
      filtered = filtered.filter((l) => l.tipo === filterTipo);
    }
    return filtered;
  }, [lugares, viewParentId, filterTipo]);

  // Count children for each lugar
  const childrenCount = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const l of lugares) {
      if (l.lugar_padre_id) {
        counts[l.lugar_padre_id] = (counts[l.lugar_padre_id] || 0) + 1;
      }
    }
    return counts;
  }, [lugares]);

  const handleCreate = useCallback(async () => {
    if (!nombre.trim()) return;
    const entity = await create({
      nombre: nombre.trim(),
      lugar_padre_id: viewParentId,
    });
    setCreating(false);
    setNombre("");
    router.push(`/app/proyectos/${projectId}/lugares/${entity.id}`);
  }, [nombre, create, viewParentId, projectId, router]);

  // Find the main map lugar (es_mapa_principal flag, fallback to root "mundo" type)
  const mundoLugar = useMemo(
    () => lugares.find((l) => l.es_mapa_principal && l.mapa_url) ?? lugares.find((l) => l.tipo === "mundo" && !l.lugar_padre_id && l.mapa_url) ?? null,
    [lugares]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") {
      setCreating(false);
      setNombre("");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">Lugares</h1>
        <button
          onClick={() => setCreating(true)}
          className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
        >
          +
        </button>
      </div>

      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <nav className="mt-3 flex items-center gap-1 text-xs text-[var(--color-ink-muted)]">
          <button
            onClick={() => setViewParentId(null)}
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            Raíz
          </button>
          {breadcrumb.map((lugar) => (
            <span key={lugar.id} className="flex items-center gap-1">
              <span>/</span>
              <button
                onClick={() => setViewParentId(lugar.id)}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                {lugar.nombre || "Sin nombre"}
              </button>
            </span>
          ))}
        </nav>
      )}

      {/* Filters */}
      {lugares.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <CustomSelect
            value={filterTipo}
            onChange={(v) => setFilterTipo(v as LugarTipo | "todos")}
            options={[
              { value: "todos", label: "Todos los tipos" },
              ...LUGAR_TIPOS.map((t) => ({ value: t.value, label: t.label })),
            ]}
            placeholder="Todos los tipos"
            className="text-xs"
          />
        </div>
      )}

      {/* Create inline */}
      {creating && (
        <div className="mt-4 flex gap-2">
          <input
            autoFocus
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nombre del lugar"
            className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          <button
            onClick={handleCreate}
            disabled={!nombre.trim()}
            className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
          >
            Crear
          </button>
          <button
            onClick={() => {
              setCreating(false);
              setNombre("");
            }}
            className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream-dark)]"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* World map (shown at root level when a "mundo" lugar exists) */}
      {!viewParentId && mundoLugar && (
        <div className="mt-4">
          <WorldMap
            mundo={mundoLugar}
            lugares={lugares}
            projectId={projectId}
          />
        </div>
      )}

      {/* Card grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredLugares.length === 0 && !creating && (
          <div className="col-span-full">
            <EmptyState
              message={
                viewParentId
                  ? "No hay sublugares todavía"
                  : "No hay lugares todavía"
              }
              action="Crear lugar"
              onAction={() => setCreating(true)}
            />
          </div>
        )}
        {filteredLugares.map((lugar) => {
          const tipo = lugar.tipo || "otro";
          const count = childrenCount[lugar.id] || 0;

          return (
            <button
              key={lugar.id}
              onClick={() => router.push(`/app/proyectos/${projectId}/lugares/${lugar.id}`)}
              className="group relative rounded-lg border border-[var(--color-border)] bg-white text-left transition-all hover:border-[var(--color-accent-light)] hover:shadow-sm overflow-hidden"
            >
              {/* Map thumbnail */}
              {lugar.mapa_url && (
                <div className="h-28 w-full overflow-hidden bg-[var(--color-cream)]">
                  <img
                    src={lugar.mapa_url}
                    alt=""
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              )}

              <div className="p-4">
                {/* Type badge */}
                <div className="flex items-center justify-between mb-2">
                  {lugar.tipo ? (
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: TIPO_COLORS[tipo] }}
                    >
                      <span>{TIPO_ICONS[tipo]}</span>
                      <span>{LUGAR_TIPOS.find((t) => t.value === lugar.tipo)?.label ?? tipo}</span>
                    </span>
                  ) : (
                    <span />
                  )}
                  {count > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewParentId(lugar.id);
                      }}
                      className="text-[10px] text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors"
                      title="Ver sublugares"
                    >
                      {count} {count === 1 ? "sublugar" : "sublugares"} &rarr;
                    </button>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-sm font-medium text-[var(--color-ink)]">
                  {lugar.nombre || (
                    <span className="italic text-[var(--color-ink-muted)]">Sin nombre</span>
                  )}
                </h3>

                {/* Description */}
                {lugar.descripcion && (
                  <p className="mt-1 text-xs text-[var(--color-ink-muted)] line-clamp-2">
                    {lugar.descripcion}
                  </p>
                )}

                {/* Pin count */}
                {lugar.mapa_pins && lugar.mapa_pins.length > 0 && (
                  <p className="mt-2 text-[10px] text-[var(--color-ink-muted)]">
                    📌 {lugar.mapa_pins.length} {lugar.mapa_pins.length === 1 ? "pin" : "pines"}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
