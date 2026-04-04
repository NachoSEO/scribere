"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import tippy from "tippy.js";
import type { Instance as TippyInstance } from "tippy.js";
import type { LugarPin, LugarRuta } from "@/types/proyectos";

export interface LugarPreviewData {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo?: string;
  mapa_url?: string;
}

interface MapaPinsProps {
  mapaUrl: string;
  pins: LugarPin[];
  lugares: { id: string; nombre: string }[];
  /** Richer data for hover preview cards. Falls back to simple tooltip if not provided. */
  lugarPreviews?: LugarPreviewData[];
  onPinsChange: (pins: LugarPin[]) => void;
  onPinClick?: (lugarId: string) => void;
  onUpload: (file: File) => Promise<void>;
  onRemoveMap: () => void;
  uploading?: boolean;
  /** Routes to render as polylines on the map */
  rutas?: LugarRuta[];
  /** External click handler (used by RouteManager for placing route points) */
  onMapClick?: (x: number, y: number) => void;
  /** When true, the cursor shows crosshair for route point placement */
  isPlacingRoutePoint?: boolean;
}

const TIPO_LABELS: Record<string, string> = {
  mundo: "Mundo",
  continente: "Continente",
  pais: "País",
  region: "Región",
  ciudad: "Ciudad",
  pueblo: "Pueblo",
  edificio: "Edificio",
  otro: "Otro",
};

function buildPreviewHTML(data: LugarPreviewData): string {
  const tipoLabel = data.tipo ? TIPO_LABELS[data.tipo] || data.tipo : null;
  return `<div class="mention-preview-card" style="border-top: 3px solid #589b9b;">
    <div style="padding: 8px 12px 4px;">
      <span style="font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #589b9b;">Lugar</span>
    </div>
    <div style="padding: 0 12px 12px;">
      <div>
        <p style="font-size: 0.875rem; font-weight: 600; color: var(--color-ink); margin: 0;">${data.nombre}</p>
        ${tipoLabel ? `<span style="font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: #589b9b;">${tipoLabel}</span>` : ""}
      </div>
      ${data.descripcion ? `<p style="font-size: 0.75rem; color: var(--color-ink-light); margin: 6px 0 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">${data.descripcion}</p>` : ""}
    </div>
  </div>`;
}

