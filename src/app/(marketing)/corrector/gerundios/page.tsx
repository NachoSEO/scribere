import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Detector de gerundios - Scritura | Herramienta para escritores",
  description:
    "Identifica gerundios que lastran tu narrativa. Scritura los resalta para que elijas construcciones mas directas y dinamicas.",
};

export default function GerundiosPage() {
  return (
    <>
      <HeroSection
        badge="Gerundios"
        title={
          <>
            Identifica gerundios{" "}
            <span className="text-[var(--color-accent)]">
              que lastran tu narrativa
            </span>
          </>
        }
        subtitle="El gerundio es correcto en espanol, pero su abuso produce una prosa blanda y sin ritmo. Scritura te muestra cada uno para que decidas si merece quedarse."
      />

      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                Marina salio de casa{" "}
                <HighlightedText color="rgba(204,133,61,0.25)" borderColor="#cc853d">
                  llevando
                </HighlightedText>{" "}
                en la mano un paraguas rojo. Cruzo la plaza{" "}
                <HighlightedText color="rgba(204,133,61,0.25)" borderColor="#cc853d">
                  mirando
                </HighlightedText>{" "}
                al suelo,{" "}
                <HighlightedText color="rgba(204,133,61,0.25)" borderColor="#cc853d">
                  esquivando
                </HighlightedText>{" "}
                los charcos que la lluvia habia dejado durante la noche.
              </p>
              <p>
                Al llegar a la esquina se detuvo,{" "}
                <HighlightedText color="rgba(204,133,61,0.25)" borderColor="#cc853d">
                  dudando
                </HighlightedText>{" "}
                si torcer a la derecha o seguir recto{" "}
                <HighlightedText color="rgba(204,133,61,0.25)" borderColor="#cc853d">
                  esperando
                </HighlightedText>{" "}
                encontrar la cafeteria abierta.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Gerundios", count: 5, color: "#cc853d", on: true },
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
              El gerundio expresa accion simultanea o inmediatamente anterior a
              otra. Cuando se usa para acciones posteriores (&ldquo;Salio de
              casa cerrando la puerta&rdquo;) o se encadenan varios en la misma
              oracion, el resultado es una prosa que se arrastra.
            </p>
            <p>
              En la narrativa en espanol, el abuso del gerundio produce lo que
              los editores llaman &ldquo;prosa gelatinosa&rdquo;: frases que no
              avanzan, que dan vueltas en torno a la accion sin llegar a ella.
            </p>
            <p>
              La alternativa suele ser una oracion coordinada o un verbo
              conjugado: &ldquo;Cruzo la plaza mirando al suelo&rdquo; se
              convierte en &ldquo;Cruzo la plaza con la mirada en el
              suelo&rdquo; o, mejor aun, &ldquo;Cruzo la plaza, los ojos fijos
              en los adoquines&rdquo;.
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
                  "Copia un capitulo o fragmento y pegalo en el editor de Scritura.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Gerundios\" en el panel lateral. Cada gerundio se resaltara en naranja.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Evalua si cada gerundio es simultaneo, posterior o innecesario, y reformula los que sobren.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#cc853d] text-sm font-bold text-white">
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
            &ldquo;Salio de casa{" "}
            <span className="rounded bg-red-200/60 px-1">cerrando</span> la
            puerta y{" "}
            <span className="rounded bg-red-200/60 px-1">bajando</span> las
            escaleras{" "}
            <span className="rounded bg-red-200/60 px-1">corriendo</span>,{" "}
            <span className="rounded bg-red-200/60 px-1">llegando</span> a la
            calle justo cuando el autobus arrancaba.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;Cerro la puerta, bajo las escaleras de tres en tres y alcanzo
            la calle justo cuando el autobus arrancaba.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Adverbios en -mente",
            description:
              "Otro habito que debilita la prosa cuando se acumula.",
            href: "/corrector/adverbios",
          },
          {
            title: "Frases largas",
            description:
              "Los gerundios encadenados suelen producir oraciones interminables.",
            href: "/corrector/frases-largas",
          },
          {
            title: "Verbos debiles",
            description:
              "Un verbo preciso elimina la necesidad del gerundio auxiliar.",
            href: "/corrector/verbos-debiles",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Cuando es incorrecto un gerundio?",
            answer:
              "Un gerundio es incorrecto cuando expresa posterioridad (\"Salio cerrando la puerta\") o cuando funciona como adjetivo de un sustantivo que no sea agua, hierro u otros tradicionales (\"un decreto regulando\" en vez de \"un decreto que regula\").",
          },
          {
            question: "¿Cual es la alternativa?",
            answer:
              "La alternativa mas comun es una oracion coordinada con verbo conjugado, una construccion con preposicion (\"con la mirada fija\") o simplemente reordenar la frase para que la accion sea directa.",
          },
          {
            question: "¿Detecta todos los gerundios?",
            answer:
              "Si. Scritura detecta todas las formas verbales terminadas en -ando, -endo e -iendo, incluyendo formas compuestas como \"habiendo llegado\". Tu decides cuales son problematicos.",
          },
        ]}
      />

      <CTASection
        title="Analiza los gerundios de tu manuscrito"
        subtitle="Pega tu texto y Scritura resaltara cada gerundio al instante."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
