import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection, CTASection } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Para escritores de novelas en espanol - Scritura | Herramienta para escritores",
  description:
    "Scritura es la herramienta definitiva para escritores de novelas en espanol. Corrector de estilo, planificador de novelas y worldbuilding en una sola plataforma.",
};

const JOURNEY_PHASES = [
  {
    phase: "Idea",
    icon: "💡",
    description: "Todo empieza con una premisa. Una pregunta, una imagen, un conflicto que quieres explorar.",
    module: "Planificador",
    moduleHref: "/planificador",
    tools: ["Premisa y sinopsis", "Genero y tono"],
  },
  {
    phase: "Planificacion",
    icon: "🗺️",
    description: "Antes de escribir la primera linea, necesitas saber a donde va tu historia. Estructura, personajes, mundo.",
    module: "Planificador + Worldbuilding",
    moduleHref: "/planificador",
    tools: ["Arcos narrativos", "Fichas de personajes", "Cronologia del mundo", "Regiones y culturas"],
  },
  {
    phase: "Escritura",
    icon: "✍️",
    description: "Escena a escena, capitulo a capitulo. Con la planificacion hecha, escribir fluye.",
    module: "Corrector",
    moduleHref: "/corrector",
    tools: ["Deteccion de adverbios en -mente", "Verbos debiles", "Frases demasiado largas"],
  },
  {
    phase: "Revision",
    icon: "🔍",
    description: "El primer borrador nunca es el definitivo. El corrector te ayuda a pulir cada frase.",
    module: "Corrector",
    moduleHref: "/corrector",
    tools: ["Gerundios excesivos", "Reiteraciones", "Frecuencia de palabras"],
  },
];

const FEATURE_HIGHLIGHTS = [
  {
    module: "Corrector de estilo",
    color: "#bd5749",
    href: "/corrector",
    features: [
      "10 categorias de analisis estilistico",
      "Resultados en tiempo real, sin esperas",
      "Exportacion de frecuencia de palabras a CSV",
      "Funciona sin internet — todo en tu navegador",
    ],
  },
  {
    module: "Planificador de novelas",
    color: "#8b6f47",
    href: "/planificador",
    features: [
      "Estructura tu novela en fases y escenas",
      "Fichas de personajes con motivacion y funcion narrativa",
      "Arcos narrativos con planteamiento, nudo y desenlace",
      "Relaciones entre personajes",
    ],
  },
  {
    module: "Worldbuilding",
    color: "#55699b",
    href: "/worldbuilding",
    features: [
      "Cronologias con eras y eventos",
      "Mapas con marcadores interactivos",
      "Regiones jerarquicas y culturas detalladas",
      "Sistemas de magia, tecnologia o politica",
    ],
  },
];

export default function EscritoresPage() {
  return (
    <>
      <HeroSection
        badge="Para escritores"
        title={
          <>
            La herramienta definitiva para
            <br />
            <span className="text-[var(--color-accent)]">escritores de novelas en espanol</span>
          </>
        }
        subtitle="Scritura reune corrector de estilo, planificador de novelas y worldbuilding en una sola plataforma. Disenada por y para quienes escriben ficcion en espanol."
        secondaryCta={{ text: "Ver precios", href: "/precios" }}
      />

      {/* Narrative journey */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center text-2xl font-bold text-[var(--color-ink)]">
            Te acompana en cada fase de tu novela
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-sm text-[var(--color-ink-muted)]">
            Desde la primera chispa de inspiracion hasta la revision final, Scritura tiene las herramientas que necesitas.
          </p>

          <div className="space-y-6">
            {JOURNEY_PHASES.map((item, index) => (
              <div
                key={item.phase}
                className="flex gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-6"
              >
                <div className="flex shrink-0 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-xl">
                    {item.icon}
                  </div>
                  {index < JOURNEY_PHASES.length - 1 && (
                    <div className="mt-2 h-full w-px bg-[var(--color-border)]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-sm font-bold text-[var(--color-ink)]">
                      {index + 1}. {item.phase}
                    </h3>
                    <Link
                      href={item.moduleHref}
                      className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/20"
                    >
                      {item.module}
                    </Link>
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-[var(--color-ink-light)]">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-ink-muted)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights by module */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-2xl font-bold text-[var(--color-ink)]">
            Tres modulos, una plataforma
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-sm text-[var(--color-ink-muted)]">
            Cada modulo se especializa en una parte del proceso. Juntos cubren todo lo que necesitas para escribir tu novela.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURE_HIGHLIGHTS.map((module) => (
              <Link
                key={module.module}
                href={module.href}
                className="group rounded-xl border border-[var(--color-border)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: module.color }}
                  />
                  <h3 className="text-sm font-bold text-[var(--color-ink)]">
                    {module.module}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {module.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs leading-relaxed text-[var(--color-ink-light)]"
                    >
                      <span className="mt-0.5 text-[var(--color-accent)]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold text-[var(--color-accent)] transition-colors group-hover:text-[var(--color-accent-dark)]">
                  Explorar →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial placeholders */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-ink)]">
            Lo que dicen los escritores
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "Scritura me ayudo a detectar vicios de escritura que arrastraba desde hace anos. El corrector de adverbios fue una revelacion.",
                name: "Escritor/a de fantasia",
                detail: "Novela en progreso",
              },
              {
                quote: "El planificador de novelas es exactamente lo que necesitaba. Poder ver la estructura completa de mi novela en un solo lugar cambio mi forma de trabajar.",
                name: "Escritor/a de thriller",
                detail: "Segunda novela",
              },
              {
                quote: "El worldbuilding de Scritura me ahorro semanas de trabajo. Tener cronologias, mapas y culturas organizados es impagable para fantasia epica.",
                name: "Escritor/a de ciencia ficcion",
                detail: "Saga en desarrollo",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-cream)] p-6"
              >
                <p className="mb-4 text-sm italic leading-relaxed text-[var(--color-ink-light)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-ink)]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[var(--color-ink-muted)]">
                    {testimonial.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[var(--color-ink-muted)]">
            * Testimonios representativos. Actualizaremos esta seccion con resenas reales a medida que crezca la comunidad.
          </p>
        </div>
      </section>

      <CTASection
        title="Empieza a escribir tu novela hoy"
        subtitle="Gratis, sin limites de palabras, sin publicidad. Todo en tu navegador."
        ctaText="Empieza gratis con Google"
      />
    </>
  );
}
