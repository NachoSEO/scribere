import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Hitos - Scritura | Herramienta para escritores",
  description:
    "Marca los momentos clave de tu historia: incidentes, giros y climax. Cada hito impulsa la trama hacia adelante con proposito y claridad.",
};

function MilestoneCardMock() {
  return (
    <div className="mx-auto max-w-lg space-y-3">
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--color-ink)]">El incidente incitador</h3>
          <span className="rounded-full border border-[var(--color-accent)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
            Incidente incitador
          </span>
        </div>
        <div className="space-y-3">
          <div>
            <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Hito</p>
            <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
              Elena recibe una carta anonima con detalles que solo su hermana
              desaparecida podria conocer.
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Informacion</p>
            <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
              La carta incluye una referencia al jardin secreto que solo
              compartian las dos hermanas de ninas.
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Efecto</p>
            <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
              Elena abandona su vida en Madrid y vuelve al pueblo para investigar.
              La novela pasa del mundo ordinario al extraordinario.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--color-ink)]">La traicion de Marco</h3>
          <span className="rounded-full border border-amber-400 px-2.5 py-0.5 text-xs font-medium text-amber-600">
            Cambio de fase
          </span>
        </div>
        <div className="space-y-3">
          <div>
            <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Hito</p>
            <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
              Elena descubre que Marco, su unico aliado, ha estado informando al
              antagonista de cada avance en la investigacion.
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Efecto</p>
            <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
              Elena pierde su red de apoyo y debe continuar sola. La tension
              escala al maximo antes del tercer acto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HitosPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Marca los momentos clave
            <br />
            <span className="text-[var(--color-accent)]">de tu historia</span>
          </>
        }
        subtitle="Incidentes incitadores, puntos de giro, climax. Los hitos son los momentos que cambian todo y empujan la trama hacia adelante."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <MilestoneCardMock />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas hitos
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Los hitos son los momentos que el lector recuerda: el giro que no
              esperaba, la revelacion que lo cambia todo, la decision que define al
              protagonista. Sin hitos claros, la novela se siente plana, como un
              viaje sin destino.
            </p>
            <p>
              Planificar los hitos antes de escribir no significa perder
              espontaneidad. Significa saber hacia donde va la historia, para que
              cada escena que escribas tenga un proposito. Los mejores escritores de
              thrillers, fantasia y drama conocen sus momentos clave antes de
              redactar la primera linea. Scritura te da un espacio para definir cada
              hito con su tipo, contexto y efecto en la narrativa.
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-ink)]">
            Como funciona
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                1
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Clasifica el hito
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Selecciona el tipo: normalidad, incidente incitador, cambio de fase,
                climax o desenlace. El tipo te ayuda a distribuir los momentos clave
                con equilibrio.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Describe el momento
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Escribe que ocurre (el hito), el contexto o informacion relevante
                y el efecto que tiene en la historia. Tres campos que capturan la
                esencia del momento.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Anade escenas
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dentro de cada hito, crea las escenas que lo componen. Un hito puede
                tener una sola escena o varias que construyen el momento
                progresivamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Herramientas relacionadas"
        links={[
          {
            title: "Fases",
            description: "Organiza tus hitos dentro de las fases que estructuran la novela.",
            href: "/planificador/fases",
          },
          {
            title: "Escenas",
            description: "Descompone cada hito en las escenas concretas que lo construyen.",
            href: "/planificador/escenas",
          },
          {
            title: "Eventos",
            description: "Conecta los hitos con eventos que afectan a personajes y lugares.",
            href: "/planificador/eventos",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Que tipos de hitos hay?",
            answer:
              "Scritura incluye varios tipos: normalidad (el mundo ordinario), incidente incitador (lo que arranca la historia), cambio de fase (los giros entre actos), climax y desenlace. Puedes elegir el que mejor describa cada momento.",
          },
          {
            question: "Cuantos hitos deberia tener mi novela?",
            answer:
              "Depende de la complejidad de la historia. Una novela tipica de tres actos tiene entre 5 y 8 hitos principales. Pero no hay reglas fijas: tu historia dicta la cantidad.",
          },
          {
            question: "Puedo mover un hito de una fase a otra?",
            answer:
              "Si. Los hitos se pueden reorganizar entre fases en cualquier momento. La estructura no es rigida: evolucionara conforme descubras las necesidades de tu historia.",
          },
          {
            question: "Cual es la diferencia entre un hito y un evento?",
            answer:
              "Un hito es un punto de inflexion estructural que cambia el rumbo de la historia. Un evento es algo que sucede y puede o no ser un punto de inflexion. Los hitos marcan la estructura; los eventos conectan personajes, lugares y cronologia.",
          },
        ]}
      />

      <CTASection
        title="Define los momentos que importan"
        subtitle="Cada giro, cada revelacion, cada decision crucial. Planifica los hitos de tu novela."
      />
    </>
  );
}
