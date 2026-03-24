interface ShowcaseItem {
  title: string;
  description: string;
  visual: React.ReactNode;
  reversed?: boolean;
}

interface FeatureShowcaseProps {
  features: ShowcaseItem[];
}

export function FeatureShowcase({ features }: FeatureShowcaseProps) {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-5xl space-y-20">
        {features.map((feature, i) => {
          const reversed = feature.reversed ?? i % 2 === 1;
          return (
            <div
              key={feature.title}
              className={`flex flex-col items-center gap-12 md:flex-row ${
                reversed ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-[var(--color-ink)]">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-[var(--color-ink-light)]">
                  {feature.description}
                </p>
              </div>
              <div className="flex-1">{feature.visual}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
