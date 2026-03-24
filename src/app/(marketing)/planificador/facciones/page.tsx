import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Facciones - Scritura | Herramienta para escritores",
  description:
    "Organiza grupos, bandos y organizaciones de tu novela con objetivos, motivaciones y complicaciones. Crea conflictos creibles entre facciones.",
};

function FactionCardMock() {
  const factions = [
    {
      name: "Los guardianes del secreto",
      concept: "Grupo de vecinos que encubrio la desaparicion de Sofia para proteger al pueblo.",
      objectives: "Mantener el secreto enterrado. Evitar que la investigacion de Elena avance.",
      motivation: "Creen que la verdad destruiria a varias familias y al pueblo entero.",
      complication: "Algunos miembros empiezan a dudar. La culpa los corroe despues de diez anos.",
    },
    {
      name: "La familia Marchetti",
      concept: "La familia dividida entre los que quieren saber la verdad y los que prefieren olvidar.",
      objectives: "Elena quiere la verdad. Sus padres quieren paz. Su tio quiere que Elena se vaya.",
      motivation: "Cada miembro tiene una razon distinta para actuar como actua.",
      complication: "La lealtad familiar choca con la necesidad de justicia.",
    },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-3">
      {factions.map((faction) => (
        <div
          key={faction.name}
          className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm"
        >
          <h3 className="mb-3 text-sm font-bold text-[var(--color-ink)]">{faction.name}</h3>
          <div className="space-y-2.5">
            <div>
              <p className="mb-0.5 text-xs font-semibold text-[var(--color-ink-muted)]">Concepto</p>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">{faction.concept}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-semibold text-[var(--color-ink-muted)]">Objetivos</p>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">{faction.objectives}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-semibold text-[var(--color-ink-muted)]">Motivacion</p>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">{faction.motivation}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-semibold text-[var(--color-ink-muted)]">Complicacion</p>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">{faction.complication}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FaccionesPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Organiza grupos, bandos
            <br />
            <span className="text-[var(--color-accent)]">y organizaciones</span>
          </>
        }
        subtitle="Las facciones crean alianzas, rivalidades y traiciones. Define los grupos de tu novela con objetivos, motivaciones y complicaciones propias."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <FactionCardMock />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas facciones
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Las historias mas ricas no son solo sobre individuos: son sobre grupos
              en conflicto. Familias enfrentadas, organizaciones secretas, bandos
              politicos, gremios rivales. Las facciones multiplican las
              posibilidades narrativas porque crean redes de lealtad, traicion y
              negociacion.
            </p>
            <p>
              Pero gestionar facciones sin un sistema dedicado es caotico. Quien
              pertenece a que grupo? Cuales son los objetivos de cada bando? Donde
              chocan sus intereses? El gestor de facciones de Scritura te da un
              espacio para definir cada grupo con concepto, objetivos, motivacion y
              complicacion. Los mismos cuatro pilares que hacen funcionar a un buen
              personaje, aplicados a organizaciones enteras.
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
                Define la faccion
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dale un nombre y un concepto: que es este grupo, que representa en
                la historia. Puede ser una familia, una empresa, un culto, un
                partido politico o cualquier colectivo.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Establece conflictos
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Define los objetivos (que quiere el grupo), la motivacion (por que
                lo quiere) y la complicacion (que se lo impide). Estos tres campos
                crean tension dramatica.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Conecta con personajes
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Vincula personajes a sus facciones. Un personaje puede pertenecer
                a varios grupos o cambiar de bando durante la historia,
                reflejando la complejidad de las lealtades.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Herramientas relacionadas"
        links={[
          {
            title: "Personajes",
            description: "Crea los personajes que pertenecen a cada faccion y define su rol dentro del grupo.",
            href: "/planificador/personajes",
          },
          {
            title: "Relaciones",
            description: "Visualiza las alianzas y rivalidades entre miembros de distintas facciones.",
            href: "/planificador/relaciones",
          },
          {
            title: "Eventos",
            description: "Registra los eventos que enfrentan o unen a las facciones de tu historia.",
            href: "/planificador/eventos",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Las facciones son solo para fantasia y ciencia ficcion?",
            answer:
              "No. Cualquier novela con grupos enfrentados se beneficia de esta herramienta. Familias en una saga, departamentos en un thriller corporativo, bandas en una novela negra. Donde hay grupos con intereses distintos, hay facciones.",
          },
          {
            question: "Un personaje puede pertenecer a varias facciones?",
            answer:
              "Si. De hecho, los personajes mas interesantes suelen tener lealtades divididas. Un espia pertenece a dos bandos. Un hijo rebelde pertenece a su familia y al grupo que la desafia.",
          },
          {
            question: "Puedo crear facciones dentro de facciones?",
            answer:
              "Puedes crear tantas facciones como necesites y vincular los mismos personajes a distintos niveles de organizacion. Por ejemplo, una faccion 'El ejercito' y dentro de ella 'Los oficiales rebeldes'.",
          },
          {
            question: "Que diferencia hay entre una faccion y un personaje?",
            answer:
              "Una faccion es un grupo con objetivos colectivos. Un personaje es un individuo con motivaciones propias. La tension entre los objetivos del grupo y los deseos del individuo es una fuente rica de conflicto narrativo.",
          },
        ]}
      />

      <CTASection
        title="Crea conflictos entre grupos"
        subtitle="Facciones con objetivos, motivaciones y complicaciones. El motor de las historias complejas."
      />
    </>
  );
}
