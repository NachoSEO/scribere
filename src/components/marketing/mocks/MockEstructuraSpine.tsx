export function MockEstructuraSpine() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-sm">
      {/* Filter bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5">
        <div className="flex items-center gap-1">
          {["Todo", "Hitos", "Arcos", "Escenas"].map((mode, i) => (
            <button
              key={mode}
              className={`rounded-md px-2.5 py-1 text-[10px] font-medium ${
                i === 0
                  ? "bg-[var(--color-ink)] text-white"
                  : "text-[var(--color-ink-muted)] hover:bg-[var(--color-cream)]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-2.5 py-1">
          <div className="h-4 w-4 rounded-full bg-[#8b6f47] text-center text-[8px] font-bold leading-4 text-white">
            L
          </div>
          <span className="text-[10px] text-[var(--color-ink)]">POV: Lyra</span>
          <span className="text-[10px] text-[var(--color-ink-muted)]">&#9662;</span>
        </div>
      </div>

      {/* Spine tree */}
      <div className="p-4 space-y-1">
        {/* Act I */}
        <div className="mb-3">
          <div className="mb-2 flex items-center gap-2 rounded-md bg-[var(--color-cream)] px-3 py-2">
            <span className="text-[10px] text-[var(--color-ink-muted)]">&#9660;</span>
            <span className="text-xs font-semibold text-[var(--color-ink)]">Acto I - El Despertar</span>
          </div>

          <div className="ml-4 space-y-1">
            {/* Hito: normalidad */}
            <div className="flex items-center gap-2 rounded-md px-3 py-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-stone-400" />
              <span className="text-xs text-[var(--color-ink)]">La vida en los talleres</span>
              <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-[9px] text-stone-500">normalidad</span>
            </div>

            {/* Escena under hito */}
            <div className="ml-6 flex items-center gap-2 rounded-md bg-[var(--color-cream)]/50 px-3 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink-muted)]" />
              <span className="text-[11px] text-[var(--color-ink-muted)]">Amanecer en los talleres</span>
            </div>

            {/* Arc connector */}
            <div className="ml-6 flex items-center gap-2 rounded-md border border-dashed border-amber-300 bg-amber-50/50 px-3 py-1">
              <div className="h-1.5 w-4 rounded-full bg-amber-400" />
              <span className="text-[11px] text-amber-700">El cristal muerto</span>
              <span className="ml-auto rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-medium text-amber-600">
                Si, pero...
              </span>
            </div>

            {/* Hito: incidente incitador */}
            <div className="flex items-center gap-2 rounded-md bg-rose-50/50 px-3 py-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="text-xs font-medium text-[var(--color-ink)]">Despertar del don</span>
              <span className="ml-auto rounded-full bg-rose-100 px-2 py-0.5 text-[9px] text-rose-600">incidente incitador</span>
            </div>

            {/* Escenas */}
            <div className="ml-6 flex items-center gap-2 rounded-md bg-[var(--color-cream)]/50 px-3 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink-muted)]" />
              <span className="text-[11px] text-[var(--color-ink-muted)]">El cristal responde</span>
            </div>
          </div>
        </div>

        {/* Act II collapsed */}
        <div className="flex items-center gap-2 rounded-md bg-[var(--color-cream)] px-3 py-2">
          <span className="text-[10px] text-[var(--color-ink-muted)]">&#9654;</span>
          <span className="text-xs font-semibold text-[var(--color-ink)]">Acto II - El Viaje</span>
          <span className="ml-auto text-[10px] text-[var(--color-ink-muted)]">4 hitos, 3 arcos</span>
        </div>

        {/* Act III collapsed */}
        <div className="flex items-center gap-2 rounded-md bg-[var(--color-cream)] px-3 py-2">
          <span className="text-[10px] text-[var(--color-ink-muted)]">&#9654;</span>
          <span className="text-xs font-semibold text-[var(--color-ink)]">Acto III - La Resonancia Final</span>
          <span className="ml-auto text-[10px] text-[var(--color-ink-muted)]">3 hitos, 2 arcos</span>
        </div>
      </div>
    </div>
  );
}
