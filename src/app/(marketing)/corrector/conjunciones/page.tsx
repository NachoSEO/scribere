import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Detector de conjunciones - Scritura | Herramienta para escritores",
  description:
    "Analiza la densidad de conjunciones en tu texto. Scritura resalta coordinantes y subordinantes para que controles la complejidad sintactica.",
};

export default function ConjuncionesPage() {
  return (
    <>
      <HeroSection
        badge="Conjunciones"
        title={
          <>
            Analiza la densidad{" "}
            <span className="text-[var(--color-accent)]">de conjunciones</span>
          </>
        }
        subtitle="Las conjunciones son el pegamento de las frases. Demasiadas producen oraciones interminables; muy pocas, un estilo telegrafico. Scritura te ayuda a encontrar el equilibrio."
      />

      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                Salio de casa{" "}
                <HighlightedText color="rgba(147,112,158,0.25)" borderColor="#93709e">
                  y
                </HighlightedText>{" "}
                camino hasta la esquina,{" "}
                <HighlightedText color="rgba(147,112,158,0.25)" borderColor="#93709e">
                  pero
                </HighlightedText>{" "}
                el autobus ya habia pasado,{" "}
                <HighlightedText color="rgba(147,112,158,0.25)" borderColor="#93709e">
                  asi que
                </HighlightedText>{" "}
                decidio caminar{" "}
                <HighlightedText color="rgba(147,112,158,0.25)" borderColor="#93709e">
                  aunque
                </HighlightedText>{" "}
                sabia{" "}
                <HighlightedText color="rgba(147,112,158,0.25)" borderColor="#93709e">
                  que
                </HighlightedText>{" "}
                llegaria tarde.
              </p>
              <p>
                No le importaba{" "}
                <HighlightedText color="rgba(147,112,158,0.25)" borderColor="#93709e">
                  porque
                </HighlightedText>{" "}
                el dia era hermoso{" "}
                <HighlightedText color="rgba(147,112,158,0.25)" borderColor="#93709e">
                  y
                </HighlightedText>{" "}
                la brisa olia a azahar,{" "}
                <HighlightedText color="rgba(147,112,158,0.25)" borderColor="#93709e">
                  y
                </HighlightedText>{" "}
                hacia mucho{" "}
                <HighlightedText color="rgba(147,112,158,0.25)" borderColor="#93709e">
                  que
                </HighlightedText>{" "}
                no disfrutaba de una manana asi.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Conjunciones", count: 9, color: "#93709e", on: true },
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
              Las conjunciones son necesarias, pero su acumulacion delata un
              problema estructural: el escritor esta pegando ideas en vez de
              organizarlas. Cuando una oracion contiene tres o cuatro
              conjunciones, casi siempre puede dividirse en dos o tres frases
              mas claras.
            </p>
            <p>
              El abuso de &ldquo;y&rdquo; produce un efecto de lista oral —
              &ldquo;y entonces... y luego... y despues...&rdquo; — que recuerda
              al habla infantil. El abuso de &ldquo;que&rdquo; subordinante crea
              frases encajadas como munecas rusas que el lector pierde de vista.
            </p>
            <p>
              Scritura resalta todas las conjunciones coordinantes (y, o, pero,
              sino, ni) y subordinantes (que, aunque, porque, si, cuando, donde)
              para que visualices la arquitectura de tus frases.
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
                  "Copia un fragmento narrativo o expositivo donde sospeches de frases demasiado conectadas.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Conjunciones\". Cada nexo se resaltara en violeta.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Donde veas tres o mas conjunciones seguidas, considera dividir la frase o usar punto y seguido.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#93709e] text-sm font-bold text-white">
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
            &ldquo;Queria ir al cine{" "}
            <span className="rounded bg-red-200/60 px-1">pero</span> no tenia
            dinero{" "}
            <span className="rounded bg-red-200/60 px-1">y</span> ademas estaba
            lloviendo{" "}
            <span className="rounded bg-red-200/60 px-1">asi que</span> decidio
            quedarse en casa{" "}
            <span className="rounded bg-red-200/60 px-1">aunque</span> sabia{" "}
            <span className="rounded bg-red-200/60 px-1">que</span> se
            aburriria.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;Queria ir al cine, pero no tenia dinero. Ademas, llovia.
            Se quedo en casa, resignado al aburrimiento.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Frases largas",
            description:
              "Las conjunciones encadenadas son la causa principal de frases interminables.",
            href: "/corrector/frases-largas",
          },
          {
            title: "Posesivos",
            description:
              "Otra categoria que analiza la densidad de elementos gramaticales.",
            href: "/corrector/posesivos",
          },
          {
            title: "Verbos debiles",
            description:
              "Los verbos debiles y las conjunciones suelen ir de la mano.",
            href: "/corrector/verbos-debiles",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Por que revisar las conjunciones?",
            answer:
              "Porque una alta densidad de conjunciones indica frases demasiado complejas sintacticamente. Visualizarlas te permite simplificar la estructura sin perder contenido.",
          },
          {
            question: "¿Que conjunciones detecta?",
            answer:
              "Scritura detecta conjunciones coordinantes (y, e, o, u, pero, sino, ni, mas) y subordinantes (que, aunque, porque, si, cuando, donde, como, mientras, pues, asi que, de modo que).",
          },
          {
            question: "¿Mas conjunciones es siempre peor?",
            answer:
              "No necesariamente. Un texto argumentativo suele tener mas conjunciones que uno narrativo. Lo importante es que las frases sean comprensibles en una primera lectura.",
          },
        ]}
      />

      <CTASection
        title="Visualiza la estructura de tus frases"
        subtitle="Pega tu texto y descubre donde las conjunciones complican tu prosa."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
