export function MockMapView() {
  const pins = [
    { x: 28, y: 25, name: "Torre del Eco", type: "Edificio", active: false },
    { x: 55, y: 45, name: "Mercado de Sombras", type: "Otro", active: true },
    { x: 72, y: 62, name: "Cuevas de la Primera Resonancia", type: "Otro", active: false },
    { x: 40, y: 78, name: "Puente de Cristal Roto", type: "Edificio", active: false },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-sm">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-4 py-2">
        <span className="text-[10px] text-[var(--color-accent)]">Las Tierras de Aldara</span>
        <span className="text-[10px] text-[var(--color-ink-muted)]">/</span>
        <span className="text-[10px] text-[var(--color-accent)]">Sorvara</span>
        <span className="text-[10px] text-[var(--color-ink-muted)]">/</span>
        <span className="text-[10px] font-medium text-[var(--color-ink)]">Capital</span>
      </div>

      {/* Map area */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#e8dfd4] via-[#d4cbbf] to-[#c4b9ab]">
        {/* Stylized map texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[15%] top-[20%] h-32 w-40 rounded-full bg-[#b8a98e]/40" />
          <div className="absolute right-[20%] top-[30%] h-24 w-52 rounded-full bg-[#a09282]/30" />
          <div className="absolute bottom-[15%] left-[30%] h-20 w-60 rounded-[40%] bg-[#8b7d6b]/20" />
          <div className="absolute left-[10%] top-[60%] h-1 w-[80%] bg-[#7a9bb5]/30" style={{ transform: "rotate(-5deg)" }} />
        </div>

        {/* Pins */}
        {pins.map((pin) => (
          <div
            key={pin.name}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            {/* Hover card for active pin */}
            {pin.active && (
              <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 shadow-md">
                <p className="text-xs font-semibold text-[var(--color-ink)]">{pin.name}</p>
                <span className="rounded-full bg-[#589b9b]/10 px-1.5 py-0.5 text-[9px] font-medium text-[#589b9b]">
                  {pin.type}
                </span>
                <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-[var(--color-border)] bg-white" />
              </div>
            )}
            {/* Pin marker */}
            <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 border-white shadow-md ${pin.active ? "bg-[var(--color-accent)]" : "bg-[#589b9b]"}`}>
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Pin list */}
      <div className="border-t border-[var(--color-border)] px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {pins.map((pin) => (
            <span
              key={pin.name}
              className={`rounded-md px-2 py-1 text-[10px] ${
                pin.active
                  ? "bg-[var(--color-accent)]/10 font-medium text-[var(--color-accent-dark)]"
                  : "bg-[var(--color-cream)] text-[var(--color-ink-muted)]"
              }`}
            >
              {pin.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
