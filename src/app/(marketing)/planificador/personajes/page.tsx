import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MockEvolutionTimeline } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Fichas de personajes para novelas - Scritura | Planificador",
  description:
    "Crea fichas de personajes con motivacion, complicacion y funcion narrativa. Linea de evolucion vinculada a arcos y escenas. Asigna facciones y rastrea su desarrollo.",
};

function CharacterCardMock() {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b6f47] text-sm font-bold text-white">
          L
        </div>
        <div>
          <h3 className="text-sm font-bold text-[var(--color-ink)]">Lyra</h3>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[var(--color-cream-dark)] px-2 py-0.5 text-xs text-[var(--color-ink-muted)]">
              Protagonista
            </span>
            <span className="rounded-full bg-[#93709e]/10 px-2 py-0.5 text-xs font-medium text-[#93709e]">
              Orden del Cristal Eterno
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Funcion narrativa</p>
          <p className="text-sm text-[var(--color-ink-light)]">
            Cuestionar el monopolio de la Orden sobre la resonancia y abrir el acceso a los cristales
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Motivacion</p>
          <p className="text-sm text-[var(--color-ink-light)]">
            Entender por que el cristal muerto responde a su tacto cuando nadie mas puede activarlo
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Complicacion</p>
          <p className="text-sm text-[var(--color-ink-light)]">
            Cada resonancia le cuesta un recuerdo de su infancia. Cuanto mas poder usa, menos sabe quien es
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-2.5 py-1 text-xs text-[var(--color-ink-muted)]">
            Tipo: Dinamico
          </span>
          <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-2.5 py-1 text-xs text-[var(--color-ink-muted)]">
            Arco: El cristal muerto
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PersonajesPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Crea personajes
            <br />
            <span className="text-[var(--color-accent)]">que cobran vida</span>
          </>
        }
        subtitle="Fichas completas con motivacion, complicacion y funcion narrativa. Linea de evolucion vinculada a arcos y escenas. Asigna cada personaje a su faccion y rastrea como cambia a lo largo de la historia."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <CharacterCardMock />
      </section>

      <FeatureShowcase
        features={[
          {
            title: "Rastrea como evoluciona tu personaje",
            description:
              "Cada personaje tiene una linea de evolucion con etapas concretas. Define como cambia Lyra desde aprendiz solitaria hasta lider de la rebelion, con cada etapa vinculada al arco y la escena que la provoca. No es una nota suelta: es un registro que conecta el desarrollo del personaje con la estructura de tu novela.",
            visual: <MockEvolutionTimeline />,
          },
        ]}
      />

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas fichas de personajes
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Los personajes son el corazon de cualquier historia. Un lector puede
              olvidar la trama, pero nunca olvida a un personaje que le hizo sentir
              algo. Sin embargo, crear personajes memorables requiere mas que
              intuicion: necesitas saber que los mueve, que los frena y que papel
              cumplen en la narrativa.
            </p>
            <p>
              Sin un sistema de fichas, acabas con notas dispersas en documentos
              sueltos, contradicciones entre capitulos y personajes que se sienten
              planos. El gestor de personajes de Scritura te obliga a pensar en lo
              que importa: motivacion, complicacion y funcion narrativa. Tres campos
              que convierten una lista de rasgos en un ser humano creible.
            </p>
            <p>
              Ademas, cada personaje tiene su propia linea de evolucion. No basta con
              saber quien es Lyra al principio: necesitas documentar como el
              descubrimiento del cristal muerto la cambia, como la alianza con Kael
              le ensena a confiar, y como el precio de la resonancia la obliga a
              elegir entre poder y memoria. La linea de evolucion conecta cada cambio
              con el arco y la escena que lo provoca. Y si Lyra pertenece a la Orden
              del Cristal Eterno, su ficha lo refleja con la faccion asignada.
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
                Crea la ficha
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dale un nombre y selecciona el tipo de personaje: protagonista,
                antagonista, secundario o figurante. Asignalo a una faccion si
                pertenece a alguna organizacion.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Define lo esencial
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Completa la motivacion (que quiere), la complicacion (que se lo
                impide) y la funcion narrativa (para que existe en la historia).
                Estos tres campos son el motor del personaje.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Anade etapas de evolucion
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Documenta como cambia el personaje a lo largo de la historia. Cada
                etapa se vincula a un arco narrativo y una escena, para que el
                desarrollo no sea abstracto sino rastreable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Herramientas relacionadas"
        links={[
          {
            title: "Arcos narrativos",
            description: "Disena el arco de cada personaje con planteamiento, nudo, desenlace y resolucion YBNA.",
            href: "/planificador/arcos-narrativos",
          },
          {
            title: "Facciones",
            description: "Organiza la Orden del Cristal Eterno, los Despertadores y cada grupo de tu novela.",
            href: "/planificador/facciones",
          },
          {
            title: "Manuscrito",
            description: "Menciona personajes con @ mientras escribes para mantener todo conectado.",
            href: "/planificador/manuscrito",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Cuantos personajes puedo crear por proyecto?",
            answer:
              "No hay limite. Puedes crear tantos personajes como necesite tu historia, desde el protagonista hasta los figurantes.",
          },
          {
            question: "Como funciona la linea de evolucion?",
            answer:
              "Cada personaje tiene una lista de etapas ordenadas cronologicamente. Cada etapa describe un cambio concreto y se vincula al arco narrativo y la escena que lo provoca. Asi puedes rastrear como un personaje pasa de aprendiz solitaria a lider de una rebelion.",
          },
          {
            question: "Puedo asignar un personaje a varias facciones?",
            answer:
              "Cada personaje pertenece a una faccion principal. Si cambia de bando durante la historia, puedes reflejarlo en su linea de evolucion y crear una nueva etapa que documente el cambio.",
          },
          {
            question: "Puedo subir una imagen del personaje?",
            answer:
              "Todavia no, pero esta en el roadmap. Por ahora, cada personaje se identifica con sus iniciales y el color de su faccion.",
          },
        ]}
      />

      <CTASection
        title="Dale vida a tus personajes"
        subtitle="Crea fichas con evolucion, facciones y conexiones a toda tu novela. Gratis."
      />
    </>
  );
}
