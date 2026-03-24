import Link from "next/link";

interface Feature {
  icon?: string;
  title: string;
  description: string;
  href?: string;
  color?: string;
}

interface FeatureGridProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3;
}

export function FeatureGrid({
  title,
  subtitle,
  features,
  columns = 3,
}: FeatureGridProps) {
  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-center text-2xl font-bold text-[var(--color-ink)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mb-12 max-w-lg text-center text-sm text-[var(--color-ink-muted)]">
            {subtitle}
          </p>
        )}
        <div className={`grid gap-5 ${gridCols}`}>
          {features.map((feature) => {
            const card = (
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5 transition-shadow hover:shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  {feature.color && (
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: feature.color }}
                    />
                  )}
                  {feature.icon && (
                    <span className="text-lg">{feature.icon}</span>
                  )}
                  <h3 className="text-sm font-semibold text-[var(--color-ink)]">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                  {feature.description}
                </p>
              </div>
            );

            if (feature.href) {
              return (
                <Link key={feature.title} href={feature.href} className="block">
                  {card}
                </Link>
              );
            }
            return <div key={feature.title}>{card}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
