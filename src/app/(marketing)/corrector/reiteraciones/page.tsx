import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Detector de reiteraciones - Scritura | Herramienta para escritores",
  description:
    "Encuentra repeticiones cercanas de palabras que tu ojo ya no detecta. Scritura resalta las reiteraciones para que tu prosa suene fresca.",
};

export default function ReiteracionesPage() {
  return (
    <>
      <HeroSection
        badge="Reiteraciones"
        title={
          <>
            Encuentra repeticiones{" "}
            <span className="text-[var(--color-accent)]">
              que tu ojo no ve
            </span>
          </>
        }
        subtitle="Cuando llevas horas con un texto, tu cerebro normaliza las repeticiones. Scritura las resalta para que cada palabra gane su lugar por merito propio."
      />

      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                Abrio la{" "}
                <HighlightedText color="rgba(175,85,110,0.25)" borderColor="#af556e">
                  puerta
                </HighlightedText>{" "}
                del despacho y encontro al viejo sentado detras de la mesa. El
                viejo no levanto la{" "}
                <HighlightedText color="rgba(175,85,110,0.25)" borderColor="#af556e">
                  mirada
                </HighlightedText>
                . Siguio escribiendo con su pluma de{" "}
                <HighlightedText color="rgba(175,85,110,0.25)" borderColor="#af556e">
                  siempre
                </HighlightedText>
                .
              </p>
              <p>
                Cerro la{" "}
                <HighlightedText color="rgba(175,85,110,0.25)" borderColor="#af556e">
                  puerta
                </HighlightedText>{" "}
                sin hacer ruido y espero. La{" "}
                <HighlightedText color="rgba(175,85,110,0.25)" borderColor="#af556e">
                  mirada
                </HighlightedText>{" "}
                del viejo se clavo en el como{" "}
                <HighlightedText color="rgba(175,85,110,0.25)" borderColor="#af556e">
                  siempre
                </HighlightedText>
                , helada y silenciosa.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Reiteraciones", count: 6, color: "#af556e", on: true },
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
              La repeticion involuntaria es uno de los defectos mas comunes y
              mas dificiles de detectar por el propio autor. Tras horas de
              escritura, el cerebro se acostumbra a las palabras y deja de
              registrar que &ldquo;puerta&rdquo; aparece tres veces en el mismo
              parrafo.
            </p>
            <p>
              La repeticion deliberada es una figura retorica poderosa —
              anafora, epifora, anadiplosis —, pero la involuntaria senala
              pobreza lexica o, peor, descuido. El lector la percibe como un
              tropiezo, una nota desafinada en la melodia del texto.
            </p>
            <p>
              Scritura resalta las palabras que aparecen demasiado cerca unas de
              otras, excluyendo articulos, preposiciones y conjunciones. Tu
              decides si la repeticion es intencional o si necesita un sinonimo.
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
                  "Copia al menos un par de parrafos para que el detector tenga contexto suficiente.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Reiteraciones\". Las palabras repetidas se resaltaran en rosa.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Busca un sinonimo, reformula la frase o confirma que la repeticion es intencional.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#af556e] text-sm font-bold text-white">
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
          <p>
            &ldquo;La{" "}
            <span className="rounded bg-red-200/60 px-1">lluvia</span> caia
            sobre el tejado y la{" "}
            <span className="rounded bg-red-200/60 px-1">lluvia</span> arrastraba
            las hojas hacia la cuneta. El sonido de la{" "}
            <span className="rounded bg-red-200/60 px-1">lluvia</span> le
            recordaba a su infancia.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;La lluvia caia sobre el tejado, arrastraba las hojas hacia
            la cuneta. Su repiqueteo le recordaba a la infancia.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Frecuencia de palabras",
            description:
              "Consulta la tabla de frecuencias para ver tus palabras mas usadas.",
            href: "/corrector/frecuencia-palabras",
          },
          {
            title: "Adverbios en -mente",
            description:
              "Los adverbios repetidos son una forma comun de reiteracion.",
            href: "/corrector/adverbios",
          },
          {
            title: "Frases largas",
            description:
              "Las frases largas tienen mas probabilidad de contener repeticiones.",
            href: "/corrector/frases-largas",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Que cuenta como una reiteracion?",
            answer:
              "Una reiteracion es la aparicion de la misma palabra (o su lema) dos o mas veces dentro de una distancia corta. Scritura analiza proximidad, no solo frecuencia absoluta.",
          },
          {
            question: "¿A que distancia detecta las repeticiones?",
            answer:
              "Por defecto, Scritura considera reiteracion cuando la misma palabra aparece dentro de un radio de unas 200 palabras. Es una distancia pensada para detectar repeticiones que el lector notaria.",
          },
          {
            question: "¿Puedo excluir palabras comunes?",
            answer:
              "Si. Scritura ya excluye automaticamente articulos, preposiciones y conjunciones. Las palabras funcionales del espanol no se marcan como reiteraciones.",
          },
        ]}
      />

      <CTASection
        title="Descubre las repeticiones ocultas en tu texto"
        subtitle="Pega tu manuscrito y Scritura resaltara cada reiteracion al instante."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
