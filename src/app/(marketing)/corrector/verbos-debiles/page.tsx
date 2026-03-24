import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Detector de verbos debiles - Scritura | Herramienta para escritores",
  description:
    "Sustituye verbos debiles como ser, estar, haber, decir y hacer por verbos precisos que den fuerza a tu narrativa.",
};

export default function VerbosDebilesPage() {
  return (
    <>
      <HeroSection
        badge="Verbos debiles"
        title={
          <>
            Sustituye verbos debiles{" "}
            <span className="text-[var(--color-accent)]">
              por verbos precisos
            </span>
          </>
        }
        subtitle="Ser, estar, haber, decir, hacer: los verbos comodin del espanol. Scritura los resalta para que busques el verbo exacto que tu escena necesita."
      />

      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                La casa{" "}
                <HighlightedText color="rgba(189,87,73,0.25)" borderColor="#bd5749">
                  era
                </HighlightedText>{" "}
                grande y{" "}
                <HighlightedText color="rgba(189,87,73,0.25)" borderColor="#bd5749">
                  estaba
                </HighlightedText>{" "}
                rodeada de arboles viejos.{" "}
                <HighlightedText color="rgba(189,87,73,0.25)" borderColor="#bd5749">
                  Habia
                </HighlightedText>{" "}
                una fuente en el jardin que ya no funcionaba y un gato que siempre{" "}
                <HighlightedText color="rgba(189,87,73,0.25)" borderColor="#bd5749">
                  estaba
                </HighlightedText>{" "}
                dormido en el porche.
              </p>
              <p>
                —Tenemos que{" "}
                <HighlightedText color="rgba(189,87,73,0.25)" borderColor="#bd5749">
                  hacer
                </HighlightedText>{" "}
                algo —
                <HighlightedText color="rgba(189,87,73,0.25)" borderColor="#bd5749">
                  dijo
                </HighlightedText>{" "}
                Marcos—. No podemos{" "}
                <HighlightedText color="rgba(189,87,73,0.25)" borderColor="#bd5749">
                  estar
                </HighlightedText>{" "}
                aqui para siempre.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Verbos debiles", count: 7, color: "#bd5749", on: true },
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
              Los verbos debiles son los comodines del idioma: sirven para todo,
              pero no dicen nada. &ldquo;La casa era grande&rdquo; es correcto,
              pero &ldquo;La casa se alzaba sobre el valle&rdquo; muestra una
              imagen.
            </p>
            <p>
              El problema no es usar &ldquo;ser&rdquo; o &ldquo;estar&rdquo;
              una vez, sino depender de ellos como muleta. Cuando un parrafo
              encadena tres o cuatro verbos debiles, la prosa se vuelve plana,
              descriptiva en el peor sentido: enumera sin evocar.
            </p>
            <p>
              Scritura detecta formas de ser, estar, haber, decir, hacer, tener
              e ir. No todos son problematicos — &ldquo;dijo&rdquo; en un
              dialogo suele ser invisible — pero conviene saber donde se
              acumulan.
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
                  "Copia cualquier fragmento de tu novela, relato o ensayo.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Verbos debiles\" en el panel lateral. Cada verbo se resaltara en rojo suave.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Busca un verbo que contenga el significado del verbo debil mas su complemento: \"era grande\" → \"se alzaba\".",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#bd5749] text-sm font-bold text-white">
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
            &ldquo;La habitacion{" "}
            <span className="rounded bg-red-200/60 px-1">era</span> oscura y{" "}
            <span className="rounded bg-red-200/60 px-1">habia</span> un olor
            fuerte.{" "}
            <span className="rounded bg-red-200/60 px-1">Habia</span> una mesa
            en el centro y encima{" "}
            <span className="rounded bg-red-200/60 px-1">habia</span> un sobre
            cerrado.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;La oscuridad inundaba la habitacion y un olor fuerte le golpeo
            la cara. Una mesa ocupaba el centro; encima, un sobre
            cerrado.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Adverbios en -mente",
            description:
              "Los verbos debiles suelen ir acompanados de adverbios innecesarios.",
            href: "/corrector/adverbios",
          },
          {
            title: "Gerundios",
            description:
              "Otra construccion que conviene vigilar para mantener la prosa agil.",
            href: "/corrector/gerundios",
          },
          {
            title: "Frases largas",
            description:
              "Los verbos debiles tienden a alargar las frases sin anadir significado.",
            href: "/corrector/frases-largas",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Que son los verbos debiles?",
            answer:
              "Son verbos de significado muy amplio — ser, estar, haber, tener, hacer, decir, ir — que funcionan como comodines. En si mismos no son incorrectos, pero su acumulacion produce una prosa plana y poco evocadora.",
          },
          {
            question: "¿Son siempre un problema?",
            answer:
              "No. \"Dijo\" en un dialogo suele ser la mejor opcion precisamente porque es invisible. El problema aparece cuando la descripcion y la narracion dependen de ellos constantemente.",
          },
          {
            question: "¿Que verbos detecta Scritura?",
            answer:
              "Scritura detecta todas las conjugaciones de ser, estar, haber, tener, hacer, decir e ir. Incluye formas simples y compuestas: \"estaba\", \"habia sido\", \"fue hecho\", etc.",
          },
        ]}
      />

      <CTASection
        title="Encuentra los verbos debiles de tu texto"
        subtitle="Pega tu manuscrito y descubre donde tu prosa puede ganar precision."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
