import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Arcos narrativos - Scritura | Herramienta para escritores",
  description:
    "Disena arcos narrativos completos con planteamiento, nudo y desenlace. Estructura cada trama de tu novela con claridad y proposito.",
};

function ArcMock() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--color-ink)]">
          Arco: La busqueda de Elena
        </h3>
        <span className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
          Trama principal
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <p className="mb-2 text-xs font-semibold text-[var(--color-accent)]">Planteamiento</p>
          <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
            Elena vuelve a su pueblo natal tras recibir una carta anonima sobre la
            desaparicion de su hermana hace diez anos.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <p className="mb-2 text-xs font-semibold text-[var(--color-accent)]">Nudo</p>
          <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
            Las pistas la llevan a descubrir que varios vecinos ocultan
            informacion. Su propia familia le miente sobre aquella noche.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <p className="mb-2 text-xs font-semibold text-[var(--color-accent)]">Desenlace</p>
          <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
            Elena descubre que su hermana huyo por voluntad propia, protegiendo a
            la familia de un secreto mayor.
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-[var(--color-ink-muted)]">Personajes:</span>
        <span className="rounded-md bg-[var(--color-cream-dark)] px-2 py-0.5 text-xs text-[var(--color-ink-muted)]">
          Elena Marchetti
        </span>
        <span className="rounded-md bg-[var(--color-cream-dark)] px-2 py-0.5 text-xs text-[var(--color-ink-muted)]">
          Sofia Marchetti
        </span>
      </div>
    </div>
  );
}

export default function ArcosNarrativosPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Disena arcos narrativos
            <br />
            <span className="text-[var(--color-accent)]">completos</span>
          </>
        }
        subtitle="Cada trama necesita un principio, un conflicto y una resolucion. Estructura tus arcos narrativos para que ninguna linea argumental quede sin cerrar."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <ArcMock />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas arcos narrativos
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Una novela sin arcos narrativos es una coleccion de cosas que pasan.
              Los arcos le dan forma a la historia: crean expectativa, tension y
              satisfaccion. Son el esqueleto invisible que sostiene cada capitulo.
            </p>
            <p>
              El problema es que, conforme la novela crece, las tramas se
              multiplican. La trama principal, las subtramas, los arcos de
              personajes secundarios... Sin una herramienta que los organice, es
              facil que una subtrama quede sin resolver o que un arco pierda su
              ritmo. Scritura te da un espacio dedicado para cada arco, con la
              estructura clasica de planteamiento, nudo y desenlace.
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
                Nombra el arco
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dale un nombre descriptivo que identifique la trama: "La redencion
                de Marco", "El secreto del pueblo" o "Romance entre Ana y Luis".
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Estructura en tres partes
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Define el planteamiento (donde arranca la trama), el nudo (el
                conflicto central) y el desenlace (como se resuelve). Tres campos
                que obligan a pensar en la progresion.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Vincula personajes
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Asocia los personajes involucrados en cada arco. Asi controlas que
                personajes participan en cada trama y evitas inconsistencias.
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
            description: "Organiza tus arcos dentro de la estructura de actos y fases de la novela.",
            href: "/planificador/fases",
          },
          {
            title: "Hitos",
            description: "Marca los momentos clave que hacen avanzar cada arco narrativo.",
            href: "/planificador/hitos",
          },
          {
            title: "Personajes",
            description: "Crea fichas completas para los personajes que protagonizan cada arco.",
            href: "/planificador/personajes",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Cuantos arcos puedo crear por proyecto?",
            answer:
              "No hay limite. Puedes crear tantos arcos como necesites: trama principal, subtramas, arcos de personaje, tramas romanticas, etc.",
          },
          {
            question: "Puedo usar una estructura diferente a planteamiento/nudo/desenlace?",
            answer:
              "La estructura de tres partes es flexible. Puedes adaptar cada seccion a tu metodo: acto I/II/III, setup/confrontation/resolution, o cualquier variacion que prefieras.",
          },
          {
            question: "Como conecto un arco con las escenas?",
            answer:
              "Los arcos se vinculan a personajes, y los personajes se vinculan a escenas. Asi, puedes rastrear como cada arco se desarrolla a traves de las escenas de tu novela.",
          },
        ]}
      />

      <CTASection
        title="Estructura tus tramas desde hoy"
        subtitle="Cada arco narrativo merece un planteamiento, un nudo y un desenlace. Empieza gratis."
      />
    </>
  );
}
