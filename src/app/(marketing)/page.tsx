import Link from "next/link";
import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { BenefitStrip } from "@/components/marketing/BenefitStrip";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { FAQSection } from "@/components/marketing/FAQSection";
import {
  MockManuscritoEditor,
  MockFocusMode,
  MockEstructuraSpine,
  MockEvolutionTimeline,
  MockMapView,
  MockYBNAArcs,
  MockMentionInText,
} from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Scritura — Herramienta para escritores en espanol",
  description:
    "Escribe, planifica y construye tu novela en espanol. Corrector de estilo, planificador con personajes, arcos y estructura, editor de manuscrito con @menciones, y worldbuilding con mapas. Gratis.",
  openGraph: {
    title: "Scritura — Herramienta para escritores en espanol",
    description:
      "Escribe, planifica y construye tu novela con Scritura. Corrector de estilo, planificador de novelas, editor de manuscrito y worldbuilding. 100% gratis.",
  },
};

const PILLARS = [
  {
    title: "Corrector",
    description:
      "Analiza tu prosa en tiempo real. Detecta adverbios, gerundios, verbos debiles, frases largas y reiteraciones. 10 categorias de revision.",
    href: "/corrector",
    color: "#bd5749",
  },
  {
    title: "Planificador",
    description:
      "Estructura tu novela con personajes, arcos narrativos, fases, hitos, escenas, facciones y relaciones. Editor de manuscrito con @menciones.",
    href: "/planificador",
    color: "#8b6f47",
  },
  {
    title: "Worldbuilding",
    description:
      "Construye mundos con cronologias, mapas interactivos, regiones jerarquicas, culturas y sistemas de magia o tecnologia.",
    href: "/worldbuilding",
    color: "#55699b",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scritura",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description:
    "Herramienta para escritores en espanol. Corrector de estilo, planificador de novelas, editor de manuscrito y worldbuilding.",
  inLanguage: "es",
};

function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Safe: content is a hardcoded constant, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function MarketingPage() {
  return (
    <>
      <JsonLd />

      {/* ─── HERO ─── */}
      <HeroSection
        title={
          <>
            La herramienta completa
            <br />
            <span className="text-[var(--color-accent)]">
              para escribir tu novela en espanol
            </span>
          </>
        }
        subtitle="Corrige tu prosa, planifica tu estructura, escribe tu manuscrito y construye tu mundo. Todo en un solo lugar, en tu navegador, gratis."
        ctaText="Empieza gratis con Google"
        secondaryCta={{ text: "Ver herramientas", href: "/corrector" }}
      />

      {/* ─── BENEFIT STRIP ─── */}
      <BenefitStrip
        items={[
          { value: "10 categorias", label: "de analisis de estilo" },
          { value: "11 herramientas", label: "de planificacion" },
          { value: "Editor con @", label: "menciones a entidades" },
          { value: "100% gratis", label: "sin limites ni publicidad" },
        ]}
      />

      {/* ─── THREE PILLARS ─── */}
      <section className="mx-auto max-w-5xl px-8 py-20">
        <h2 className="mb-3 text-center text-2xl font-bold text-[var(--color-ink)]">
          Tres herramientas, un solo proceso
        </h2>
        <p className="mx-auto mb-12 max-w-lg text-center text-sm text-[var(--color-ink-muted)]">
          Escribir una novela no es solo redactar. Es planificar, construir y
          pulir. Scritura cubre las tres fases.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group rounded-xl border border-[var(--color-border)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: pillar.color }}
                />
                <h3 className="text-lg font-bold text-[var(--color-ink)]">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                {pillar.description}
              </p>
              <p className="mt-4 text-xs font-semibold text-[var(--color-accent)] transition-colors group-hover:text-[var(--color-accent-dark)]">
                Explorar →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          DEEP DIVE: CORRECTOR
          ════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-5xl px-8 py-20">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#bd5749]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#bd5749]">
              Corrector
            </span>
          </div>
          <h2 className="mb-4 text-center text-3xl font-bold text-[var(--color-ink)]">
            Pega tu texto y ve los problemas al instante
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink-light)]">
            Adverbios innecesarios, verbos debiles, frases que se alargan sin
            motivo, palabras repetidas en el mismo parrafo. El corrector los
            marca con colores mientras escribes. Tu decides que cambiar.
          </p>
        </div>

        {/* Editor mockup */}
        <div className="mx-auto max-w-5xl px-8 pb-12">
          <MockEditor
            sampleText={
              <>
                <p className="mb-3">
                  Ella{" "}
                  <HighlightedText color="rgba(189,87,73,0.2)">
                    estaba
                  </HighlightedText>{" "}
                  caminando{" "}
                  <HighlightedText
                    color="rgba(196,164,95,0.25)"
                    borderColor="#c4a45f"
                  >
                    lentamente
                  </HighlightedText>{" "}
                  por el parque, y{" "}
                  <HighlightedText color="rgba(189,87,73,0.2)">
                    estaba
                  </HighlightedText>{" "}
                  pensando en lo que{" "}
                  <HighlightedText color="rgba(189,87,73,0.2)">
                    habia
                  </HighlightedText>{" "}
                  <HighlightedText color="rgba(189,87,73,0.2)">
                    dicho
                  </HighlightedText>{" "}
                  su hermano.
                </p>
                <p>
                  Le{" "}
                  <HighlightedText color="rgba(189,87,73,0.2)">
                    habia
                  </HighlightedText>{" "}
                  <HighlightedText color="rgba(189,87,73,0.2)">
                    dicho
                  </HighlightedText>{" "}
                  que{" "}
                  <HighlightedText color="rgba(189,87,73,0.2)">
                    era
                  </HighlightedText>{" "}
                  necesario que{" "}
                  <HighlightedText color="rgba(189,87,73,0.2)">
                    hiciera
                  </HighlightedText>{" "}
                  algo{" "}
                  <HighlightedText
                    color="rgba(196,164,95,0.25)"
                    borderColor="#c4a45f"
                  >
                    rapidamente
                  </HighlightedText>
                  .
                </p>
              </>
            }
            sidebarItems={[
              {
                label: "Adverbios -mente",
                count: 2,
                color: "#c4a45f",
                on: true,
              },
              {
                label: "Verbos debiles",
                count: 7,
                color: "#bd5749",
                on: true,
              },
              { label: "Gerundios", count: 0, color: "#cc853d", on: true },
              {
                label: "Frases largas",
                count: 1,
                color: "#78a064",
                on: false,
              },
              {
                label: "Reiteraciones",
                count: 3,
                color: "#af556e",
                on: false,
              },
            ]}
          />
        </div>

        {/* Before/After */}
        <BeforeAfter
          before={
            <p>
              &ldquo;Ella{" "}
              <span className="rounded bg-red-200/60 px-1">estaba</span>{" "}
              caminando{" "}
              <span className="rounded bg-red-200/60 px-1">lentamente</span>{" "}
              por el parque, y{" "}
              <span className="rounded bg-red-200/60 px-1">estaba</span>{" "}
              pensando en lo que habia{" "}
              <span className="rounded bg-red-200/60 px-1">dicho</span> su
              hermano, que le habia{" "}
              <span className="rounded bg-red-200/60 px-1">dicho</span> que{" "}
              <span className="rounded bg-red-200/60 px-1">era</span> necesario
              que{" "}
              <span className="rounded bg-red-200/60 px-1">hiciera</span> algo{" "}
              <span className="rounded bg-red-200/60 px-1">rapidamente</span>
              .&rdquo;
            </p>
          }
          after={
            <p>
              &ldquo;Camino despacio por el parque, rumiando las palabras de su
              hermano: debia actuar cuanto antes.&rdquo;
            </p>
          }
        />

        {/* 10 categories overview */}
        <div className="mx-auto max-w-5xl px-8 py-16">
          <h3 className="mb-8 text-center text-xl font-bold text-[var(--color-ink)]">
            10 categorias de revision
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Adverbios", color: "#c4a45f", href: "/corrector/adverbios" },
              { name: "Verbos debiles", color: "#bd5749", href: "/corrector/verbos-debiles" },
              { name: "Gerundios", color: "#cc853d", href: "/corrector/gerundios" },
              { name: "Frases largas", color: "#78a064", href: "/corrector/frases-largas" },
              { name: "Reiteraciones", color: "#af556e", href: "/corrector/reiteraciones" },
              { name: "Conjunciones", color: "#93709e", href: "/corrector/conjunciones" },
              { name: "Posesivos", color: "#589b9b", href: "/corrector/posesivos" },
              { name: "Vocativos", color: "#55699b", href: "/corrector/vocativos" },
              { name: "Dialogos", color: "#8c6e55", href: "/corrector/dialogos" },
              { name: "Parrafos", color: "#9e9590", href: "/corrector/parrafos" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-xs font-medium text-[var(--color-ink-light)] transition-colors hover:bg-white hover:text-[var(--color-ink)]"
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                {cat.name}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link
              href="/corrector"
              className="text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]"
            >
              Ver todas las categorias →
            </Link>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          DEEP DIVE: PLANIFICADOR
          ════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-8 py-20">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#8b6f47]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8b6f47]">
              Planificador
            </span>
          </div>
          <h2 className="mb-4 text-center text-3xl font-bold text-[var(--color-ink)]">
            De la idea suelta al manuscrito completo
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink-light)]">
            La mayoria de novelas se abandonan a mitad del segundo acto. No por
            falta de talento, sino por falta de estructura. El planificador te
            da las herramientas para saber siempre donde estas en tu historia y
            hacia donde va.
          </p>
        </div>

        <FeatureShowcase
          features={[
            {
              title: "Estructura tu novela como un arbol",
              description:
                "La vista de estructura muestra tu novela completa: fases (actos), hitos (giros), arcos narrativos (tramas) y escenas. Cada hito tiene un tipo con color propio: gris para normalidad, ambar para cambio de fase, rosa para incidente incitador. Los arcos muestran su resolucion (Si, Si pero, No y, No). Filtra por personaje POV para seguir una linea narrativa.",
              visual: <MockEstructuraSpine />,
            },
            {
              title: "Personajes que crecen con la historia",
              description:
                "Cada personaje tiene ficha con motivacion, complicacion y funcion narrativa. Pero lo que importa no es la ficha: es la evolucion. Crea etapas de desarrollo vinculadas a arcos y escenas. Ve como tu protagonista cambia del primer capitulo al ultimo. Asigna personajes a facciones, crea relaciones entre ellos y rastrea en que escenas aparece cada uno.",
              visual: <MockEvolutionTimeline />,
            },
            {
              title: "Arcos con cuatro tipos de resolucion",
              description:
                "Cada arco conecta un hito de origen con un hito de destino y se resuelve de una forma: Si (el personaje consigue lo que quiere), Si pero (lo consigue, con un precio), No y (fracasa, y las cosas empeoran) o No (fracasa). Este sistema te obliga a pensar en como termina cada trama, no solo en como empieza.",
              visual: <MockYBNAArcs />,
            },
          ]}
        />

        <div className="mx-auto max-w-5xl px-8 pb-16">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Personajes", href: "/planificador/personajes" },
              { name: "Arcos narrativos", href: "/planificador/arcos-narrativos" },
              { name: "Fases y hitos", href: "/planificador/fases" },
              { name: "Escenas", href: "/planificador/escenas" },
              { name: "Estructura", href: "/planificador/estructura" },
              { name: "Facciones", href: "/planificador/facciones" },
              { name: "Lugares y mapas", href: "/planificador/lugares" },
              { name: "Relaciones", href: "/planificador/relaciones" },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-xs font-medium text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
              >
                <div className="h-2 w-2 rounded-full bg-[#8b6f47]" />
                {tool.name}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link
              href="/planificador"
              className="text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]"
            >
              Ver las 11 herramientas →
            </Link>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          DEEP DIVE: MANUSCRITO
          ════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-5xl px-8 py-20">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#8b6f47]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8b6f47]">
              Manuscrito
            </span>
          </div>
          <h2 className="mb-4 text-center text-3xl font-bold text-[var(--color-ink)]">
            Escribe con todo el contexto a un @ de distancia
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink-light)]">
            La mayoria de escritores planifican en un sitio y escriben en otro.
            Cuando necesitas recordar el nombre del tabernero o en que capitulo
            aparecio el antagonista, pierdes diez minutos buscando. En Scritura,
            escribes @ y tu personaje aparece.
          </p>
        </div>

        <FeatureShowcase
          features={[
            {
              title: "Tu manuscrito conectado con tu planificacion",
              description:
                "El editor organiza las escenas en carpetas que siguen la estructura de tu novela. Escribe @Kael y el editor sabe quien es. Escribe @Mercado de Sombras y sabes donde esta. Cada mencion es un enlace directo a la ficha. Personajes en marron, lugares en verde, facciones en morado, eventos en naranja.",
              visual: <MockManuscritoEditor />,
            },
            {
              title: "Modo concentracion: solo tu y las palabras",
              description:
                "Pulsa Cmd+Shift+F y todo desaparece. El texto anterior y posterior se atenua. El cursor se mantiene en el centro. Sin barra lateral, sin notificaciones, sin distracciones. Pulsa Escape cuando quieras volver. Tambien puedes activar el corrector sobre la marcha para detectar problemas mientras escribes.",
              visual: <MockFocusMode />,
            },
          ]}
        />

        {/* Mention system detail */}
        <div className="mx-auto max-w-5xl px-8 pb-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-bold text-[var(--color-ink)]">
                Cuatro tipos de mencion
              </h3>
              <div className="space-y-3">
                {[
                  { type: "Personajes", color: "#8b6f47", example: "@Lyra, @Kael, @Maestra Vael" },
                  { type: "Lugares", color: "#589b9b", example: "@Torre del Eco, @Mercado de Sombras" },
                  { type: "Facciones", color: "#93709e", example: "@Orden del Cristal Eterno" },
                  { type: "Eventos", color: "#cc853d", example: "@Ataque al convoy, @Oscurecimiento" },
                ].map((m) => (
                  <div key={m.type} className="flex items-start gap-3">
                    <div
                      className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-ink)]">{m.type}</p>
                      <p className="text-xs text-[var(--color-ink-muted)]">{m.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <MockMentionInText />
            </div>
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/planificador/manuscrito"
              className="text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]"
            >
              Ver el editor de manuscrito →
            </Link>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          DEEP DIVE: WORLDBUILDING
          ════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-8 py-20">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#55699b]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#55699b]">
              Worldbuilding
            </span>
          </div>
          <h2 className="mb-4 text-center text-3xl font-bold text-[var(--color-ink)]">
            Construye mundos que se sostienen solos
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink-light)]">
            No hace falta escribir fantasia epica para necesitar worldbuilding.
            Cualquier novela con una ciudad ficticia, un sistema politico o una
            cronologia que abarca generaciones se beneficia de tener un registro
            ordenado.
          </p>
        </div>

        <FeatureShowcase
          features={[
            {
              title: "Mapas interactivos con marcadores",
              description:
                "Sube la imagen de tu mapa y coloca marcadores haciendo clic. Cada marcador se vincula a un lugar con su ficha completa. Pasa el cursor por encima y ve la descripcion. Los lugares se organizan en jerarquia: mundo, continente, pais, region, ciudad, pueblo, edificio. Navega con migas de pan entre niveles.",
              visual: <MockMapView />,
            },
          ]}
        />

        <div className="mx-auto max-w-4xl px-8 pb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Cronologia",
                desc: "Eras y eventos en la historia de tu mundo.",
                href: "/worldbuilding/cronologia",
              },
              {
                title: "Regiones",
                desc: "Geografia jerarquica con continentes, paises y ciudades.",
                href: "/worldbuilding/regiones",
              },
              {
                title: "Culturas",
                desc: "Pueblos, costumbres, idiomas y organizacion social.",
                href: "/worldbuilding/culturas",
              },
              {
                title: "Sistemas",
                desc: "Magia, tecnologia, politica o economia con reglas y limites.",
                href: "/worldbuilding/sistemas",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-xl border border-[var(--color-border)] bg-white p-4 transition-shadow hover:shadow-sm"
              >
                <h4 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link
              href="/worldbuilding"
              className="text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]"
            >
              Ver worldbuilding →
            </Link>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          WORKFLOW: HOW IT ALL CONNECTS
          ════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-[var(--color-ink)]">
            Una novela no se escribe en orden
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink-light)]">
            Algunos empiezan por los personajes. Otros por el final. Otros por
            el mapa. Scritura no te obliga a seguir un camino.
          </p>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Empieza por donde quieras",
                desc: "Un personaje que no te deja dormir, un giro que se te ocurrio en la ducha, un sistema de magia que quieres explorar. Crea lo primero que tengas claro y el resto ira apareciendo.",
              },
              {
                step: "2",
                title: "Conecta las piezas",
                desc: "Los personajes se asignan a facciones. Los hitos se agrupan en fases. Los arcos conectan un hito con otro. Las escenas se vinculan a lugares. Cada pieza sabe donde encaja.",
              },
              {
                step: "3",
                title: "Escribe con contexto",
                desc: "Cuando te sientes a redactar, el manuscrito conoce a tus personajes, tus lugares y tus eventos. No necesitas abrir otra pestana. Escribe @ y la informacion esta ahi.",
              },
              {
                step: "4",
                title: "Pule la prosa",
                desc: "Activa el corrector sobre tu manuscrito. Los adverbios innecesarios, los verbos debiles y las frases largas aparecen marcados. Corrige sobre la marcha o dejalo para la revision final.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PARA QUIEN
          ════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--color-border)] px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-ink)]">
            Para escritores que necesitan mas que un documento en blanco
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Novelistas de fantasia y ciencia ficcion",
                desc: "Mundos con mapas, sistemas de magia, cronologias de miles de anos y docenas de personajes con relaciones cruzadas. Necesitas un sistema que soporte la complejidad sin perder el hilo.",
              },
              {
                title: "Escritores de thriller y novela negra",
                desc: "Tramas con multiples lineas temporales, pistas que se plantan en el capitulo 3 y se recogen en el 28, personajes que ocultan secretos. Cada causa necesita su consecuencia.",
              },
              {
                title: "Autores de saga y novela coral",
                desc: "Varios protagonistas con arcos propios, facciones enfrentadas, evoluciones que se cruzan. Necesitas ver la estructura de cada linea narrativa por separado y en conjunto.",
              },
            ].map((persona) => (
              <div
                key={persona.title}
                className="rounded-xl border border-[var(--color-border)] bg-white p-6"
              >
                <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                  {persona.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                  {persona.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PRIVACY + TRUST
          ════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--color-border)] bg-white px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-[var(--color-ink)]">
            Tu texto es tuyo
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Sin suscripcion", desc: "Todas las funciones, gratis, para siempre. Sin planes premium encubiertos." },
              { title: "Sin publicidad", desc: "Ni banners, ni trackers, ni pop-ups. Solo tus palabras y las herramientas." },
              { title: "Sin limites", desc: "Sin tope de palabras, proyectos, personajes ni escenas. Crea lo que necesites." },
              { title: "Privado", desc: "El corrector se ejecuta en tu navegador. Tu texto nunca se envia a ningun servidor." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════════ */}
      <FAQSection
        title="Preguntas frecuentes"
        items={[
          {
            question: "Es realmente gratis?",
            answer:
              "Si. Todas las funciones estan disponibles sin coste. En el futuro podremos anadir funciones premium opcionales, pero el nucleo de Scritura sera siempre gratuito.",
          },
          {
            question: "Necesito crear una cuenta?",
            answer:
              "Para el corrector no necesitas cuenta: pega tu texto y analiza. Para el planificador, manuscrito y worldbuilding necesitas una cuenta gratuita con Google para guardar tus proyectos.",
          },
          {
            question: "Puedo exportar mis datos?",
            answer:
              "Las frecuencias de palabras se exportan en CSV. Estamos trabajando en opciones de exportacion adicionales para el planificador y el manuscrito.",
          },
          {
            question: "Funciona en movil?",
            answer:
              "La interfaz es responsive y funciona en tablets. Para escribir novelas recomendamos una pantalla de escritorio o portatil, pero puedes consultar fichas y planificacion desde cualquier dispositivo.",
          },
          {
            question: "Los datos estan seguros?",
            answer:
              "Tus proyectos se guardan en una base de datos segura con aislamiento por usuario. Nadie mas puede ver tu trabajo. El analisis del corrector se ejecuta localmente en tu navegador.",
          },
        ]}
      />

      {/* ─── FINAL CTA ─── */}
      <CTASection
        title="Tu novela esta esperando"
        subtitle="Corrige, planifica, escribe y construye. Todo en un sitio, gratis, en espanol."
        ctaText="Empieza gratis con Google"
      />
    </>
  );
}
