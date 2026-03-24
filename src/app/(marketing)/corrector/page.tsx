import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { BenefitStrip } from "@/components/marketing/BenefitStrip";
import { MockEditor, HighlightedText } from "@/components/marketing/MockEditor";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";

export const metadata: Metadata = {
  title: "Corrector de estilo - Scritura | Herramienta para escritores",
  description:
    "Analiza tu prosa en tiempo real con 10 categorias: adverbios, gerundios, verbos debiles, frases largas, reiteraciones y mas. 100% privado, en tu navegador.",
};

const CATEGORIES = [
  {
    title: "Adverbios en -mente",
    description:
      "Detecta adverbios terminados en -mente que debilitan la prosa y la vuelven pesada.",
    href: "/corrector/adverbios",
    color: "#c4a45f",
  },
  {
    title: "Gerundios",
    description:
      "Identifica gerundios que lastran la narrativa con construcciones lentas e indirectas.",
    href: "/corrector/gerundios",
    color: "#cc853d",
  },
  {
    title: "Conjunciones",
    description:
      "Analiza la densidad de conjunciones coordinantes y subordinantes en tu texto.",
    href: "/corrector/conjunciones",
    color: "#93709e",
  },
  {
    title: "Posesivos",
    description:
      "Detecta posesivos innecesarios que contaminan la prosa con calcos del ingles.",
    href: "/corrector/posesivos",
    color: "#589b9b",
  },
  {
    title: "Verbos debiles",
    description:
      "Senala formas de ser, estar, haber, decir y hacer para que busques verbos mas precisos.",
    href: "/corrector/verbos-debiles",
    color: "#bd5749",
  },
  {
    title: "Frases largas",
    description:
      "Controla el ritmo de tu prosa detectando oraciones que superan la longitud recomendada.",
    href: "/corrector/frases-largas",
    color: "#78a064",
  },
  {
    title: "Reiteraciones",
    description:
      "Encuentra repeticiones cercanas de palabras que tu ojo ya no detecta.",
    href: "/corrector/reiteraciones",
    color: "#af556e",
  },
  {
    title: "Vocativos",
    description:
      "Detecta comas de vocativo que faltan o sobran en tu texto.",
    href: "/corrector/vocativos",
    color: "#55699b",
  },
  {
    title: "Dialogos",
    description:
      "Revisa que tus dialogos usen la raya y la puntuacion segun la norma de la RAE.",
    href: "/corrector/dialogos",
    color: "#8c6e55",
  },
  {
    title: "Parrafos",
    description:
      "Identifica parrafos demasiado cortos o largos que rompen el flujo narrativo.",
    href: "/corrector/parrafos",
    color: "#9e9590",
  },
  {
    title: "Frecuencia de palabras",
    description:
      "Descubre las palabras que mas usas con una tabla de frecuencias exportable.",
    href: "/corrector/frecuencia-palabras",
    color: "#8b6f47",
  },
  {
    title: "Metricas",
    description:
      "Conoce tu texto al detalle: palabras, caracteres, oraciones, parrafos, paginas y tiempo de lectura.",
    href: "/corrector/metricas",
    color: "#55699b",
  },
];

