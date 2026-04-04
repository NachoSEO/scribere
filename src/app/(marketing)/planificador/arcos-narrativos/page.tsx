import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MockYBNAArcs } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Arcos narrativos con resolucion YBNA - Scritura | Planificador",
  description:
    "Disena arcos narrativos con planteamiento, nudo y desenlace. Clasifica cada resolucion como Si, Si pero, No o No y ademas. Vincula arcos a hitos y personajes.",
};

function ArcMock() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--color-ink)]">
          Arco: El cristal muerto
        </h3>
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
          Si, pero...
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <p className="mb-2 text-xs font-semibold text-[var(--color-accent)]">Planteamiento</p>
          <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
            Lyra trabaja como aprendiz en los talleres de cristales de Sorvara. Un
            cristal que todos dan por muerto responde a su tacto. La Orden lo nota.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <p className="mb-2 text-xs font-semibold text-[var(--color-accent)]">Nudo</p>
          <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
            Fuera de Sorvara, Lyra descubre que cada resonancia le cuesta un recuerdo
            de su infancia. La Orden la persigue. Nira le ensena a resonar sin
            cristales, pero la alianza es fragil.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <p className="mb-2 text-xs font-semibold text-[var(--color-accent)]">Desenlace</p>
          <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
            Lyra consigue despertar el cristal muerto y romper el monopolio de la
            Orden, pero ha perdido todos los recuerdos de su madre.
          </p>
        </div>
      </div>

      {/* Hito origin/destination */}
      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
        <span className="font-medium">Hitos:</span>
        <span className="rounded-md bg-[var(--color-cream)] px-2 py-0.5">
          La vida en los talleres
        </span>
        <span>&#8594;</span>
        <span className="rounded-md bg-[var(--color-cream)] px-2 py-0.5">
          Despertar del don
        </span>
      </div>

      {/* Characters */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-[var(--color-ink-muted)]">Personajes:</span>
        <span className="rounded-md bg-[var(--color-cream-dark)] px-2 py-0.5 text-xs text-[var(--color-ink-muted)]">
          Lyra
        </span>
        <span className="rounded-md bg-[var(--color-cream-dark)] px-2 py-0.5 text-xs text-[var(--color-ink-muted)]">
          Kael
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
            <span className="text-[var(--color-accent)]">con resolucion</span>
          </>
        }
        subtitle="Cada trama necesita un principio, un conflicto y un cierre. Estructura tus arcos con planteamiento, nudo y desenlace, y clasifica la resolucion: el personaje lo consigue, lo consigue con un precio, fracasa, o fracasa y todo empeora."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <ArcMock />
      </section>

      <FeatureShowcase
        features={[
          {
            title: "Cuatro tipos de resolucion narrativa",
            description:
              "Cada arco se cierra de una de cuatro formas: Si (el personaje logra su objetivo), Si pero (lo logra con un coste), No (fracasa) o No y ademas (fracasa y las consecuencias empeoran). Este sistema YBNA te obliga a decidir como termina cada trama antes de escribirla. El cristal muerto de Lyra es un \"Si, pero...\": consigue romper el monopolio de la Orden, pero pierde los recuerdos de su madre. Esa claridad cambia como escribes cada escena.",
            visual: <MockYBNAArcs />,
          },
        ]}
      />

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
              ritmo.
            </p>
            <p>
              Scritura te da un espacio dedicado para cada arco, con planteamiento,
              nudo y desenlace. Pero ademas te pide que elijas el tipo de resolucion.
              No es lo mismo que Lyra consiga despertar el cristal (Si) a que lo
              consiga perdiendo sus recuerdos (Si, pero...). Definir eso antes de
              escribir te da una brujula para cada escena del arco. Y cada arco se
              ancla a dos hitos: el que lo origina y el que lo cierra, para que
              siempre sepas donde empieza y donde termina dentro de la estructura.
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
                Dale un nombre que identifique la trama: &quot;El cristal muerto&quot;,
                &quot;La proteccion de Kael&quot; o &quot;Alianza con Nira&quot;.
                Selecciona los personajes involucrados.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Estructura y elige resolucion
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Define planteamiento, nudo y desenlace. Despues selecciona el tipo
                YBNA: Si, Si pero, No o No y ademas. Esa decision marca el tono de
                todo el arco.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Ancla a dos hitos
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Selecciona el hito donde nace el arco y el hito donde se cierra.
                Asi el arco queda integrado en la estructura de fases y hitos de
                tu novela, no flotando en el vacio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Herramientas relacionadas"
        links={[
          {
            title: "Estructura",
            description: "Visualiza fases, hitos, arcos y escenas en un arbol jerarquico completo.",
            href: "/planificador/estructura",
          },
          {
            title: "Hitos",
            description: "Define los momentos clave que originan y cierran cada arco narrativo.",
            href: "/planificador/hitos",
          },
          {
            title: "Personajes",
            description: "Crea fichas de Lyra, Kael y cada personaje que participa en tus arcos.",
            href: "/planificador/personajes",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Que es el sistema YBNA?",
            answer:
              "YBNA son cuatro tipos de resolucion narrativa: Si (Yes), Si pero (Yes But), No, y No y ademas (No And). Clasificar cada arco con uno de estos tipos te obliga a decidir como termina la trama antes de escribirla. Un \"Si, pero...\" como el de Lyra genera un tipo de tension muy distinto a un \"No y ademas\" como el de Aldric.",
          },
          {
            question: "Cuantos arcos puedo crear por proyecto?",
            answer:
              "No hay limite. Puedes crear tantos arcos como necesites: trama principal, subtramas, arcos de personaje, tramas romanticas y cualquier linea argumental.",
          },
          {
            question: "Como se conectan los arcos con los hitos?",
            answer:
              "Cada arco tiene un hito de origen y un hito de destino. El hito de origen marca donde nace la trama y el de destino donde se cierra. Asi el arco queda anclado a la estructura temporal de tu novela.",
          },
          {
            question: "Puedo usar una estructura diferente a planteamiento/nudo/desenlace?",
            answer:
              "La estructura de tres partes es flexible. Puedes adaptar cada seccion a tu metodo: acto I/II/III, setup/confrontation/resolution, o cualquier variacion que prefieras. Los nombres son orientativos.",
          },
        ]}
      />

      <CTASection
        title="Estructura tus tramas con proposito"
        subtitle="Cada arco merece un planteamiento, un conflicto y una resolucion clara. Empieza gratis."
      />
    </>
  );
}
