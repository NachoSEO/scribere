import type { Metadata } from "next";
import {
  HeroSection,
  CTASection,
  FAQSection,
  InternalLinkBanner,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "Sistemas - Scritura | Herramienta para escritores",
  description:
    "Define sistemas de magia, tecnologia o politica con reglas, fuentes de poder y limitaciones. Crea las mecanicas que rigen tu mundo ficticio.",
};

function SystemMockUI() {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--color-ink)]">Sistemas del mundo</h3>
        <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
          2 sistemas
        </span>
      </div>

      <div className="space-y-4">
        {/* System card 1 */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#8b6f47]" />
            <p className="text-sm font-semibold text-[var(--color-ink)]">Teurgia de las Mareas</p>
            <span className="rounded bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
              Magia
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded border border-[var(--color-border)] bg-white p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Tipo y fuente
              </p>
              <div className="space-y-1 text-xs text-[var(--color-ink-light)]">
                <p>Sistema de magia elemental</p>
                <p>Fuente: energia de las mareas lunares</p>
                <p>Solo funciona cerca del mar</p>
              </div>
            </div>
            <div className="rounded border border-[var(--color-border)] bg-white p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Reglas
              </p>
              <ul className="space-y-1 text-xs text-[var(--color-ink-light)]">
                <li>• Poder maximo en luna llena</li>
                <li>• Requiere contacto con agua salada</li>
                <li>• Se hereda por linaje materno</li>
              </ul>
            </div>
            <div className="rounded border border-[var(--color-border)] bg-white p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Limitaciones
              </p>
              <ul className="space-y-1 text-xs text-[var(--color-ink-light)]">
                <li>• Inutil tierra adentro</li>
                <li>• Uso excesivo causa ceguera temporal</li>
                <li>• No puede crear, solo transformar</li>
              </ul>
            </div>
          </div>
        </div>

        {/* System card 2 — collapsed */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#bd5749]" />
            <p className="text-sm font-semibold text-[var(--color-ink)]">Gremios Mercantiles</p>
            <span className="rounded bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
              Politica
            </span>
            <span className="ml-auto text-xs text-[var(--color-ink-muted)]">4 reglas · 2 limitaciones</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SistemasPage() {
  return (
    <>
      <HeroSection
        badge="Worldbuilding · Sistemas"
        title={
          <>
            Define sistemas de magia,
            <br />
            <span className="text-[var(--color-accent)]">tecnologia o politica</span>
          </>
        }
        subtitle="Crea las mecanicas que rigen tu mundo: sistemas de magia con limitaciones claras, estructuras politicas, economias o tecnologias con reglas coherentes."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <SystemMockUI />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas definir sistemas
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="mb-2 text-3xl">⚖️</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Reglas que generan tension</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Un sistema de magia sin limitaciones no genera tension. Cuando el lector conoce las reglas, cada uso de poder tiene peso dramatico.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">🚫</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Evita el deus ex machina</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Si defines las limitaciones antes de escribir, nunca caeras en la trampa de inventar poderes convenientes para resolver la trama.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">🧠</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Consistencia interna</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Un documento con todas las reglas de tu sistema te protege de contradecirte entre el capitulo 3 y el 30.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-ink)]">
            Como funciona
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                1
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Elige el tipo de sistema</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Selecciona si es un sistema de magia, tecnologia, politica, economia u otro. Esto te da campos especificos para ese tipo de mecanica.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                2
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Define reglas y limitaciones</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Establece como funciona el sistema, que puede hacer y — mas importante — que no puede hacer. Las limitaciones son las que generan historias interesantes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                3
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Consulta durante la escritura</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Cada vez que un personaje use magia, negocie con un gremio o active una maquina, revisa las reglas de tu sistema para mantener la coherencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Explora mas herramientas de worldbuilding"
        links={[
          {
            title: "Culturas",
            description: "Disena pueblos con costumbres, lenguas y organizacion social.",
            href: "/worldbuilding/culturas",
          },
          {
            title: "Cronologia",
            description: "Crea eras y eventos para contar la historia de tu mundo.",
            href: "/worldbuilding/cronologia",
          },
          {
            title: "Regiones",
            description: "Organiza la geografia de tu mundo en continentes, reinos y ciudades.",
            href: "/worldbuilding/regiones",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Solo sirve para sistemas de magia?",
            answer:
              "No. Puedes definir cualquier tipo de sistema: magia, tecnologia, politica, economia, religion, militar. La estructura de reglas y limitaciones funciona para cualquier mecanica de tu mundo.",
          },
          {
            question: "¿Cuantos sistemas puedo crear?",
            answer:
              "Sin limite. Crea tantos como necesite tu mundo. Una novela tipica de fantasia puede tener 1-3 sistemas principales (magia + politica + economia, por ejemplo).",
          },
          {
            question: "¿Hay plantillas o ejemplos para empezar?",
            answer:
              "Por ahora no incluimos plantillas predefinidas, pero los campos del formulario te guian con sugerencias sobre que incluir en cada seccion: fuente de poder, reglas, limitaciones, usuarios y efectos secundarios.",
          },
          {
            question: "¿Puedo vincular un sistema con culturas o regiones?",
            answer:
              "Puedes referenciar culturas y regiones en la descripcion del sistema. La vinculacion directa entre modulos esta en desarrollo.",
          },
        ]}
      />

      <CTASection
        title="Define las reglas de tu mundo"
        subtitle="Crea sistemas con limitaciones que generen historias memorables. Gratis."
      />
    </>
  );
}
