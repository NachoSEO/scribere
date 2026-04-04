"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SectionGroup {
  header?: string;
  items: { href: string; label: string }[];
}

const sectionGroups: SectionGroup[] = [
  {
    items: [{ href: "general", label: "General" }],
  },
  {
    header: "Elementos",
    items: [
      { href: "facciones", label: "Facciones" },
      { href: "personajes", label: "Personajes" },
      { href: "lugares", label: "Lugares" },
      { href: "eventos", label: "Eventos" },
    ],
  },
  {
    header: "Estructura",
    items: [
      { href: "estructura", label: "Columna" },
      { href: "hitos", label: "Hitos" },
      { href: "arcos", label: "Arcos" },
      { href: "escenas", label: "Escenas" },
    ],
  },
  {
    header: "Escritura",
    items: [
      { href: "manuscrito", label: "Manuscrito" },
      { href: "tareas", label: "Tareas" },
    ],
  },
];

interface SectionNavProps {
  projectId: string;
  projectName: string;
}

export function SectionNav({ projectId, projectName }: SectionNavProps) {
  const pathname = usePathname();
  const basePath = `/app/proyectos/${projectId}`;

  return (
    <div className="flex h-full w-[200px] flex-shrink-0 flex-col overflow-hidden border-r border-[var(--color-border)] bg-[var(--color-cream-dark)]">
      <div className="border-b border-[var(--color-border)] px-4 py-3">
        <Link
          href="/app/proyectos"
          className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          Proyectos
        </Link>
        <h2 className="mt-1 text-sm font-semibold text-[var(--color-ink)] truncate" title={projectName}>
          {projectName}
        </h2>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
        {sectionGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            {group.header && (
              <div className="mt-3 mb-1 flex items-center gap-2 px-3">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
                  {group.header}
                </span>
                <div className="flex-1 border-t border-[var(--color-border-light)]" />
              </div>
            )}
            {group.items.map((section) => {
              const href = `${basePath}/${section.href}`;
              const estructuraGroupRoutes = ["estructura", "fases"];
              const isActive = section.href === "estructura"
                ? estructuraGroupRoutes.some((r) => pathname === `${basePath}/${r}` || pathname.startsWith(`${basePath}/${r}/`))
                : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={section.href}
                  href={href}
                  className={`block truncate rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--color-parchment)] font-medium text-[var(--color-accent)]"
                      : "text-[var(--color-ink-light)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {section.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
}
