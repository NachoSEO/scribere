interface BeforeAfterProps {
  title?: string;
  before: React.ReactNode;
  after: React.ReactNode;
}

export function BeforeAfter({
  title = "Antes y despues",
  before,
  after,
}: BeforeAfterProps) {
  return (
    <section className="mx-auto max-w-4xl px-8 pb-20">
      {title && (
        <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-ink)]">
          {title}
        </h2>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-red-200/60 bg-red-50/40 p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-red-400/80">
            Antes
          </p>
          <div className="font-serif leading-relaxed text-[var(--color-ink-light)]">
            {before}
          </div>
        </div>
        <div className="rounded-xl border border-green-200/60 bg-green-50/40 p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-500/80">
            Despues
          </p>
          <div className="font-serif leading-relaxed text-[var(--color-ink-light)]">
            {after}
          </div>
        </div>
      </div>
    </section>
  );
}
