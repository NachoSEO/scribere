"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_COLLAPSED_KEY = "nav-collapsed";
const NAV_WIDTH_COLLAPSED = 56;
const NAV_WIDTH_EXPANDED = 200;

const navItems = [
  {
    href: "/app/corrector",
    label: "Corrector",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.5 2.5l5 5-10 10H2.5v-5l10-10z" />
        <path d="M10.5 4.5l5 5" />
      </svg>
    ),
  },
  {
    href: "/app/proyectos",
    label: "Proyectos",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h14v14H3z" />
        <path d="M3 7h14" />
        <path d="M7 3v14" />
      </svg>
    ),
  },
  {
    href: "/app/worldbuilding",
    label: "Worldbuilding",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7.5" />
        <ellipse cx="10" cy="10" rx="3" ry="7.5" />
        <path d="M2.5 10h15" />
        <path d="M3.5 6h13" />
        <path d="M3.5 14h13" />
      </svg>
    ),
  },
];

const settingsItem = {
  href: "/app/configuracion",
  label: "Configuración",
  icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.3 2h3.4l.5 2.2a6 6 0 011.5.9l2.1-.7 1.7 3-1.6 1.5a6 6 0 010 1.8l1.6 1.5-1.7 3-2.1-.7a6 6 0 01-1.5.9L11.7 18H8.3l-.5-2.2a6 6 0 01-1.5-.9l-2.1.7-1.7-3 1.6-1.5a6 6 0 010-1.8L2.5 7.8l1.7-3 2.1.7a6 6 0 011.5-.9L8.3 2z" />
      <circle cx="10" cy="10" r="2.5" />
    </svg>
  ),
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(NAV_COLLAPSED_KEY);
    if (stored !== null) setCollapsed(stored === "true");
    setMounted(true);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(NAV_COLLAPSED_KEY, String(next));
  };

  const navWidth = collapsed ? NAV_WIDTH_COLLAPSED : NAV_WIDTH_EXPANDED;

  return (
    <div className="flex h-screen">
      <nav
        className="flex flex-shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-cream-dark)]"
        style={{ width: mounted ? navWidth : NAV_WIDTH_COLLAPSED, transition: mounted ? "width 150ms ease" : "none" }}
      >
        {/* Toggle button */}
        <button
          onClick={toggleCollapse}
          className="flex h-10 items-center justify-center text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mt-2 mx-2"
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 150ms ease" }}
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>

        {/* Nav items */}
        <div className="mt-2 flex flex-1 flex-col gap-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-parchment)] text-[var(--color-accent)]"
                    : "text-[var(--color-ink-light)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Settings at bottom */}
        <div className="px-2 pb-3">
          <Link
            href={settingsItem.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname.startsWith(settingsItem.href)
                ? "bg-[var(--color-parchment)] text-[var(--color-accent)]"
                : "text-[var(--color-ink-light)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)]"
            }`}
            title={collapsed ? settingsItem.label : undefined}
          >
            <span className="flex-shrink-0">{settingsItem.icon}</span>
            {!collapsed && <span className="truncate">{settingsItem.label}</span>}
          </Link>
        </div>
      </nav>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
