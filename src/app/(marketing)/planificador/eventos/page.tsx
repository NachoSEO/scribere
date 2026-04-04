import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MockCauseEffectChain } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Eventos con causa y consecuencia - Scritura | Planificador",
  description:
    "Conecta los eventos que mueven tu trama con causa directa, consecuencia, personajes, lugares y cronologia. Cada suceso encaja en la cadena narrativa.",
};

function EventCardMock() {
  const events = [
    {
      name: "El Oscurecimiento de los talleres",
      cronologia: "Dia 1 — Amanecer",
      personajes: ["Lyra"],
      lugares: ["Torre del Eco"],
      description:
        "Los cristales de los talleres de resonancia pierden brillo durante la noche. Lyra es la primera en notarlo cuando su cristal de trabajo no responde al contacto.",
      causa_directa: "La Gran Grieta subterranea absorbe resonancia de los cristales superficiales",
      consecuencia_directa: "La Orden cierra los talleres y convoca una reunion de emergencia",
    },
    {
      name: "Ataque al convoy de la Orden",
      cronologia: "Dia 12 — Puente de Cristal Roto",
      personajes: ["Kael", "Maestra Vael"],
      lugares: ["Puente de Cristal Roto"],
      description:
        "Los Despertadores emboscan un convoy de cristales refinados que cruza el puente. Kael intenta defender la carga. Vael destruye un cristal vivo delante de todos.",
      causa_directa: "Los Despertadores interceptan la ruta secreta filtrada por un topo en la Orden",
      consecuencia_directa: "El puente sufre danos estructurales. Lyra ve por primera vez lo que la resonancia liberada puede hacer",
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
            {event.cronologia}
          </p>
          <p className="mb-3 text-xs leading-relaxed text-[var(--color-ink-light)]">
            {event.description}
          </p>

          {/* Causa y consecuencia */}
          <div className="mb-3 space-y-2">
            <div className="rounded-lg bg-[var(--color-cream)] px-3 py-2">
              <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Causa directa
              </p>
              <p className="text-[11px] leading-relaxed text-[var(--color-ink-light)]">
                {event.causa_directa}
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-cream)] px-3 py-2">
              <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Consecuencia directa
              </p>
              <p className="text-[11px] leading-relaxed text-[var(--color-ink-light)]">
                {event.consecuencia_directa}
              </p>
            </div>
          </div>

          {/* Entity pills */}
          <div className="flex flex-wrap gap-1.5">
            {event.personajes.map((char) => (
              <span
                key={char}
                className="rounded-md bg-[#8b6f47]/10 px-2 py-0.5 text-[10px] font-medium text-[#8b6f47]"
              >
                {char}
              </span>
            ))}
            {event.lugares.map((place) => (
              <span
                key={place}
                className="rounded-md bg-[#589b9b]/10 px-2 py-0.5 text-[10px] font-medium text-[#589b9b]"
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
        subtitle="Cada evento conecta personajes, lugares y cronologia. Con causa y consecuencia, construyes la cadena de sucesos que da coherencia a tu historia."
      />

      {/* Event cards */}
      <section className="px-8 pb-20">
        <EventCardMock />
      </section>

      <FeatureShowcase
        features={[
          {
            title: "Cada evento tiene una causa y una consecuencia",
            description:
              "Las tramas se rompen cuando los eventos flotan sueltos. En Scritura, cada evento registra su causa directa (que lo provoco) y su consecuencia directa (que desencadena). Asi construyes una cadena narrativa donde nada ocurre por casualidad y todo tiene repercusion.",
            visual: <MockCauseEffectChain />,
          },
        ]}
      />

      {/* Multi-junction connections */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-ink)]">
            Un evento, multiples conexiones
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Personajes</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                Vincula todos los personajes involucrados. El ataque al convoy
                conecta a Kael, Vael y los guardias de la Orden. Cada vinculo
                queda registrado en la ficha del personaje.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Lugares</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                Cada evento ocurre en algun sitio. El Puente de Cristal Roto no
                es solo un escenario: es un lugar con historia propia que acumula
                los eventos que han pasado alli.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Hitos</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                Algunos eventos son tan importantes que marcan un antes y un
                despues. Conectalos con los hitos de tu estructura para saber
                exactamente donde cae cada punto de inflexion.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Escenas</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                Un evento puede desarrollarse en una escena o mencionarse en
                varias. Vincula eventos con escenas para saber que sucesos ya has
                narrado y cuales solo existen en la planificacion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que necesitas eventos */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas gestionar los eventos
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Las novelas son redes de causa y efecto. Un evento desencadena otro,
              que cambia la situacion de un personaje, que toma una decision que
              provoca un nuevo evento. Si pierdes el hilo de esta cadena,
              aparecen los agujeros de guion.
            </p>
            <p>
              El gestor de eventos de Scritura te permite documentar cada suceso
              importante y vincularlo con los personajes que participan, los
              lugares donde ocurre, su causa y su consecuencia. Asi puedes
              rastrear las repercusiones de cada accion y asegurarte de que todo
              encaja. Especialmente util en novelas con multiples lineas
              temporales, flashbacks o historias corales.
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
                Registra el evento
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dale un nombre, una cronologia y una descripcion. No necesitas
                una narracion elaborada: una descripcion funcional que capture
                la esencia del suceso.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Define causa y consecuencia
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Que provoco este evento? Que desencadena? Estos dos campos
                convierten una lista de sucesos en una cadena narrativa donde
                cada pieza tiene sentido.
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
            description: "Los hitos son eventos estructurales que marcan los puntos de inflexion de la trama.",
            href: "/planificador/hitos",
          },
          {
            title: "Manuscrito",
            description: "Menciona eventos con @ mientras escribes y mantenlos conectados a la narrativa.",
            href: "/planificador/manuscrito",
          },
          {
            title: "Lugares",
            description: "Documenta los escenarios donde ocurren los eventos de tu novela.",
            href: "/planificador/lugares",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Para que sirven la causa directa y la consecuencia?",
            answer:
              "Para que ningun evento flote suelto. La causa te obliga a pensar que lo provoco. La consecuencia, que desencadena. Juntas forman la cadena de causalidad que sostiene la trama y elimina los agujeros de guion.",
          },
          {
            question: "Cual es la diferencia entre un evento y una escena?",
            answer:
              "Un evento es algo que ocurre en la historia (un hecho). Una escena es una unidad narrativa que muestra ese hecho al lector. Un evento puede mencionarse sin tener escena propia, o desarrollarse a lo largo de varias escenas.",
          },
          {
            question: "Puedo crear eventos que ocurran antes de la novela?",
            answer:
              "Si. Los eventos de backstory son fundamentales para entender motivaciones. La Gran Escision ocurrio generaciones antes de la historia de Lyra, pero explica por que la Orden existe y por que Vael lucha.",
          },
          {
            question: "Puedo vincular un evento a multiples personajes y lugares?",
            answer:
              "Si. Cada evento puede tener tantos personajes y lugares vinculados como necesites. El ataque al convoy involucra a Kael, Vael y los guardias, y ocurre en el Puente de Cristal Roto.",
          },
        ]}
      />

      <CTASection
        title="Conecta cada pieza de tu trama"
        subtitle="Eventos con causa, consecuencia, personajes y lugares. La red narrativa que elimina los agujeros de guion."
      />
    </>
  );
}
