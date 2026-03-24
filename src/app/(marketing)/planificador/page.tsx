import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { BenefitStrip } from "@/components/marketing/BenefitStrip";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";

export const metadata: Metadata = {
  title: "Planificador de novelas - Scritura | Herramienta para escritores",
  description:
    "Estructura tu novela desde la premisa hasta cada escena. Personajes, arcos narrativos, fases, hitos y relaciones. Planifica sin limites.",
};

const FEATURES = [
  {
    title: "Personajes",
    description:
      "Crea fichas completas con motivacion, complicacion, funcion narrativa y tipo de personaje.",
    href: "/planificador/personajes",
    color: "#8b6f47",
  },
  {
    title: "Arcos narrativos",
    description:
      "Disena arcos con planteamiento, nudo y desenlace para cada trama de tu novela.",
    href: "/planificador/arcos-narrativos",
    color: "#8b6f47",
  },
  {
    title: "Escenas",
    description:
      "Organiza cada escena con resumen, objetivo y personajes vinculados.",
    href: "/planificador/escenas",
    color: "#8b6f47",
  },
  {
    title: "Fases",
    description:
      "Divide tu novela en actos y fases con hitos anidados para una vision macro de la estructura.",
    href: "/planificador/fases",
    color: "#8b6f47",
  },
  {
    title: "Hitos",
    description:
      "Define los momentos clave que impulsan la trama: incidentes, giros y climax.",
    href: "/planificador/hitos",
    color: "#8b6f47",
  },
  {
    title: "Lugares",
    description:
      "Documenta cada escenario con descripciones que mantienen la coherencia narrativa.",
    href: "/planificador/lugares",
    color: "#8b6f47",
  },
  {
    title: "Eventos",
    description:
      "Conecta sucesos con personajes, lugares y cronologia para una trama solida.",
    href: "/planificador/eventos",
    color: "#8b6f47",
  },
  {
    title: "Facciones",
    description:
      "Organiza grupos, bandos y organizaciones con objetivos y motivaciones propias.",
    href: "/planificador/facciones",
    color: "#8b6f47",
  },
  {
    title: "Relaciones",
    description:
      "Visualiza las conexiones entre personajes para construir dinamicas creibles.",
    href: "/planificador/relaciones",
    color: "#8b6f47",
  },
];

function HierarchyVisual() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
      <div className="flex flex-col items-center gap-3">
        {/* Proyecto */}
        <div className="rounded-lg border-2 border-[var(--color-accent)] bg-[var(--color-cream)] px-6 py-2.5 text-sm font-bold text-[var(--color-ink)]">
          Proyecto
        </div>
        <div className="h-4 w-px bg-[var(--color-border)]" />

        {/* General */}
        <div className="rounded-lg border border-[var(--color-border)] bg-white px-5 py-2 text-xs font-semibold text-[var(--color-ink)]">
          General (premisa, genero, tono)
        </div>
        <div className="h-4 w-px bg-[var(--color-border)]" />

        {/* Fases */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 text-xs font-semibold text-[var(--color-ink)]">
            Fase 1: Planteamiento
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 text-xs font-semibold text-[var(--color-ink)]">
            Fase 2: Nudo
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 text-xs font-semibold text-[var(--color-ink)]">
            Fase 3: Desenlace
          </div>
        </div>
        <div className="h-4 w-px bg-[var(--color-border)]" />

        {/* Hitos */}
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-dashed border-[var(--color-accent)] bg-white px-3 py-1.5 text-xs text-[var(--color-accent-dark)]">
            Incidente incitador
          </div>
          <div className="rounded-md border border-dashed border-[var(--color-accent)] bg-white px-3 py-1.5 text-xs text-[var(--color-accent-dark)]">
            Punto medio
          </div>
          <div className="rounded-md border border-dashed border-[var(--color-accent)] bg-white px-3 py-1.5 text-xs text-[var(--color-accent-dark)]">
            Climax
          </div>
        </div>
        <div className="h-4 w-px bg-[var(--color-border)]" />

        {/* Escenas */}
        <div className="flex items-center gap-2">
          {["Escena 1", "Escena 2", "Escena 3", "Escena 4"].map((scene) => (
            <div
              key={scene}
              className="rounded-md bg-[var(--color-cream-dark)] px-3 py-1.5 text-xs text-[var(--color-ink-muted)]"
            >
              {scene}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-[var(--color-ink-muted)]">
        Jerarquia completa: Proyecto → General → Fases → Hitos → Escenas
      </p>
    </div>
  );
}

export default function PlanificadorPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Estructura tu novela
            <br />
            <span className="text-[var(--color-accent)]">con precision</span>
          </>
        }
        subtitle="Desde la premisa inicial hasta la ultima escena. Organiza personajes, arcos, fases y relaciones en un solo lugar. Tu novela merece un plan solido."
        secondaryCta={{ text: "Ver todas las herramientas", href: "/" }}
      />

      <BenefitStrip
        items={[
          { value: "De premisa a escena", label: "Estructura jerarquica completa" },
          { value: "Relaciones", label: "Entre todos los elementos" },
          { value: "Autoguardado", label: "Nunca pierdas tu trabajo" },
          { value: "Ilimitado", label: "Sin limites de proyectos" },
        ]}
      />

      <FeatureShowcase
        features={[
          {
            title: "Visualiza la estructura completa de tu novela",
            description:
              "Cada proyecto sigue una jerarquia clara: desde la premisa general hasta las escenas individuales. Fases, hitos y escenas se organizan de forma natural, para que siempre sepas donde estas y hacia donde vas. No mas documentos sueltos ni notas perdidas.",
            visual: <HierarchyVisual />,
          },
        ]}
      />

      <FeatureGrid
        title="Nueve herramientas de planificacion"
        subtitle="Cada aspecto de tu novela tiene su propio espacio. Trabaja en lo que necesites, cuando lo necesites."
        features={FEATURES}
      />

      {/* Narrative workflow section */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            De la idea al manuscrito
          </h2>
          <div className="space-y-6 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Toda novela empieza con una chispa: una premisa, un personaje que no
              te deja dormir, un mundo que quieres explorar. Pero entre esa chispa y
              el manuscrito terminado hay un abismo que muchos escritores no logran
              cruzar. El planificador de Scritura existe para construir ese puente.
            </p>
            <p>
              Empieza por lo grande: define la premisa, el genero y el tono de tu
              proyecto. Despues, divide la historia en fases (actos, partes,
              temporadas) y coloca los hitos que marcan los giros clave. Dentro de
              cada hito, crea las escenas que lo componen. Mientras tanto, desarrolla
              tus personajes, sus arcos narrativos y las relaciones entre ellos.
            </p>
            <p>
              No tienes que seguir un orden fijo. Algunos escritores empiezan por los
              personajes; otros, por la estructura de tres actos; otros, por el
              worldbuilding. El planificador se adapta a tu proceso creativo, no al
              reves.
            </p>
            <p>
              Lo importante es que, cuando te sientes a escribir, sepas exactamente
              que necesita cada escena: que personajes intervienen, que objetivo
              narrativo cumple y como conecta con el resto de la historia. Esa
              claridad es la diferencia entre avanzar y quedarse bloqueado.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Tu novela necesita un plan"
        subtitle="Empieza a estructurar tu historia hoy. Sin limites, sin complicaciones."
      />
    </>
  );
}
