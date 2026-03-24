import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Detector de posesivos innecesarios - Scritura | Herramienta para escritores",
  description:
    "Detecta posesivos innecesarios que contaminan tu prosa con calcos del ingles. Scritura te ayuda a escribir un espanol mas natural.",
};

export default function PosesivosPage() {
  return (
    <>
      <HeroSection
        badge="Posesivos"
        title={
          <>
            Detecta posesivos{" "}
            <span className="text-[var(--color-accent)]">innecesarios</span>
          </>
        }
        subtitle="En espanol, los posesivos son mucho menos necesarios que en ingles. Scritura los resalta para que elimines los que sobran y tu prosa suene genuina."
      />

      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                Levanto{" "}
                <HighlightedText color="rgba(88,155,155,0.25)" borderColor="#589b9b">
                  su
                </HighlightedText>{" "}
                mano derecha y se acaricio{" "}
                <HighlightedText color="rgba(88,155,155,0.25)" borderColor="#589b9b">
                  su
                </HighlightedText>{" "}
                barbilla.{" "}
                <HighlightedText color="rgba(88,155,155,0.25)" borderColor="#589b9b">
                  Su
                </HighlightedText>{" "}
                mirada se perdio en{" "}
                <HighlightedText color="rgba(88,155,155,0.25)" borderColor="#589b9b">
                  su
                </HighlightedText>{" "}
                reflejo del espejo mientras pensaba en{" "}
                <HighlightedText color="rgba(88,155,155,0.25)" borderColor="#589b9b">
                  su
                </HighlightedText>{" "}
                problema.
              </p>
              <p>
                Guardo{" "}
                <HighlightedText color="rgba(88,155,155,0.25)" borderColor="#589b9b">
                  sus
                </HighlightedText>{" "}
                llaves en{" "}
                <HighlightedText color="rgba(88,155,155,0.25)" borderColor="#589b9b">
                  su
                </HighlightedText>{" "}
                bolsillo y cerro{" "}
                <HighlightedText color="rgba(88,155,155,0.25)" borderColor="#589b9b">
                  su
                </HighlightedText>{" "}
                puerta al salir.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Posesivos", count: 8, color: "#589b9b", on: true },
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
              En ingles es obligatorio decir &ldquo;He raised his hand&rdquo;.
              En espanol no: &ldquo;Levanto la mano&rdquo; es suficiente porque
              el contexto deja claro de quien es la mano. Anadir
              &ldquo;su&rdquo; cuando no es necesario produce un calco del
              ingles que suena artificioso.
            </p>
            <p>
              El abuso de posesivos es uno de los errores mas frecuentes en
              traducciones y en autores hispanohablantes que leen mucho en
              ingles. Frases como &ldquo;Metio su mano en su bolsillo&rdquo;
              son comprensibles pero torpes: &ldquo;Metio la mano en el
              bolsillo&rdquo; es mas limpio y mas espanol.
            </p>
            <p>
              La regla es sencilla: si el contexto deja claro quien posee, el
              posesivo sobra. Solo debes usarlo cuando hay ambiguedad real sobre
              el poseedor.
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
                  "Copia cualquier fragmento donde sospeches que hay posesivos de mas.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Posesivos\". Cada posesivo se resaltara en verde azulado.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Sustituye \"su\" por el articulo (\"la mano\", \"el bolsillo\") salvo que haya ambiguedad.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#589b9b] text-sm font-bold text-white">
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
            &ldquo;Cerro{" "}
            <span className="rounded bg-red-200/60 px-1">sus</span> ojos y
            apoyo{" "}
            <span className="rounded bg-red-200/60 px-1">su</span> cabeza en{" "}
            <span className="rounded bg-red-200/60 px-1">su</span> almohada.{" "}
            <span className="rounded bg-red-200/60 px-1">Su</span> cuerpo
            estaba agotado.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;Cerro los ojos y apoyo la cabeza en la almohada. Tenia el
            cuerpo agotado.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Conjunciones",
            description:
              "Otra categoria que analiza la densidad de elementos gramaticales en tu prosa.",
            href: "/corrector/conjunciones",
          },
          {
            title: "Vocativos",
            description:
              "Detecta otro tipo de error frecuente relacionado con la puntuacion.",
            href: "/corrector/vocativos",
          },
          {
            title: "Verbos debiles",
            description:
              "Los posesivos innecesarios suelen acompanar a verbos debiles.",
            href: "/corrector/verbos-debiles",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Por que los posesivos son un problema en espanol?",
            answer:
              "Porque en espanol el contexto suele dejar claro el poseedor, y el posesivo resulta redundante. Su abuso es un calco del ingles donde el posesivo es obligatorio (\"his hand\", \"her eyes\").",
          },
          {
            question: "¿Cuando debo usar un posesivo?",
            answer:
              "Cuando hay ambiguedad real. Si dos personajes estan en escena y dices \"levanto la mano\", quiza necesites \"su\" para aclarar de quien es. Pero si solo hay un sujeto, el articulo basta.",
          },
          {
            question: "¿Es un error del espanol o del ingles?",
            answer:
              "No es un error gramatical, sino estilistico. La frase es correcta con o sin posesivo, pero la version sin el suena mas natural en espanol. Los mejores prosistas en castellano los usan con moderacion.",
          },
        ]}
      />

      <CTASection
        title="Limpia tu prosa de posesivos innecesarios"
        subtitle="Pega tu texto y descubre cuantos posesivos pueden convertirse en articulos."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
