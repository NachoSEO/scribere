import type { Metadata } from "next";
import {
  HeroSection,
  CTASection,
  FeatureGrid,
  BenefitStrip,
  FeatureShowcase,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "Worldbuilding - Scritura | Herramienta para escritores",
  description:
    "Construye mundos ficticios completos con cronologias, mapas, regiones, culturas y sistemas. Organiza cada detalle de tu universo narrativo.",
};

const WORLDBUILDING_FEATURES = [
  {
    icon: "📅",
    title: "Cronologia",
    description:
      "Organiza la historia de tu mundo en eras y eventos. Visualiza siglos de conflictos, migraciones y descubrimientos.",
    href: "/worldbuilding/cronologia",
  },
  {
    icon: "🗺️",
    title: "Mapas",
    description:
      "Sube el mapa de tu mundo y vincula regiones, ciudades y puntos de interes directamente sobre la imagen.",
    href: "/worldbuilding/mapas",
  },
  {
    icon: "🏔️",
    title: "Regiones",
    description:
      "Define continentes, reinos, ciudades y aldeas en una jerarquia geografica clara y navegable.",
    href: "/worldbuilding/regiones",
  },
  {
    icon: "🎭",
    title: "Culturas",
    description:
      "Disena pueblos y civilizaciones con costumbres, lenguas, organizacion social y creencias propias.",
    href: "/worldbuilding/culturas",
  },
  {
    icon: "⚙️",
    title: "Sistemas",
    description:
      "Define sistemas de magia, tecnologia, politica o economia con reglas, fuentes de poder y limitaciones.",
    href: "/worldbuilding/sistemas",
  },
];

function WorldHierarchyVisual() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
      {/* Root */}
      <div className="mb-4 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-4 py-3 text-center">
        <p className="text-sm font-bold text-[var(--color-accent)]">🌍 Tu Mundo</p>
        <p className="text-xs text-[var(--color-ink-muted)]">El universo de tu novela</p>
      </div>

      {/* Branches */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3 text-center">
          <p className="text-xs font-semibold text-[var(--color-ink)]">📅 Cronologia</p>
          <p className="mt-1 text-[10px] text-[var(--color-ink-muted)]">Eras y eventos</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3 text-center">
          <p className="text-xs font-semibold text-[var(--color-ink)]">🏔️ Regiones</p>
          <p className="mt-1 text-[10px] text-[var(--color-ink-muted)]">Geografia y lugares</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3 text-center">
          <p className="text-xs font-semibold text-[var(--color-ink)]">🎭 Culturas</p>
          <p className="mt-1 text-[10px] text-[var(--color-ink-muted)]">Pueblos y costumbres</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3 text-center">
          <p className="text-xs font-semibold text-[var(--color-ink)]">⚙️ Sistemas</p>
          <p className="mt-1 text-[10px] text-[var(--color-ink-muted)]">Magia y reglas</p>
        </div>
      </div>
    </div>
  );
}

export default function WorldbuildingPage() {
  return (
    <>
      <HeroSection
        badge="Worldbuilding"
        title={
          <>
            Construye mundos
            <br />
            <span className="text-[var(--color-accent)]">que respiran</span>
          </>
        }
        subtitle="Crea universos ficticios completos con cronologias, mapas, regiones, culturas y sistemas. Cada detalle de tu mundo, organizado y conectado."
        secondaryCta={{ text: "Ver herramientas", href: "#herramientas" }}
      />

      <BenefitStrip
        items={[
          { value: "Mundos completos", label: "Todo conectado" },
          { value: "Cronologias", label: "Eras y eventos" },
          { value: "Mapas", label: "Geografia visual" },
          { value: "Sistemas", label: "Magia y reglas" },
        ]}
      />

      <FeatureShowcase
        features={[
          {
            title: "Tu mundo, de un vistazo",
            description:
              "Visualiza la estructura completa de tu universo: desde las eras historicas hasta los sistemas de magia, pasando por la geografia y las culturas. Todo conectado en una jerarquia clara que te permite navegar y expandir cada aspecto de tu mundo sin perder la vision global.",
            visual: <WorldHierarchyVisual />,
          },
        ]}
      />

      <div id="herramientas">
        <FeatureGrid
          title="Cinco herramientas para construir tu mundo"
          subtitle="Cada aspecto de tu universo ficticio tiene su propio modulo. Usalo por separado o conectalos entre si."
          features={WORLDBUILDING_FEATURES}
        />
      </div>

      <CTASection
        title="Tu mundo esta esperando ser creado"
        subtitle="Empieza a construir el universo de tu novela hoy. Gratis, sin limites."
      />
    </>
  );
}
