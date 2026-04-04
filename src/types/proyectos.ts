// Base type with common fields
interface BaseEntity {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// ── Proyecto ──────────────────────────────────────────────
export interface Proyecto extends BaseEntity {
  nombre: string;
  descripcion: string;
  mundo_id: string | null;
}

export type ProyectoInsert = Pick<Proyecto, "nombre"> & Partial<Pick<Proyecto, "descripcion">>;
export type ProyectoUpdate = Partial<Pick<Proyecto, "nombre" | "descripcion" | "mundo_id">>;

// ── General (1:1 con proyecto) ────────────────────────────
export interface General extends BaseEntity {
  proyecto_id: string;
  premisa: string;
  conflicto: string;
  idea_controladora: string;
  contraideas: string;
  temas: string;
  tono: string;
  estilo: string;
  estructura: string;
  resumen: string;
}

export type GeneralFields = Omit<General, keyof BaseEntity | "proyecto_id">;
export type GeneralUpdate = Partial<GeneralFields>;

// ── Facción ───────────────────────────────────────────────
export interface Faccion extends BaseEntity {
  proyecto_id: string;
  nombre: string;
  concepto: string;
  objetivos: string;
  motivacion: string;
  complicacion: string;
  imagen_url: string;
  notas: string;
  posicion: number;
}

export type FaccionInsert = Pick<Faccion, "nombre"> & Partial<Omit<Faccion, keyof BaseEntity | "proyecto_id" | "nombre">>;
export type FaccionUpdate = Partial<Omit<Faccion, keyof BaseEntity | "proyecto_id">>;

// ── Facción Relación ──────────────────────────────────────
export interface FaccionRelacion extends BaseEntity {
  faccion_a_id: string;
  faccion_b_id: string;
  descripcion: string;
  tipo: string;
}

export type FaccionRelacionInsert = {
  faccion_a_id: string;
  faccion_b_id: string;
  descripcion?: string;
  tipo?: string;
};

// ── Fase ──────────────────────────────────────────────────
export interface Fase extends BaseEntity {
  proyecto_id: string;
  nombre: string;
  descripcion: string;
  posicion: number;
}

export type FaseInsert = Pick<Fase, "nombre"> & Partial<Omit<Fase, keyof BaseEntity | "proyecto_id" | "nombre">>;
export type FaseUpdate = Partial<Omit<Fase, keyof BaseEntity | "proyecto_id">>;

// ── Personaje ─────────────────────────────────────────────
export interface Personaje extends BaseEntity {
  proyecto_id: string;
  faccion_id: string | null;
  nombre: string;
  imagen_url: string;
  concepto: string;
  funcion_narrativa: string;
  motivacion: string;
  complicacion: string;
  tipo: string;
  descripcion: string;
  notas: string;
  posicion: number;
}

export const PERSONAJE_TIPO_OPTIONS = [
  "Protagonista",
  "Antagonista",
  "Secundario",
  "Figurante",
  "Mentor",
  "Catalizador",
];

export type PersonajeInsert = Pick<Personaje, "nombre"> & Partial<Omit<Personaje, keyof BaseEntity | "proyecto_id" | "nombre">>;
export type PersonajeUpdate = Partial<Omit<Personaje, keyof BaseEntity | "proyecto_id">>;

// ── Personaje Relación ────────────────────────────────────
export interface PersonajeRelacion extends BaseEntity {
  personaje_a_id: string;
  personaje_b_id: string;
  descripcion: string;
  tipo: string;
}

export type PersonajeRelacionInsert = {
  personaje_a_id: string;
  personaje_b_id: string;
  descripcion?: string;
  tipo?: string;
};

// ── Personaje Evolución ─────────────────────────────────
export interface PersonajeEvolucion extends BaseEntity {
  personaje_id: string;
  arco_id: string | null;
  escena_id: string | null;
  nombre_etapa: string;
  descripcion: string;
  posicion: number;
}

export type PersonajeEvolucionInsert = Pick<PersonajeEvolucion, "nombre_etapa"> & Partial<Omit<PersonajeEvolucion, keyof BaseEntity | "personaje_id" | "nombre_etapa">>;
export type PersonajeEvolucionUpdate = Partial<Omit<PersonajeEvolucion, keyof BaseEntity | "personaje_id">>;

// ── Lugar ─────────────────────────────────────────────────
export type LugarTipo = "mundo" | "continente" | "pais" | "region" | "ciudad" | "pueblo" | "edificio" | "otro" | "";

export interface LugarPin {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  lugar_id: string;
}

export interface Lugar extends BaseEntity {
  proyecto_id: string;
  nombre: string;
  descripcion: string;
  tipo: LugarTipo;
  lugar_padre_id: string | null;
  mapa_url: string;
  mapa_pins: LugarPin[];
  es_mapa_principal: boolean;
  posicion: number;
}

export type LugarInsert = Pick<Lugar, "nombre"> & Partial<Omit<Lugar, keyof BaseEntity | "proyecto_id" | "nombre">>;
export type LugarUpdate = Partial<Omit<Lugar, keyof BaseEntity | "proyecto_id">>;

// ── Evento ───────────────────────────────────────────────
export interface Evento extends BaseEntity {
  proyecto_id: string;
  nombre: string;
  cronologia: string;
  descripcion: string;
  funcion: string;
  causa_directa: string;
  consecuencia_directa: string;
}

export type EventoInsert = Pick<Evento, "nombre"> & Partial<Omit<Evento, keyof BaseEntity | "proyecto_id" | "nombre">>;
export type EventoUpdate = Partial<Omit<Evento, keyof BaseEntity | "proyecto_id">>;

// ── Hito ─────────────────────────────────────────────────
export interface Hito extends BaseEntity {
  proyecto_id: string;
  fase_id: string | null;
  lugar_id: string | null;
  pov_personaje_id: string | null;
  hito: string;
  informacion: string;
  efecto: string;
  origen_informacion: string;
  tipo: "normalidad" | "cambio_de_fase" | "incidente_incitador";
  posicion: number;
}

export type HitoInsert = Pick<Hito, "hito"> & Partial<Omit<Hito, keyof BaseEntity | "proyecto_id" | "hito">>;
export type HitoUpdate = Partial<Omit<Hito, keyof BaseEntity | "proyecto_id">>;

// ── Arco ─────────────────────────────────────────────────
export interface Arco extends BaseEntity {
  proyecto_id: string;
  nombre: string;
  planteamiento: string;
  nudo: string;
  desenlace: string;
  hito_origen_id: string | null;
  hito_destino_id: string | null;
  tipo_resolucion: string;
  posicion: number;
}

export type TipoResolucion = '' | 'si' | 'si_pero' | 'no_y' | 'no';

export const TIPO_RESOLUCION_OPTIONS: { value: TipoResolucion; label: string; color: string }[] = [
  { value: '',        label: 'Sin definir', color: '#f3f4f6' },
  { value: 'si',      label: 'Sí',          color: '#d1fae5' },
  { value: 'si_pero', label: 'Sí, pero...', color: '#fef3c7' },
  { value: 'no_y',    label: 'No, y...',     color: '#fee2e2' },
  { value: 'no',      label: 'No',           color: '#fecaca' },
];

export type ArcoInsert = Pick<Arco, "nombre"> & Partial<Omit<Arco, keyof BaseEntity | "proyecto_id" | "nombre">>;
export type ArcoUpdate = Partial<Omit<Arco, keyof BaseEntity | "proyecto_id">>;

// ── Escena ───────────────────────────────────────────────
export interface Escena extends BaseEntity {
  proyecto_id: string;
  hito_id: string | null;
  arco_id: string | null;
  lugar_id: string | null;
  carpeta_id: string | null;
  resumen: string;
  objetivo: string;
  contenido: Record<string, unknown> | null;
  posicion: number;
}

// ── Manuscrito Carpeta ──────────────────────────────────────
export interface ManuscritoCarpeta extends BaseEntity {
  proyecto_id: string;
  nombre: string;
  carpeta_padre_id: string | null;
  posicion: number;
}

export type ManuscritoCarpetaInsert = Pick<ManuscritoCarpeta, "nombre"> & Partial<Omit<ManuscritoCarpeta, keyof BaseEntity | "proyecto_id" | "nombre">>;
export type ManuscritoCarpetaUpdate = Partial<Omit<ManuscritoCarpeta, keyof BaseEntity | "proyecto_id">>;

export type EscenaInsert = Pick<Escena, "resumen"> & Partial<Omit<Escena, keyof BaseEntity | "proyecto_id" | "resumen">>;
export type EscenaUpdate = Partial<Omit<Escena, keyof BaseEntity | "proyecto_id">>;

// ── Junction tables ──────────────────────────────────────
export interface JunctionRecord {
  id: string;
  user_id: string;
}

export interface EventoPersonaje extends JunctionRecord {
  evento_id: string;
  personaje_id: string;
}

export interface EventoLugar extends JunctionRecord {
  evento_id: string;
  lugar_id: string;
}

export interface HitoPersonaje extends JunctionRecord {
  hito_id: string;
  personaje_id: string;
}

export interface HitoEvento extends JunctionRecord {
  hito_id: string;
  evento_id: string;
}

export interface ArcoPersonaje extends JunctionRecord {
  arco_id: string;
  personaje_id: string;
}

export interface EscenaPersonaje extends JunctionRecord {
  escena_id: string;
  personaje_id: string;
}

export interface EscenaEvento extends JunctionRecord {
  escena_id: string;
  evento_id: string;
}

// ── Entity metadata for generic components ────────────────
export type EntityWithNombre = { id: string; nombre: string; posicion: number };

export const LUGAR_TIPOS: { value: LugarTipo; label: string }[] = [
  { value: "mundo", label: "Mundo" },
  { value: "continente", label: "Continente" },
  { value: "pais", label: "País" },
  { value: "region", label: "Región" },
  { value: "ciudad", label: "Ciudad" },
  { value: "pueblo", label: "Pueblo" },
  { value: "edificio", label: "Edificio" },
  { value: "otro", label: "Otro" },
];
