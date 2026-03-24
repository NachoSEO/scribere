import Link from "next/link";

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCta?: { text: string; href: string };
}

export function HeroSection({
  title,
  subtitle,
  badge,
  ctaText = "Empieza gratis",
  ctaHref = "/registro",
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="mx-auto max-w-3xl px-8 pb-20 pt-16 text-center md:pt-24">
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-xs font-medium text-[var(--color-accent)]">
          {badge}
        </span>
      )}
      <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[var(--color-ink-light)]">
        {subtitle}
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href={ctaHref}
          className="inline-block rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          {ctaText}
        </Link>
        {secondaryCta && (
          <Link
            href={secondaryCta.href}
            className="inline-block rounded-lg border border-[var(--color-border)] px-8 py-3.5 text-base font-medium text-[var(--color-ink-light)] transition-colors hover:bg-white hover:text-[var(--color-ink)]"
          >
            {secondaryCta.text}
          </Link>
        )}
      </div>
    </section>
  );
}
