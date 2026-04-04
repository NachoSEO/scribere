"use client";

import Link from "next/link";
import { useState } from "react";

const CORRECTOR_LINKS = [
  { title: "Adverbios en -mente", href: "/corrector/adverbios" },
  { title: "Gerundios", href: "/corrector/gerundios" },
  { title: "Verbos debiles", href: "/corrector/verbos-debiles" },
  { title: "Frases largas", href: "/corrector/frases-largas" },
  { title: "Reiteraciones", href: "/corrector/reiteraciones" },
  { title: "Conjunciones", href: "/corrector/conjunciones" },
  { title: "Posesivos", href: "/corrector/posesivos" },
  { title: "Vocativos", href: "/corrector/vocativos" },
  { title: "Dialogos", href: "/corrector/dialogos" },
  { title: "Parrafos", href: "/corrector/parrafos" },
  { title: "Frecuencia de palabras", href: "/corrector/frecuencia-palabras" },
  { title: "Metricas", href: "/corrector/metricas" },
];

const PLANIFICADOR_LINKS = [
  { title: "Manuscrito", href: "/planificador/manuscrito" },
  { title: "Estructura", href: "/planificador/estructura" },
  { title: "Personajes", href: "/planificador/personajes" },
  { title: "Arcos narrativos", href: "/planificador/arcos-narrativos" },
  { title: "Escenas", href: "/planificador/escenas" },
  { title: "Fases", href: "/planificador/fases" },
  { title: "Hitos", href: "/planificador/hitos" },
  { title: "Lugares", href: "/planificador/lugares" },
  { title: "Eventos", href: "/planificador/eventos" },
  { title: "Facciones", href: "/planificador/facciones" },
  { title: "Relaciones", href: "/planificador/relaciones" },
];

const WORLDBUILDING_LINKS = [
  { title: "Cronologia", href: "/worldbuilding/cronologia" },
  { title: "Mapas", href: "/worldbuilding/mapas" },
  { title: "Regiones", href: "/worldbuilding/regiones" },
  { title: "Culturas", href: "/worldbuilding/culturas" },
  { title: "Sistemas", href: "/worldbuilding/sistemas" },
];

interface NavSection {
  label: string;
  href: string;
  links: { title: string; href: string }[];
}

const SECTIONS: NavSection[] = [
  { label: "Corrector", href: "/corrector", links: CORRECTOR_LINKS },
  { label: "Planificador", href: "/planificador", links: PLANIFICADOR_LINKS },
  { label: "Worldbuilding", href: "/worldbuilding", links: WORLDBUILDING_LINKS },
];

export function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-cream)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--color-ink)]"
        >
          Scritura
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((section) => (
            <div
              key={section.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(section.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={section.href}
                className="rounded-md px-3 py-2 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-white hover:text-[var(--color-ink)]"
              >
                {section.label}
              </Link>
              {openDropdown === section.label && (
                <div className="absolute left-0 top-full z-50 w-56 rounded-xl border border-[var(--color-border)] bg-white p-2 shadow-lg">
                  <Link
                    href={section.href}
                    className="mb-1 block rounded-md px-3 py-2 text-xs font-semibold text-[var(--color-accent)] hover:bg-[var(--color-cream)]"
                  >
                    Ver todo
                  </Link>
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-md px-3 py-1.5 text-xs text-[var(--color-ink-light)] hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/escritores"
            className="rounded-md px-3 py-2 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-white hover:text-[var(--color-ink)]"
          >
            Escritores
          </Link>
          <Link
            href="/precios"
            className="rounded-md px-3 py-2 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-white hover:text-[var(--color-ink)]"
          >
            Precios
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-[var(--color-ink-light)] transition-colors hover:text-[var(--color-ink)]"
          >
            Iniciar sesion
          </Link>
          <Link
            href="/registro"
            className="rounded-lg bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-cream)] transition-opacity hover:opacity-90"
          >
            Empieza gratis
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden rounded-md p-2 text-[var(--color-ink-light)] hover:bg-white"
          aria-label="Menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] bg-white px-8 py-4 md:hidden">
          {SECTIONS.map((section) => (
            <div key={section.label} className="mb-2">
              <button
                onClick={() =>
                  setOpenAccordion(
                    openAccordion === section.label ? null : section.label
                  )
                }
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-[var(--color-ink)]"
              >
                {section.label}
                <span className="text-xs text-[var(--color-ink-muted)]">
                  {openAccordion === section.label ? "−" : "+"}
                </span>
              </button>
              {openAccordion === section.label && (
                <div className="ml-3 space-y-1 pb-2">
                  <Link
                    href={section.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 text-xs font-semibold text-[var(--color-accent)]"
                  >
                    Ver todo
                  </Link>
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1 text-xs text-[var(--color-ink-light)]"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/escritores"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm text-[var(--color-ink)]"
          >
            Escritores
          </Link>
          <Link
            href="/precios"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm text-[var(--color-ink)]"
          >
            Precios
          </Link>
          <div className="mt-4 flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-center text-sm text-[var(--color-ink-light)]"
            >
              Iniciar sesion
            </Link>
            <Link
              href="/registro"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--color-ink)] py-2.5 text-center text-sm font-medium text-[var(--color-cream)]"
            >
              Empieza gratis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
