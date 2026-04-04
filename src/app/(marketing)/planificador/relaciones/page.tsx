import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Relaciones entre personajes - Scritura | Planificador",
  description:
    "Visualiza las relaciones entre personajes de tu novela. Protectores, enemigos ideologicos, mentores falsos. Construye dinamicas complejas y coherentes.",
};

function RelationshipDiagramMock() {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-center text-sm font-bold text-[var(--color-ink)]">
        Red de relaciones
      </h3>
      <div className="relative mx-auto" style={{ height: 320, maxWidth: 420 }}>
        {/* SVG lines connecting characters */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 320">
          {/* Lyra - Kael: solid accent (protector) */}
          <line x1="210" y1="130" x2="60" y2="160" stroke="var(--color-accent)" strokeWidth="1.5" />
          {/* Lyra - Vael: dashed red (enemiga ideologica) */}
          <line x1="210" y1="130" x2="360" y2="160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Lyra - Nira: solid emerald (guia) */}
          <line x1="210" y1="130" x2="340" y2="40" stroke="#10b981" strokeWidth="1.5" />
          {/* Lyra - Aldric: dashed accent (mentor falso) */}
          <line x1="210" y1="130" x2="210" y2="270" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Kael - Vael: solid red (enfrentados) */}
          <line x1="60" y1="160" x2="360" y2="160" stroke="#ef4444" strokeWidth="1.5" />
        </svg>

        {/* Lyra - center */}
        <div className="absolute left-1/2 top-20 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8b6f47] text-sm font-bold text-white shadow-md">
              L
            </div>
            <span className="mt-1.5 text-xs font-bold text-[var(--color-ink)]">Lyra</span>
            <span className="rounded-full bg-[var(--color-cream-dark)] px-2 py-0.5 text-[9px] font-medium text-[var(--color-ink-muted)]">
              Protagonista
            </span>
          </div>
        </div>

        {/* Kael - left */}
        <div className="absolute left-0 top-28">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8b6f47] text-xs font-bold text-white">
              K
            </div>
            <span className="mt-1 text-xs font-semibold text-[var(--color-ink)]">Kael</span>
            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-medium text-amber-700">
              Protector &rarr; Companero
            </span>
            <span className="mt-0.5 text-[8px] text-[var(--color-ink-muted)]">Orden del Cristal</span>
          </div>
        </div>

        {/* Maestra Vael - right */}
        <div className="absolute right-0 top-28">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#cc853d] text-xs font-bold text-white">
              V
            </div>
            <span className="mt-1 text-xs font-semibold text-[var(--color-ink)]">Maestra Vael</span>
            <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-medium text-red-700">
              Enemiga ideologica
            </span>
            <span className="mt-0.5 text-[8px] text-[var(--color-ink-muted)]">Los Despertadores</span>
          </div>
        </div>

        {/* Nira - top-right */}
        <div className="absolute right-8 top-0">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#589b9b] text-xs font-bold text-white">
              N
            </div>
            <span className="mt-1 text-xs font-semibold text-[var(--color-ink)]">Nira</span>
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
              Guia espiritual
            </span>
          </div>
        </div>

        {/* Aldric - bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#93709e] text-xs font-bold text-white">
              A
            </div>
            <span className="mt-1 text-xs font-semibold text-[var(--color-ink)]">Aldric</span>
            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-medium text-amber-700">
              Mentor falso
            </span>
            <span className="mt-0.5 text-[8px] text-[var(--color-ink-muted)]">Orden del Cristal</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] text-[var(--color-ink-muted)]">
        <div className="flex items-center gap-1">
          <div className="h-px w-4 bg-[var(--color-accent)]" />
          <span>Vinculo positivo</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-px w-4 bg-[#ef4444]" />
          <span>Conflicto</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-px w-4 bg-[#10b981]" />
          <span>Guia / Mentor</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-px w-4 border-t border-dashed border-[var(--color-ink-muted)]" />
          <span>Relacion ambigua</span>
        </div>
      </div>
    </div>
  );
}

export default function RelacionesPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Visualiza las relaciones
            <br />
            <span className="text-[var(--color-accent)]">entre personajes</span>
          </>
        }
        subtitle="Protectores, enemigos ideologicos, mentores falsos, guias espirituales. Las relaciones son el tejido emocional de tu novela. Mapealas para que cada interaccion tenga peso."
      />

      {/* Relationship diagram */}
      <section className="px-8 pb-20">
        <RelationshipDiagramMock />
      </section>

      {/* Por que necesitas mapear relaciones */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas mapear las relaciones
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Las relaciones entre personajes son lo que convierte una lista de
              nombres en un elenco vivo. Cuando Lyra y Vael coinciden en una escena,
              hay tension ideologica. Cuando Kael se interpone entre ambas, hay
              lealtad en conflicto. Cuando Aldric aconseja a Lyra, el lector que
              sabe la verdad siente la amenaza.
            </p>
            <p>
              El problema surge cuando el elenco crece. Con cinco personajes ya hay
              diez posibles relaciones. Con diez, cuarenta y cinco. Sin un mapa
              visual, es imposible recordar quien conoce a quien, quien se enfrenta
              con quien y que secretos comparten. El mapa de relaciones de Scritura
              te da esa vision de conjunto para que cada interaccion sea intencional.
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-ink)]">
            Como funciona
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                1
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Selecciona dos personajes
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Elige los dos personajes entre los que quieres definir una
                relacion. Lyra y Kael, Lyra y Vael, Kael y Aldric. Pueden ser
                del mismo grupo o de facciones enfrentadas.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Describe el vinculo
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Define el tipo de relacion y como evoluciona. Kael empieza como
                protector de Lyra y acaba como companero. Aldric parece un
                mentor, pero oculta sus propios intereses. Cada relacion puede
                cambiar a lo largo de la historia.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Visualiza la red
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Ve todas las relaciones en un diagrama. Identifica personajes
                aislados, triangulos de tension y alianzas que podrian romperse.
                Los colores y tipos de linea te dicen de un vistazo donde esta
                el conflicto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Herramientas relacionadas"
        links={[
          {
            title: "Personajes",
            description: "Crea las fichas completas de Lyra, Kael, Vael y el resto del elenco.",
            href: "/planificador/personajes",
          },
          {
            title: "Facciones",
            description: "Organiza personajes en grupos como la Orden o los Despertadores para entender las lealtades colectivas.",
            href: "/planificador/facciones",
          },
          {
            title: "Manuscrito",
            description: "Las relaciones cobran vida en las escenas. Escribe tu manuscrito con los personajes conectados.",
            href: "/planificador/manuscrito",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Puedo definir relaciones que cambian durante la novela?",
            answer:
              "Si. Puedes anotar como evoluciona cada relacion. Kael empieza como protector de Lyra y acaba como companero de lucha. Aldric empieza como mentor y acaba como antagonista. La evolucion queda documentada.",
          },
          {
            question: "Hay un limite de relaciones por personaje?",
            answer:
              "No. Un personaje puede tener tantas relaciones como necesites. Lyra tiene vinculos con Kael, Vael, Nira y Aldric, cada uno con una dinamica distinta. Los protagonistas suelen acumular mas conexiones.",
          },
          {
            question: "Puedo ver las relaciones de un solo personaje?",
            answer:
              "Si. Desde la ficha de cada personaje puedes ver todas sus relaciones. Tambien puedes ver el mapa completo de todo el proyecto para detectar patrones y personajes desconectados.",
          },
          {
            question: "Como se relacionan las relaciones con las facciones?",
            answer:
              "Las facciones definen lealtades colectivas. Las relaciones definen vinculos individuales. Kael y Vael pertenecen a facciones enemigas, pero su relacion personal tiene matices propios. Ambos sistemas se complementan.",
          },
        ]}
      />

      <CTASection
        title="Mapea las dinamicas de tu novela"
        subtitle="Protectores, rivales, mentores falsos. Todo visible en un diagrama que revela la red emocional de tu historia."
      />
    </>
  );
}
