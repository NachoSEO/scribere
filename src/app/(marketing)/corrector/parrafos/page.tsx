import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Detector de parrafos cortos - Scritura | Herramienta para escritores",
  description:
    "Identifica parrafos demasiado cortos o largos que rompen el flujo narrativo. Scritura te ayuda a construir una estructura de parrafos equilibrada.",
};

export default function ParrafosPage() {
  return (
    <>
      <HeroSection
        badge="Parrafos"
        title={
          <>
            Parrafos demasiado cortos{" "}
            <span className="text-[var(--color-accent)]">
              que rompen el flujo
            </span>
          </>
        }
        subtitle="Un parrafo de una sola frase puede ser un golpe de efecto. Diez seguidos son un texto roto. Scritura te muestra la estructura de parrafos para que encuentres el equilibrio."
      />

      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                <HighlightedText color="rgba(158,149,140,0.2)" borderColor="#9e9590">
                  La noche cayo sobre el pueblo.
                </HighlightedText>
              </p>
              <p className="mb-3">
                <HighlightedText color="rgba(158,149,140,0.2)" borderColor="#9e9590">
                  Todo estaba en silencio.
                </HighlightedText>
              </p>
              <p className="mb-3">
                <HighlightedText color="rgba(158,149,140,0.2)" borderColor="#9e9590">
                  Ni un solo ruido.
                </HighlightedText>
              </p>
              <p className="mb-3">
                <HighlightedText color="rgba(158,149,140,0.2)" borderColor="#9e9590">
                  Marcos se asomo a la ventana.
                </HighlightedText>
              </p>
              <p>
                Al otro lado del cristal, la plaza del pueblo yacia desierta
                bajo la luz anaranjada de las farolas. Las sombras de los
                platanos se alargaban sobre el empedrado como dedos oscuros.
                Ninguna ventana encendida. Ningun perro ladrando. Solo el viento
                entre las ramas y el murmullo lejano del rio.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Parrafos", count: 4, color: "#9e9590", on: true },
          ]}
        />
      </section>

      <section className="border-t border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que importa
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              La fragmentacion excesiva de parrafos es un habito que viene del
              periodismo y de las redes sociales, donde cada frase ocupa un
              parrafo para facilitar la lectura en pantalla. En ficcion, este
              estilo produce un ritmo entrecortado que impide la inmersion.
            </p>
            <p>
              Un parrafo de una sola frase es una herramienta poderosa:
              ralentiza el ritmo, crea una pausa dramatica, resalta una idea.
              Pero si todos los parrafos son de una frase, el efecto se diluye
              y el texto parece un guion de Twitter, no una novela.
            </p>
            <p>
              Scritura resalta los parrafos que contienen una sola oracion para
              que los evalues: ¿es un golpe de efecto calculado o una
              fragmentacion innecesaria? Tambien senala parrafos excesivamente
              largos que podrian beneficiarse de una division.
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-ink)]">
            Como funciona
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Pega tu texto",
                description:
                  "Copia un capitulo completo para que el analisis de parrafos tenga suficiente contexto.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Parrafos\". Los parrafos cortos se resaltaran en gris suave.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Evalua si cada parrafo corto es intencional. Si no, fusionalo con el anterior o el siguiente.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#9e9590] text-sm font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfter
        title="Ejemplos"
        before={
          <>
            <p className="mb-2">&ldquo;La noche cayo sobre el pueblo.</p>
            <p className="mb-2">Todo estaba en silencio.</p>
            <p className="mb-2">Ni un solo ruido.</p>
            <p>Marcos se asomo a la ventana.&rdquo;</p>
          </>
        }
        after={
          <p>
            &ldquo;La noche cayo sobre el pueblo y todo quedo en silencio.
            Marcos se asomo a la ventana, pero ni un solo ruido le llego desde
            la calle.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Frases largas",
            description:
              "Controla el ritmo a nivel de frase ademas de a nivel de parrafo.",
            href: "/corrector/frases-largas",
          },
          {
            title: "Reiteraciones",
            description:
              "Los parrafos cortos repetitivos suelen contener palabras reiteradas.",
            href: "/corrector/reiteraciones",
          },
          {
            title: "Dialogos",
            description:
              "En los dialogos, los parrafos cortos son naturales y no se penalizan.",
            href: "/corrector/dialogos",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Que tan corto es \"demasiado corto\"?",
            answer:
              "Scritura senala los parrafos de una sola oracion como potencialmente demasiado cortos. No es un error automatico: a veces un parrafo de una frase es exactamente lo que necesitas. La herramienta los resalta para que los evalues conscientemente.",
          },
          {
            question: "¿Cuando estan bien los parrafos cortos?",
            answer:
              "Un parrafo corto es efectivo cuando rompe un patron largo para crear impacto dramatico, cuando marca un cambio de perspectiva o cuando es una linea de dialogo. El problema es la acumulacion de muchos seguidos sin proposito.",
          },
          {
            question: "¿Como cuenta los parrafos?",
            answer:
              "Scritura cuenta como parrafo cada bloque de texto separado por un salto de linea. Mide el numero de oraciones y palabras por parrafo para determinar si es corto, medio o largo.",
          },
        ]}
      />

      <CTASection
        title="Revisa la estructura de tus parrafos"
        subtitle="Pega tu manuscrito y descubre si tus parrafos tienen el ritmo adecuado."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
