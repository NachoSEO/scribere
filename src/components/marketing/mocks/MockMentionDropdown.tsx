export function MockMentionDropdown() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <div style={{ fontFamily: "Georgia, serif" }}>
        <p className="text-sm leading-[1.9] text-[var(--color-ink)]">
          Cuando llegaron a la plaza, solo{" "}
          <span className="text-[var(--color-accent)]">@Ly</span>
          <span className="inline-block w-[1px] h-[14px] bg-[var(--color-ink)] animate-pulse align-middle" />
        </p>
      </div>

      {/* Autocomplete dropdown */}
      <div className="mt-1 ml-[248px] w-64 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-lg">
        <div className="flex items-center gap-2.5 bg-[var(--color-cream)] px-3 py-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b6f47] text-[9px] font-bold text-white">
            L
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--color-ink)]">Lyra</p>
            <p className="text-[10px] text-[var(--color-ink-muted)]">Personaje - Protagonista</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#589b9b] text-[9px] font-bold text-white">
            L
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--color-ink)]">Llanuras del Eco</p>
            <p className="text-[10px] text-[var(--color-ink-muted)]">Lugar - Region</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#cc853d] text-[9px] font-bold text-white">
            L
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--color-ink)]">La gran escision</p>
            <p className="text-[10px] text-[var(--color-ink-muted)]">Evento</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-ink-muted)]">
        Escribe @ para mencionar personajes, lugares, facciones o eventos
      </p>
    </div>
  );
}
