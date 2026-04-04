export function MockFactionRelations() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Faction A */}
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#93709e] text-xs font-bold text-white">
              OC
            </div>
            <p className="text-xs font-semibold text-[var(--color-ink)]">Orden del Cristal Eterno</p>
          </div>
          <p className="mb-3 text-[10px] leading-relaxed text-[var(--color-ink-light)]">
            Custodios del saber cristalino. Conservar el orden establecido a toda costa.
          </p>
          <div className="flex gap-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b6f47] text-[8px] font-bold text-white" title="Lyra">L</div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b6f47] text-[8px] font-bold text-white" title="Kael">K</div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b6f47] text-[8px] font-bold text-white" title="Aldric">A</div>
          </div>
        </div>

        {/* Relationship connector */}
        <div className="flex flex-col items-center gap-1 pt-8">
          <div className="h-px w-8 bg-red-400" />
          <span className="whitespace-nowrap rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-semibold text-red-600">
            Enemigos
          </span>
          <div className="h-px w-8 bg-red-400" />
        </div>

        {/* Faction B */}
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#cc853d] text-xs font-bold text-white">
              LD
            </div>
            <p className="text-xs font-semibold text-[var(--color-ink)]">Los Despertadores</p>
          </div>
          <p className="mb-3 text-[10px] leading-relaxed text-[var(--color-ink-light)]">
            Revolucionarios que buscan destruir los cristales y liberar la resonancia natural.
          </p>
          <div className="flex gap-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b6f47] text-[8px] font-bold text-white" title="Vael">V</div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b6f47] text-[8px] font-bold text-white" title="Thorn">T</div>
          </div>
        </div>
      </div>

      {/* Relationship types legend */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[var(--color-border)] pt-3">
        <span className="text-[9px] text-[var(--color-ink-muted)]">Tipos:</span>
        {[
          { label: "Aliada", color: "bg-emerald-100 text-emerald-600" },
          { label: "Enemiga", color: "bg-red-100 text-red-600" },
          { label: "Rival", color: "bg-amber-100 text-amber-600" },
          { label: "Neutral", color: "bg-stone-100 text-stone-500" },
          { label: "Subordinada", color: "bg-blue-100 text-blue-600" },
        ].map((t) => (
          <span key={t.label} className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${t.color}`}>
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
