import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { BenefitStrip } from "@/components/marketing/BenefitStrip";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MockManuscritoEditor } from "@/components/marketing/mocks";
import { MockFocusMode } from "@/components/marketing/mocks";
import { MockMentionDropdown } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Manuscrito - Editor para novelas con @menciones | Scritura",
  description:
    "Escribe tu novela en un editor que conoce tus personajes, lugares y eventos. Menciona entidades con @, activa el modo concentracion y corrige mientras escribes.",
};

export default function ManuscritoPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Escribe tu novela
            <br />
            <span className="text-[var(--color-accent)]">
              con todo el contexto a mano
            </span>
          </>
        }
        subtitle="Un editor de texto que conoce a tus personajes, tus lugares y tus eventos. Escribe @Lyra y tu protagonista aparece. Sin cambiar de pestana, sin perder el hilo."
      />

      <BenefitStrip
        items={[
          { value: "Editor completo", label: "Negrita, cursiva, listas, citas" },
          { value: "@menciones", label: "Personajes, lugares, facciones, eventos" },
          { value: "Modo concentracion", label: "Solo tu y las palabras" },
          { value: "Corrector integrado", label: "Analisis de estilo en tiempo real" },
        ]}
      />

      <FeatureShowcase
        features={[
          {
            title: "Tu manuscrito conectado con tu planificacion",
            description:
              "El editor organiza las escenas en carpetas que siguen la estructura de tu novela. Cada escena tiene acceso directo a los personajes, lugares y eventos que creaste en el planificador. Cuando escribes @Kael, el editor sabe quien es y te lleva a su ficha con un clic.",
            visual: <MockManuscritoEditor />,
          },
          {
            title: "Modo concentracion: solo tu y las palabras",
            description:
              "Pulsa Cmd+Shift+F y todo desaparece salvo el parrafo que estas escribiendo. El texto anterior y posterior se atenua. El cursor se mantiene en el centro de la pantalla. Sin distracciones, sin barra lateral, sin notificaciones. Pulsa Escape cuando quieras volver.",
            visual: <MockFocusMode />,
          },
          {
            title: "Menciona cualquier entidad con @",
            description:
              "Escribe @ y empieza a teclear un nombre. El editor te sugiere personajes, lugares, facciones y eventos que coincidan. Cada mencion queda marcada con un color segun su tipo: marron para personajes, verde azulado para lugares, morado para facciones, naranja para eventos. Haz clic en cualquier mencion para ir directamente a su ficha.",
            visual: <MockMentionDropdown />,
          },
        ]}
      />

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas un editor conectado a tu planificacion
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              La mayoria de escritores planifican en un sitio y escriben en otro. El
              documento con las fichas de personajes esta en una carpeta; el manuscrito,
              en otra. Cuando necesitas recordar el nombre del tabernero del capitulo 3
              o en que escena aparecio por ultima vez el antagonista, pierdes cinco
              minutos buscando entre archivos.
            </p>
            <p>
              Esos cinco minutos se repiten decenas de veces a lo largo de una novela.
              No solo pierdes tiempo: pierdes concentracion. Y la concentracion es lo
              mas dificil de recuperar cuando estas en medio de una escena.
            </p>
            <p>
              El editor de Scritura vive dentro del planificador. Tus personajes,
              lugares, facciones y eventos estan a un @ de distancia. El arbol de
              carpetas refleja tu estructura narrativa. Y cuando necesitas silencio
              absoluto, el modo concentracion apaga todo lo demas.
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
                Selecciona una escena
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                El arbol lateral muestra tus carpetas y escenas. Haz clic en una
                escena para abrirla en el editor. La estructura sigue las fases y
                actos de tu novela.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Escribe con @ para referencias
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Cuando menciones un personaje o lugar en tu texto, usa @. El editor
                sugiere entidades y las marca con colores. Cada mencion es un enlace
                directo a la ficha correspondiente.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Activa el corrector para pulir
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Con un clic activas el analisis de estilo: adverbios, verbos
                debiles, frases largas. Corrige sobre la marcha o desactivalo
                mientras te concentras en avanzar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Herramientas relacionadas"
        links={[
          {
            title: "Estructura",
            description:
              "Ve la columna vertebral de tu novela: fases, hitos, arcos y escenas en un solo arbol.",
            href: "/planificador/estructura",
          },
          {
            title: "Escenas",
            description:
              "Define el objetivo narrativo de cada escena antes de escribirla.",
            href: "/planificador/escenas",
          },
          {
            title: "Corrector",
            description:
              "Analiza y mejora tu prosa con 10 categorias de revision de estilo.",
            href: "/corrector",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Que formatos de texto soporta el editor?",
            answer:
              "Negrita, cursiva, encabezados (H2, H3), listas ordenadas y desordenadas, citas y separadores. Es un editor pensado para prosa narrativa, no para documentos complejos.",
          },
          {
            question: "Se guarda automaticamente?",
            answer:
              "Si. Cada cambio se guarda automaticamente tras dejar de escribir, sin necesidad de pulsar nada. Veras un indicador de 'Autoguardado' en la barra inferior.",
          },
          {
            question: "Puedo usar el corrector mientras escribo?",
            answer:
              "Si. El corrector se activa con un boton y analiza el texto en tiempo real. Puedes desactivarlo cuando prefieras escribir sin interrupciones y reactivarlo para revisar.",
          },
          {
            question: "Que atajos de teclado tiene?",
            answer:
              "Cmd+Shift+F activa el modo concentracion. Cmd+B para negrita, Cmd+I para cursiva. Escape sale del modo concentracion. Los atajos estandar de edicion (copiar, pegar, deshacer) funcionan como en cualquier editor.",
          },
          {
            question: "Puedo organizar las escenas en carpetas?",
            answer:
              "Si. El arbol lateral soporta carpetas anidadas. Puedes crear carpetas por actos, partes o capitulos y mover escenas entre ellas.",
          },
        ]}
      />

      <CTASection
        title="Tu manuscrito merece un hogar"
        subtitle="Escribe con todo el contexto de tu novela al alcance de una @. Gratis."
      />
    </>
  );
}
