import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Eventos - Scritura | Herramienta para escritores",
  description:
    "Conecta los eventos que mueven tu trama con personajes, lugares y cronologia. Cada suceso tiene contexto, causa y consecuencia en tu novela.",
};

function EventCardMock() {
  const events = [
    {
      name: "Desaparicion de Sofia",
      chronology: "Hace 10 anos — Noche de San Juan",
      characters: ["Sofia", "Don Ramon"],
      places: ["El jardin secreto"],
      description:
        "Sofia desaparece la noche de la hoguera de San Juan. La ultima persona que la vio fue Don Ramon, aunque el nunca lo admitio.",
    },
    {
      name: "Llegada de la carta",
      chronology: "Dia 1 — Lunes por la manana",
      characters: ["Elena"],
      places: ["Madrid — Apartamento de Elena"],
      description:
        "Elena recibe un sobre sin remitente con detalles sobre la desaparicion de su hermana que solo Sofia podria conocer.",
    },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-3">
      {events.map((event) => (
        <div
          key={event.name}
          className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm"
        >
          <h3 className="mb-1 text-sm font-bold text-[var(--color-ink)]">{event.name}</h3>
          <p className="mb-3 text-xs font-medium text-[var(--color-accent)]">
            {event.chronology}
          </p>
          <p className="mb-3 text-xs leading-relaxed text-[var(--color-ink-light)]">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {event.characters.map((char) => (
              <span
                key={char}
                className="rounded-md bg-[var(--color-cream)] px-2 py-0.5 text-xs text-[var(--color-ink-muted)]"
              >
                {char}
              </span>
            ))}
            {event.places.map((place) => (
              <span
                key={place}
                className="rounded-md border border-[var(--color-border)] bg-white px-2 py-0.5 text-xs text-[var(--color-ink-muted)]"
              >
                {place}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventosPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Conecta los eventos
            <br />
            <span className="text-[var(--color-accent)]">que mueven tu trama</span>
          </>
        }
        subtitle="Cada evento conecta personajes, lugares y cronologia. Construye una red de sucesos que de coherencia y profundidad a tu historia."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <EventCardMock />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas gestionar los eventos
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Las novelas son redes de causa y efecto. Un evento desencadena otro,
              que a su vez cambia la situacion de un personaje, que toma una decision
              que provoca un nuevo evento. Si pierdes el hilo de esta cadena,
              aparecen los agujeros de guion.
            </p>
            <p>
              El gestor de eventos de Scritura te permite documentar cada suceso
              importante de tu novela y vincularlo con los personajes que participan,
              los lugares donde ocurre y su posicion en la cronologia. Asi puedes
              rastrear las consecuencias de cada accion y asegurarte de que todo
              encaja. Especialmente util en novelas con multiples lineas temporales,
              flashbacks o historias corales.
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
                Registra el evento
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dale un nombre y describe que ocurre. No necesitas una narracion
                elaborada: una descripcion funcional que capture la esencia del
                suceso.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Situa en la cronologia
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Indica cuando ocurre el evento dentro de la linea temporal de tu
                novela. Puede ser una fecha concreta, un momento relativo ("Dia 3")
                o una referencia temporal ("Antes de la guerra").
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Conecta personajes y lugares
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Vincula al evento los personajes involucrados y el lugar donde
                sucede. Estas conexiones crean la red que da solidez a tu trama.
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
            description: "Los hitos son eventos estructurales que marcan puntos de inflexion en la trama.",
            href: "/planificador/hitos",
          },
          {
            title: "Lugares",
            description: "Documenta los escenarios donde ocurren los eventos de tu novela.",
            href: "/planificador/lugares",
          },
          {
            title: "Personajes",
            description: "Vincula los personajes que participan en cada evento.",
            href: "/planificador/personajes",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Cual es la diferencia entre un evento y una escena?",
            answer:
              "Un evento es algo que ocurre en la historia (un hecho). Una escena es una unidad narrativa que muestra ese hecho (o cualquier otra accion) al lector. Un evento puede mencionarse sin tener escena propia, o puede desarrollarse a lo largo de varias escenas.",
          },
          {
            question: "Puedo crear eventos que ocurran antes de la novela?",
            answer:
              "Si. Los eventos de backstory son fundamentales para entender motivaciones y conflictos. Documentarlos te ayuda a mantener la coherencia de lo que los personajes saben y cuando lo saben.",
          },
          {
            question: "Puedo vincular un evento a multiples personajes y lugares?",
            answer:
              "Si. Cada evento puede tener tantos personajes y lugares vinculados como necesites. Un gran evento puede involucrar a muchos personajes en distintos escenarios.",
          },
        ]}
      />

      <CTASection
        title="Conecta cada pieza de tu trama"
        subtitle="Personajes, lugares y cronologia en una red de eventos coherente."
      />
    </>
  );
}
