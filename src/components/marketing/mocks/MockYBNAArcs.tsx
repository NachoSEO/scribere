export function MockYBNAArcs() {
  const arcs = [
    {
      name: "El cristal muerto",
      from: "La vida en los talleres",
      to: "Despertar del don",
      resolution: "Si, pero...",
      resColor: "bg-amber-100 text-amber-700",
      desc: "Lyra consigue despertar el cristal muerto, pero cada resonancia le cuesta un recuerdo de infancia.",
    },
    {
      name: "La proteccion de Kael",
      from: "Despertar del don",
      to: "La huida de Sorvara",
      resolution: "Si",
      resColor: "bg-emerald-100 text-emerald-700",
      desc: "Kael logra sacar a Lyra de Sorvara antes de que la Orden la encierre.",
    },
    {
      name: "Alianza con Nira",
      from: "Encuentro en las llanuras",
      to: "El pacto de sangre",
      resolution: "No, y...",
      resColor: "bg-red-100 text-red-600",
      desc: "La alianza se rompe cuando Nira descubre que Lyra lleva un cristal de la Orden. Nira desaparece con el mapa.",
    },
    {
      name: "La caida de Aldric",
      from: "El secreto del Gran Maestro",
      to: "La Resonancia Final",
      resolution: "No",
      resColor: "bg-red-200 text-red-700",
      desc: "Aldric no puede mantener su fachada. Su propia resonancia se apaga frente al consejo.",
    },
  ];

  return (
    <div className="space-y-3">
      {arcs.map((arc) => (
        <div
          key={arc.name}
          className="rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm"
        >
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[var(--color-ink)]">{arc.name}</h4>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${arc.resColor}`}>
              {arc.resolution}
            </span>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-[var(--color-ink-light)]">{arc.desc}</p>
          <div className="flex items-center gap-2 text-[10px] text-[var(--color-ink-muted)]">
            <span className="rounded-md bg-[var(--color-cream)] px-2 py-0.5">{arc.from}</span>
            <span>&#8594;</span>
            <span className="rounded-md bg-[var(--color-cream)] px-2 py-0.5">{arc.to}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
