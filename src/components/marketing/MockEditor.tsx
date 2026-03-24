interface Highlight {
  text: string;
  color: string;
  borderColor?: string;
}

interface SidebarItem {
  label: string;
  count: number;
  color: string;
  on: boolean;
}

interface MockEditorProps {
  sampleText: React.ReactNode;
  sidebarItems?: SidebarItem[];
  stats?: { label: string; value: string }[];
}

export function MockEditor({
  sampleText,
  sidebarItems,
  stats,
}: MockEditorProps) {
  const defaultStats = [
    { label: "palabras", value: "1,234" },
    { label: "unicas", value: "312" },
    { label: "paginas", value: "3.5" },
    { label: "min lectura", value: "6" },
  ];

  const displayStats = stats ?? defaultStats;

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-lg">
      <div className="flex items-center gap-5 border-b border-[var(--color-border)] px-5 py-2.5 text-xs text-[var(--color-ink-muted)]">
        {displayStats.map((stat) => (
          <span key={stat.label}>
            <strong className="text-[var(--color-ink)]">{stat.value}</strong>{" "}
            {stat.label}
          </span>
        ))}
      </div>
      <div className="flex">
        <div className="flex-1 p-8 font-serif text-base leading-loose text-[var(--color-ink)]">
          {sampleText}
        </div>
        {sidebarItems && (
          <div className="w-56 border-l border-[var(--color-border)] bg-[var(--color-cream)] p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              Analisis
            </p>
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className="mb-1.5 flex items-center justify-between rounded-md bg-white px-2.5 py-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: item.on ? item.color : "#ccc",
                    }}
                  />
                  <span className="text-[11px] text-[var(--color-ink-light)]">
                    {item.label}
                  </span>
                </div>
                {item.count > 0 && item.on && (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function HighlightedText({
  children,
  color,
  borderColor,
}: {
  children: React.ReactNode;
  color: string;
  borderColor?: string;
}) {
  return (
    <span
      className="rounded px-0.5"
      style={{
        backgroundColor: color,
        borderBottom: borderColor ? `2px solid ${borderColor}` : undefined,
      }}
    >
      {children}
    </span>
  );
}