export function MapaPins({
  mapaUrl,
  pins,
  lugares,
  lugarPreviews,
  onPinsChange,
  onPinClick,
  onUpload,
  onRemoveMap,
  uploading,
  rutas,
  onMapClick,
  isPlacingRoutePoint,
}: MapaPinsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pinRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const tippyInstances = useRef<Map<string, TippyInstance>>(new Map());
  const [placingPin, setPlacingPin] = useState(false);
  const [selectedLugarId, setSelectedLugarId] = useState<string>("");
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Create/update tippy instances for preview cards
  useEffect(() => {
    if (!lugarPreviews) return;

    const previewMap = new Map(lugarPreviews.map((l) => [l.id, l]));

    // Create tippy for each pin that has preview data
    for (const pin of pins) {
      const el = pinRefs.current.get(pin.lugar_id);
      const preview = previewMap.get(pin.lugar_id);
      if (!el || !preview) continue;

      // Destroy existing instance if any
      tippyInstances.current.get(pin.lugar_id)?.destroy();

      const instance = tippy(el, {
        content: buildPreviewHTML(preview),
        allowHTML: true,
        interactive: true,
        placement: "top",
        appendTo: document.body,
        theme: "mention-preview",
        maxWidth: 320,
        delay: [150, 100],
        animation: "fade",
      });

      tippyInstances.current.set(pin.lugar_id, Array.isArray(instance) ? instance[0] : instance);
    }

    // Cleanup instances for removed pins
    for (const [id, inst] of tippyInstances.current) {
      if (!pins.some((p) => p.lugar_id === id)) {
        inst.destroy();
        tippyInstances.current.delete(id);
      }
    }

    return () => {
      for (const inst of tippyInstances.current.values()) inst.destroy();
      tippyInstances.current.clear();
    };
  }, [pins, lugarPreviews]);

  const availableLugares = lugares.filter(
    (l) => !pins.some((p) => p.lugar_id === l.id)
  );

  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = Math.round(((e.clientX - rect.left) / rect.width) * 10000) / 100;
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 10000) / 100;

      // Route point placement takes priority
      if (onMapClick && isPlacingRoutePoint) {
        onMapClick(x, y);
        return;
      }

      if (!placingPin || !selectedLugarId) return;

      const newPin: LugarPin = {
        x,
        y,
        lugar_id: selectedLugarId,
      };

      onPinsChange([...pins, newPin]);
      setPlacingPin(false);
      setSelectedLugarId("");
    },
    [placingPin, selectedLugarId, pins, onPinsChange, onMapClick, isPlacingRoutePoint]
  );

  const removePin = useCallback(
    (lugarId: string) => {
      onPinsChange(pins.filter((p) => p.lugar_id !== lugarId));
    },
    [pins, onPinsChange]
  );

  const getLugarNombre = (lugarId: string) =>
    lugares.find((l) => l.id === lugarId)?.nombre ?? "?";

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onUpload(file);
      e.target.value = "";
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) onUpload(file);
    },
    [onUpload]
  );

  if (!mapaUrl) {
    return (
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
          Mapa
        </p>
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors ${
            dragOver
              ? "border-[var(--color-accent)] bg-[var(--color-accent-light)]/10"
              : "border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-cream)]"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          {uploading ? (
            <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-[var(--color-ink-muted)]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>
              <span className="text-sm text-[var(--color-ink-muted)]">
                Arrastra o haz clic para subir un mapa
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
          Mapa
        </p>
        <div className="flex items-center gap-2">
          {!placingPin && availableLugares.length > 0 && (
            <button
              onClick={() => setPlacingPin(true)}
              className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
            >
              + Pin
            </button>
          )}
          <button
            onClick={() => inputRef.current?.click()}
            className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            Cambiar
          </button>
          <button
            onClick={onRemoveMap}
            className="text-xs text-[var(--color-ink-muted)] hover:text-red-600 transition-colors"
          >
            Quitar
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </div>

      {placingPin && (
        <div className="flex items-center gap-2 rounded-lg border border-[var(--color-accent-light)] bg-[var(--color-cream)] p-2">
          <select
            value={selectedLugarId}
            onChange={(e) => setSelectedLugarId(e.target.value)}
            className="flex-1 rounded-md border border-[var(--color-border)] bg-white px-2 py-1 text-xs text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
          >
            <option value="">Selecciona un lugar...</option>
            {availableLugares.map((l) => (
              <option key={l.id} value={l.id}>
                {l.nombre || "Sin nombre"}
              </option>
            ))}
          </select>
          <span className="text-xs text-[var(--color-ink-muted)]">
            {selectedLugarId ? "Haz clic en el mapa" : ""}
          </span>
          <button
            onClick={() => { setPlacingPin(false); setSelectedLugarId(""); }}
            className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
          >
            Cancelar
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        onClick={handleMapClick}
        className={`relative rounded-lg overflow-hidden border border-[var(--color-border)] ${
          (placingPin && selectedLugarId) || isPlacingRoutePoint ? "cursor-crosshair" : ""
        }`}
      >
        <img
          src={mapaUrl}
          alt="Mapa del lugar"
          className="w-full h-auto block"
          draggable={false}
        />

        {/* Route polylines */}
        {rutas && rutas.length > 0 && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {rutas.map((ruta) => {
              if (ruta.puntos.length < 2) return null;
              const points = ruta.puntos
                .map((p) => `${p.x},${p.y}`)
                .join(" ");
              return (
                <polyline
                  key={ruta.id}
                  points={points}
                  fill="none"
                  stroke={ruta.color}
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.8}
                />
              );
            })}
          </svg>
        )}

        {/* Route point dots */}
        {rutas?.map((ruta) =>
          ruta.puntos.map((punto, idx) => (
            <div
              key={`${ruta.id}-${idx}`}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                left: `${punto.x}%`,
                top: `${punto.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-white border border-white/50"
                style={{
                  backgroundColor: ruta.color,
                  fontSize: "7px",
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {idx + 1}
              </div>
            </div>
          ))
        )}

        {pins.map((pin) => (
          <div
            key={pin.lugar_id}
            ref={(el) => {
              if (el) pinRefs.current.set(pin.lugar_id, el);
              else pinRefs.current.delete(pin.lugar_id);
            }}
            className="absolute group"
            style={{
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: "translate(-50%, -100%)",
            }}
            onMouseEnter={() => setHoveredPin(pin.lugar_id)}
            onMouseLeave={() => setHoveredPin(null)}
          >
            {/* Pin marker */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onPinClick) onPinClick(pin.lugar_id);
              }}
              className="relative flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="var(--color-accent)"
                className="w-7 h-7 drop-shadow-md hover:scale-110 transition-transform"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 3.573 2.924l.254.1Zm.46-13.851a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Simple tooltip (only when no rich preview data) */}
            {!lugarPreviews && hoveredPin === pin.lugar_id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap z-10">
                <div className="bg-[var(--color-ink)] text-white text-xs rounded px-2 py-1 shadow-lg flex items-center gap-1.5">
                  <span>{getLugarNombre(pin.lugar_id)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePin(pin.lugar_id);
                    }}
                    className="text-white/60 hover:text-white ml-1"
                    title="Quitar pin"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pin list */}
      {pins.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {pins.map((pin) => (
            <span
              key={pin.lugar_id}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--color-accent-light)] px-2 py-0.5 text-xs text-[var(--color-ink)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="var(--color-accent)" className="w-3 h-3">
                <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
              </svg>
              <button
                onClick={() => onPinClick?.(pin.lugar_id)}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                {getLugarNombre(pin.lugar_id)}
              </button>
              <button
                onClick={() => removePin(pin.lugar_id)}
                className="text-[var(--color-ink-muted)] hover:text-red-600 ml-0.5"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
