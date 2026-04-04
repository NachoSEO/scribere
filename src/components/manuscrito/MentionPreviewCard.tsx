"use client";

import { useProyectosStore } from "@/lib/proyectos/store";
import { ENTITY_TYPE_CONFIG, type MentionType } from "@/lib/proyectos/entity-config";

const LUGAR_TIPOS: Record<string, string> = {
  mundo: "Mundo",
  continente: "Continente",
  pais: "País",
  region: "Región",
  ciudad: "Ciudad",
  pueblo: "Pueblo",
  edificio: "Edificio",
  otro: "Otro",
};

function Truncated({ text, lines = 2 }: { text: string; lines?: number }) {
  return (
    <p
      className="text-xs text-[var(--color-ink-light)] m-0"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {text}
    </p>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-xs">
      <span className="text-[var(--color-ink-muted)] shrink-0">{label}:</span>
      <span className="text-[var(--color-ink-light)] truncate">{value}</span>
    </div>
  );
}

function PersonajeCard({ id }: { id: string }) {
  const personaje = useProyectosStore((s) => s.personajes.find((p) => p.id === id));
  const faccion = useProyectosStore((s) => {
    const p = s.personajes.find((p) => p.id === id);
    return p?.faccion_id ? s.facciones.find((f) => f.id === p.faccion_id) ?? null : null;
  });
  if (!personaje) return <EmptyCard />;

  const color = ENTITY_TYPE_CONFIG.personaje.color;
  const faccionColor = ENTITY_TYPE_CONFIG.faccion.color;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2.5">
        {personaje.imagen_url ? (
          <img
            src={personaje.imagen_url}
            alt={personaje.nombre}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
            style={{ backgroundColor: `${color}26`, color }}
          >
            {personaje.nombre.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--color-ink)] truncate m-0">{personaje.nombre}</p>
          {personaje.tipo && (
            <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>{personaje.tipo}</span>
          )}
        </div>
      </div>
      {personaje.funcion_narrativa && <FieldRow label="Función" value={personaje.funcion_narrativa} />}
      {personaje.motivacion && <FieldRow label="Motivación" value={personaje.motivacion} />}
      {faccion && (
        <div className="flex items-center gap-1.5 text-xs">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: faccionColor }} />
          <span className="text-[var(--color-ink-light)]">{faccion.nombre}</span>
        </div>
      )}
    </div>
  );
}

function LugarCard({ id }: { id: string }) {
  const lugar = useProyectosStore((s) => s.lugares.find((l) => l.id === id));
  if (!lugar) return <EmptyCard />;

  const color = ENTITY_TYPE_CONFIG.lugar.color;

  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-semibold text-[var(--color-ink)] m-0">{lugar.nombre}</p>
        {lugar.tipo && (
          <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>
            {LUGAR_TIPOS[lugar.tipo] || lugar.tipo}
          </span>
        )}
      </div>
      {lugar.descripcion && <Truncated text={lugar.descripcion} />}
    </div>
  );
}

function FaccionCard({ id }: { id: string }) {
  const faccion = useProyectosStore((s) => s.facciones.find((f) => f.id === id));
  if (!faccion) return <EmptyCard />;

  const color = ENTITY_TYPE_CONFIG.faccion.color;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2.5">
        {faccion.imagen_url ? (
          <img
            src={faccion.imagen_url}
            alt={faccion.nombre}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
            style={{ backgroundColor: `${color}26`, color }}
          >
            {faccion.nombre.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--color-ink)] truncate m-0">{faccion.nombre}</p>
        </div>
      </div>
      {faccion.concepto && <FieldRow label="Concepto" value={faccion.concepto} />}
      {faccion.objetivos && <FieldRow label="Objetivos" value={faccion.objetivos} />}
    </div>
  );
}

function EventoCard({ id }: { id: string }) {
  const evento = useProyectosStore((s) => s.eventos.find((e) => e.id === id));
  if (!evento) return <EmptyCard />;

  const color = ENTITY_TYPE_CONFIG.evento.color;

  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-semibold text-[var(--color-ink)] m-0">{evento.nombre}</p>
        {evento.cronologia && (
          <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>{evento.cronologia}</span>
        )}
      </div>
      {evento.descripcion && <Truncated text={evento.descripcion} />}
    </div>
  );
}

function HitoCard({ id }: { id: string }) {
  const hito = useProyectosStore((s) => s.hitos.find((h) => h.id === id));
  if (!hito) return <EmptyCard />;

  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-semibold text-[var(--color-ink)] m-0">{hito.hito || "Sin nombre"}</p>
        {hito.tipo && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-amber-600">
            {hito.tipo.replace(/_/g, " ")}
          </span>
        )}
      </div>
      {hito.informacion && <Truncated text={hito.informacion} />}
      {hito.efecto && <FieldRow label="Efecto" value={hito.efecto} />}
    </div>
  );
}

function ArcoCard({ id }: { id: string }) {
  const arco = useProyectosStore((s) => s.arcos.find((a) => a.id === id));
  if (!arco) return <EmptyCard />;

  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-semibold text-[var(--color-ink)] m-0">{arco.nombre || "Sin nombre"}</p>
        {arco.tipo_resolucion && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-stone-500">
            {arco.tipo_resolucion}
          </span>
        )}
      </div>
      {arco.planteamiento && <FieldRow label="Planteamiento" value={arco.planteamiento} />}
      {arco.nudo && <FieldRow label="Nudo" value={arco.nudo} />}
    </div>
  );
}

function EmptyCard() {
  return <p className="text-xs text-[var(--color-ink-muted)] italic m-0">No encontrado</p>;
}

const CARD_COMPONENTS: Record<string, React.FC<{ id: string }>> = {
  personaje: PersonajeCard,
  lugar: LugarCard,
  faccion: FaccionCard,
  evento: EventoCard,
  hito: HitoCard,
  arco: ArcoCard,
};

const EXTRA_TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  hito: { label: "Hito", color: "#d97706" },
  arco: { label: "Arco", color: "#78716c" },
};

export function MentionPreviewCard({ type, id }: { type: string; id: string }) {
  const config = ENTITY_TYPE_CONFIG[type as MentionType] ?? EXTRA_TYPE_CONFIG[type];
  const CardComponent = CARD_COMPONENTS[type];

  return (
    <div
      className="mention-preview-card"
      style={{ borderTop: `3px solid ${config?.color ?? "var(--color-border)"}` }}
    >
      {/* Type label */}
      <div className="px-3 pt-2 pb-1">
        <span
          className="text-[9px] font-bold uppercase tracking-widest"
          style={{ color: config?.color ?? "var(--color-ink-muted)" }}
        >
          {config?.label ?? type}
        </span>
      </div>
      {/* Card content */}
      <div className="px-3 pb-3">
        {CardComponent ? <CardComponent id={id} /> : <EmptyCard />}
      </div>
    </div>
  );
}
