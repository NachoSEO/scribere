import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { InternalLinkBanner } from "@/components/marketing/InternalLinkBanner";
import { FAQSection } from "@/components/marketing/FAQSection";

export const metadata: Metadata = {
  title: "Lugares - Scritura | Herramienta para escritores",
  description:
    "Documenta los escenarios de tu novela con descripciones detalladas. Mantiene la coherencia narrativa de cada lugar a lo largo de la historia.",
};

function LocationCardMock() {
  const locations = [
    {
      name: "Plaza del pueblo",
      description:
        "Una plaza cuadrada con una fuente de piedra en el centro, rodeada de casas con balcones de hierro forjado. Los platanos dan sombra en verano. Hay un bar con terraza en la esquina noroeste y la iglesia cierra el lado sur.",
    },
    {
      name: "Hostal La Encina",
      description:
        "Un edificio de dos plantas con fachada encalada y contraventanas azules. La recepcion huele a lavanda y madera vieja. La habitacion de Elena esta en el segundo piso, con vistas a la sierra.",
    },
    {
      name: "El jardin secreto",
      description:
        "Detras de la casa familiar, al final de un camino de tierra entre olivos. Un muro de piedra seca rodea un espacio con rosales silvestres, un banco de madera y una higuera centenaria. Solo Elena y Sofia conocian este lugar.",
    },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-3">
      {locations.map((location) => (
        <div
          key={location.name}
          className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm"
        >
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-cream-dark)] text-xs">
              &oplus;
            </div>
            <h3 className="text-sm font-bold text-[var(--color-ink)]">{location.name}</h3>
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
        subtitle="Los lugares no son decorado: son personajes silenciosos. Documenta cada escenario con descripciones que mantengan la coherencia capitulo tras capitulo."
      />

      {/* Mock UI */}
      <section className="px-8 pb-20">
        <LocationCardMock />
      </section>

      {/* Por que necesitas esto */}
      <section className="border-y border-[var(--color-border)] bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-ink)]">
            Por que necesitas documentar los lugares
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
            <p>
              Pocos errores rompen mas la inmersion del lector que una incoherencia
              espacial: el bar que estaba en la plaza de pronto aparece en una calle
              lateral, la ventana que daba al sur ahora da al norte, el pueblo de
              montana que de repente tiene playa. Son errores que parecen pequenos
              pero que minan la confianza del lector en la historia.
            </p>
            <p>
              Documentar los lugares de tu novela no es solo para fantasia epica con
              mapas detallados. Cualquier novela se beneficia de tener un registro de
              sus escenarios: como se ven, como huelen, que se siente al estar alli.
              Cuando necesites volver a escribir una escena en ese lugar, tendras la
              referencia a mano en vez de buscar en que capitulo lo describiste por
              primera vez.
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
                Nombra el lugar
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Dale un nombre identificable: "Casa de Elena", "El bosque norte",
                "Oficina del inspector". Un nombre claro facilita las referencias
                en tus notas y escenas.
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
                Vincula a escenas y eventos
              </h3>
              <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                Conecta cada lugar con las escenas que transcurren alli y los
                eventos que ocurren. Asi ves de un vistazo la actividad narrativa
                de cada espacio.
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
            description: "Conecta los eventos que ocurren en cada lugar con los personajes involucrados.",
            href: "/planificador/eventos",
          },
          {
            title: "Escenas",
            description: "Vincula escenas a sus ubicaciones para mantener la coherencia espacial.",
            href: "/planificador/escenas",
          },
          {
            title: "Personajes",
            description: "Asocia personajes con los lugares que frecuentan en tu historia.",
            href: "/planificador/personajes",
          },
        ]}
      />

      <FAQSection
        items={[
          {
            question: "Es util para novelas contemporaneas o solo para fantasia?",
            answer:
              "Para cualquier genero. Una novela negra ambientada en Madrid necesita coherencia espacial tanto como una fantasia epica. Si tu historia tiene lugares, necesitas documentarlos.",
          },
          {
            question: "Puedo organizar los lugares en categorias?",
            answer:
              "Los lugares se listan dentro de cada proyecto. Puedes usar nombres descriptivos para agruparlos logicamente: 'Pueblo - Plaza', 'Pueblo - Hostal', 'Madrid - Apartamento'.",
          },
          {
            question: "Puedo vincular un lugar a varios eventos?",
            answer:
              "Si. Un mismo lugar puede ser escenario de multiples eventos y escenas. Veras todas las conexiones desde la ficha del lugar.",
          },
        ]}
      />

      <CTASection
        title="Cada escenario merece coherencia"
        subtitle="Documenta los lugares de tu novela y consultalos cuando los necesites."
      />
    </>
  );
}
