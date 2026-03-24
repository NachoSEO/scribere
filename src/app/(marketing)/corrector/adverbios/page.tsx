import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Detector de adverbios en -mente - Scritura | Herramienta para escritores",
  description:
    "Detecta adverbios terminados en -mente que debilitan tu prosa. Scritura los resalta en tiempo real para que elijas verbos mas precisos.",
};

export default function AdverbiosPage() {
  return (
    <>
      <HeroSection
        badge="Adverbios"
        title={
          <>
            Detecta adverbios en -mente{" "}
            <span className="text-[var(--color-accent)]">
              que debilitan tu prosa
            </span>
          </>
        }
        subtitle="Los adverbios terminados en -mente son el recurso facil del escritor novato. Scritura los resalta para que decidas si cada uno merece su lugar o si un verbo preciso haria mejor el trabajo."
      />

      {/* MockEditor */}
      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                El detective avanzo{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  cautelosamente
                </HighlightedText>{" "}
                por el pasillo. La puerta del fondo estaba{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  parcialmente
                </HighlightedText>{" "}
                abierta y una luz palida se filtraba{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  debilmente
                </HighlightedText>{" "}
                por la rendija.
              </p>
              <p>
                Respiro{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  profundamente
                </HighlightedText>{" "}
                y empujo la puerta. La habitacion olia{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  intensamente
                </HighlightedText>{" "}
                a tabaco y a algo mas que no supo identificar{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  inmediatamente
                </HighlightedText>
                .
              </p>
            </>
          }
          sidebarItems={[
            { label: "Adverbios -mente", count: 6, color: "#c4a45f", on: true },
          ]}
        />
      </section>

      {/* Por que importa */}
      <section className="border-t border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que importa
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Stephen King lo dijo sin rodeos: &ldquo;El camino al infierno esta
              empedrado de adverbios&rdquo;. En espanol el problema se agrava
              porque los adverbios en -mente son palabras largas y sonoras que
              ralentizan el ritmo de la frase.
            </p>
            <p>
              Un adverbio ocasional no dana tu prosa, pero cuando aparecen tres
              o cuatro en un mismo parrafo, el texto pierde fuerza. El lector
              percibe un autor que explica demasiado en lugar de mostrar.
            </p>
            <p>
              La solucion casi nunca es eliminar el adverbio y punto: es
              encontrar un verbo mas preciso que ya contenga el matiz.
              &ldquo;Caminar lentamente&rdquo; se convierte en
              &ldquo;deambular&rdquo;; &ldquo;mirar fijamente&rdquo;, en
              &ldquo;escrutar&rdquo;.
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
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
                  "Copia un fragmento de tu manuscrito y pegalo en el editor de Scritura.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Adverbios -mente\" en el panel lateral. Cada adverbio se resaltara en dorado.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Revisa cada adverbio resaltado y decide: eliminarlo, buscar un verbo mejor o dejarlo si es necesario.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#c4a45f] text-sm font-bold text-white">
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

      {/* Before/After */}
      <BeforeAfter
        title="Ejemplos"
        before={
          <p>
            &ldquo;El viejo pescador remo{" "}
            <span className="rounded bg-red-200/60 px-1">lentamente</span> hacia
            la costa mientras el sol descendia{" "}
            <span className="rounded bg-red-200/60 px-1">rapidamente</span> por
            el horizonte. Estaba{" "}
            <span className="rounded bg-red-200/60 px-1">completamente</span>{" "}
            agotado.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;El viejo pescador bogaba hacia la costa mientras el sol se
            desplomaba por el horizonte. Estaba exhausto.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Gerundios",
            description:
              "Otra construccion que ralentiza la prosa cuando se abusa de ella.",
            href: "/corrector/gerundios",
          },
          {
            title: "Verbos debiles",
            description:
              "Sustituir verbos debiles reduce la necesidad de adverbios.",
            href: "/corrector/verbos-debiles",
          },
          {
            title: "Reiteraciones",
            description:
              "Si repites el mismo adverbio, el problema se multiplica.",
            href: "/corrector/reiteraciones",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Que son los adverbios en -mente?",
            answer:
              "Son adverbios de modo formados anadiendo el sufijo -mente a un adjetivo: lentamente, rapidamente, completamente. En espanol son muy frecuentes y, cuando se acumulan, producen una prosa pesada y monotona.",
          },
          {
            question: "¿Son siempre incorrectos?",
            answer:
              "No. Un adverbio en -mente bien colocado puede ser la mejor opcion. El problema aparece cuando se abusa de ellos. Scritura los resalta para que decidas: no te obliga a eliminar ninguno.",
          },
          {
            question: "¿Scritura corrige automaticamente los adverbios?",
            answer:
              "No. Scritura es una herramienta de analisis, no de correccion automatica. Te muestra donde estan los adverbios para que tu, como escritor, decidas la mejor reformulacion.",
          },
          {
            question: "¿Mi texto es privado?",
            answer:
              "Absolutamente. Todo el analisis se ejecuta en tu navegador. Tu texto nunca se envia a ningun servidor.",
          },
        ]}
      />

      <CTASection
        title="Descubre cuantos adverbios esconde tu texto"
        subtitle="Pega tu manuscrito y Scritura los resaltara al instante. Sin registro, sin limites."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
