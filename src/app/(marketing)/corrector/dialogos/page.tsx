import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Dialogos con raya segun la RAE - Scritura | Herramienta para escritores",
  description:
    "Revisa que tus dialogos usen la raya y la puntuacion segun la norma de la RAE. Scritura detecta errores de formato en dialogos en espanol.",
};

export default function DialogosPage() {
  return (
    <>
      <HeroSection
        badge="Dialogos"
        title={
          <>
            Dialogos con guion largo{" "}
            <span className="text-[var(--color-accent)]">segun la RAE</span>
          </>
        }
        subtitle="El formato de dialogo en espanol tiene reglas precisas sobre la raya, los incisos y la puntuacion. Scritura revisa que tus dialogos cumplan la norma de la RAE."
      />

      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                <HighlightedText color="rgba(140,110,85,0.25)" borderColor="#8c6e55">
                  - No me esperaba esto
                </HighlightedText>
                {" "}dijo Carlos.
              </p>
              <p className="mb-3">
                <HighlightedText color="rgba(140,110,85,0.25)" borderColor="#8c6e55">
                  -Yo tampoco -
                </HighlightedText>
                {" "}respondio Lucia{" "}
                <HighlightedText color="rgba(140,110,85,0.25)" borderColor="#8c6e55">
                  - pero tendremos que aceptarlo.
                </HighlightedText>
              </p>
              <p>
                <HighlightedText color="rgba(140,110,85,0.25)" borderColor="#8c6e55">
                  &quot;Esto no puede ser verdad&quot;
                </HighlightedText>
                , penso ella mirando por la ventana.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Dialogos", count: 4, color: "#8c6e55", on: true },
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
              En espanol, los dialogos se marcan con raya (—), no con guion
              corto (-) ni con comillas anglosajonas (&quot; &quot;). La RAE
              establece reglas precisas sobre cuando la raya va pegada al texto,
              cuando lleva espacio y como se puntuan los incisos del narrador.
            </p>
            <p>
              El formato incorrecto de dialogo es una de las senales que mas
              rapido delatan a un escritor novato ante un editor o agente
              literario. No importa lo buena que sea la historia: si los
              dialogos estan mal formateados, la primera impresion es de
              descuido.
            </p>
            <p>
              Scritura detecta guiones cortos donde deberia haber rayas, comillas
              anglosajonas en dialogos, espacios mal colocados alrededor de la
              raya y errores de puntuacion en los incisos del narrador.
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
                  "Copia un fragmento con dialogos de tu manuscrito.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Dialogos\". Los errores de formato se resaltaran en marron.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Sustituye guiones por rayas, ajusta espacios y revisa la puntuacion de cada inciso.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#8c6e55] text-sm font-bold text-white">
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
            <p className="mb-2">
              <span className="rounded bg-red-200/60 px-1">- No me esperaba esto</span> dijo Carlos.
            </p>
            <p>
              <span className="rounded bg-red-200/60 px-1">- Yo tampoco -</span> respondio Lucia <span className="rounded bg-red-200/60 px-1">- pero tendremos que aceptarlo.</span>
            </p>
          </>
        }
        after={
          <>
            <p className="mb-2">
              —No me esperaba esto —dijo Carlos.
            </p>
            <p>
              —Yo tampoco —respondio Lucia—, pero tendremos que aceptarlo.
            </p>
          </>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Vocativos",
            description:
              "Los dialogos son donde mas se olvidan las comas de vocativo.",
            href: "/corrector/vocativos",
          },
          {
            title: "Parrafos",
            description:
              "Controla tambien la longitud de los parrafos narrativos entre dialogos.",
            href: "/corrector/parrafos",
          },
          {
            title: "Frases largas",
            description:
              "Los parlamentos de los personajes tambien pueden ser demasiado largos.",
            href: "/corrector/frases-largas",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Cual es la norma de la RAE para dialogos?",
            answer:
              "La RAE establece que los dialogos en espanol se abren con raya (—) pegada a la primera palabra. Los incisos del narrador van entre rayas, con la segunda raya pegada a la palabra anterior del inciso. La puntuacion del dialogo se coloca despues de la raya de cierre del inciso.",
          },
          {
            question: "¿Cual es la diferencia entre guion y raya?",
            answer:
              "El guion (-) es corto y se usa para partir palabras o formar compuestos. La raya (—) es larga y se usa para dialogos e incisos. Son caracteres diferentes: el guion esta en el teclado; la raya se inserta con Alt+0151 (Windows) o Option+Shift+- (Mac).",
          },
          {
            question: "¿Scritura corrige el formato automaticamente?",
            answer:
              "Scritura senala los errores de formato, pero no los corrige automaticamente. Te muestra donde estan los problemas para que apliques la correccion manualmente con la confianza de saber que sigues la norma.",
          },
        ]}
      />

      <CTASection
        title="Formatea tus dialogos como un profesional"
        subtitle="Pega tu manuscrito y Scritura revisara el formato de cada dialogo."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
