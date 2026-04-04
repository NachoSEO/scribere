import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Fases y actos narrativos - Scritura | Planificador",
  description:
    "Divide tu novela en actos y fases con hitos tipados y coloreados. La estructura macro que convierte una idea en una historia con ritmo y proposito.",
};

function PhaseListMock() {
  const phases = [
    {
      name: "Acto I - El Despertar",
      hitos: [
        { name: "La vida en los talleres", dotColor: "bg-stone-400" },
        { name: "Despertar del don", dotColor: "bg-rose-500" },
        { name: "La decision de Kael", dotColor: "bg-amber-500" },
      ],
    },
    {
      name: "Acto II - El Viaje",
      hitos: [
        { name: "La huida de Sorvara", dotColor: "bg-amber-500" },
        { name: "Encuentro con los nomadas", dotColor: "bg-stone-400" },
        { name: "El precio de la resonancia", dotColor: "bg-stone-400" },
        { name: "La emboscada del puente", dotColor: "bg-stone-400" },
      ],
    },
    {
      name: "Acto III - La Resonancia Final",
      hitos: [
        { name: "El secreto de Aldric", dotColor: "bg-stone-400" },
        { name: "La eleccion de Lyra", dotColor: "bg-amber-500" },
        { name: "La Resonancia Final", dotColor: "bg-rose-500" },
      ],
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
            {phase.hitos.map((hito) => (
              <div
                key={hito.name}
                className="flex items-center gap-2 rounded-lg bg-[var(--color-cream)] px-3 py-2"
              >
                <div className={`h-2 w-2 shrink-0 rounded-full ${hito.dotColor}`} />
                <span className="text-xs text-[var(--color-ink-light)]">{hito.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Color legend */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-stone-400" />
          <span className="text-[10px] text-[var(--color-ink-muted)]">Normalidad</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-[10px] text-[var(--color-ink-muted)]">Giro</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-rose-500" />
          <span className="text-[10px] text-[var(--color-ink-muted)]">Incidente</span>
        </div>
      </div>
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

      {/* Phase list */}
      <section className="px-8 pb-20">
        <PhaseListMock />
      </section>

      {/* Por que necesitas fases */}
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
              manejables. El Acto I de Lyra establece su vida en los talleres, el
              despertar de su don y la decision de Kael de protegerla. El Acto II
              la saca de Sorvara y la enfrenta al mundo. El Acto III la obliga a
              elegir. Dentro de cada fase, los hitos marcan los momentos clave con
              colores por tipo: normalidad, giro o incidente. Asi siempre sabes
              donde estas en la narrativa y que viene despues.
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
                Crea las grandes divisiones de tu novela. Pueden ser tres actos,
                cinco partes, dos temporadas o lo que necesite tu historia. Tu
                decides la granularidad.
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
                inflexion. El despertar del don de Lyra es un incidente. La
                decision de Kael, un giro. La vida en los talleres, normalidad.
                Cada tipo tiene su color.
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
                Ve de un vistazo como se distribuyen los hitos a lo largo de la
                novela. Detecta si un acto tiene demasiado peso, si hay dos giros
                seguidos sin normalidad entre ellos, o si un incidente cae
                demasiado pronto.
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
            title: "Estructura",
            description: "Ve tus fases en la columna vertebral de tu novela junto a hitos, arcos y escenas.",
            href: "/planificador/estructura",
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
            question: "Que significan los colores de los hitos?",
            answer:
              "Cada hito tiene un tipo que se refleja en su color. Normalidad (gris) para momentos de establecimiento, giro (ambar) para puntos de inflexion, e incidente (rosa) para los eventos que rompen el equilibrio. Los colores te ayudan a ver el ritmo de la fase de un vistazo.",
          },
          {
            question: "Que relacion hay entre fases e hitos?",
            answer:
              "Las fases son los grandes bloques de la estructura. Dentro de cada fase, los hitos marcan los puntos de inflexion. Y dentro de cada hito, las escenas son la accion concreta. Es una jerarquia: fase > hito > escena.",
          },
        ]}
      />

      <CTASection
        title="Dale estructura a tu novela"
        subtitle="Divide tu historia en fases y hitos tipados. Ve la novela completa desde arriba."
      />
    </>
  );
}
