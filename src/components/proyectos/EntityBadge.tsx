"use client";

import Link from "next/link";

interface EntityBadgeProps {
  nombre: string;
  href?: string;
  color?: string;
  onRemove?: () => void;
  onClick?: () => void;
}

export function EntityBadge({ nombre, href, color, onRemove, onClick }: EntityBadgeProps) {
  const borderColor = color || "var(--color-accent-light)";

  const pill = (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs border text-[var(--color-ink)]"
      style={{ borderColor }}
    >
      <span>{nombre}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-border-light)] transition-colors"
          aria-label={`Eliminar ${nombre}`}
        >
          &times;
        </button>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {pill}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="hover:opacity-80 transition-opacity">
        {pill}
      </button>
    );
  }

  return pill;
}
