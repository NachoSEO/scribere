import type { Metadata } from "next";
import {
  HeroSection,
  CTASection,
  FAQSection,
  InternalLinkBanner,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "Mapas - Scritura | Herramienta para escritores",
  description:
    "Sube el mapa de tu mundo ficticio y vincula regiones, ciudades y puntos de interes. Visualiza la geografia de tu novela de forma interactiva.",
};

function MapMockUI() {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--color-ink)]">Mapa del mundo</h3>
        <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
          1 mapa · 4 marcadores
        </span>
      </div>

      {/* Map placeholder */}
      <div className="relative rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-cream)] p-8">
        <div className="flex min-h-[280px] flex-col items-center justify-center">
          {/* Simulated map area */}
          <div className="relative h-[240px] w-full max-w-md">
            {/* Placeholder terrain */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#e8dcc8] via-[#d4c4a0] to-[#c8b88a] opacity-60" />

            {/* Map pins */}
            <div className="absolute left-[20%] top-[25%] flex flex-col items-center">
              <div className="h-4 w-4 rounded-full border-2 border-white bg-[#bd5749] shadow-sm" />
              <span className="mt-1 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-ink)] shadow-sm">
                Capital Aldara
              </span>
            </div>
            <div className="absolute left-[55%] top-[35%] flex flex-col items-center">
              <div className="h-4 w-4 rounded-full border-2 border-white bg-[#55699b] shadow-sm" />
              <span className="mt-1 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-ink)] shadow-sm">
                Puerto Gris
              </span>
            </div>
            <div className="absolute left-[75%] top-[60%] flex flex-col items-center">
              <div className="h-4 w-4 rounded-full border-2 border-white bg-[#8b6f47] shadow-sm" />
              <span className="mt-1 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-ink)] shadow-sm">
                Sierra Negra
              </span>
            </div>
            <div className="absolute left-[35%] top-[70%] flex flex-col items-center">
              <div className="h-4 w-4 rounded-full border-2 border-white bg-[#78a064] shadow-sm" />
              <span className="mt-1 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-ink)] shadow-sm">
                Bosque Eterno
              </span>
            </div>

            {/* Upload overlay hint */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <p className="rounded-full bg-white/80 px-4 py-1.5 text-xs text-[var(--color-ink-muted)] shadow-sm">
                Sube tu propio mapa en PNG, JPG o SVG
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MapasPage() {
  return (
    <>
      <HeroSection
        badge="Worldbuilding · Mapas"
        title={
          <>
            Sube el mapa
            <br />
            <span className="text-[var(--color-accent)]">de tu mundo</span>
          </>
        }
        subtitle="Carga la imagen de tu mapa y marca sobre ella las regiones, ciudades y puntos de interes de tu mundo. Tu geografia ficticia, siempre accesible."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <MapMockUI />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas un mapa
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="mb-2 text-3xl">🧭</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Distancias coherentes</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Si tu personaje tarda tres dias en llegar a la capital, el lector no deberia ver que otro personaje hace el mismo viaje en una tarde.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">🌍</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Inmersion visual</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Un mapa te ayuda a ti como autor a visualizar tu mundo, y cuando describes escenas, esa claridad se transmite al lector.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">📍</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Referencia geografica</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Cuando un personaje menciona que viene del norte, tu sabes exactamente donde queda eso y que encontrara en el camino.
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
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Sube tu imagen</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Arrastra y suelta la imagen de tu mapa. Acepta PNG, JPG y SVG. No importa si lo dibujaste a mano, lo generaste con IA o lo encontraste en un generador de mapas.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                2
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Coloca marcadores</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Haz clic en cualquier punto del mapa para anadir un marcador. Dale un nombre, una descripcion y asignalo a una region de tu mundo.
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
                  Tu mapa queda guardado en tu mundo. Cada vez que necesites recordar donde esta una ciudad o calcular una ruta, lo tienes a un clic.
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
            title: "Cronologia",
            description: "Crea eras y eventos para contar la historia de tu mundo.",
            href: "/worldbuilding/cronologia",
          },
          {
            title: "Culturas",
            description: "Disena pueblos con costumbres, lenguas y organizacion social.",
            href: "/worldbuilding/culturas",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "¿Que formatos de imagen acepta?",
            answer:
              "Puedes subir imagenes en PNG, JPG y SVG. El tamano maximo recomendado es de 5 MB para garantizar un rendimiento fluido en el navegador.",
          },
          {
            question: "¿Puedo tener varios mapas?",
            answer:
              "Si. Puedes subir un mapa general del mundo y mapas de detalle para regiones especificas. Cada mundo puede tener tantos mapas como necesites.",
          },
          {
            question: "¿El mapa se guarda en algun servidor?",
            answer:
              "No. La imagen se almacena localmente en tu navegador. Scritura no envia tus archivos a ningun servidor externo.",
          },
        ]}
      />

      <CTASection
        title="Dale forma a la geografia de tu mundo"
        subtitle="Sube tu mapa y empieza a marcar los lugares que importan. Gratis."
      />
    </>
  );
}
