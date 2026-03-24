import Link from "next/link";
import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";

export const metadata: Metadata = {
  title: "Scritura — Herramienta para escritores en espanol",
  description:
    "Analiza, planifica y construye tu novela con Scritura. Corrector de estilo, planificador de novelas y worldbuilding. 100% en espanol, 100% gratis.",
  openGraph: {
    title: "Scritura — Herramienta para escritores en espanol",
    description:
      "Analiza, planifica y construye tu novela con Scritura. Corrector de estilo, planificador de novelas y worldbuilding.",
  },
};

const PILLARS = [
  {
    title: "Corrector",
    description:
      "Analiza tu prosa en tiempo real. Detecta adverbios, gerundios, verbos debiles, frases largas y reiteraciones.",
    href: "/corrector",
    color: "#bd5749",
  },
  {
    title: "Planificador",
    description:
      "Estructura tu novela desde la premisa hasta cada escena. Personajes, arcos, fases y relaciones.",
    href: "/planificador",
    color: "#8b6f47",
  },
  {
    title: "Worldbuilding",
    description:
      "Construye mundos con cronologias, mapas, regiones, culturas y sistemas de magia o tecnologia.",
    href: "/worldbuilding",
    color: "#55699b",
  },
];

const TOP_FEATURES = [
  {
    title: "Adverbios en -mente",
    description: "Detecta adverbios que debilitan tu prosa y sugiere reformulaciones mas directas.",
    href: "/corrector/adverbios",
  },
  {
    title: "Verbos debiles",
    description: 'Senala formas de "ser", "estar", "decir" y "hacer" para que busques verbos mas precisos.',
    href: "/corrector/verbos-debiles",
  },
  {
    title: "Personajes",
    description: "Crea fichas completas con motivacion, complicacion, funcion narrativa y relaciones.",
    href: "/planificador/personajes",
  },
  {
    title: "Arcos narrativos",
    description: "Disena arcos con planteamiento, nudo y desenlace para cada trama.",
    href: "/planificador/arcos-narrativos",
  },
  {
    title: "Cronologia",
    description: "Organiza la historia de tu mundo en eras y eventos cronologicos.",
    href: "/worldbuilding/cronologia",
  },
  {
    title: "Sistemas",
    description: "Define sistemas de magia, tecnologia, politica o economia con reglas y limitaciones.",
    href: "/worldbuilding/sistemas",
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
    "Herramienta para escritores en espanol. Corrector de estilo, planificador de novelas y worldbuilding.",
  inLanguage: "es",
};

export default function MarketingPage() {
  return (
    <>
      {/* JSON-LD structured data - static content, safe to inline */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        title={
          <>
            Escribe, planifica y construye
            <br />
            <span className="text-[var(--color-accent)]">tu novela en espanol.</span>
          </>
        }
        subtitle="Tres herramientas en una: corrector de estilo en tiempo real, planificador de novelas y worldbuilding. Todo en tu navegador, gratis."
        ctaText="Empieza gratis con Google"
        secondaryCta={{ text: "Ver herramientas", href: "/corrector" }}
      />

      {/* Three pillars */}
      <section className="mx-auto max-w-5xl px-8 pb-20">
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
                <h2 className="text-lg font-bold text-[var(--color-ink)]">
                  {pillar.title}
                </h2>
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

      {/* Editor Preview */}
      <section className="mx-auto max-w-5xl px-8 pb-20">
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                Ella{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">estaba</HighlightedText>{" "}
                caminando{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  lentamente
                </HighlightedText>{" "}
                por el parque, y{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">estaba</HighlightedText>{" "}
                pensando en lo que{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">habia</HighlightedText>{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">dicho</HighlightedText>{" "}
                su hermano.
              </p>
              <p>
                Le{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">habia</HighlightedText>{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">dicho</HighlightedText>{" "}
                que{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">era</HighlightedText>{" "}
                necesario que{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">hiciera</HighlightedText>{" "}
                algo{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  rapidamente
                </HighlightedText>
                .
              </p>
            </>
          }
          sidebarItems={[
            { label: "Adverbios -mente", count: 2, color: "#c4a45f", on: true },
            { label: "Verbos debiles", count: 7, color: "#bd5749", on: true },
            { label: "Gerundios", count: 0, color: "#cc853d", on: true },
            { label: "Frases largas", count: 1, color: "#78a064", on: false },
            { label: "Reiteraciones", count: 3, color: "#af556e", on: false },
          ]}
        />
      </section>

      {/* Before/After */}
      <BeforeAfter
        before={
          <p>
            &ldquo;Ella <span className="rounded bg-red-200/60 px-1">estaba</span>{" "}
            caminando <span className="rounded bg-red-200/60 px-1">lentamente</span>{" "}
            por el parque, y <span className="rounded bg-red-200/60 px-1">estaba</span>{" "}
            pensando en lo que habia{" "}
            <span className="rounded bg-red-200/60 px-1">dicho</span> su hermano, que
            le habia <span className="rounded bg-red-200/60 px-1">dicho</span> que{" "}
            <span className="rounded bg-red-200/60 px-1">era</span> necesario que{" "}
            <span className="rounded bg-red-200/60 px-1">hiciera</span> algo{" "}
            <span className="rounded bg-red-200/60 px-1">rapidamente</span>.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;Camino despacio por el parque, rumiando las palabras de su hermano:
            debia actuar cuanto antes.&rdquo;
          </p>
        }
      />

      {/* Features grid — top 2 from each module */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-2xl font-bold text-[var(--color-ink)]">
            Todo lo que necesitas para escribir tu novela
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-sm text-[var(--color-ink-muted)]">
            Desde el analisis de estilo hasta la construccion de mundos, Scritura
            cubre cada paso del proceso creativo.
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TOP_FEATURES.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-5 transition-shadow hover:shadow-sm"
              >
                <h3 className="mb-1.5 text-sm font-semibold text-[var(--color-ink)]">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-[var(--color-ink)]">
            Tu texto nunca sale de tu navegador
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
            Todo el analisis se ejecuta en tu dispositivo. No enviamos nada a
            ningun servidor. Funciona incluso sin conexion a internet.
          </p>
        </div>
      </section>

      <CTASection
        title="Empieza a escribir mejor hoy"
        ctaText="Empieza gratis con Google"
      />
    </>
  );
}
