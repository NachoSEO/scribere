import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Detector de frases largas - Scritura | Herramienta para escritores",
  description:
    "Controla el ritmo de tu prosa detectando oraciones demasiado largas. Scritura usa un codigo de colores para senalar la longitud de cada frase.",
};

export default function FrasesLargasPage() {
  return (
    <>
      <HeroSection
        badge="Frases largas"
        title={
          <>
            Controla el ritmo{" "}
            <span className="text-[var(--color-accent)]">de tu prosa</span>
          </>
        }
        subtitle="Las frases largas no son malas en si mismas, pero si todas lo son, el lector se ahoga. Scritura te muestra la longitud de cada oracion con un codigo de colores para que alternes ritmos como un musico alterna compases."
      />

      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                <HighlightedText color="rgba(189,87,73,0.2)" borderColor="#bd5749">
                  La anciana recorria cada manana el mismo camino que la llevaba
                  desde su casa hasta la plaza del pueblo, donde se sentaba en el
                  mismo banco de siempre a observar a los ninos que jugaban junto
                  a la fuente mientras los gorriones picoteaban las migas de pan
                  que ella dejaba caer del bolsillo de su abrigo gris.
                </HighlightedText>
              </p>
              <p className="mb-3">
                <HighlightedText color="rgba(204,164,61,0.2)" borderColor="#cc853d">
                  Nadie la saludaba porque nadie recordaba su nombre, aunque todos
                  la reconocian por el sombrero azul que no se quitaba ni en
                  verano.
                </HighlightedText>
              </p>
              <p>
                Se llamaba Elvira. Tenia noventa y dos anos. Y una memoria
                perfecta.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Frases largas", count: 2, color: "#78a064", on: true },
          ]}
          stats={[
            { label: "palabras", value: "87" },
            { label: "oraciones", value: "5" },
            { label: "media pal/frase", value: "17.4" },
            { label: "max pal/frase", value: "48" },
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
              Gary Provost lo demostro con un parrafo celebre: si todas las
              frases tienen la misma longitud, el texto suena monotono. La
              variacion ritmica es lo que da musicalidad a la prosa.
            </p>
            <p>
              Una frase de 50 palabras no es un error si va seguida de una de 5.
              El problema aparece cuando el escritor encadena frase larga tras
              frase larga sin darle al lector un respiro. La comprension cae, la
              atencion se dispersa y el texto pierde fuerza.
            </p>
            <p>
              Scritura usa tres colores: verde para frases cortas y medias,
              naranja para frases que empiezan a ser largas (25-35 palabras) y
              rojo para las que superan las 35 palabras. El objetivo no es que
              todas sean cortas, sino que haya variedad.
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
                  "Copia un fragmento largo — al menos un par de paginas — para que el analisis sea representativo.",
              },
              {
                step: "2",
                title: "Activa la categoria",
                description:
                  "Haz clic en \"Frases largas\". Cada oracion se coloreara segun su longitud: verde, naranja o rojo.",
              },
              {
                step: "3",
                title: "Corrige",
                description:
                  "Busca bloques de rojo consecutivo y rompe alguna frase. Introduce frases cortas para crear ritmo.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#78a064] text-sm font-bold text-white">
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
            &ldquo;El viejo marinero se acerco a la barra del puerto y pidio una
            copa de vino tinto mientras contaba a quien quisiera escucharle la
            historia de aquella noche en que el temporal lo sorprendio a treinta
            millas de la costa y las olas rompian contra la cubierta del barco con
            una fuerza que el no habia conocido en cuarenta anos de
            navegacion.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;El viejo marinero se acerco a la barra del puerto y pidio vino
            tinto. Siempre contaba la misma historia: aquella noche en que el
            temporal lo sorprendio a treinta millas de la costa. Las olas rompian
            contra la cubierta con una fuerza desconocida. Cuarenta anos
            navegando y nunca habia visto nada igual.&rdquo;
          </p>
        }
      />

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Reiteraciones",
            description:
              "Las frases largas tienden a repetir palabras por falta de concision.",
            href: "/corrector/reiteraciones",
          },
          {
            title: "Parrafos",
            description:
              "Controla tambien la longitud de tus parrafos para un ritmo completo.",
            href: "/corrector/parrafos",
          },
          {
            title: "Verbos debiles",
            description:
              "Sustituir verbos debiles acorta las frases de forma natural.",
            href: "/corrector/verbos-debiles",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Cual es la longitud ideal de una frase?",
            answer:
              "No hay una longitud ideal unica. Lo importante es la variedad. Como regla orientativa, las frases de mas de 35 palabras empiezan a ser dificiles de seguir, y las de mas de 50 casi siempre necesitan dividirse.",
          },
          {
            question: "¿Cuenta todas las palabras?",
            answer:
              "Si. Scritura cuenta cada palabra entre dos signos de puntuacion terminal (punto, punto y coma, interrogacion, exclamacion). Los articulos y preposiciones cuentan como palabras.",
          },
          {
            question: "¿Como funciona el codigo de colores?",
            answer:
              "Verde: hasta 25 palabras (sin resaltar). Naranja: 25-35 palabras. Rojo: mas de 35 palabras. Los umbrales estan basados en estudios de legibilidad en espanol.",
          },
        ]}
      />

      <CTASection
        title="Descubre el ritmo oculto de tu texto"
        subtitle="Pega tu manuscrito y observa el patron de longitudes al instante."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
