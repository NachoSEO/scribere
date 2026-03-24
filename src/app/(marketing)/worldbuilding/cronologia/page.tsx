import type { Metadata } from "next";
import {
  HeroSection,
  CTASection,
  FAQSection,
  InternalLinkBanner,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "Cronologia - Scritura | Herramienta para escritores",
  description:
    "Organiza la historia de tu mundo ficticio en eras y eventos cronologicos. Visualiza siglos de conflictos, migraciones y descubrimientos en tu novela.",
};

function TimelineMockUI() {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--color-ink)]">Cronologia del mundo</h3>
        <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
          3 eras · 7 eventos
        </span>
      </div>

      <div className="space-y-4">
        {/* Era 1 */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#55699b]" />
            <p className="text-sm font-semibold text-[var(--color-ink)]">Era de los Fundadores</p>
            <span className="text-xs text-[var(--color-ink-muted)]">Ano 0 - 450</span>
          </div>
          <div className="ml-5 space-y-2 border-l-2 border-[var(--color-border)] pl-4">
            <div className="rounded border border-[var(--color-border)] bg-white px-3 py-2">
              <p className="text-xs font-medium text-[var(--color-ink)]">Llegada de los Primeros</p>
              <p className="text-[10px] text-[var(--color-ink-muted)]">Ano 0 · Las cinco familias cruzan el Mar Gris</p>
            </div>
            <div className="rounded border border-[var(--color-border)] bg-white px-3 py-2">
              <p className="text-xs font-medium text-[var(--color-ink)]">Pacto de Aldara</p>
              <p className="text-[10px] text-[var(--color-ink-muted)]">Ano 127 · Se firman las Leyes de Piedra</p>
            </div>
          </div>
        </div>

        {/* Era 2 */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#8b6f47]" />
            <p className="text-sm font-semibold text-[var(--color-ink)]">Era de las Guerras</p>
            <span className="text-xs text-[var(--color-ink-muted)]">Ano 451 - 890</span>
          </div>
          <div className="ml-5 space-y-2 border-l-2 border-[var(--color-border)] pl-4">
            <div className="rounded border border-[var(--color-border)] bg-white px-3 py-2">
              <p className="text-xs font-medium text-[var(--color-ink)]">Caida de Nortavia</p>
              <p className="text-[10px] text-[var(--color-ink-muted)]">Ano 523 · El reino del norte es conquistado</p>
            </div>
            <div className="rounded border border-[var(--color-border)] bg-white px-3 py-2">
              <p className="text-xs font-medium text-[var(--color-ink)]">Batalla del Rio Rojo</p>
              <p className="text-[10px] text-[var(--color-ink-muted)]">Ano 671 · Tres ejercitos se enfrentan en el cruce</p>
            </div>
          </div>
        </div>

        {/* Era 3 */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#bd5749]" />
            <p className="text-sm font-semibold text-[var(--color-ink)]">Era del Renacimiento</p>
            <span className="text-xs text-[var(--color-ink-muted)]">Ano 891 - presente</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CronologiaPage() {
  return (
    <>
      <HeroSection
        badge="Worldbuilding · Cronologia"
        title={
          <>
            Construye la historia de tu mundo,
            <br />
            <span className="text-[var(--color-accent)]">era por era</span>
          </>
        }
        subtitle="Organiza miles de anos de historia ficticia en una linea temporal clara. Crea eras, anade eventos y visualiza como evolucionan tus civilizaciones."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <TimelineMockUI />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas una cronologia
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="mb-2 text-3xl">🧩</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Coherencia temporal</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Evita anacronismos y contradicciones en la historia de tu mundo. Si un reino cayo hace 300 anos, todo debe ser consistente.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">📖</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Profundidad narrativa</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Un mundo con historia se siente vivo. Los lectores perciben la diferencia entre un escenario plano y uno con capas de pasado.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">🔍</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Referencia rapida</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Cuando escribes el capitulo 30 y necesitas recordar que paso en el ano 523 de tu mundo, la cronologia te lo dice al instante.
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
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Crea tus eras</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Divide la historia de tu mundo en grandes periodos: la era de los dioses, la edad oscura, el renacimiento. Cada era tiene un nombre, fechas y una descripcion.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                2
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Anade eventos</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Dentro de cada era, registra los eventos clave: batallas, descubrimientos, fundaciones, catastrofes. Cada evento lleva fecha, titulo y descripcion.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                3
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Consulta mientras escribes</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Tu cronologia siempre esta a mano. Cuando necesites saber que ocurrio en un periodo concreto, basta con abrir la linea temporal y buscar.
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
            title: "Regiones",
            description: "Organiza la geografia de tu mundo en continentes, reinos y ciudades.",
            href: "/worldbuilding/regiones",
          },
          {
            title: "Culturas",
            description: "Disena pueblos con costumbres, lenguas y organizacion social.",
            href: "/worldbuilding/culturas",
          },
          {
            title: "Sistemas",
            description: "Define sistemas de magia, tecnologia o politica con reglas claras.",
            href: "/worldbuilding/sistemas",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Cuantas eras y eventos puedo crear?",
            answer:
              "No hay limite. Puedes crear tantas eras y eventos como necesites para tu mundo. Algunos autores trabajan con 3-5 eras, otros con docenas. Tu decides la escala.",
          },
          {
            question: "¿Puedo usar un calendario inventado?",
            answer:
              "Si. La cronologia funciona con numeros, asi que puedes usar cualquier sistema de datacion: anos, ciclos, lunas o lo que encaje con tu mundo.",
          },
          {
            question: "¿Los eventos se ordenan automaticamente?",
            answer:
              "Si. Los eventos dentro de cada era se ordenan por su fecha automaticamente, para que siempre veas la linea temporal en orden cronologico.",
          },
          {
            question: "¿Puedo vincular eventos con regiones o culturas?",
            answer:
              "Todavia no, pero esta en nuestros planes. Por ahora puedes mencionar regiones y culturas en la descripcion del evento para mantener la referencia.",
          },
        ]}
      />

      <CTASection
        title="Empieza a escribir la historia de tu mundo"
        subtitle="Crea tu primera cronologia en minutos. Gratis, sin limites."
      />
    </>
  );
}
