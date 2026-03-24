import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Mundo, MundoInsert, MundoUpdate,
  Era, EraInsert, EraUpdate,
  EventoCronologia, EventoCronologiaInsert, EventoCronologiaUpdate,
  Region, RegionInsert, RegionUpdate,
  Cultura, CulturaInsert, CulturaUpdate,
  Sistema, SistemaInsert, SistemaUpdate,
} from "@/types/worldbuilding";

// ── Helpers ───────────────────────────────────────────────

function unwrap<T>(result: { data: T | null; error: unknown }): T {
  if (result.error) throw result.error;
  return result.data as T;
}

async function getUserId(sb: SupabaseClient): Promise<string> {
  const { data: { user } } = await sb.auth.getUser();
  if (user) return user.id;
  const devId = process.env.NEXT_PUBLIC_DEV_USER_ID;
  if (devId) return devId;
  throw new Error("No authenticated user found. Log in or set NEXT_PUBLIC_DEV_USER_ID for local development.");
}

// ── Mundos ────────────────────────────────────────────────

export async function fetchMundos(sb: SupabaseClient): Promise<Mundo[]> {
  return unwrap(await sb.from("mundos").select("*").order("created_at", { ascending: false }));
}

export async function fetchMundo(sb: SupabaseClient, id: string): Promise<Mundo> {
  return unwrap(await sb.from("mundos").select("*").eq("id", id).single());
}

export async function createMundo(sb: SupabaseClient, data: MundoInsert): Promise<Mundo> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("mundos").insert({ ...data, user_id: userId }).select().single());
}

export async function updateMundo(sb: SupabaseClient, id: string, data: MundoUpdate): Promise<Mundo> {
  return unwrap(await sb.from("mundos").update(data).eq("id", id).select().single());
}

export async function deleteMundo(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("mundos").delete().eq("id", id));
}

// ── Eras ──────────────────────────────────────────────────

export async function fetchEras(sb: SupabaseClient, mundoId: string): Promise<Era[]> {
  return unwrap(await sb.from("cronologia_eras").select("*").eq("mundo_id", mundoId).order("posicion"));
}

export async function fetchEra(sb: SupabaseClient, id: string): Promise<Era> {
  return unwrap(await sb.from("cronologia_eras").select("*").eq("id", id).single());
}

export async function createEra(sb: SupabaseClient, mundoId: string, data: EraInsert): Promise<Era> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("cronologia_eras").insert({ ...data, mundo_id: mundoId, user_id: userId }).select().single());
}

export async function updateEra(sb: SupabaseClient, id: string, data: EraUpdate): Promise<Era> {
  return unwrap(await sb.from("cronologia_eras").update(data).eq("id", id).select().single());
}

export async function deleteEra(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("cronologia_eras").delete().eq("id", id));
}

// ── Eventos de cronología ─────────────────────────────────

export async function fetchEventos(sb: SupabaseClient, eraId: string): Promise<EventoCronologia[]> {
  return unwrap(await sb.from("cronologia_eventos").select("*").eq("era_id", eraId).order("posicion"));
}

export async function createEvento(sb: SupabaseClient, eraId: string, data: EventoCronologiaInsert): Promise<EventoCronologia> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("cronologia_eventos").insert({ ...data, era_id: eraId, user_id: userId }).select().single());
}

export async function updateEvento(sb: SupabaseClient, id: string, data: EventoCronologiaUpdate): Promise<EventoCronologia> {
  return unwrap(await sb.from("cronologia_eventos").update(data).eq("id", id).select().single());
}

export async function deleteEvento(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("cronologia_eventos").delete().eq("id", id));
}

// ── Regiones ──────────────────────────────────────────────

export async function fetchRegiones(sb: SupabaseClient, mundoId: string): Promise<Region[]> {
  return unwrap(await sb.from("regiones").select("*").eq("mundo_id", mundoId).order("posicion"));
}

export async function fetchRegion(sb: SupabaseClient, id: string): Promise<Region> {
  return unwrap(await sb.from("regiones").select("*").eq("id", id).single());
}

export async function createRegion(sb: SupabaseClient, mundoId: string, data: RegionInsert): Promise<Region> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("regiones").insert({ ...data, mundo_id: mundoId, user_id: userId }).select().single());
}

export async function updateRegion(sb: SupabaseClient, id: string, data: RegionUpdate): Promise<Region> {
  return unwrap(await sb.from("regiones").update(data).eq("id", id).select().single());
}

export async function deleteRegion(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("regiones").delete().eq("id", id));
}

// ── Culturas ──────────────────────────────────────────────

export async function fetchCulturas(sb: SupabaseClient, mundoId: string): Promise<Cultura[]> {
  return unwrap(await sb.from("culturas").select("*").eq("mundo_id", mundoId).order("posicion"));
}

export async function fetchCultura(sb: SupabaseClient, id: string): Promise<Cultura> {
  return unwrap(await sb.from("culturas").select("*").eq("id", id).single());
}

export async function createCultura(sb: SupabaseClient, mundoId: string, data: CulturaInsert): Promise<Cultura> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("culturas").insert({ ...data, mundo_id: mundoId, user_id: userId }).select().single());
}

export async function updateCultura(sb: SupabaseClient, id: string, data: CulturaUpdate): Promise<Cultura> {
  return unwrap(await sb.from("culturas").update(data).eq("id", id).select().single());
}

export async function deleteCultura(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("culturas").delete().eq("id", id));
}

// ── Sistemas ──────────────────────────────────────────────

export async function fetchSistemas(sb: SupabaseClient, mundoId: string): Promise<Sistema[]> {
  return unwrap(await sb.from("sistemas").select("*").eq("mundo_id", mundoId).order("posicion"));
}

export async function fetchSistema(sb: SupabaseClient, id: string): Promise<Sistema> {
  return unwrap(await sb.from("sistemas").select("*").eq("id", id).single());
}

export async function createSistema(sb: SupabaseClient, mundoId: string, data: SistemaInsert): Promise<Sistema> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("sistemas").insert({ ...data, mundo_id: mundoId, user_id: userId }).select().single());
}

export async function updateSistema(sb: SupabaseClient, id: string, data: SistemaUpdate): Promise<Sistema> {
  return unwrap(await sb.from("sistemas").update(data).eq("id", id).select().single());
}

export async function deleteSistema(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("sistemas").delete().eq("id", id));
}
