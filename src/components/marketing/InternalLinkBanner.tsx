import Link from "next/link";

interface InternalLink {
  title: string;
  description: string;
  href: string;
}

interface InternalLinkBannerProps {
  title?: string;
  links: InternalLink[];
}

export function InternalLinkBanner({
  title = "Explora mas herramientas",
  links,
}: InternalLinkBannerProps) {
  return (
    <section className="bg-[var(--color-cream-dark)] px-8 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-xl font-bold text-[var(--color-ink)]">
          {title}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-[var(--color-border)] bg-white p-5 transition-shadow hover:shadow-sm"
            >
              <h3 className="mb-1.5 text-sm font-semibold text-[var(--color-ink)]">
                {link.title}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
