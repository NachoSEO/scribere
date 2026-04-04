export function MockMentionInText() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <div style={{ fontFamily: "Georgia, serif" }}>
        <p className="text-sm leading-[1.9] text-[var(--color-ink)]">
          <span className="inline-flex items-center rounded-md bg-[#8b6f47]/10 px-1.5 py-0.5 text-xs font-medium text-[#8b6f47]">
            @Lyra
          </span>{" "}
          cruzo el{" "}
          <span className="inline-flex items-center rounded-md bg-[#589b9b]/10 px-1.5 py-0.5 text-xs font-medium text-[#589b9b]">
            @Puente de Cristal Roto
          </span>{" "}
          mientras{" "}
          <span className="inline-flex items-center rounded-md bg-[#8b6f47]/10 px-1.5 py-0.5 text-xs font-medium text-[#8b6f47]">
            @Kael
          </span>{" "}
          cubria la retaguardia. La{" "}
          <span className="inline-flex items-center rounded-md bg-[#93709e]/10 px-1.5 py-0.5 text-xs font-medium text-[#93709e]">
            @Orden del Cristal Eterno
          </span>{" "}
          habia enviado patrullas tras el{" "}
          <span className="inline-flex items-center rounded-md bg-[#cc853d]/10 px-1.5 py-0.5 text-xs font-medium text-[#cc853d]">
            @Ataque al convoy
          </span>
          , y no tardarian en llegar al puente.
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-3">
        {[
          { label: "Personaje", color: "#8b6f47" },
          { label: "Lugar", color: "#589b9b" },
          { label: "Faccion", color: "#93709e" },
          { label: "Evento", color: "#cc853d" },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} />
            <span className="text-[9px] text-[var(--color-ink-muted)]">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
