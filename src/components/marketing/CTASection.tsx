import Link from "next/link";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTASection({
  title,
  subtitle,
  ctaText = "Empieza gratis",
  ctaHref = "/registro",
}: CTASectionProps) {
  return (
    <section className="border-t border-[var(--color-border)] bg-white px-8 py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-[var(--color-ink)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mb-8 max-w-lg text-sm text-[var(--color-ink-muted)]">
          {subtitle}
        </p>
      )}
      <Link
        href={ctaHref}
        className="inline-block rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        {ctaText}
      </Link>
    </section>
  );
}
