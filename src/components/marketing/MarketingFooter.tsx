import Link from "next/link";

const CORRECTOR_LINKS = [
  { title: "Corrector", href: "/corrector" },
  { title: "Adverbios", href: "/corrector/adverbios" },
  { title: "Gerundios", href: "/corrector/gerundios" },
  { title: "Verbos debiles", href: "/corrector/verbos-debiles" },
  { title: "Frases largas", href: "/corrector/frases-largas" },
  { title: "Reiteraciones", href: "/corrector/reiteraciones" },
  { title: "Conjunciones", href: "/corrector/conjunciones" },
  { title: "Posesivos", href: "/corrector/posesivos" },
  { title: "Vocativos", href: "/corrector/vocativos" },
  { title: "Dialogos", href: "/corrector/dialogos" },
  { title: "Parrafos", href: "/corrector/parrafos" },
  { title: "Frecuencia", href: "/corrector/frecuencia-palabras" },
  { title: "Metricas", href: "/corrector/metricas" },
];

const PLANIFICADOR_LINKS = [
  { title: "Planificador", href: "/planificador" },
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
  { title: "Worldbuilding", href: "/worldbuilding" },
  { title: "Cronologia", href: "/worldbuilding/cronologia" },
  { title: "Mapas", href: "/worldbuilding/mapas" },
  { title: "Regiones", href: "/worldbuilding/regiones" },
  { title: "Culturas", href: "/worldbuilding/culturas" },
  { title: "Sistemas", href: "/worldbuilding/sistemas" },
];

const LEGAL_LINKS = [
  { title: "Escritores", href: "/escritores" },
  { title: "Precios", href: "/precios" },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-cream)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <FooterColumn title="Corrector" links={CORRECTOR_LINKS} />
        <FooterColumn title="Planificador" links={PLANIFICADOR_LINKS} />
        <FooterColumn title="Worldbuilding" links={WORLDBUILDING_LINKS} />
        <FooterColumn title="Scritura" links={LEGAL_LINKS} />
      </div>
      <div className="border-t border-[var(--color-border)] px-8 py-6 text-center text-xs text-[var(--color-ink-muted)]">
        Scritura — Herramienta para escritores en espanol
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
        {title}
      </p>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
