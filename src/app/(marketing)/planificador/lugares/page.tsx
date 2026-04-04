import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";
import { MockMapView } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "Lugares y mapas interactivos para novelas - Scritura | Planificador",
  description:
    "Documenta los escenarios de tu novela con jerarquia geografica, mapas con pins interactivos y tipos de lugar. De mundo a edificio, todo conectado.",
};

function LocationCardMock() {
  const locations = [
    {
      name: "Torre del Eco",
      tipo: "Edificio",
      tipoColor: "#589b9b",
      breadcrumb: "Las Tierras de Aldara / Sorvara / Torre del Eco",
      description:
        "Una torre de cristal negro que amplifica las resonancias. La Orden la usa para entrenar a los afinadores. Desde la sala mas alta se oye cualquier cristal activo en un radio de tres leguas.",
    },
    {
      name: "Mercado de Sombras",
      tipo: "Otro",
      tipoColor: "#589b9b",
      breadcrumb: "Las Tierras de Aldara / Sorvara / Mercado de Sombras",
      description:
        "Un mercado subterraneo bajo los canales de Sorvara donde se comercian cristales sin purificar, informacion y favores. La Orden lo tolera porque necesita lo que se vende alli.",
    },
    {
      name: "Cuevas de la Primera Resonancia",
      tipo: "Otro",
      tipoColor: "#589b9b",
      breadcrumb: "Las Tierras de Aldara / Cuevas de la Primera Resonancia",
      description:
        "Un sistema de cuevas donde los cristales crecen en estado salvaje. Segun la leyenda, aqui se produjo la primera resonancia entre un humano y un cristal. La Orden las declaro zona prohibida hace tres generaciones.",
    },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-3">
      {locations.map((location) => (
        <div
          key={location.name}
          className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm"
        >
          <div className="mb-1 flex items-center gap-1.5 text-[10px] text-[var(--color-ink-muted)]">
            {location.breadcrumb}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-cream-dark)] text-xs">
              &oplus;
            </div>
            <h3 className="text-sm font-bold text-[var(--color-ink)]">
              {location.name}
            </h3>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: `${location.tipoColor}10`,
                color: location.tipoColor,
              }}
            >
              {location.tipo}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[var(--color-ink-light)]">
            {location.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function LugaresPage() {
  return (
    <>
      <HeroSection
        badge="Planificador"
        title={
          <>
            Da vida a los escenarios
            <br />
            <span className="text-[var(--color-accent)]">de tu historia</span>
          </>
        }
        subtitle="Los lugares no son decorado: son personajes silenciosos. Documenta cada escenario con jerarquia geografica, mapas con pins y tipos que van de mundo a edificio."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <LocationCardMock />
      </section>

      <FeatureShowcase
        features={[
          {
            title: "Marca tus lugares en el mapa",
            description:
              "Sube la imagen de tu mapa y coloca pins sobre ella. Cada pin representa un lugar de tu novela. Al pasar el cursor ves el nombre y el tipo. Haz clic para ir a la ficha completa. Los personajes de tu historia recorren un mundo que ahora puedes ver de un vistazo.",
            visual: <MockMapView />,
          },
        ]}
      />

      {/* Jerarquia de lugares */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Jerarquia geografica completa
          </h2>
          <p className="mb-8 text-center text-sm leading-relaxed text-[var(--color-ink-light)]">
            Cada lugar tiene un tipo que define su escala dentro del mundo. Los
            lugares se anidan automaticamente siguiendo la jerarquia, desde lo
            mas grande hasta lo mas pequeno.
          </p>
          <div className="mx-auto max-w-md">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                "Mundo",
                "Continente",
                "Pais",
                "Region",
                "Ciudad",
                "Pueblo",
                "Edificio",
                "Otro",
              ].map((tipo, i) => (
                <div key={tipo} className="flex items-center gap-2">
                  <span className="rounded-full bg-[#589b9b]/10 px-3 py-1 text-xs font-medium text-[#589b9b]">
                    {tipo}
                  </span>
                  {i < 7 && (
                    <span className="text-xs text-[var(--color-ink-muted)]">
                      &rarr;
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-[var(--color-ink-muted)]">
              Ejemplo: Las Tierras de Aldara (Mundo) &rarr; Sorvara (Ciudad)
              &rarr; Torre del Eco (Edificio)
            </p>
          </div>
        </div>
      </section>

      {/* Por que necesitas esto */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas documentar los lugares
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Pocos errores rompen mas la inmersion del lector que una
              incoherencia espacial: la torre que estaba al norte de la ciudad de
              pronto aparece al sur, la cueva que llevaba tres dias de viaje
              ahora esta a medio dia. Son errores que parecen menores pero que
              minan la confianza del lector en la historia.
            </p>
            <p>
              Documentar los lugares de tu novela no es solo para fantasia con
              mapas detallados. Cualquier novela se beneficia de tener un
              registro de sus escenarios: como se ven, que se siente al estar
              alli, donde estan unos respecto a otros. Cuando necesites volver a
              escribir una escena en ese lugar, tendras la referencia a mano en
              vez de buscar en que capitulo lo describiste por primera vez.
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
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
                Crea el lugar y elige su tipo
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dale un nombre, selecciona el tipo (mundo, ciudad, edificio...) y
                asignalo como hijo de otro lugar si forma parte de una jerarquia.
                El arbol se construye solo.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Describe con detalle sensorial
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                No solo como se ve, sino como suena, huele y se siente. Los
                detalles sensoriales son los que hacen que el lector sienta que
                esta ahi. Guardalo una vez y consultalo siempre.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-sm font-bold text-[var(--color-accent)]">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                Sube un mapa y coloca pins
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Sube la imagen de tu mapa (dibujado o generado) y haz clic para
                colocar pins. Cada pin se vincula a un lugar existente. Pasa el
                cursor para ver el nombre y tipo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBanner
        title="Herramientas relacionadas"
        links={[
          {
            title: "Eventos",
            description:
              "Conecta los eventos que ocurren en cada lugar con los personajes involucrados.",
            href: "/planificador/eventos",
          },
          {
            title: "Manuscrito",
            description:
              "Menciona lugares con @ mientras escribes.",
            href: "/planificador/manuscrito",
          },
          {
            title: "Escenas",
            description:
              "Vincula escenas a sus ubicaciones para mantener la coherencia espacial.",
            href: "/planificador/escenas",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Puedo subir mi propio mapa?",
            answer:
              "Si. Sube cualquier imagen (PNG, JPG) como mapa de fondo. Puede ser un mapa dibujado a mano, generado con herramientas externas o incluso un boceto en servilleta. Los pins se colocan sobre la imagen.",
          },
          {
            question: "Como funciona la jerarquia de lugares?",
            answer:
              "Cada lugar tiene un tipo (mundo, continente, pais, region, ciudad, pueblo, edificio, otro). Al crear un lugar, puedes asignarlo como hijo de otro. El arbol se muestra automaticamente con la ruta completa: Las Tierras de Aldara > Sorvara > Torre del Eco.",
          },
          {
            question: "Puedo mover un pin despues de colocarlo?",
            answer:
              "Si. Los pins se pueden arrastrar a una nueva posicion o eliminar en cualquier momento. La posicion del pin no afecta a la ficha del lugar.",
          },
          {
            question: "Los pins muestran informacion al pasar el cursor?",
            answer:
              "Si. Al pasar el cursor sobre un pin, aparece una tarjeta con el nombre del lugar y su tipo. Haz clic en el pin para ir a la ficha completa con descripcion, jerarquia y entidades vinculadas.",
          },
        ]}
      />

      <CTASection
        title="Cada escenario merece un sitio en el mapa"
        subtitle="Documenta los lugares de tu novela con jerarquia, pins y descripciones que no se pierdan."
      />
    </>
  );
}
