export function MockHitoTypes() {
  const hitos = [
    {
      name: "La vida en los talleres",
      type: "normalidad",
      typeLabel: "Normalidad",
      dotColor: "bg-stone-400",
      bgColor: "bg-stone-50",
      labelColor: "bg-stone-100 text-stone-500",
      pov: "Lyra",
      info: "El lector conoce el mundo de los talleres, las reglas de la Orden y la rutina de Lyra.",
    },
    {
      name: "Despertar del don",
      type: "incidente_incitador",
      typeLabel: "Incidente incitador",
      dotColor: "bg-rose-500",
      bgColor: "bg-rose-50",
      labelColor: "bg-rose-100 text-rose-600",
      pov: "Lyra",
      info: "Lyra descubre que puede resonar con cristales muertos. La normalidad se rompe para siempre.",
    },
    {
      name: "La huida de Sorvara",
      type: "cambio_de_fase",
      typeLabel: "Cambio de fase",
      dotColor: "bg-amber-500",
      bgColor: "bg-amber-50",
      labelColor: "bg-amber-100 text-amber-600",
      pov: "Kael",
      info: "Kael saca a Lyra de la ciudad antes de que la Orden la capture. Comienza el viaje.",
    },
  ];

  return (
    <div className="space-y-3">
      {hitos.map((hito) => (
        <div
          key={hito.name}
          className={`rounded-xl border border-[var(--color-border)] p-4 shadow-sm ${hito.bgColor}`}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${hito.dotColor}`} />
              <h4 className="text-sm font-semibold text-[var(--color-ink)]">{hito.name}</h4>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${hito.labelColor}`}>
              {hito.typeLabel}
            </span>
          </div>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-[9px] text-[var(--color-ink-muted)]">POV:</span>
            <span className="rounded-md bg-[#8b6f47]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#8b6f47]">
              {hito.pov}
            </span>
          </div>
          <div>
            <p className="mb-0.5 text-[9px] font-semibold text-[var(--color-ink-muted)]">Informacion revelada</p>
            <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">{hito.info}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
