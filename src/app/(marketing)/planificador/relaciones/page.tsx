import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Relaciones - Scritura | Herramienta para escritores",
  description:
    "Visualiza las relaciones entre personajes de tu novela. Alianzas, rivalidades, romances y traiciones. Construye dinamicas creibles y complejas.",
};

function RelationshipDiagramMock() {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-center text-sm font-bold text-[var(--color-ink)]">
        Red de relaciones
      </h3>
      <div className="relative mx-auto" style={{ height: 280, maxWidth: 400 }}>
        {/* SVG lines connecting characters */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 280">
          {/* Elena - Marco */}
          <line x1="200" y1="40" x2="80" y2="140" stroke="var(--color-border)" strokeWidth="1.5" />
          {/* Elena - Sofia */}
          <line x1="200" y1="40" x2="320" y2="140" stroke="var(--color-accent)" strokeWidth="1.5" />
          {/* Elena - Don Ramon */}
          <line x1="200" y1="40" x2="200" y2="220" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Marco - Don Ramon */}
          <line x1="80" y1="140" x2="200" y2="220" stroke="var(--color-border)" strokeWidth="1.5" />
          {/* Sofia - Don Ramon */}
          <line x1="320" y1="140" x2="200" y2="220" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>

        {/* Character nodes */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-white">
              EM
            </div>
            <span className="mt-1 text-xs font-semibold text-[var(--color-ink)]">Elena</span>
          </div>
        </div>

        <div className="absolute left-4 top-28">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-xs font-bold text-[var(--color-ink-muted)]">
              MC
            </div>
            <span className="mt-1 text-xs font-semibold text-[var(--color-ink)]">Marco</span>
            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-700">
              Aliado / Traidor
            </span>
          </div>
        </div>

        <div className="absolute right-4 top-28">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-xs font-bold text-[var(--color-ink-muted)]">
              SM
            </div>
            <span className="mt-1 text-xs font-semibold text-[var(--color-ink)]">Sofia</span>
            <span className="rounded-full bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-[10px] text-[var(--color-accent)]">
              Hermanas
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-xs font-bold text-[var(--color-ink-muted)]">
              DR
            </div>
            <span className="mt-1 text-xs font-semibold text-[var(--color-ink)]">Don Ramon</span>
            <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] text-red-700">
              Sospechoso
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-[var(--color-ink-muted)]">
        <div className="flex items-center gap-1">
          <div className="h-px w-4 bg-[var(--color-border)]" />
          <span>Relacion directa</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-px w-4 border-t border-dashed border-[var(--color-border)]" />
          <span>Relacion tensa</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-px w-4 bg-[var(--color-accent)]" />
          <span>Vinculo familiar</span>
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
        subtitle="Alianzas, rivalidades, romances, traiciones. Las relaciones son el tejido emocional de tu novela. Mapealas para crear dinamicas ricas y coherentes."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <RelationshipDiagramMock />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas mapear las relaciones
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Las relaciones entre personajes son lo que convierte una lista de
              nombres en un elenco vivo. Cada relacion genera expectativas en el
              lector: cuando dos rivales estan juntos en una escena, hay tension.
              Cuando dos aliados se traicionan, hay drama. Cuando un romance se
              rompe, hay emocion.
            </p>
            <p>
              El problema surge cuando el elenco crece. Con seis personajes ya hay
              quince posibles relaciones. Con diez, cuarenta y cinco. Sin un mapa
              visual, es imposible recordar quien conoce a quien, quien se odia con
              quien y que secretos comparten. El mapa de relaciones de Scritura te
              da esa vision de conjunto para que cada interaccion entre personajes
              sea intencional y coherente.
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
                relacion. Pueden ser del mismo grupo, de facciones rivales o no
                tener ninguna conexion previa.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Define la relacion
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Describe el tipo de vinculo: familiar, romantico, profesional,
                rival, mentor/aprendiz. Anade notas sobre como evoluciona la
                relacion a lo largo de la historia.
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
                Ve todas las relaciones de tu novela en un diagrama visual.
                Identifica personajes aislados, triangulos dramaticos y nudos de
                tension que puedes explotar en la narrativa.
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
            description: "Crea las fichas completas de los personajes antes de definir sus relaciones.",
            href: "/planificador/personajes",
          },
          {
            title: "Facciones",
            description: "Organiza los personajes en grupos para entender las lealtades colectivas.",
            href: "/planificador/facciones",
          },
          {
            title: "Arcos narrativos",
            description: "Las relaciones evolucionan dentro de los arcos. Conecta ambos para mayor coherencia.",
            href: "/planificador/arcos-narrativos",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Puedo definir relaciones que cambian durante la novela?",
            answer:
              "Si. Puedes anotar como evoluciona cada relacion. Dos personajes pueden empezar como aliados y acabar como enemigos, reflejando la complejidad de la trama.",
          },
          {
            question: "Hay un limite de relaciones por personaje?",
            answer:
              "No. Un personaje puede tener tantas relaciones como necesites. Los protagonistas suelen tener muchas conexiones, mientras que los secundarios pueden tener solo una o dos.",
          },
          {
            question: "Puedo ver las relaciones de un solo personaje?",
            answer:
              "Si. Desde la ficha de cada personaje puedes ver todas sus relaciones. Tambien puedes ver el mapa completo de relaciones de todo el proyecto.",
          },
          {
            question: "Las relaciones se conectan con las escenas?",
            answer:
              "Las relaciones se definen entre personajes, y los personajes se vinculan a escenas. Asi puedes saber que dinamicas estan en juego en cada escena de tu novela.",
          },
        ]}
      />

      <CTASection
        title="Mapea las dinamicas de tu novela"
        subtitle="Alianzas, rivalidades, secretos compartidos. Todo visible de un vistazo."
      />
    </>
  );
}
