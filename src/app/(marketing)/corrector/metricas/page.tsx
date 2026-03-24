import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";

export const metadata: Metadata = {
  title: "Metricas de texto - Scritura | Herramienta para escritores",
  description:
    "Conoce tu texto al detalle: palabras, caracteres, oraciones, parrafos, paginas y tiempo de lectura. Todo calculado al instante en tu navegador.",
};

export default function MetricasPage() {
  return (
    <>
      <HeroSection
        badge="Metricas"
        title={
          <>
            Conoce tu texto{" "}
            <span className="text-[var(--color-accent)]">al detalle</span>
          </>
        }
        subtitle="Palabras, caracteres, oraciones, parrafos, paginas y tiempo de lectura. Todas las metricas que necesitas para controlar la extension y el ritmo de tu manuscrito."
      />

      {/* Mock Stats Display */}
      <section className="mx-auto max-w-4xl px-8 pb-20">
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-lg">
          <div className="border-b border-[var(--color-border)] px-5 py-3">
            <p className="text-xs font-semibold text-[var(--color-ink-muted)]">
              Metricas del texto
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[var(--color-border)] md:grid-cols-3">
            {[
              { value: "52,847", label: "Palabras", detail: "totales" },
              { value: "298,431", label: "Caracteres", detail: "con espacios" },
              { value: "3,219", label: "Oraciones", detail: "detectadas" },
              { value: "847", label: "Parrafos", detail: "totales" },
              { value: "176", label: "Paginas", detail: "estimadas (300 pal/pag)" },
              { value: "3h 31m", label: "Tiempo de lectura", detail: "a 250 pal/min" },
              { value: "16.4", label: "Palabras/oracion", detail: "media" },
              { value: "7,892", label: "Palabras unicas", detail: "vocabulario" },
              { value: "14.9%", label: "Riqueza lexica", detail: "unicas/total" },
            ].map((metric) => (
              <div key={metric.label} className="bg-white p-6 text-center">
                <p className="text-2xl font-bold text-[var(--color-ink)]">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-ink-light)]">
                  {metric.label}
                </p>
                <p className="text-[10px] text-[var(--color-ink-muted)]">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que importa
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Las metricas son la brujula del escritor. Saber que tu manuscrito
              tiene 52.000 palabras te dice que estas en el rango de una novela
              corta; que la media de palabras por oracion es 16 indica un ritmo
              equilibrado; que tu riqueza lexica es del 15% sugiere un
              vocabulario variado.
            </p>
            <p>
              Estos datos no dictan como debes escribir, pero te orientan.
              ¿Necesitas recortar 10.000 palabras para cumplir un limite
              editorial? ¿Quieres saber si tu novela tiene el largo de una
              novela o de una novela corta? ¿Te preguntas cuantas paginas
              ocupara impresa?
            </p>
            <p>
              Scritura calcula todo al instante, sin que tu texto salga de tu
              navegador. Puedes pegar tu manuscrito completo y obtener las
              metricas en menos de un segundo.
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
                  "Copia tu manuscrito, capitulo o fragmento en el editor de Scritura.",
              },
              {
                step: "2",
                title: "Consulta las metricas",
                description:
                  "Las estadisticas se actualizan en tiempo real en la barra superior del editor.",
              },
              {
                step: "3",
                title: "Exporta o compara",
                description:
                  "Usa las metricas para comparar versiones, controlar la extension o informar a tu editor.",
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

      {/* Reference ranges */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-ink)]">
            Rangos de referencia
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Relato corto", range: "1.000 - 7.500 palabras" },
              { label: "Novela corta (novella)", range: "17.500 - 40.000 palabras" },
              { label: "Novela", range: "40.000 - 120.000 palabras" },
              { label: "Novela epica", range: "120.000+ palabras" },
              { label: "Ritmo rapido", range: "10-15 palabras/oracion" },
              { label: "Ritmo equilibrado", range: "15-20 palabras/oracion" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-3"
              >
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {item.label}
                </p>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  {item.range}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Categorias relacionadas"
        links={[
          {
            title: "Frecuencia de palabras",
            description:
              "Complementa las metricas generales con un analisis detallado de vocabulario.",
            href: "/corrector/frecuencia-palabras",
          },
          {
            title: "Frases largas",
            description:
              "Si tu media de palabras por oracion es alta, revisa las frases largas.",
            href: "/corrector/frases-largas",
          },
          {
            title: "Reiteraciones",
            description:
              "Si tu riqueza lexica es baja, puede que tengas repeticiones que corregir.",
            href: "/corrector/reiteraciones",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Como se calculan las paginas?",
            answer:
              "Scritura usa el estandar editorial de 300 palabras por pagina (aproximadamente 30 lineas de 10 palabras). Este calculo es una aproximacion: el numero real de paginas dependera del formato, la tipografia y los margenes del libro impreso.",
          },
          {
            question: "¿Como se calcula el tiempo de lectura?",
            answer:
              "Se usa una velocidad media de 250 palabras por minuto, que es el promedio de lectura silenciosa de un adulto en espanol. Es una estimacion: lectores rapidos pueden leer a 350+ palabras por minuto.",
          },
          {
            question: "¿Puedo exportar las metricas?",
            answer:
              "Si. Puedes exportar un resumen de todas las metricas junto con la tabla de frecuencias a formato CSV. Es util para llevar un registro del progreso de tu manuscrito a lo largo del tiempo.",
          },
        ]}
      />

      <CTASection
        title="Mide tu manuscrito al instante"
        subtitle="Pega tu texto y obtendras todas las metricas en menos de un segundo."
        ctaText="Abrir el corrector"
        ctaHref="/registro"
      />
    </>
  );
}
