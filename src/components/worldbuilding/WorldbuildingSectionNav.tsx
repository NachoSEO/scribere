"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "general", label: "General" },
  { href: "cronologia", label: "Cronología" },
  { href: "regiones", label: "Regiones" },
  { href: "culturas", label: "Culturas" },
  { href: "sistemas", label: "Sistemas" },
];

interface WorldbuildingSectionNavProps {
  mundoId: string;
  mundoName: string;
}

export function WorldbuildingSectionNav({ mundoId, mundoName }: WorldbuildingSectionNavProps) {
  const pathname = usePathname();
  const basePath = `/app/worldbuilding/${mundoId}`;

  return (
    <div className="flex h-full w-[200px] flex-shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-cream-dark)]">
      <div className="border-b border-[var(--color-border)] px-4 py-3">
        <Link
          href="/app/worldbuilding"
          className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          Mundos
        </Link>
        <h2 className="mt-1 text-sm font-semibold text-[var(--color-ink)] truncate" title={mundoName}>
          {mundoName}
        </h2>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {sections.map((section) => {
          const href = `${basePath}/${section.href}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={section.href}
              href={href}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-[var(--color-parchment)] font-medium text-[var(--color-accent)]"
                  : "text-[var(--color-ink-light)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)]"
              }`}
            >
              {section.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
