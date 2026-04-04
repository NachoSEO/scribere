import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { BenefitStrip } from "@/components/marketing/BenefitStrip";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MockEstructuraSpine } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Estructura narrativa - Vista de columna vertebral | Scritura",
  description:
    "Visualiza la estructura completa de tu novela: fases, hitos, arcos y escenas en un arbol jerarquico. Filtra por personaje POV o tipo de hito.",
};

export default function EstructuraPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Ve la columna vertebral
            <br />
            <span className="text-[var(--color-accent)]">de tu novela</span>
          </>
        }
        subtitle="Fases, hitos, arcos y escenas en un solo arbol. Filtra por personaje, por tipo de hito o por capa narrativa. La estructura completa de tu historia, de un vistazo."
      />

      <BenefitStrip
        items={[
          {
            value: "Fases > Hitos > Arcos > Escenas",
            label: "Jerarquia narrativa completa",
          },
          { value: "Filtro POV", label: "Ve la historia desde un personaje" },
          { value: "4 modos de vista", label: "Todo, Hitos, Arcos o Escenas" },
          { value: "Colores por tipo", label: "Normalidad, giro, incidente" },
        ]}
      />

      <FeatureShowcase
        features={[
          {
            title: "La estructura completa en una sola pantalla",
            description:
              "La vista de estructura muestra tu novela como un arbol jerarquico. En el primer nivel estan las fases (actos). Dentro de cada fase, los hitos que marcan los giros. Conectando hitos, los arcos narrativos con su tipo de resolucion. Y bajo cada hito, las escenas concretas. Todo junto, todo visible.",
            visual: <MockEstructuraSpine />,
          },
        ]}
      />

      {/* Filter modes and POV */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-ink)]">
            Cuatro formas de mirar tu novela
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
              <div className="mb-2 inline-block rounded-md bg-[var(--color-ink)] px-2.5 py-1 text-[10px] font-medium text-white">
                Todo
              </div>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                La vista completa: fases, hitos, arcos y escenas. Para cuando
                necesitas ver como encaja cada pieza en el conjunto.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
              <div className="mb-2 inline-block rounded-md bg-[var(--color-cream-dark)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-ink-muted)]">
                Hitos
              </div>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                Solo los momentos clave. Ideal para revisar la columna vertebral
                sin el ruido de las escenas individuales.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
              <div className="mb-2 inline-block rounded-md bg-[var(--color-cream-dark)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-ink-muted)]">
                Arcos
              </div>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                Los arcos narrativos con su tipo de resolucion. Para ver como
                las tramas se entrecruzan entre hitos y fases.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5">
              <div className="mb-2 inline-block rounded-md bg-[var(--color-cream-dark)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-ink-muted)]">
                Escenas
              </div>
              <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
                La lista de escenas agrupada por hito. Para cuando te sientes a
                escribir y necesitas saber cual toca.
              </p>
            </div>
          </div>

          {/* POV filtering */}
          <div className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--color-ink)]">
              Filtra por punto de vista
            </h3>
            <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
              Selecciona un personaje en el desplegable POV y la estructura se
              filtra para mostrar solo los hitos donde ese personaje es narrador.
              Sirve para comprobar que cada linea narrativa tiene su propio ritmo
              y que ningun personaje desaparece demasiado tiempo.
            </p>
          </div>
        </div>
      </section>

      {/* Por que necesitas esto */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas esta vista
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Cuando una novela supera las 50 escenas, la estructura se vuelve
              dificil de retener. Sabes que escribiste un giro importante en
              algun punto del segundo acto, pero no recuerdas si fue antes o
              despues de la traicion. El antagonista tenia un arco que se resolvia
              con un &ldquo;no, y...&rdquo; pero no encuentras donde empieza.
            </p>
            <p>
              La vista de estructura resuelve eso. Es el mapa de tu novela, no
              un esquema generico de tres actos, sino la estructura real de TU
              historia con TUS hitos, TUS arcos y TUS escenas. Puedes abrir
              cualquier fase y ver exactamente que pasa dentro, o colapsar todo
              y ver solo la columna vertebral.
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-t border-[var(--color-border)] bg-white px-8 py-20">
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
                Crea fases y hitos
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Divide tu historia en fases (actos, partes). Dentro de cada
                fase, crea los hitos que marcan los giros clave. Cada hito
                tiene un tipo: normalidad, cambio de fase o incidente incitador.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Conecta con arcos narrativos
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Los arcos van de un hito de origen a un hito de destino. En la
                vista de estructura aparecen como conectores entre hitos, con
                el color de su resolucion: verde (si), ambar (si, pero),
                rojo claro (no, y), rojo (no).
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Filtra para enfocar
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Usa los modos de vista para mostrar solo lo que necesitas.
                Filtra por POV para seguir la linea de un personaje. Colapsa
                fases para ver solo la estructura macro.
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
            description:
              "Divide tu novela en actos y partes. Las fases son el primer nivel de la estructura.",
            href: "/planificador/fases",
          },
          {
            title: "Hitos",
            description:
              "Los momentos clave que impulsan la trama: incidentes, giros y climax.",
            href: "/planificador/hitos",
          },
          {
            title: "Arcos narrativos",
            description:
              "Los hilos que conectan hitos con planteamiento, nudo, desenlace y resolucion.",
            href: "/planificador/arcos-narrativos",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Puedo crear escenas desde la vista de estructura?",
            answer:
              "No directamente. La vista de estructura es de lectura y navegacion. Para crear escenas, ve a la seccion de Escenas o al Manuscrito. Los cambios se reflejan automaticamente en la estructura.",
          },
          {
            question: "Que significan los colores de los hitos?",
            answer:
              "Gris es normalidad (estado base), ambar es cambio de fase (transicion entre actos) y rosa es incidente incitador (el evento que rompe la normalidad). Cada tipo tiene un papel distinto en la estructura narrativa.",
          },
          {
            question: "Puedo filtrar por varios personajes a la vez?",
            answer:
              "El filtro POV muestra un personaje a la vez. Cambialo tantas veces como necesites para comparar las lineas narrativas de distintos personajes.",
          },
          {
            question:
              "Que son los indicadores de color en los arcos (Si, Si pero, No y, No)?",
            answer:
              "Son los cuatro tipos de resolucion narrativa. Un arco puede resolverse con un Si (exito), Si pero (exito con coste), No y (fracaso con consecuencias) o No (fracaso limpio). Es una herramienta clasica de guion adaptada a la novela.",
          },
        ]}
      />

      <CTASection
        title="Tu novela tiene estructura. Ahora puedes verla."
        subtitle="Fases, hitos, arcos y escenas en un solo arbol. Gratis."
      />
    </>
  );
}
