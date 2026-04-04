import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MockFactionRelations } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Facciones y relaciones entre grupos - Scritura | Planificador",
  description:
    "Organiza grupos, bandos y organizaciones de tu novela con objetivos, motivaciones y complicaciones. Define relaciones entre facciones: aliada, enemiga, rival, neutral o subordinada.",
};

function FactionCardMock() {
  const factions = [
    {
      name: "Orden del Cristal Eterno",
      initials: "OC",
      color: "bg-[#93709e]",
      concepto:
        "Custodios del saber cristalino. Controlan la extraccion, refinamiento y distribucion de los cristales de resonancia en Sorvara.",
      objetivos:
        "Mantener el monopolio sobre los cristales y el conocimiento asociado. Impedir que la resonancia natural se propague fuera de su control.",
      motivacion:
        "El recuerdo de la Gran Escision, cuando la resonancia descontrolada destruyo medio continente. Creen que solo ellos pueden evitar que se repita.",
      complicacion:
        "Los cristales estan perdiendo brillo. Cada generacion produce menos resonancia y la Orden no sabe por que.",
    },
    {
      name: "Los Despertadores",
      initials: "LD",
      color: "bg-[#cc853d]",
      concepto:
        "Revolucionarios clandestinos que quieren destruir los cristales y devolver la resonancia natural a las personas.",
      objetivos:
        "Destruir las minas de cristal, liberar a los resonadores cautivos y acabar con el monopolio de la Orden.",
      motivacion:
        "La Maestra Vael perdio a su familia en una purga de la Orden contra resonadores naturales. Fundo el grupo para que nadie mas pase por lo mismo.",
      complicacion:
        "Facciones internas: los moderados quieren negociar, los radicales quieren quemar las minas. Vael lucha por mantener la cohesion.",
    },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-3">
      {factions.map((faction) => (
        <div
          key={faction.name}
          className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${faction.color} text-xs font-bold text-white`}
            >
              {faction.initials}
            </div>
            <h3 className="text-sm font-bold text-[var(--color-ink)]">{faction.name}</h3>
          </div>
          <div className="space-y-2.5">
            <div>
              <p className="mb-0.5 text-xs font-semibold text-[var(--color-ink-muted)]">Concepto</p>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">{faction.concepto}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-semibold text-[var(--color-ink-muted)]">Objetivos</p>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">{faction.objetivos}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-semibold text-[var(--color-ink-muted)]">Motivacion</p>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">{faction.motivacion}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-semibold text-[var(--color-ink-muted)]">Complicacion</p>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">{faction.complicacion}</p>
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

      {/* Faction cards */}
      <section className="px-8 pb-20">
        <FactionCardMock />
      </section>

      <FeatureShowcase
        features={[
          {
            title: "Relaciones entre facciones",
            description:
              "Define como se relacionan los grupos de tu historia: aliada, enemiga, rival, neutral o subordinada. Cada tipo de relacion cambia la dinamica de las escenas donde coinciden miembros de ambos bandos. Los Despertadores y la Orden del Cristal Eterno no son solo enemigos: son dos visiones del mundo enfrentadas.",
            visual: <MockFactionRelations />,
          },
        ]}
      />

      {/* Quick creation */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-ink)]">
            Miembros y relaciones sin salir de la ficha
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-6">
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Anade miembros al instante
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                Desde la ficha de cada faccion puedes vincular personajes existentes
                o crear nuevos sobre la marcha. Lyra empieza en la Orden, pero
                cuando descubra la verdad sobre los cristales, podras moverla a
                Los Despertadores con un clic.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-6">
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Crea relaciones entre grupos
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                No necesitas ir a otra pantalla. Desde la misma ficha de la Orden
                del Cristal Eterno puedes marcar a Los Despertadores como enemigos
                y a los Nomadas del Viento como neutrales. Las relaciones son
                bidireccionales: se reflejan en ambas facciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que necesitas facciones */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas facciones
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Las historias mas ricas no son solo sobre individuos: son sobre grupos
              en conflicto. Ordenes religiosas contra revolucionarios. Familias
              enfrentadas. Gremios rivales. Las facciones multiplican las
              posibilidades narrativas porque crean redes de lealtad, traicion y
              negociacion que ningun personaje puede sostener solo.
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
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
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
                tu historia. Puede ser una orden religiosa, una celula
                revolucionaria, un gremio, una familia o cualquier colectivo con
                intereses propios.
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
                lo quiere) y la complicacion (que se lo impide). La Orden quiere
                mantener el monopolio, pero los cristales se apagan. Los
                Despertadores quieren destruirlos, pero no se ponen de acuerdo en
                como.
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
                Vincula personajes a sus facciones. Lyra pertenece a la Orden pero
                simpatiza con los Despertadores. Aldric lidera la Orden pero oculta
                sus propios intereses. Las lealtades divididas son el motor del
                drama.
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
            title: "Manuscrito",
            description: "Menciona facciones con @ en tu manuscrito y mantenlas conectadas a la narrativa.",
            href: "/planificador/manuscrito",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Que tipos de relaciones puedo definir entre facciones?",
            answer:
              "Cinco tipos: aliada, enemiga, rival, neutral y subordinada. Cada tipo tiene un color distinto para que veas de un vistazo el mapa de poder de tu novela.",
          },
          {
            question: "Las facciones son solo para fantasia y ciencia ficcion?",
            answer:
              "No. Cualquier novela con grupos enfrentados se beneficia. Familias en una saga, departamentos en un thriller corporativo, bandas en una novela negra. Donde hay grupos con intereses distintos, hay facciones.",
          },
          {
            question: "Un personaje puede pertenecer a varias facciones?",
            answer:
              "Si. Los personajes mas interesantes suelen tener lealtades divididas. Lyra pertenece a la Orden pero simpatiza con los Despertadores. Un espia, un infiltrado, un hijo rebelde: las dobles lealtades generan conflicto.",
          },
          {
            question: "Como gestiono los miembros de una faccion?",
            answer:
              "Desde la ficha de cada faccion puedes vincular personajes existentes o crear nuevos. Tambien puedes ver todos los miembros de un vistazo y acceder a su ficha directamente.",
          },
        ]}
      />

      <CTASection
        title="Crea conflictos entre grupos"
        subtitle="Facciones con objetivos, motivaciones y complicaciones. El motor de las historias donde hay mas en juego que un solo personaje."
      />
    </>
  );
}
