import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection, CTASection, FAQSection } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Precios - Scritura | Herramienta para escritores",
  description:
    "Scritura es gratis para siempre. Corrector de estilo, planificador de novelas y worldbuilding sin limites, sin publicidad, todo en tu navegador.",
};

const PLAN_FEATURES = [
  "Corrector de estilo completo (10 categorias)",
  "Planificador de novelas ilimitado",
  "Worldbuilding completo",
  "Frecuencia de palabras + exportar CSV",
  "100% privado, todo en tu navegador",
  "Sin limites de palabras",
  "Sin publicidad",
];

export default function PreciosPage() {
  return (
    <>
      <HeroSection
        badge="Precios"
        title={
          <>
            Gratis,{" "}
            <span className="text-[var(--color-accent)]">para siempre</span>
          </>
        }
        subtitle="Todas las herramientas de Scritura son gratuitas y sin limites. Creemos que los escritores en espanol merecen herramientas profesionales sin barreras de precio."
      />

      {/* Pricing card */}
      <section className="px-8 pb-20">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border-2 border-[var(--color-accent)] bg-white p-8 shadow-sm">
            <div className="mb-6 text-center">
              <h2 className="mb-1 text-xl font-bold text-[var(--color-ink)]">
                Plan Gratuito
              </h2>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-[var(--color-ink)]">0 €</span>
                <span className="text-sm text-[var(--color-ink-muted)]">/ siempre</span>
              </div>
            </div>

            <ul className="mb-8 space-y-3">
              {PLAN_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-[var(--color-ink-light)]"
                >
                  <span className="mt-0.5 text-[var(--color-accent)]">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/registro"
              className="block w-full rounded-lg bg-[var(--color-accent)] py-3.5 text-center text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Empieza gratis con Google
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        items={[
          {
            question: "¿Es realmente gratis?",
            answer:
              "Si. Todas las funcionalidades actuales de Scritura son gratuitas y lo seguiran siendo. No hay version de prueba ni limites artificiales. Puedes usar el corrector, el planificador y el worldbuilding completos sin pagar nada.",
          },
          {
            question: "¿Habra planes de pago en el futuro?",
            answer:
              "Es posible. Si en el futuro anadimos funcionalidades premium avanzadas (como integraciones con IA, colaboracion en equipo o sincronizacion en la nube), podrian ser de pago. Pero todo lo que existe hoy seguira siendo gratuito.",
          },
          {
            question: "¿Donde se guardan mis datos?",
            answer:
              "Todo se almacena en tu navegador, en tu dispositivo. Scritura no envia tus textos, planificaciones ni datos de worldbuilding a ningun servidor. Tu trabajo es completamente privado.",
          },
          {
            question: "¿Puedo exportar mis datos?",
            answer:
              "Si. Puedes exportar la frecuencia de palabras a CSV. Estamos trabajando en mas opciones de exportacion para el planificador y el worldbuilding.",
          },
        ]}
      />

      {/* Future premium note */}
      <section className="px-8 pb-20">
        <div className="mx-auto max-w-2xl rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-6 text-center">
          <p className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
            Sobre el futuro de Scritura
          </p>
          <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
            Si algun dia introducimos funcionalidades premium, seran complementos opcionales.
            El nucleo de Scritura — corrector de estilo, planificador de novelas y worldbuilding —
            seguira siendo gratuito y sin limites. Los escritores en espanol no deberian necesitar
            pagar para tener herramientas de calidad.
          </p>
        </div>
      </section>

      <CTASection
        title="Empieza a escribir mejor hoy"
        subtitle="Sin tarjeta de credito. Sin periodo de prueba. Sin trucos."
        ctaText="Empieza gratis con Google"
      />
    </>
  );
}
