import type { Metadata } from "next";
import {
  HeroSection,
  CTASection,
  FAQSection,
  InternalLinkBanner,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "Regiones - Scritura | Herramienta para escritores",
  description:
    "Organiza la geografia de tu mundo ficticio en continentes, reinos, ciudades y aldeas. Crea una jerarquia geografica clara para tu novela.",
};

function RegionTreeMockUI() {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--color-ink)]">Regiones del mundo</h3>
        <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
          2 continentes · 5 regiones
        </span>
      </div>

      <div className="space-y-2">
        {/* Continent 1 */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3">
          <div className="flex items-center gap-2">
            <span className="text-xs">🌍</span>
            <p className="text-sm font-semibold text-[var(--color-ink)]">Aldaria</p>
            <span className="rounded bg-[var(--color-ink-muted)]/10 px-1.5 py-0.5 text-[10px] text-[var(--color-ink-muted)]">Continente</span>
          </div>

          <div className="ml-6 mt-2 space-y-2 border-l-2 border-[var(--color-border)] pl-4">
            {/* Kingdom */}
            <div className="rounded border border-[var(--color-border)] bg-white p-3">
              <div className="flex items-center gap-2">
                <span className="text-xs">🏰</span>
                <p className="text-xs font-semibold text-[var(--color-ink)]">Reino de Nortavia</p>
                <span className="rounded bg-[var(--color-ink-muted)]/10 px-1.5 py-0.5 text-[10px] text-[var(--color-ink-muted)]">Reino</span>
              </div>

              <div className="ml-6 mt-2 space-y-1 border-l-2 border-[var(--color-border)] pl-3">
                <div className="flex items-center gap-2 rounded bg-[var(--color-cream)] px-2 py-1.5">
                  <span className="text-[10px]">🏙️</span>
                  <p className="text-[11px] font-medium text-[var(--color-ink)]">Aldara (capital)</p>
                </div>
                <div className="flex items-center gap-2 rounded bg-[var(--color-cream)] px-2 py-1.5">
                  <span className="text-[10px]">🏘️</span>
                  <p className="text-[11px] font-medium text-[var(--color-ink)]">Pueblo de las Brumas</p>
                </div>
              </div>
            </div>

            {/* Another kingdom */}
            <div className="rounded border border-[var(--color-border)] bg-white p-3">
              <div className="flex items-center gap-2">
                <span className="text-xs">🏰</span>
                <p className="text-xs font-semibold text-[var(--color-ink)]">Marcas del Sur</p>
                <span className="rounded bg-[var(--color-ink-muted)]/10 px-1.5 py-0.5 text-[10px] text-[var(--color-ink-muted)]">Region</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continent 2 */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3">
          <div className="flex items-center gap-2">
            <span className="text-xs">🌍</span>
            <p className="text-sm font-semibold text-[var(--color-ink)]">Islas Errantes</p>
            <span className="rounded bg-[var(--color-ink-muted)]/10 px-1.5 py-0.5 text-[10px] text-[var(--color-ink-muted)]">Archipielago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegionesPage() {
  return (
    <>
      <HeroSection
        badge="Worldbuilding · Regiones"
        title={
          <>
            Organiza la geografia
            <br />
            <span className="text-[var(--color-accent)]">de tu mundo</span>
          </>
        }
        subtitle="Estructura tu mundo en continentes, reinos, ciudades y aldeas. Una jerarquia clara que te permite navegar la geografia de tu universo sin perderte."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <RegionTreeMockUI />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas organizar las regiones
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="mb-2 text-3xl">🗂️</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Jerarquia clara</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Saber que Aldara pertenece a Nortavia y Nortavia al continente de Aldaria evita confusiones cuando tu mundo crece.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">✍️</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Descripciones ricas</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Cada region tiene campos para clima, recursos, poblacion y descripcion. Cuando necesites ambientar una escena, la informacion esta lista.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">🔗</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Todo conectado</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Las regiones se vinculan con culturas, sistemas y eventos de tu cronologia. Tu mundo cobra sentido como un todo integrado.
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
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Crea la estructura</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Empieza por los niveles mas grandes — continentes u oceanos — y ve anidando reinos, provincias, ciudades y lugares especificos dentro de cada uno.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                2
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Anade detalles</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Cada region puede tener descripcion, clima, recursos naturales, poblacion y notas. Rellena lo que necesites y deja el resto para despues.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                3
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Navega tu mundo</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Usa el arbol para explorar tu mundo de arriba a abajo. Expande y colapsa ramas para centrarte en la zona que necesitas mientras escribes.
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
            title: "Mapas",
            description: "Sube el mapa de tu mundo y marca ciudades y puntos de interes.",
            href: "/worldbuilding/mapas",
          },
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
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Cuantos niveles de profundidad puedo crear?",
            answer:
              "No hay limite fijo. Puedes anidar regiones tan profundamente como necesites: continente > reino > provincia > ciudad > barrio > edificio. Usa los niveles que tengan sentido para tu historia.",
          },
          {
            question: "¿Puedo mover una region de un continente a otro?",
            answer:
              "Si. Puedes reorganizar tu arbol de regiones en cualquier momento. Arrastra una region para cambiar su posicion en la jerarquia.",
          },
          {
            question: "¿Que tipo de informacion puedo guardar en cada region?",
            answer:
              "Cada region tiene campos para nombre, tipo (continente, reino, ciudad, etc.), descripcion, clima, recursos y notas adicionales. Puedes usar los que necesites.",
          },
        ]}
      />

      <CTASection
        title="Organiza la geografia de tu mundo"
        subtitle="Crea tu primera region en segundos. Gratis, sin limites."
      />
    </>
  );
}
