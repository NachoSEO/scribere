import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MockHitoTypes } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Hitos narrativos con tipos y POV - Scritura | Planificador",
  description:
    "Marca los momentos clave de tu historia con tres tipos de hito: normalidad, incidente incitador y cambio de fase. Asigna personaje POV e informacion revelada.",
};

export default function HitosPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Marca los momentos clave
            <br />
            <span className="text-[var(--color-accent)]">de tu historia</span>
          </>
        }
        subtitle="Tres tipos de hito con codigos de color, personaje POV e informacion revelada. Cada hito marca un antes y un despues en la estructura de tu novela."
      />

      {/* Mock UI - Hito types */}
      <section className="px-8 pb-20">
        <div className="mx-auto max-w-lg">
          <MockHitoTypes />
        </div>
      </section>

      <FeatureShowcase
        features={[
          {
            title: "Tres tipos de hito para una estructura con ritmo",
            description:
              "Normalidad (gris) establece el status quo: la vida de Lyra en los talleres antes de que todo cambie. Cambio de fase (ambar) marca las transiciones entre actos: Kael saca a Lyra de Sorvara y arranca el viaje. Incidente incitador (rosa) es el momento que rompe la normalidad para siempre: solo hay uno por novela, y es el que fuerza al protagonista a actuar.",
            visual: <MockHitoTypes />,
          },
        ]}
      />

      {/* POV tracking */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Controla el punto de vista en cada hito
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Cada hito tiene un campo de personaje POV. Esto te permite saber
              desde que perspectiva vive el lector cada momento clave. Si el
              incidente incitador lo vive Lyra pero el cambio de fase lo ve
              Kael, esa alternancia queda registrada.
            </p>
            <p>
              Cuando revisas la lista de hitos, ves de un vistazo como se
              distribuye el punto de vista a lo largo de la novela. Si un
              personaje tiene demasiados hitos seguidos o si otro desaparece
              durante todo un acto, lo detectas antes de que sea un problema en
              el manuscrito.
            </p>
          </div>
        </div>
      </section>

      {/* Por que necesitas esto */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas hitos
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Los hitos son los momentos que el lector recuerda: el giro que no
              esperaba, la revelacion que lo cambia todo, la decision que define
              al protagonista. Sin hitos claros, la novela se siente plana, como
              un viaje sin destino.
            </p>
            <p>
              Planificar los hitos antes de escribir no significa perder
              espontaneidad. Significa saber hacia donde va la historia, para que
              cada escena que escribas tenga un proposito. Los mejores escritores
              de thrillers, fantasia y drama conocen sus momentos clave antes de
              redactar la primera linea. Scritura te da un espacio para definir
              cada hito con su tipo, su personaje POV y la informacion que
              revela al lector.
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
                Elige el tipo de hito
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Selecciona entre normalidad, incidente incitador o cambio de
                fase. Cada tipo tiene su color y su funcion narrativa. Recuerda:
                solo un incidente incitador por novela.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Asigna POV e informacion revelada
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Indica desde que personaje vive el lector este momento. Escribe
                la informacion que el hito revela: un secreto, una regla del
                mundo, una motivacion oculta.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Anade escenas al hito
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dentro de cada hito, crea las escenas que lo componen. Un hito
                puede tener una sola escena o varias que construyen el momento
                progresivamente.
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
            description:
              "Ve todos tus hitos en el arbol de estructura.",
            href: "/planificador/estructura",
          },
          {
            title: "Fases",
            description:
              "Organiza tus hitos dentro de las fases que estructuran la novela.",
            href: "/planificador/fases",
          },
          {
            title: "Escenas",
            description:
              "Descompone cada hito en las escenas concretas que lo construyen.",
            href: "/planificador/escenas",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Que tipos de hitos hay y cuando uso cada uno?",
            answer:
              "Normalidad (gris) establece el status quo, el mundo antes del conflicto. Incidente incitador (rosa) es el momento que rompe esa normalidad y obliga al protagonista a actuar; solo hay uno por novela. Cambio de fase (ambar) marca las transiciones entre actos: el paso a la accion, la crisis, el climax.",
          },
          {
            question: "Por que solo un incidente incitador por novela?",
            answer:
              "El incidente incitador es el evento que rompe la normalidad del protagonista de forma irreversible. Si hay varios, la estructura se diluye y el lector no sabe cual es el verdadero arranque de la historia. Los demas giros importantes son cambios de fase.",
          },
          {
            question: "Para que sirve el campo de informacion revelada?",
            answer:
              "Cada hito revela algo al lector: una regla del mundo, un secreto, una motivacion. Documentar que informacion nueva aporta cada hito te ayuda a controlar el ritmo de las revelaciones y a evitar que el lector sepa demasiado o demasiado poco en cada punto.",
          },
          {
            question: "Puedo cambiar el personaje POV de un hito?",
            answer:
              "Si. El campo POV se puede editar en cualquier momento. Si decides que un hito funciona mejor desde la perspectiva de Kael en vez de Lyra, cambias el POV y la vista de estructura refleja el cambio al instante.",
          },
        ]}
      />

      <CTASection
        title="Define los momentos que importan"
        subtitle="Cada hito con su tipo, su POV y la informacion que revela. Planifica la estructura de tu novela."
      />
    </>
  );
}
