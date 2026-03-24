import type { Metadata } from "next";
import {
  HeroSection,
  CTASection,
  FAQSection,
  InternalLinkBanner,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "Culturas - Scritura | Herramienta para escritores",
  description:
    "Disena culturas ficticias con costumbres, lenguas y organizacion social. Crea pueblos y civilizaciones creibles para tu novela de fantasia.",
};

function CultureMockUI() {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--color-ink)]">Culturas del mundo</h3>
        <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
          2 culturas
        </span>
      </div>

      <div className="space-y-4">
        {/* Culture card 1 */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#55699b]" />
            <p className="text-sm font-semibold text-[var(--color-ink)]">Los Aldarianos</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded border border-[var(--color-border)] bg-white p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Costumbres
              </p>
              <ul className="space-y-1 text-xs text-[var(--color-ink-light)]">
                <li>• Festival de la Primera Nieve</li>
                <li>• Duelo de honor con espada corta</li>
                <li>• Los muertos se entierran mirando al norte</li>
              </ul>
            </div>
            <div className="rounded border border-[var(--color-border)] bg-white p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Lengua
              </p>
              <div className="space-y-1 text-xs text-[var(--color-ink-light)]">
                <p>Aldarico (lengua comun)</p>
                <p className="italic text-[var(--color-ink-muted)]">&ldquo;Vel athari&rdquo; = bienvenido</p>
                <p className="italic text-[var(--color-ink-muted)]">&ldquo;Dun moreth&rdquo; = juramento sagrado</p>
              </div>
            </div>
            <div className="rounded border border-[var(--color-border)] bg-white p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Organizacion
              </p>
              <div className="space-y-1 text-xs text-[var(--color-ink-light)]">
                <p>Monarquia hereditaria</p>
                <p>Consejo de Cinco Familias</p>
                <p>Casta guerrera separada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Culture card 2 — collapsed */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#78a064]" />
            <p className="text-sm font-semibold text-[var(--color-ink)]">Nomadas del Viento</p>
            <span className="ml-auto text-xs text-[var(--color-ink-muted)]">3 costumbres · lengua propia</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CulturasPage() {
  return (
    <>
      <HeroSection
        badge="Worldbuilding · Culturas"
        title={
          <>
            Disena culturas con
            <br />
            <span className="text-[var(--color-accent)]">costumbres y lenguas</span>
          </>
        }
        subtitle="Crea pueblos y civilizaciones con identidad propia: costumbres, lenguas, organizacion social, creencias y tradiciones que hacen unico a cada grupo."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <CultureMockUI />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas disenar culturas
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="mb-2 text-3xl">🎭</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Personajes creibles</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Un personaje que viene de una cultura con costumbres definidas tiene motivaciones mas profundas. Sus valores, tabues y formas de hablar nacen de su pueblo.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">⚔️</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Conflictos organicos</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Cuando dos culturas tienen valores opuestos, el conflicto surge de forma natural. No necesitas forzar la trama; las diferencias culturales la generan.
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl">🌿</p>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">Riqueza del mundo</h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Un mundo con multiples culturas se siente vivo y complejo. El lector percibe que hay mas alla de lo que la historia cuenta, y eso genera fascinacion.
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
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Crea una cultura</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Dale un nombre a tu pueblo o civilizacion. Anade una descripcion general: quienes son, donde viven, que los define como grupo.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                2
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Define los detalles</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Rellena las secciones de costumbres, lengua, organizacion social, creencias y tradiciones. No necesitas completar todo al principio; puedes ir anadiendo a medida que escribes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
                3
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">Usa la cultura en tu novela</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-light)]">
                  Cuando un personaje de esa cultura aparece en escena, consulta su ficha cultural para mantener la coherencia en dialogos, costumbres y reacciones.
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
            title: "Sistemas",
            description: "Define sistemas de magia, tecnologia o politica con reglas claras.",
            href: "/worldbuilding/sistemas",
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
            question: "¿Cuantas culturas puedo crear?",
            answer:
              "Sin limite. Crea tantas culturas como necesite tu mundo. Algunas novelas funcionan con 2-3 pueblos bien definidos; otras epicas de fantasia pueden tener docenas.",
          },
          {
            question: "¿Necesito inventar un idioma completo?",
            answer:
              "No. El campo de lengua esta pensado para anotar palabras clave, expresiones y reglas basicas de sonoridad. Unas pocas palabras bien elegidas dan mas verosimilitud que un diccionario entero.",
          },
          {
            question: "¿Puedo asociar una cultura a una region?",
            answer:
              "Puedes mencionar las regiones en la descripcion de la cultura. La vinculacion directa entre modulos esta en desarrollo.",
          },
          {
            question: "¿Que campos tiene una ficha de cultura?",
            answer:
              "Nombre, descripcion general, costumbres, lengua, organizacion social, creencias y notas adicionales. Puedes rellenar solo los que necesites.",
          },
        ]}
      />

      <CTASection
        title="Crea las culturas de tu mundo"
        subtitle="Disena pueblos con identidad propia. Gratis, sin limites."
      />
    </>
  );
}
