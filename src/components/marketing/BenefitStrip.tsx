interface BenefitItem {
  label: string;
  value: string;
}

interface BenefitStripProps {
  items: BenefitItem[];
}

export function BenefitStrip({ items }: BenefitStripProps) {
  return (
    <section className="border-y border-[var(--color-border)] bg-white px-8 py-6">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 text-center">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-lg font-bold text-[var(--color-ink)]">
              {item.value}
            </p>
            <p className="text-xs text-[var(--color-ink-muted)]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
