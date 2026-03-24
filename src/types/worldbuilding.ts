// Base type with common fields
interface BaseEntity {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// ── Mundo ────────────────────────────────────────────────────
export interface Mundo extends BaseEntity {
  nombre: string;
  descripcion: string;
  mapa_url: string;
}

export type MundoInsert = Pick<Mundo, "nombre"> & Partial<Pick<Mundo, "descripcion">>;
export type MundoUpdate = Partial<Pick<Mundo, "nombre" | "descripcion" | "mapa_url">>;

// ── Era (cronología) ─────────────────────────────────────────
export interface Era extends BaseEntity {
  mundo_id: string;
  nombre: string;
  descripcion: string;
  posicion: number;
}

export type EraInsert = Pick<Era, "nombre"> & Partial<Omit<Era, keyof BaseEntity | "mundo_id" | "nombre">>;
export type EraUpdate = Partial<Omit<Era, keyof BaseEntity | "mundo_id">>;

// ── Evento de cronología (hijo de era) ───────────────────────
export interface EventoCronologia extends BaseEntity {
  era_id: string;
  nombre: string;
  descripcion: string;
  posicion: number;
}

export type EventoCronologiaInsert = Pick<EventoCronologia, "nombre"> & Partial<Omit<EventoCronologia, keyof BaseEntity | "era_id" | "nombre">>;
export type EventoCronologiaUpdate = Partial<Omit<EventoCronologia, keyof BaseEntity | "era_id">>;

// ── Región (jerárquica) ──────────────────────────────────────
export interface Region extends BaseEntity {
  mundo_id: string;
  region_padre_id: string | null;
  nombre: string;
  tipo: string;
  descripcion: string;
  posicion: number;
}

export type RegionInsert = Pick<Region, "nombre"> & Partial<Omit<Region, keyof BaseEntity | "mundo_id" | "nombre">>;
export type RegionUpdate = Partial<Omit<Region, keyof BaseEntity | "mundo_id">>;

// ── Cultura ──────────────────────────────────────────────────
export interface Cultura extends BaseEntity {
  mundo_id: string;
  nombre: string;
  descripcion: string;
  costumbres: string;
  lengua: string;
  organizacion: string;
  posicion: number;
}

export type CulturaInsert = Pick<Cultura, "nombre"> & Partial<Omit<Cultura, keyof BaseEntity | "mundo_id" | "nombre">>;
export type CulturaUpdate = Partial<Omit<Cultura, keyof BaseEntity | "mundo_id">>;

// ── Sistema ──────────────────────────────────────────────────
export interface Sistema extends BaseEntity {
  mundo_id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  reglas: string;
  limitaciones: string;
  posicion: number;
}

export type SistemaInsert = Pick<Sistema, "nombre"> & Partial<Omit<Sistema, keyof BaseEntity | "mundo_id" | "nombre">>;
export type SistemaUpdate = Partial<Omit<Sistema, keyof BaseEntity | "mundo_id">>;
