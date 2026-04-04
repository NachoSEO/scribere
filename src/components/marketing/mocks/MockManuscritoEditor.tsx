export function MockManuscritoEditor() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-sm">
      <div className="flex">
        {/* File tree sidebar */}
        <div className="w-48 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-cream)] p-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
            Manuscrito
          </p>
          <div className="space-y-0.5 text-xs">
            <div className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[var(--color-ink-light)]">
              <span className="text-[10px]">&#9660;</span>
              <span className="font-medium">Acto I - El Despertar</span>
            </div>
            <div className="ml-4 space-y-0.5">
              <div className="flex items-center gap-1.5 rounded-md bg-[var(--color-accent)]/10 px-2 py-1 font-medium text-[var(--color-accent-dark)]">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"/></svg>
                Amanecer en los talleres
              </div>
              <div className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[var(--color-ink-muted)]">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" opacity="0.5"><path d="M4 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"/></svg>
                El cristal muerto
              </div>
              <div className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[var(--color-ink-muted)]">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" opacity="0.5"><path d="M4 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"/></svg>
                La primera resonancia
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[var(--color-ink-light)]">
              <span className="text-[10px]">&#9654;</span>
              <span className="font-medium">Acto II - El Viaje</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[var(--color-ink-light)]">
              <span className="text-[10px]">&#9654;</span>
              <span className="font-medium">Acto III - Resonancia Final</span>
            </div>
          </div>
        </div>

        {/* Editor area */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center gap-1 border-b border-[var(--color-border)] px-3 py-2">
            {["B", "I"].map((btn) => (
              <button
                key={btn}
                className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-[var(--color-ink-muted)] hover:bg-[var(--color-cream)]"
              >
                {btn}
              </button>
            ))}
            <div className="mx-1 h-4 w-px bg-[var(--color-border)]" />
            {["H2", "H3"].map((btn) => (
              <button
                key={btn}
                className="flex h-7 items-center justify-center rounded-md px-1.5 text-[10px] font-semibold text-[var(--color-ink-muted)] hover:bg-[var(--color-cream)]"
              >
                {btn}
              </button>
            ))}
            <div className="mx-1 h-4 w-px bg-[var(--color-border)]" />
            <button className="flex h-7 w-7 items-center justify-center rounded-md text-xs text-[var(--color-ink-muted)] hover:bg-[var(--color-cream)]">
              &bull;
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-md text-xs text-[var(--color-ink-muted)] hover:bg-[var(--color-cream)]">
              1.
            </button>
            <div className="mx-1 h-4 w-px bg-[var(--color-border)]" />
            <button className="flex h-7 w-7 items-center justify-center rounded-md text-xs text-[var(--color-ink-muted)] hover:bg-[var(--color-cream)]">
              &ldquo;
            </button>
          </div>

          {/* Content */}
          <div className="p-6" style={{ fontFamily: "Georgia, serif" }}>
            <p className="mb-4 text-sm leading-[1.9] text-[var(--color-ink)]">
              Lyra llego a los talleres antes que nadie. Los cristales del estante principal habian perdido brillo
              durante la noche, como si alguien les hubiera robado la luz mientras dormian.
            </p>
            <p className="text-sm leading-[1.9] text-[var(--color-ink)]">
              Paso los dedos por la superficie del mas grande, buscando la vibracion familiar, pero solo encontro
              silencio.{" "}
              <span className="inline-flex items-center rounded-md bg-[#8b6f47]/10 px-1.5 py-0.5 text-xs font-medium text-[#8b6f47]">
                @Kael
              </span>{" "}
              le habia advertido que esto pasaria, y en el{" "}
              <span className="inline-flex items-center rounded-md bg-[#589b9b]/10 px-1.5 py-0.5 text-xs font-medium text-[#589b9b]">
                @Mercado de Sombras
              </span>{" "}
              ya corrian rumores sobre el{" "}
              <span className="inline-flex items-center rounded-md bg-[#cc853d]/10 px-1.5 py-0.5 text-xs font-medium text-[#cc853d]">
                @Oscurecimiento
              </span>{" "}
              de los talleres. La{" "}
              <span className="inline-flex items-center rounded-md bg-[#93709e]/10 px-1.5 py-0.5 text-xs font-medium text-[#93709e]">
                @Orden del Cristal Eterno
              </span>{" "}
              no tardaria en enterarse.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2">
            <span className="text-[10px] text-[var(--color-ink-muted)]">1.847 caracteres</span>
            <span className="rounded-md bg-[var(--color-cream)] px-2 py-0.5 text-[10px] text-[var(--color-ink-muted)]">
              Autoguardado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
