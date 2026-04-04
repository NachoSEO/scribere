export function MockEvolutionTimeline() {
  const stages = [
    {
      phase: "Acto I - El Despertar",
      items: [
        { name: "Aprendiz solitaria", desc: "Lyra trabaja sola en los talleres. Habil con los cristales, pero rechazada por su origen. Obedece las normas de la Orden sin cuestionarlas.", arc: "El cristal muerto" },
        { name: "Descubrimiento del don", desc: "El cristal muerto responde a su tacto. Todo lo que creia sobre la resonancia se derrumba. La Orden la vigila.", arc: "Despertar del don" },
      ],
    },
    {
      phase: "Acto II - El Viaje",
      items: [
        { name: "La duda", desc: "Fuera de Sorvara, Lyra descubre que su don no es un regalo. Cada resonancia le cuesta recuerdos de su infancia.", arc: "El precio de la resonancia" },
        { name: "Forja de alianzas", desc: "Nira le ensena a resonar sin cristales. Kael le ensena a sobrevivir. Lyra aprende que la fuerza no esta en el poder, sino en las personas.", arc: "Alianza con Nira" },
      ],
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8b6f47] text-sm font-bold text-white">
          L
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--color-ink)]">Evolucion de Lyra</p>
          <p className="text-[10px] text-[var(--color-ink-muted)]">4 etapas a lo largo de la historia</p>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => (
          <div key={stage.phase}>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              {stage.phase}
            </p>
            <div className="relative ml-3 space-y-3 border-l-2 border-[var(--color-border)] pl-5">
              {stage.items.map((item) => (
                <div key={item.name} className="relative">
                  <div className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-white" />
                  <p className="text-xs font-semibold text-[var(--color-ink)]">{item.name}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-ink-light)]">{item.desc}</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[9px] text-[var(--color-ink-muted)]">Arco:</span>
                    <span className="rounded-md bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-accent-dark)]">
                      {item.arc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full rounded-lg border border-dashed border-[var(--color-border)] py-2 text-xs text-[var(--color-ink-muted)] hover:bg-[var(--color-cream)]">
        + Anadir etapa
      </button>
    </div>
  );
}
