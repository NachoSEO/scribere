import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Personajes - Scritura | Herramienta para escritores",
  description:
    "Crea fichas de personajes completas con motivacion, complicacion, funcion narrativa y tipo. Organiza el elenco de tu novela en un solo lugar.",
};

function CharacterCardMock() {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
          EM
        </div>
        <div>
          <h3 className="text-sm font-bold text-[var(--color-ink)]">Elena Marchetti</h3>
          <span className="rounded-full bg-[var(--color-cream-dark)] px-2 py-0.5 text-xs text-[var(--color-ink-muted)]">
            Protagonista
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Funcion narrativa</p>
          <p className="text-sm text-[var(--color-ink-light)]">
            Descubrir la verdad sobre la desaparicion de su hermana
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Motivacion</p>
          <p className="text-sm text-[var(--color-ink-light)]">
            Culpa por no haber estado presente la noche de la desaparicion
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold text-[var(--color-ink-muted)]">Complicacion</p>
          <p className="text-sm text-[var(--color-ink-light)]">
            Cada pista la acerca a un secreto que podria destruir a su familia
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-2.5 py-1 text-xs text-[var(--color-ink-muted)]">
            Tipo: Dinamico
          </span>
          <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-2.5 py-1 text-xs text-[var(--color-ink-muted)]">
            Arco: Transformacion
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PersonajesPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Crea personajes
            <br />
            <span className="text-[var(--color-accent)]">que cobran vida</span>
          </>
        }
        subtitle="Fichas completas con motivacion, complicacion y funcion narrativa. Cada personaje tiene su espacio para crecer junto a tu historia."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <CharacterCardMock />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas fichas de personajes
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Los personajes son el corazon de cualquier historia. Un lector puede
              olvidar la trama, pero nunca olvida a un personaje que le hizo sentir
              algo. Sin embargo, crear personajes memorables requiere mas que
              intuicion: necesitas saber que los mueve, que los frena y que papel
              cumplen en la narrativa.
            </p>
            <p>
              Sin un sistema de fichas, acabas con notas dispersas en documentos
              sueltos, contradicciones entre capitulos y personajes que se sienten
              planos. El gestor de personajes de Scritura te obliga a pensar en lo
              que importa: motivacion, complicacion y funcion narrativa. Tres campos
              que transforman una lista de rasgos en un ser humano creible.
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
                Crea la ficha
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dale un nombre y selecciona el tipo de personaje: protagonista,
                antagonista, secundario o figurante. Cada tipo te guia hacia los
                campos mas relevantes.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Define lo esencial
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Completa la motivacion (que quiere), la complicacion (que se lo
                impide) y la funcion narrativa (para que existe en la historia).
                Estos tres campos son el motor del personaje.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Conecta con la historia
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Vincula al personaje con escenas, arcos narrativos y otros
                personajes. Asi ves de un vistazo como encaja en el conjunto de tu
                novela.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Herramientas relacionadas"
        links={[
          {
            title: "Arcos narrativos",
            description: "Disena el arco de transformacion de cada personaje con planteamiento, nudo y desenlace.",
            href: "/planificador/arcos-narrativos",
          },
          {
            title: "Relaciones",
            description: "Visualiza las conexiones entre personajes y como evolucionan a lo largo de la trama.",
            href: "/planificador/relaciones",
          },
          {
            title: "Escenas",
            description: "Vincula personajes a cada escena para saber quien interviene y con que objetivo.",
            href: "/planificador/escenas",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Cuantos personajes puedo crear por proyecto?",
            answer:
              "No hay limite. Puedes crear tantos personajes como necesite tu historia, desde el protagonista hasta los figurantes.",
          },
          {
            question: "Puedo vincular un personaje a varias escenas?",
            answer:
              "Si. Cada personaje puede estar vinculado a multiples escenas, arcos narrativos y relaciones. Veras todas las conexiones desde su ficha.",
          },
          {
            question: "Que diferencia hay entre motivacion y complicacion?",
            answer:
              "La motivacion es lo que el personaje quiere conseguir. La complicacion es el obstaculo interno o externo que se lo impide. Juntas crean tension narrativa.",
          },
          {
            question: "Puedo anadir campos personalizados a la ficha?",
            answer:
              "La ficha incluye los campos esenciales para la narrativa. Puedes usar el campo de notas para anadir informacion adicional como rasgos fisicos, backstory o detalles secundarios.",
          },
        ]}
      />

      <CTASection
        title="Dale vida a tus personajes"
        subtitle="Crea fichas completas y conectalas con el resto de tu novela. Gratis."
      />
    </>
  );
}
