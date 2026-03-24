"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TipoSelector } from "./TipoSelector";

const RELATION_TYPES = ["aliado", "enemigo", "familia", "mentor", "rival", "romántico"];

const borderColorByTipo: Record<string, string> = {
  aliado: "border-l-green-500",
  enemigo: "border-l-red-500",
  familia: "border-l-purple-500",
  mentor: "border-l-blue-500",
  rival: "border-l-orange-500",
  romántico: "border-l-pink-500",
};

interface CharacterRelationCardProps {
  nombre: string;
  imagenUrl?: string;
  tipo: string;
  descripcion: string;
  onTipoChange: (tipo: string) => void;
  onDescripcionChange: (descripcion: string) => void;
  onDelete: () => void;
}

export function CharacterRelationCard({
  nombre,
  imagenUrl,
  tipo,
  descripcion,
  onTipoChange,
  onDescripcionChange,
  onDelete,
}: CharacterRelationCardProps) {
  const [localDescripcion, setLocalDescripcion] = useState(descripcion);
  const isTyping = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isTyping.current) {
      setLocalDescripcion(descripcion);
    }
  }, [descripcion]);

  const autoGrow = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const lineHeight = 20;
    const minHeight = lineHeight;
    const maxHeight = lineHeight * 2 + 8;
    el.style.height = `${Math.min(Math.max(el.scrollHeight, minHeight), maxHeight)}px`;
  }, []);

  useEffect(() => {
    autoGrow();
  }, [localDescripcion, autoGrow]);

  const handleDescripcionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      isTyping.current = true;
      const newValue = e.target.value;
      setLocalDescripcion(newValue);
      onDescripcionChange(newValue);
      setTimeout(() => { isTyping.current = false; }, 1000);
    },
    [onDescripcionChange]
  );

  const initials = nombre.slice(0, 2).toUpperCase();
  const borderClass = borderColorByTipo[tipo] || "border-l-gray-400";

  return (
    <div className={`relative rounded-lg border border-[var(--color-border)] bg-white p-3 border-l-4 ${borderClass}`}>
      {/* Delete button */}
      <button
        onClick={onDelete}
        className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-xs text-[var(--color-ink-muted)] hover:bg-[var(--color-cream-dark)] hover:text-red-600 transition-colors"
        aria-label="Eliminar relación"
      >
        &times;
      </button>

      {/* Top row: avatar + name + tipo */}
      <div className="flex items-center gap-2.5 pr-5">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-dark)] overflow-hidden">
          {imagenUrl ? (
            <img
              src={imagenUrl}
              alt={nombre}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xs font-semibold text-[var(--color-ink-light)]">
              {initials}
            </span>
          )}
        </div>

        {/* Name */}
        <span className="text-sm font-semibold text-[var(--color-ink)] truncate">
          {nombre}
        </span>

        {/* Tipo selector */}
        <div className="ml-auto">
          <TipoSelector
            value={tipo}
            onChange={onTipoChange}
            options={RELATION_TYPES}
          />
        </div>
      </div>

      {/* Descripcion textarea */}
      <textarea
        ref={textareaRef}
        value={localDescripcion}
        onChange={handleDescripcionChange}
        placeholder="Describe la relación..."
        rows={1}
        className="mt-2 w-full resize-none border-none bg-transparent text-xs text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none leading-5 p-0"
      />
    </div>
  );
}
