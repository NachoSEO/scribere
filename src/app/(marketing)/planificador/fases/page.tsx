import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Fases - Scritura | Herramienta para escritores",
  description:
    "Divide tu novela en actos y fases con hitos anidados. La estructura macro que convierte una idea en una historia con ritmo y proposito.",
};

function PhaseListMock() {
  const phases = [
    {
      name: "Acto I: Planteamiento",
      milestones: ["Mundo ordinario", "Incidente incitador", "Primer punto de giro"],
    },
    {
      name: "Acto II: Confrontacion",
      milestones: ["Pruebas y aliados", "Punto medio", "Todo esta perdido"],
    },
    {
      name: "Acto III: Resolucion",
      milestones: ["Climax", "Desenlace"],
    },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-3">
      {phases.map((phase) => (
        <div
          key={phase.name}
          className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm"
        >
          <h3 className="mb-3 text-sm font-bold text-[var(--color-ink)]">{phase.name}</h3>
          <div className="space-y-1.5">
            {phase.milestones.map((milestone) => (
              <div
                key={milestone}
                className="flex items-center gap-2 rounded-lg bg-[var(--color-cream)] px-3 py-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span className="text-xs text-[var(--color-ink-light)]">{milestone}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FasesPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Divide tu novela
            <br />
            <span className="text-[var(--color-accent)]">en actos y fases</span>
          </>
        }
        subtitle="La estructura de tres actos, el viaje del heroe o tu propio metodo. Las fases te dan la vision macro que tu novela necesita para mantener el ritmo."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <PhaseListMock />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas fases
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Escribir una novela de 80.000 palabras sin estructura es como
              construir una casa sin planos. Puedes empezar con entusiasmo, pero a
              mitad del camino te pierdes: no sabes si la historia avanza demasiado
              rapido, demasiado lento o directamente no avanza.
            </p>
            <p>
              Las fases resuelven ese problema dividiendo la novela en bloques
              manejables. Ya sea que uses la estructura clasica de tres actos, el
              viaje del heroe, la estructura de cuatro actos o tu propio sistema, las
              fases te permiten ver la historia desde arriba. Dentro de cada fase,
              los hitos marcan los momentos clave. Asi siempre sabes donde estas en
              la narrativa.
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
                Define las fases
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Crea las grandes divisiones de tu novela. Pueden ser tres actos, cinco
                partes, dos temporadas o lo que necesite tu historia. Tu decides la
                granularidad.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Anade hitos a cada fase
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dentro de cada fase, coloca los hitos que marcan los puntos de
                inflexion: el incidente incitador, el punto medio, el climax.
                Cada hito agrupa escenas relacionadas.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Visualiza la estructura
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Ve de un vistazo como se distribuyen los hitos y escenas a lo largo
                de la novela. Detecta si una fase tiene demasiado peso o si otra
                necesita mas desarrollo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Herramientas relacionadas"
        links={[
          {
            title: "Hitos",
            description: "Define los momentos clave que componen cada fase de tu novela.",
            href: "/planificador/hitos",
          },
          {
            title: "Arcos narrativos",
            description: "Alinea tus arcos narrativos con las fases para controlar el ritmo de cada trama.",
            href: "/planificador/arcos-narrativos",
          },
          {
            title: "Escenas",
            description: "Rellena cada hito con las escenas concretas que lo componen.",
            href: "/planificador/escenas",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Estoy obligado a usar la estructura de tres actos?",
            answer:
              "No. Las fases son completamente flexibles. Puedes crear dos, tres, cinco o las que quieras. El sistema se adapta a tu metodo, no al reves.",
          },
          {
            question: "Puedo reorganizar las fases despues de crearlas?",
            answer:
              "Si. Puedes cambiar el orden de las fases, mover hitos entre fases y reestructurar tu novela en cualquier momento del proceso.",
          },
          {
            question: "Que relacion hay entre fases e hitos?",
            answer:
              "Las fases son los grandes bloques de la estructura. Dentro de cada fase, los hitos marcan los puntos de inflexion. Y dentro de cada hito, las escenas son la accion concreta.",
          },
        ]}
      />

      <CTASection
        title="Dale estructura a tu novela"
        subtitle="Divide tu historia en fases y hitos. Ve la novela completa desde arriba."
      />
    </>
  );
}
