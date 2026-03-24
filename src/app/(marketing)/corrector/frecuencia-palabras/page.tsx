import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Frecuencia de palabras - Scritura | Herramienta para escritores",
  description:
    "Descubre las palabras que mas usas con una tabla de frecuencias. Exporta a CSV y detecta muletillas invisibles en tu prosa.",
};

export default function FrecuenciaPalabrasPage() {
  return (
    <>
      <HeroSection
        badge="Frecuencia"
        title={
          <>
            Descubre las palabras{" "}
            <span className="text-[var(--color-accent)]">que mas usas</span>
          </>
        }
        subtitle="Cada escritor tiene sus muletillas invisibles. La tabla de frecuencias de Scritura las revela para que tu vocabulario sea tan rico como tu historia."
      />

      {/* Mock Frequency Table */}
      <section className="mx-auto max-w-3xl px-8 pb-20">
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3">
            <p className="text-xs font-semibold text-[var(--color-ink-muted)]">
              Frecuencia de palabras (sin palabras funcionales)
            </p>
            <span className="rounded-md border border-[var(--color-border)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-ink-muted)]">
              Exportar CSV
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                <th className="px-5 py-2.5">#</th>
                <th className="px-5 py-2.5">Palabra</th>
                <th className="px-5 py-2.5">Frecuencia</th>
                <th className="px-5 py-2.5">%</th>
                <th className="px-5 py-2.5" />
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { rank: 1, word: "momento", count: 47, pct: "1.8%", bar: "w-[90%]" },
                { rank: 2, word: "mirada", count: 38, pct: "1.5%", bar: "w-[73%]" },
                { rank: 3, word: "puerta", count: 34, pct: "1.3%", bar: "w-[65%]" },
                { rank: 4, word: "silencio", count: 29, pct: "1.1%", bar: "w-[56%]" },
                { rank: 5, word: "hombre", count: 27, pct: "1.0%", bar: "w-[52%]" },
                { rank: 6, word: "tiempo", count: 24, pct: "0.9%", bar: "w-[46%]" },
                { rank: 7, word: "ojos", count: 22, pct: "0.8%", bar: "w-[42%]" },
                { rank: 8, word: "noche", count: 19, pct: "0.7%", bar: "w-[37%]" },
                { rank: 9, word: "cabeza", count: 17, pct: "0.7%", bar: "w-[33%]" },
                { rank: 10, word: "manos", count: 15, pct: "0.6%", bar: "w-[29%]" },
              ].map((row) => (
                <tr
                  key={row.rank}
                  className="border-b border-[var(--color-border)] last:border-0"
                >
                  <td className="px-5 py-2 text-xs text-[var(--color-ink-muted)]">
                    {row.rank}
                  </td>
                  <td className="px-5 py-2 font-medium text-[var(--color-ink)]">
                    {row.word}
                  </td>
                  <td className="px-5 py-2 text-[var(--color-ink-light)]">
                    {row.count}
                  </td>
                  <td className="px-5 py-2 text-xs text-[var(--color-ink-muted)]">
                    {row.pct}
                  </td>
                  <td className="px-5 py-2">
                    <div className="h-1.5 w-24 rounded-full bg-[var(--color-cream-dark)]">
                      <div
                        className={`h-1.5 rounded-full bg-[#8b6f47] ${row.bar}`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que importa
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Todos los escritores tienen palabras fetiche: sustantivos que
              repiten sin darse cuenta, verbos comodin que aparecen cada pocas
              lineas, adjetivos que se convierten en tic. El problema es que el
              propio autor es el ultimo en notarlo.
            </p>
            <p>
              La tabla de frecuencias convierte una intuicion vaga (&ldquo;creo
              que uso mucho la palabra momento&rdquo;) en un dato objetivo
              (&ldquo;momento aparece 47 veces en mi manuscrito, es la palabra
              de contenido mas frecuente&rdquo;).
            </p>
            <p>
              Con esta informacion puedes buscar sinonimos, reformular frases o
              simplemente ser consciente de tus tendencias para controlarlas en
              la proxima revision.
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
                  "Copia tu manuscrito completo o un capitulo largo para obtener datos representativos.",
              },
              {
                step: "2",
                title: "Consulta la tabla",
                description:
                  "Scritura genera una tabla ordenada por frecuencia con las palabras de contenido mas usadas.",
              },
              {
                step: "3",
                title: "Exporta o corrige",
                description:
                  "Exporta la tabla a CSV para analizarla en una hoja de calculo, o revisa directamente en el editor.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#8b6f47] text-sm font-bold text-white">
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
            &ldquo;En aquel{" "}
            <span className="rounded bg-red-200/60 px-1">momento</span>, la{" "}
            <span className="rounded bg-red-200/60 px-1">mirada</span> de Clara
            se cruzo con la del extrano. Fue un{" "}
            <span className="rounded bg-red-200/60 px-1">momento</span> breve,
            pero su{" "}
            <span className="rounded bg-red-200/60 px-1">mirada</span> lo dijo
            todo.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;Los ojos de Clara se cruzaron con los del extrano. Fue un
            instante breve, pero aquel cruce lo dijo todo.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Reiteraciones",
            description:
              "Complementa la frecuencia global con la deteccion de repeticiones cercanas.",
            href: "/corrector/reiteraciones",
          },
          {
            title: "Metricas",
            description:
              "Consulta las estadisticas generales de tu texto junto con la frecuencia.",
            href: "/corrector/metricas",
          },
          {
            title: "Adverbios en -mente",
            description:
              "Muchos adverbios frecuentes son adverbios en -mente repetidos.",
            href: "/corrector/adverbios",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Como se calcula la frecuencia?",
            answer:
              "Scritura cuenta cada aparicion de cada palabra y ordena de mayor a menor. Por defecto muestra las palabras de contenido (sustantivos, verbos, adjetivos, adverbios), excluyendo palabras funcionales.",
          },
          {
            question: "¿Puedo exportar los datos?",
            answer:
              "Si. Puedes exportar la tabla completa de frecuencias a formato CSV con un solo clic. El archivo incluye la palabra, su frecuencia absoluta y su porcentaje sobre el total.",
          },
          {
            question: "¿Excluye las palabras funcionales?",
            answer:
              "Si. Por defecto, Scritura excluye articulos, preposiciones, conjunciones y pronombres atonos. Estas palabras son naturalmente las mas frecuentes en cualquier texto y no aportan informacion util sobre tu estilo.",
          },
        ]}
      />

      <CTASection
        title="Conoce tus palabras mas usadas"
        subtitle="Pega tu manuscrito y descubre las muletillas que se te escapan."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
