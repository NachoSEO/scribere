"use client";

interface BookCoverProps {
  nombre: string;
  mundoNombre?: string;
  completeness: number;
  onClick: () => void;
}

export function BookCover({
  nombre,
  mundoNombre,
  completeness,
  onClick,
}: BookCoverProps) {
  const clampedCompleteness = Math.max(0, Math.min(100, completeness));

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col cursor-pointer aspect-[2/3] w-full rounded-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
      style={{
        backgroundColor: "var(--color-cream)",
        border: "3px solid var(--color-accent)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* Inner decorative border */}
      <div
        className="absolute inset-1.5 rounded-sm pointer-events-none"
        style={{
          border: "1px solid var(--color-accent)",
        }}
      />

      {/* Lomo effect - spine gradient on left edge */}
      <div
        className="absolute inset-0 pointer-events-none rounded-sm"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 4%, transparent 8%)",
        }}
      />

      {/* Content area */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-6">
        <h3
          className="text-center text-base font-semibold leading-tight line-clamp-3"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "var(--color-ink)",
          }}
        >
          {nombre}
        </h3>

        {mundoNombre && (
          <p
            className="mt-2 text-center text-xs leading-snug line-clamp-2"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "var(--color-ink-muted)",
            }}
          >
            {mundoNombre}
          </p>
        )}
      </div>

      {/* Progress bar at bottom */}
      <div
        className="relative w-full h-1.5 rounded-b-sm overflow-hidden"
        style={{
          backgroundColor: "var(--color-cream-dark)",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
          style={{
            width: `${clampedCompleteness}%`,
            backgroundColor: "var(--color-accent)",
          }}
        />
      </div>
    </button>
  );
}
