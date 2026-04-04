import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MockMentionInText } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Escenas con editor y @menciones - Scritura | Planificador",
  description:
    "Escribe y organiza cada escena de tu novela con resumen, objetivo narrativo, personajes vinculados y @menciones en el contenido. Construye tu historia escena a escena.",
};

function SceneCardsMock() {
  const scenes = [
    {
      title: "Amanecer en los talleres",
      summary:
        "Lyra llega a los talleres al alba. Los cristales de la boveda han perdido brillo esta temporada y nadie sabe por que.",
      objective:
        "Establecer la rutina de Lyra y plantar la semilla del oscurecimiento",
      characters: ["Lyra"],
    },
    {
      title: "El cristal responde",
      summary:
        "Durante la clase de afinacion, un cristal muerto reacciona al contacto de Lyra. La sesion se detiene. Nadie dice nada.",
      objective:
        "El incidente incitador: el don de Lyra se manifiesta",
      characters: ["Lyra", "Maestro Aldric"],
    },
    {
      title: "Kael en las sombras",
      summary:
        "Kael observa desde las gradas superiores. Toma nota de lo que acaba de pasar y abandona la sala antes de que alguien lo vea.",
      objective:
        "Presentar al deuteragonista y su conexion con el conflicto",
      characters: ["Kael"],
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {scenes.map((scene, index) => (
        <div
          key={scene.title}
          className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-cream-dark)] text-xs font-bold text-[var(--color-ink-muted)]">
              {index + 1}
            </span>
            <h3 className="text-sm font-bold text-[var(--color-ink)]">
              {scene.title}
            </h3>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-[var(--color-ink-light)]">
            {scene.summary}
          </p>
          <div className="mb-2">
            <span className="text-xs font-semibold text-[var(--color-ink-muted)]">
              Objetivo:{" "}
            </span>
            <span className="text-xs text-[var(--color-ink-light)]">
              {scene.objective}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {scene.characters.map((char) => (
              <span
                key={char}
                className="rounded-md bg-[var(--color-cream)] px-2 py-0.5 text-xs text-[var(--color-ink-muted)]"
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EscenasPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Escribe y organiza
            <br />
            <span className="text-[var(--color-accent)]">cada escena</span>
          </>
        }
        subtitle="Cada escena tiene un resumen, un objetivo narrativo y personajes vinculados. Cuando te sientes a escribir en el editor, puedes mencionar personajes y lugares con @ directamente en el texto."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <SceneCardsMock />
      </section>

      <FeatureShowcase
        features={[
          {
            title: "Menciona personajes y lugares mientras escribes",
            description:
              "Dentro del editor de cada escena, escribe @ seguido de un nombre. El sistema sugiere personajes, lugares, facciones y eventos que coincidan. Cada mencion queda marcada con una pastilla de color segun su tipo: marron para personajes, verde azulado para lugares, morado para facciones, naranja para eventos. Un clic en la mencion te lleva a la ficha completa.",
            visual: <MockMentionInText />,
          },
        ]}
      />

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas organizar tus escenas
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Las escenas son los ladrillos con los que se construye una novela.
              Cada una debe avanzar la trama, revelar algo del personaje o
              cambiar las condiciones del conflicto. Si una escena no cumple
              ninguna de estas funciones, sobra.
            </p>
            <p>
              El problema aparece cuando escribes sin un plan de escenas. Acabas
              con capitulos que no avanzan, repeticiones innecesarias y un ritmo
              irregular. Con el organizador de escenas de Scritura, defines antes
              de escribir que debe lograr cada escena, quien participa y como
              conecta con la estructura general. Cuando te sientes a redactar,
              sabes exactamente que necesitas.
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
                Crea la escena
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Anade un titulo y un resumen breve de lo que ocurre. No necesitas
                escribir la prosa todavia; basta con una descripcion funcional de
                la accion.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Define el objetivo narrativo
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Escribe en una frase que debe lograr esta escena: presentar un
                personaje, revelar una pista, elevar la tension. Si no puedes
                definirlo, quiza la escena no es necesaria.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Vincula personajes y escribe con @
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Selecciona los personajes que aparecen en la escena. Dentro del
                editor, usa @menciones para referenciar personajes, lugares y
                eventos directamente en el texto.
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
            description:
              "Agrupa escenas bajo hitos narrativos para darles contexto dentro de la estructura.",
            href: "/planificador/hitos",
          },
          {
            title: "Manuscrito",
            description:
              "Escribe las escenas completas en el editor con @menciones.",
            href: "/planificador/manuscrito",
          },
          {
            title: "Lugares",
            description:
              "Define los escenarios donde transcurren tus escenas y marcalos en el mapa.",
            href: "/planificador/lugares",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Puedo reordenar las escenas una vez creadas?",
            answer:
              "Si. Las escenas se pueden reordenar libremente arrastrando y soltando. Experimentar con el orden es parte del proceso creativo.",
          },
          {
            question: "Como funcionan las @menciones dentro de una escena?",
            answer:
              "Escribe @ seguido del nombre de un personaje, lugar, faccion o evento. El editor sugiere coincidencias y las marca con una pastilla de color segun el tipo. Puedes hacer clic en cualquier mencion para ir a su ficha.",
          },
          {
            question: "Puedo vincular una escena a un hito?",
            answer:
              "Si. Las escenas se crean dentro de hitos, lo que te permite ver como cada momento clave se descompone en escenas concretas.",
          },
          {
            question: "Hay limite de escenas por proyecto?",
            answer:
              "No. Puedes crear todas las escenas que necesites. Una novela puede tener 50, 100 o 200 escenas sin ninguna restriccion.",
          },
        ]}
      />

      <CTASection
        title="Organiza cada escena de tu novela"
        subtitle="Del resumen al texto con @menciones. Empieza a estructurar tus escenas hoy."
      />
    </>
  );
}