export default function CorrectorPage() {
  return (
    <>
      <HeroSection
        badge="Corrector"
        title={
          <>
            Analiza y mejora tu prosa{" "}
            <span className="text-[var(--color-accent)]">en tiempo real</span>
          </>
        }
        subtitle="Diez categorias de analisis estilistico disenadas para escritores en espanol. Desde adverbios hasta metricas, cada herramienta te ayuda a pulir tu texto con precision."
        secondaryCta={{ text: "Ver categorias", href: "#categorias" }}
      />

      <BenefitStrip
        items={[
          { value: "10", label: "categorias de analisis" },
          { value: "Tiempo real", label: "sin esperas" },
          { value: "100%", label: "privado" },
          { value: "CSV", label: "exportable" },
        ]}
      />

      {/* Editor Preview */}
      <section className="mx-auto max-w-5xl px-8 py-20">
        <h2 className="mb-3 text-center text-2xl font-bold text-[var(--color-ink)]">
          Todas las categorias trabajando juntas
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-center text-sm text-[var(--color-ink-muted)]">
          Activa las categorias que necesites y observa como se ilumina tu texto.
          Cada color representa un tipo de mejora diferente.
        </p>
        <MockEditor
          sampleText={
            <>
              <p className="mb-3">
                La mujer{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">estaba</HighlightedText>{" "}
                <HighlightedText color="rgba(204,133,61,0.25)">caminando</HighlightedText>{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  lentamente
                </HighlightedText>{" "}
                por la{" "}
                <HighlightedText color="rgba(175,85,110,0.25)">calle</HighlightedText>{" "}
                principal del pueblo, y{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">estaba</HighlightedText>{" "}
                <HighlightedText color="rgba(204,133,61,0.25)">pensando</HighlightedText>{" "}
                en todo lo que{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">habia</HighlightedText>{" "}
                ocurrido aquella manana en la{" "}
                <HighlightedText color="rgba(175,85,110,0.25)">calle</HighlightedText>{" "}
                del mercado.
              </p>
              <p>
                <HighlightedText color="rgba(189,87,73,0.2)">Era</HighlightedText>{" "}
                un dia gris.{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">Habia</HighlightedText>{" "}
                llovido{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  intensamente
                </HighlightedText>{" "}
                durante la noche y las calles{" "}
                <HighlightedText color="rgba(189,87,73,0.2)">estaban</HighlightedText>{" "}
                <HighlightedText color="rgba(196,164,95,0.25)" borderColor="#c4a45f">
                  completamente
                </HighlightedText>{" "}
                empapadas.
              </p>
            </>
          }
          sidebarItems={[
            { label: "Adverbios -mente", count: 3, color: "#c4a45f", on: true },
            { label: "Verbos debiles", count: 5, color: "#bd5749", on: true },
            { label: "Gerundios", count: 2, color: "#cc853d", on: true },
            { label: "Reiteraciones", count: 2, color: "#af556e", on: true },
            { label: "Conjunciones", count: 0, color: "#93709e", on: false },
            { label: "Posesivos", count: 0, color: "#589b9b", on: false },
            { label: "Frases largas", count: 1, color: "#78a064", on: false },
            { label: "Vocativos", count: 0, color: "#55699b", on: false },
            { label: "Dialogos", count: 0, color: "#8c6e55", on: false },
            { label: "Parrafos", count: 0, color: "#9e9590", on: false },
          ]}
        />
      </section>

      {/* 12 Categories */}
      <div id="categorias">
        <FeatureGrid
          title="10 categorias de analisis estilistico"
          subtitle="Haz clic en cualquier categoria para ver ejemplos, explicaciones y trucos de escritura."
          features={CATEGORIES}
          columns={3}
        />
      </div>

      {/* Before/After */}
      <BeforeAfter
        title="El poder de una revision consciente"
        before={
          <p>
            &ldquo;Ella estaba caminando lentamente por el parque, y estaba
            pensando en lo que habia dicho su hermano, que le habia dicho que era
            completamente necesario que hiciera algo rapidamente antes de que
            fuera demasiado tarde.&rdquo;
          </p>
        }
        after={
          <p>
            &ldquo;Camino despacio por el parque, rumiando las palabras de su
            hermano: debia actuar cuanto antes.&rdquo;
          </p>
        }
      />

      {/* Privacy */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-[var(--color-ink)]">
            Tu texto nunca sale de tu navegador
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
            Todo el analisis se ejecuta en tu dispositivo. No enviamos una sola
            palabra a ningun servidor. Tu manuscrito es tuyo y solo tuyo.
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
            Scritura funciona incluso sin conexion a internet. Abre la
            aplicacion, pega tu texto y analiza. Sin cuentas, sin limites, sin
            rastreo.
          </p>
        </div>
      </section>

      <CTASection
        title="Empieza a pulir tu prosa hoy"
        subtitle="Abre el corrector, pega tu texto y descubre lo que puedes mejorar. Sin registro, sin limites."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
