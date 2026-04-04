export function MockCauseEffectChain() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        {/* Causa */}
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3 text-center">
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">Causa directa</p>
          <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
            Los Despertadores atacan el convoy de cristales de la Orden
          </p>
        </div>

        <span className="text-lg text-[var(--color-ink-muted)] sm:text-xl">&#8594;</span>

        {/* Evento central */}
        <div className="flex-1 rounded-lg border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/5 p-3 text-center">
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">Evento</p>
          <p className="text-sm font-semibold text-[var(--color-ink)]">
            La emboscada del Puente Roto
          </p>
        </div>

        <span className="text-lg text-[var(--color-ink-muted)] sm:text-xl">&#8594;</span>

        {/* Consecuencia */}
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3 text-center">
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">Consecuencia</p>
          <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
            El puente sufre danos adicionales. Lyra ve a Vael matar un cristal vivo por primera vez
          </p>
        </div>
      </div>

      {/* Connected entities */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-[var(--color-border)] pt-3">
        <span className="text-[9px] text-[var(--color-ink-muted)]">Conectado a:</span>
        <span className="rounded-md bg-[#8b6f47]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#8b6f47]">Lyra</span>
        <span className="rounded-md bg-[#8b6f47]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#8b6f47]">Kael</span>
        <span className="rounded-md bg-[#8b6f47]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#8b6f47]">Maestra Vael</span>
        <span className="rounded-md bg-[#589b9b]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#589b9b]">Puente de Cristal Roto</span>
        <span className="rounded-md bg-[#93709e]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#93709e]">Los Despertadores</span>
      </div>
    </div>
  );
}
