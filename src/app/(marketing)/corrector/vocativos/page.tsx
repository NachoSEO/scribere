import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Detector de vocativos - Scritura | Herramienta para escritores",
  description:
    "Detecta comas de vocativo que faltan en tu texto. Scritura te ayuda a puntuar correctamente cuando te diriges a alguien por su nombre.",
};

export default function VocativosPage() {
  return (
    <>
      <HeroSection
        badge="Vocativos"
        title={
          <>
            Comas de vocativo{" "}
            <span className="text-[var(--color-accent)]">
              que faltan en tu texto
            </span>
          </>
        }
        subtitle="La coma de vocativo no es opcional: cambia el significado de la frase. Scritura detecta los nombres propios y apelativos que necesitan una coma para sonar como deben."
      />

      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                —
                <HighlightedText color="rgba(85,105,155,0.25)" borderColor="#55699b">
                  Ven Juan
                </HighlightedText>
                , necesito hablar contigo —dijo Maria desde la cocina.
              </p>
              <p className="mb-3">
                —No te preocupes{" "}
                <HighlightedText color="rgba(85,105,155,0.25)" borderColor="#55699b">
                  mama
                </HighlightedText>
                . Ya he terminado los deberes.
              </p>
              <p>
                —
                <HighlightedText color="rgba(85,105,155,0.25)" borderColor="#55699b">
                  Senores
                </HighlightedText>{" "}
                la sesion va a comenzar. Les ruego que tomen asiento.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Vocativos", count: 3, color: "#55699b", on: true },
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
              La coma de vocativo es la que separa al nombre de la persona a
              quien nos dirigimos del resto de la oracion. Su ausencia cambia el
              significado: &ldquo;Vamos a comer, ninos&rdquo; es una invitacion;
              &ldquo;Vamos a comer ninos&rdquo; es una amenaza.
            </p>
            <p>
              En la ficcion, los dialogos son el lugar donde mas se olvida esta
              coma. Cuando un personaje llama a otro por su nombre — &ldquo;Ven
              Juan&rdquo; en vez de &ldquo;Ven, Juan&rdquo; — el lector nota
              la ausencia, aunque no sepa nombrar el error.
            </p>
            <p>
              Scritura detecta nombres propios y apelativos comunes (mama, papa,
              senor, amigo, hijo) que aparecen junto a verbos imperativos o en
              posicion de vocativo, y senala los que carecen de coma.
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
                  "Copia un fragmento con dialogos o con interpelaciones directas.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Vocativos\". Los vocativos sin coma se resaltaran en azul.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Anade la coma antes o despues del vocativo segun su posicion en la frase.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#55699b] text-sm font-bold text-white">
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
            &ldquo;
            <span className="rounded bg-red-200/60 px-1">Ven Juan</span>{" "}
            necesito que me ayudes. No te preocupes{" "}
            <span className="rounded bg-red-200/60 px-1">hijo</span> todo
            saldra bien.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;Ven, Juan, necesito que me ayudes. No te preocupes, hijo,
            todo saldra bien.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Dialogos",
            description:
              "Revisa tambien el formato de tus dialogos con raya segun la RAE.",
            href: "/corrector/dialogos",
          },
          {
            title: "Posesivos",
            description:
              "Otra categoria que mejora la correccion gramatical de tu texto.",
            href: "/corrector/posesivos",
          },
          {
            title: "Conjunciones",
            description:
              "Analiza la estructura sintactica junto con los vocativos.",
            href: "/corrector/conjunciones",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Que es un vocativo?",
            answer:
              "Un vocativo es la palabra o grupo de palabras con que nos dirigimos a alguien: \"Juan\", \"senora\", \"amigos mios\". Siempre va separado del resto de la oracion por coma.",
          },
          {
            question: "¿Por que importa la coma de vocativo?",
            answer:
              "Porque cambia el significado. \"Vamos a comer, Carlos\" es una invitacion. \"Vamos a comer Carlos\" sugiere que Carlos es el plato. La coma aclara quien es el destinatario del mensaje.",
          },
          {
            question: "¿Detecta todos los vocativos?",
            answer:
              "Scritura detecta nombres propios y apelativos comunes (mama, papa, hijo, senor, amigo, etc.) en posicion de vocativo. Puede no detectar apelativos inusuales o inventados, pero cubre la gran mayoria de casos.",
          },
        ]}
      />

      <CTASection
        title="Puntua tus vocativos correctamente"
        subtitle="Pega tu texto y Scritura te mostrara las comas que faltan."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
