"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTION_NAV_COLLAPSED_KEY = "section-nav-collapsed";
const NAV_WIDTH_COLLAPSED = 48;
const NAV_WIDTH_EXPANDED = 200;

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

  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SECTION_NAV_COLLAPSED_KEY);
    if (stored !== null) setCollapsed(stored === "true");
    setMounted(true);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(SECTION_NAV_COLLAPSED_KEY, String(next));
  };

  const navWidth = collapsed ? NAV_WIDTH_COLLAPSED : NAV_WIDTH_EXPANDED;

  return (
    <div
      className="flex h-full flex-shrink-0 flex-col overflow-hidden border-r border-[var(--color-border)] bg-[var(--color-cream-dark)]"
      style={{
        width: mounted ? navWidth : NAV_WIDTH_EXPANDED,
        transition: mounted ? "width 150ms ease" : "none",
      }}
    >
      {/* Header with toggle */}
      <div className="flex items-center border-b border-[var(--color-border)] px-2 py-2">
        {!collapsed && (
          <div className="flex-1 min-w-0 px-2">
            <Link
              href="/app/proyectos"
              className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              Proyectos
            </Link>
            <h2
              className="mt-0.5 text-sm font-semibold text-[var(--color-ink)] truncate"
              title={projectName}
            >
              {projectName}
            </h2>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-[var(--color-ink-muted)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)] transition-colors"
          aria-label={collapsed ? "Expandir navegaci\u00f3n" : "Colapsar navegaci\u00f3n"}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
              transition: mounted ? "transform 150ms ease" : "none",
            }}
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-1.5">
        {sectionGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            {group.header && !collapsed && (
              <div className="mt-3 mb-1 flex items-center gap-2 px-3">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium">
                  {group.header}
                </span>
                <div className="flex-1 border-t border-[var(--color-border-light)]" />
              </div>
            )}
            {collapsed && group.header && (
              <div className="mt-2 mb-1 flex justify-center">
                <div className="h-px w-5 bg-[var(--color-border)]" />
              </div>
            )}
            {group.items.map((section) => {
              const href = `${basePath}/${section.href}`;
              const estructuraGroupRoutes = ["estructura", "fases"];
              const isActive =
                section.href === "estructura"
                  ? estructuraGroupRoutes.some(
                      (r) =>
                        pathname === `${basePath}/${r}` ||
                        pathname.startsWith(`${basePath}/${r}/`)
                    )
                  : pathname === href || pathname.startsWith(`${href}/`);

              if (collapsed) {
                return (
                  <Link
                    key={section.href}
                    href={href}
                    title={section.label}
                    className={`flex items-center justify-center rounded-md py-1.5 transition-colors ${
                      isActive
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-ink-light)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-[var(--color-parchment)] text-[var(--color-accent)]"
                          : "bg-[var(--color-cream-dark)] text-[var(--color-ink-light)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)]"
                      }`}
                    >
                      {section.label[0]}
                    </span>
                  </Link>
                );
              }

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
