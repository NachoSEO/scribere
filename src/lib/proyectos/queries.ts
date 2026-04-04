import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Proyecto, ProyectoInsert, ProyectoUpdate,
  General, GeneralUpdate,
  Faccion, FaccionInsert, FaccionUpdate,
  FaccionRelacion, FaccionRelacionInsert,
  Personaje, PersonajeInsert, PersonajeUpdate,
  PersonajeRelacion, PersonajeRelacionInsert,
  PersonajeEvolucion, PersonajeEvolucionInsert, PersonajeEvolucionUpdate,
  Fase, FaseInsert, FaseUpdate,
  Lugar, LugarInsert, LugarUpdate,
  Evento, EventoInsert, EventoUpdate,
  Hito, HitoInsert, HitoUpdate,
  Arco, ArcoInsert, ArcoUpdate,
  Escena, EscenaInsert, EscenaUpdate,
  EventoPersonaje, EventoLugar,
  HitoPersonaje, HitoEvento,
  ArcoPersonaje,
  EscenaPersonaje,
  EscenaEvento,
  ManuscritoCarpeta, ManuscritoCarpetaInsert, ManuscritoCarpetaUpdate,
} from "@/types/proyectos";

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

// ── Proyectos ─────────────────────────────────────────────

export async function fetchProyectos(sb: SupabaseClient): Promise<Proyecto[]> {
  return unwrap(await sb.from("proyectos").select("*").order("created_at", { ascending: false }));
}

export async function fetchProyecto(sb: SupabaseClient, id: string): Promise<Proyecto> {
  return unwrap(await sb.from("proyectos").select("*").eq("id", id).single());
}

export async function createProyecto(sb: SupabaseClient, data: ProyectoInsert): Promise<Proyecto> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("proyectos").insert({ ...data, user_id: userId }).select().single());
}

export async function updateProyecto(sb: SupabaseClient, id: string, data: ProyectoUpdate): Promise<Proyecto> {
  return unwrap(await sb.from("proyectos").update(data).eq("id", id).select().single());
}

export async function deleteProyecto(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("proyectos").delete().eq("id", id));
}

// ── General ───────────────────────────────────────────────

export async function fetchGeneral(sb: SupabaseClient, proyectoId: string): Promise<General | null> {
  const { data } = await sb.from("general").select("*").eq("proyecto_id", proyectoId).maybeSingle();
  return data;
}

export async function upsertGeneral(sb: SupabaseClient, proyectoId: string, data: GeneralUpdate): Promise<General> {
  const userId = await getUserId(sb);
  return unwrap(
    await sb.from("general")
      .upsert({ ...data, proyecto_id: proyectoId, user_id: userId }, { onConflict: "proyecto_id" })
      .select()
      .single()
  );
}

// ── Facciones ─────────────────────────────────────────────

export async function fetchFacciones(sb: SupabaseClient, proyectoId: string): Promise<Faccion[]> {
  return unwrap(await sb.from("facciones").select("*").eq("proyecto_id", proyectoId).order("posicion"));
}

export async function fetchFaccion(sb: SupabaseClient, id: string): Promise<Faccion> {
  return unwrap(await sb.from("facciones").select("*").eq("id", id).single());
}

export async function createFaccion(sb: SupabaseClient, proyectoId: string, data: FaccionInsert): Promise<Faccion> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("facciones").insert({ ...data, proyecto_id: proyectoId, user_id: userId }).select().single());
}

export async function updateFaccion(sb: SupabaseClient, id: string, data: FaccionUpdate): Promise<Faccion> {
  return unwrap(await sb.from("facciones").update(data).eq("id", id).select().single());
}

export async function deleteFaccion(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("facciones").delete().eq("id", id));
}

// ── Facción Relaciones ────────────────────────────────────

export async function fetchFaccionRelaciones(sb: SupabaseClient, faccionId: string): Promise<FaccionRelacion[]> {
  return unwrap(
    await sb.from("faccion_relaciones")
      .select("*")
      .or(`faccion_a_id.eq.${faccionId},faccion_b_id.eq.${faccionId}`)
  );
}

export async function createFaccionRelacion(sb: SupabaseClient, data: FaccionRelacionInsert): Promise<FaccionRelacion> {
  const userId = await getUserId(sb);
  const [a, b] = data.faccion_a_id < data.faccion_b_id
    ? [data.faccion_a_id, data.faccion_b_id]
    : [data.faccion_b_id, data.faccion_a_id];
  return unwrap(
    await sb.from("faccion_relaciones")
      .insert({ faccion_a_id: a, faccion_b_id: b, descripcion: data.descripcion ?? "", tipo: data.tipo ?? "", user_id: userId })
      .select().single()
  );
}

export async function updateFaccionRelacion(sb: SupabaseClient, id: string, data: { descripcion?: string; tipo?: string }): Promise<FaccionRelacion> {
  return unwrap(await sb.from("faccion_relaciones").update(data).eq("id", id).select().single());
}

export async function deleteFaccionRelacion(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("faccion_relaciones").delete().eq("id", id));
}

// ── Personajes ────────────────────────────────────────────

export async function fetchPersonajes(sb: SupabaseClient, proyectoId: string): Promise<Personaje[]> {
  return unwrap(await sb.from("personajes").select("*").eq("proyecto_id", proyectoId).order("posicion"));
}

export async function fetchPersonaje(sb: SupabaseClient, id: string): Promise<Personaje> {
  return unwrap(await sb.from("personajes").select("*").eq("id", id).single());
}

export async function createPersonaje(sb: SupabaseClient, proyectoId: string, data: PersonajeInsert): Promise<Personaje> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("personajes").insert({ ...data, proyecto_id: proyectoId, user_id: userId }).select().single());
}

export async function updatePersonaje(sb: SupabaseClient, id: string, data: PersonajeUpdate): Promise<Personaje> {
  return unwrap(await sb.from("personajes").update(data).eq("id", id).select().single());
}

export async function deletePersonaje(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("personajes").delete().eq("id", id));
}

// ── Personaje Relaciones ──────────────────────────────────

export async function fetchPersonajeRelaciones(sb: SupabaseClient, personajeId: string): Promise<PersonajeRelacion[]> {
  return unwrap(
    await sb.from("personaje_relaciones")
      .select("*")
      .or(`personaje_a_id.eq.${personajeId},personaje_b_id.eq.${personajeId}`)
  );
}

export async function createPersonajeRelacion(sb: SupabaseClient, data: PersonajeRelacionInsert): Promise<PersonajeRelacion> {
  const userId = await getUserId(sb);
  const [a, b] = data.personaje_a_id < data.personaje_b_id
    ? [data.personaje_a_id, data.personaje_b_id]
    : [data.personaje_b_id, data.personaje_a_id];
  return unwrap(
    await sb.from("personaje_relaciones")
      .insert({ personaje_a_id: a, personaje_b_id: b, descripcion: data.descripcion ?? "", tipo: data.tipo ?? "", user_id: userId })
      .select().single()
  );
}

export async function updatePersonajeRelacion(sb: SupabaseClient, id: string, data: { descripcion?: string; tipo?: string }): Promise<PersonajeRelacion> {
  return unwrap(await sb.from("personaje_relaciones").update(data).eq("id", id).select().single());
}

export async function deletePersonajeRelacion(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("personaje_relaciones").delete().eq("id", id));
}

// ── Fases ─────────────────────────────────────────────────

export async function fetchFases(sb: SupabaseClient, proyectoId: string): Promise<Fase[]> {
  return unwrap(await sb.from("fases").select("*").eq("proyecto_id", proyectoId).order("posicion"));
}

export async function fetchFase(sb: SupabaseClient, id: string): Promise<Fase> {
  return unwrap(await sb.from("fases").select("*").eq("id", id).single());
}

export async function createFase(sb: SupabaseClient, proyectoId: string, data: FaseInsert): Promise<Fase> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("fases").insert({ ...data, proyecto_id: proyectoId, user_id: userId }).select().single());
}

export async function updateFase(sb: SupabaseClient, id: string, data: FaseUpdate): Promise<Fase> {
  return unwrap(await sb.from("fases").update(data).eq("id", id).select().single());
}

export async function deleteFase(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("fases").delete().eq("id", id));
}

// ── Lugares ───────────────────────────────────────────────

export async function fetchLugares(sb: SupabaseClient, proyectoId: string): Promise<Lugar[]> {
  return unwrap(await sb.from("lugares").select("*").eq("proyecto_id", proyectoId).order("posicion"));
}

export async function fetchLugar(sb: SupabaseClient, id: string): Promise<Lugar> {
  return unwrap(await sb.from("lugares").select("*").eq("id", id).single());
}

export async function createLugar(sb: SupabaseClient, proyectoId: string, data: LugarInsert): Promise<Lugar> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("lugares").insert({ ...data, proyecto_id: proyectoId, user_id: userId }).select().single());
}

export async function updateLugar(sb: SupabaseClient, id: string, data: LugarUpdate): Promise<Lugar> {
  return unwrap(await sb.from("lugares").update(data).eq("id", id).select().single());
}

export async function deleteLugar(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("lugares").delete().eq("id", id));
}

// ── Eventos ──────────────────────────────────────────────

export async function fetchEventos(sb: SupabaseClient, proyectoId: string): Promise<Evento[]> {
  return unwrap(await sb.from("eventos").select("*").eq("proyecto_id", proyectoId).order("created_at"));
}

export async function fetchEvento(sb: SupabaseClient, id: string): Promise<Evento> {
  return unwrap(await sb.from("eventos").select("*").eq("id", id).single());
}

export async function createEvento(sb: SupabaseClient, proyectoId: string, data: EventoInsert): Promise<Evento> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("eventos").insert({ ...data, proyecto_id: proyectoId, user_id: userId }).select().single());
}

export async function updateEvento(sb: SupabaseClient, id: string, data: EventoUpdate): Promise<Evento> {
  return unwrap(await sb.from("eventos").update(data).eq("id", id).select().single());
}

export async function deleteEvento(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("eventos").delete().eq("id", id));
}

// ── Evento junctions ─────────────────────────────────────

export async function fetchEventoPersonajes(sb: SupabaseClient, eventoId: string): Promise<EventoPersonaje[]> {
  return unwrap(await sb.from("evento_personajes").select("*").eq("evento_id", eventoId));
}

export async function addEventoPersonaje(sb: SupabaseClient, eventoId: string, personajeId: string): Promise<EventoPersonaje> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("evento_personajes").insert({ evento_id: eventoId, personaje_id: personajeId, user_id: userId }).select().single());
}

export async function removeEventoPersonaje(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("evento_personajes").delete().eq("id", id));
}

export async function fetchEventoLugares(sb: SupabaseClient, eventoId: string): Promise<EventoLugar[]> {
  return unwrap(await sb.from("evento_lugares").select("*").eq("evento_id", eventoId));
}

export async function addEventoLugar(sb: SupabaseClient, eventoId: string, lugarId: string): Promise<EventoLugar> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("evento_lugares").insert({ evento_id: eventoId, lugar_id: lugarId, user_id: userId }).select().single());
}

export async function removeEventoLugar(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("evento_lugares").delete().eq("id", id));
}

// ── Evento → Hito junction (inverse of hito_eventos) ──────
export async function fetchEventoHitos(sb: SupabaseClient, eventoId: string): Promise<HitoEvento[]> {
  return unwrap(await sb.from("hito_eventos").select("*").eq("evento_id", eventoId));
}

export async function addEventoHito(sb: SupabaseClient, eventoId: string, hitoId: string): Promise<HitoEvento> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("hito_eventos").insert({ hito_id: hitoId, evento_id: eventoId, user_id: userId }).select().single());
}

export async function removeEventoHito(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("hito_eventos").delete().eq("id", id));
}

// ── Evento → Escena junction (inverse of escena_eventos) ──
export async function fetchEventoEscenas(sb: SupabaseClient, eventoId: string): Promise<EscenaEvento[]> {
  return unwrap(await sb.from("escena_eventos").select("*").eq("evento_id", eventoId));
}

export async function addEventoEscena(sb: SupabaseClient, eventoId: string, escenaId: string): Promise<EscenaEvento> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("escena_eventos").insert({ escena_id: escenaId, evento_id: eventoId, user_id: userId }).select().single());
}

export async function removeEventoEscena(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("escena_eventos").delete().eq("id", id));
}

// ── Hitos ────────────────────────────────────────────────

export async function fetchHitos(sb: SupabaseClient, proyectoId: string): Promise<Hito[]> {
  return unwrap(await sb.from("hitos").select("*").eq("proyecto_id", proyectoId).order("posicion"));
}

export async function fetchHito(sb: SupabaseClient, id: string): Promise<Hito> {
  return unwrap(await sb.from("hitos").select("*").eq("id", id).single());
}

export async function createHito(sb: SupabaseClient, proyectoId: string, data: HitoInsert): Promise<Hito> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("hitos").insert({ ...data, proyecto_id: proyectoId, user_id: userId }).select().single());
}

export async function updateHito(sb: SupabaseClient, id: string, data: HitoUpdate): Promise<Hito> {
  return unwrap(await sb.from("hitos").update(data).eq("id", id).select().single());
}

export async function deleteHito(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("hitos").delete().eq("id", id));
}

// ── Hito junctions ───────────────────────────────────────

export async function fetchHitoPersonajes(sb: SupabaseClient, hitoId: string): Promise<HitoPersonaje[]> {
  return unwrap(await sb.from("hito_personajes").select("*").eq("hito_id", hitoId));
}

export async function addHitoPersonaje(sb: SupabaseClient, hitoId: string, personajeId: string): Promise<HitoPersonaje> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("hito_personajes").insert({ hito_id: hitoId, personaje_id: personajeId, user_id: userId }).select().single());
}

export async function removeHitoPersonaje(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("hito_personajes").delete().eq("id", id));
}

export async function fetchHitoEventos(sb: SupabaseClient, hitoId: string): Promise<HitoEvento[]> {
  return unwrap(await sb.from("hito_eventos").select("*").eq("hito_id", hitoId));
}

export async function addHitoEvento(sb: SupabaseClient, hitoId: string, eventoId: string): Promise<HitoEvento> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("hito_eventos").insert({ hito_id: hitoId, evento_id: eventoId, user_id: userId }).select().single());
}

export async function removeHitoEvento(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("hito_eventos").delete().eq("id", id));
}

// ── Arcos ────────────────────────────────────────────────

export async function fetchArcos(sb: SupabaseClient, proyectoId: string): Promise<Arco[]> {
  return unwrap(await sb.from("arcos").select("*").eq("proyecto_id", proyectoId).order("posicion"));
}

export async function fetchArco(sb: SupabaseClient, id: string): Promise<Arco> {
  return unwrap(await sb.from("arcos").select("*").eq("id", id).single());
}

export async function createArco(sb: SupabaseClient, proyectoId: string, data: ArcoInsert): Promise<Arco> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("arcos").insert({ ...data, proyecto_id: proyectoId, user_id: userId }).select().single());
}

export async function updateArco(sb: SupabaseClient, id: string, data: ArcoUpdate): Promise<Arco> {
  return unwrap(await sb.from("arcos").update(data).eq("id", id).select().single());
}

export async function deleteArco(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("arcos").delete().eq("id", id));
}

// ── Escenas ──────────────────────────────────────────────

export async function fetchEscenas(sb: SupabaseClient, proyectoId: string): Promise<Escena[]> {
  return unwrap(await sb.from("escenas").select("*").eq("proyecto_id", proyectoId).order("posicion"));
}

export async function fetchEscena(sb: SupabaseClient, id: string): Promise<Escena> {
  return unwrap(await sb.from("escenas").select("*").eq("id", id).single());
}

export async function createEscena(sb: SupabaseClient, proyectoId: string, data: EscenaInsert): Promise<Escena> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("escenas").insert({ ...data, proyecto_id: proyectoId, user_id: userId }).select().single());
}

export async function updateEscena(sb: SupabaseClient, id: string, data: EscenaUpdate): Promise<Escena> {
  return unwrap(await sb.from("escenas").update(data).eq("id", id).select().single());
}

export async function deleteEscena(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("escenas").delete().eq("id", id));
}

// ── Arco junctions ──────────────────────────────────────

export async function fetchArcoPersonajes(sb: SupabaseClient, arcoId: string): Promise<ArcoPersonaje[]> {
  return unwrap(await sb.from("arco_personajes").select("*").eq("arco_id", arcoId));
}

export async function addArcoPersonaje(sb: SupabaseClient, arcoId: string, personajeId: string): Promise<ArcoPersonaje> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("arco_personajes").insert({ arco_id: arcoId, personaje_id: personajeId, user_id: userId }).select().single());
}

export async function removeArcoPersonaje(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("arco_personajes").delete().eq("id", id));
}

// ── Escena junctions ─────────────────────────────────────

export async function fetchEscenaPersonajes(sb: SupabaseClient, escenaId: string): Promise<EscenaPersonaje[]> {
  return unwrap(await sb.from("escena_personajes").select("*").eq("escena_id", escenaId));
}

export async function fetchEscenaPersonajesByPersonaje(sb: SupabaseClient, personajeId: string): Promise<EscenaPersonaje[]> {
  return unwrap(await sb.from("escena_personajes").select("*").eq("personaje_id", personajeId));
}

export async function addEscenaPersonaje(sb: SupabaseClient, escenaId: string, personajeId: string): Promise<EscenaPersonaje> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("escena_personajes").insert({ escena_id: escenaId, personaje_id: personajeId, user_id: userId }).select().single());
}

export async function removeEscenaPersonaje(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("escena_personajes").delete().eq("id", id));
}

// ── Escena ↔ Evento junction ─────────────────────────────

export async function fetchEscenaEventos(sb: SupabaseClient, escenaId: string): Promise<EscenaEvento[]> {
  return unwrap(await sb.from("escena_eventos").select("*").eq("escena_id", escenaId));
}

export async function addEscenaEvento(sb: SupabaseClient, escenaId: string, eventoId: string): Promise<EscenaEvento> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("escena_eventos").insert({ escena_id: escenaId, evento_id: eventoId, user_id: userId }).select().single());
}

export async function removeEscenaEvento(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("escena_eventos").delete().eq("id", id));
}

// ── Personaje Evoluciones ───────────────────────────────

export async function fetchPersonajeEvoluciones(sb: SupabaseClient, personajeId: string): Promise<PersonajeEvolucion[]> {
  return unwrap(await sb.from("personaje_evoluciones").select("*").eq("personaje_id", personajeId).order("posicion"));
}

export async function createPersonajeEvolucion(sb: SupabaseClient, personajeId: string, data: PersonajeEvolucionInsert): Promise<PersonajeEvolucion> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("personaje_evoluciones").insert({ ...data, personaje_id: personajeId, user_id: userId }).select().single());
}

export async function updatePersonajeEvolucion(sb: SupabaseClient, id: string, data: PersonajeEvolucionUpdate): Promise<PersonajeEvolucion> {
  return unwrap(await sb.from("personaje_evoluciones").update(data).eq("id", id).select().single());
}

export async function deletePersonajeEvolucion(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("personaje_evoluciones").delete().eq("id", id));
}

// ── Map upload (lugares) ────────────────────────────────

export async function uploadMapaLugar(sb: SupabaseClient, file: File): Promise<string> {
  const userId = await getUserId(sb);
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;
  unwrap(await sb.storage.from("mapas").upload(path, file));
  const { data } = sb.storage.from("mapas").getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteMapaLugar(sb: SupabaseClient, url: string): Promise<void> {
  const match = url.match(/mapas\/(.+)$/);
  if (!match) return;
  await sb.storage.from("mapas").remove([match[1]]);
}

// ── Fetch children lugares ──────────────────────────────

export async function fetchLugarChildren(sb: SupabaseClient, lugarPadreId: string): Promise<Lugar[]> {
  return unwrap(await sb.from("lugares").select("*").eq("lugar_padre_id", lugarPadreId).order("posicion"));
}

export async function fetchLugaresRaiz(sb: SupabaseClient, proyectoId: string): Promise<Lugar[]> {
  return unwrap(await sb.from("lugares").select("*").eq("proyecto_id", proyectoId).is("lugar_padre_id", null).order("posicion"));
}

// ── Image upload ────────────────────────────────────────

export async function uploadImage(sb: SupabaseClient, file: File): Promise<string> {
  const userId = await getUserId(sb);
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;
  unwrap(await sb.storage.from("imagenes").upload(path, file));
  const { data } = sb.storage.from("imagenes").getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImage(sb: SupabaseClient, url: string): Promise<void> {
  const match = url.match(/imagenes\/(.+)$/);
  if (!match) return;
  await sb.storage.from("imagenes").remove([match[1]]);
}

// ── Manuscrito Carpetas ────────────────────────────────────

export async function fetchManuscritoCarpetas(sb: SupabaseClient, proyectoId: string): Promise<ManuscritoCarpeta[]> {
  return unwrap(await sb.from("manuscrito_carpetas").select("*").eq("proyecto_id", proyectoId).order("posicion"));
}

export async function createManuscritoCarpeta(sb: SupabaseClient, proyectoId: string, data: ManuscritoCarpetaInsert): Promise<ManuscritoCarpeta> {
  const userId = await getUserId(sb);
  return unwrap(await sb.from("manuscrito_carpetas").insert({ ...data, proyecto_id: proyectoId, user_id: userId }).select().single());
}

export async function updateManuscritoCarpeta(sb: SupabaseClient, id: string, data: ManuscritoCarpetaUpdate): Promise<ManuscritoCarpeta> {
  return unwrap(await sb.from("manuscrito_carpetas").update(data).eq("id", id).select().single());
}

export async function deleteManuscritoCarpeta(sb: SupabaseClient, id: string): Promise<void> {
  unwrap(await sb.from("manuscrito_carpetas").delete().eq("id", id));
}

// ── Batch fetch generals (for project completeness %) ───

export async function fetchGeneralsBatch(sb: SupabaseClient, proyectoIds: string[]): Promise<General[]> {
  if (proyectoIds.length === 0) return [];
  return unwrap(await sb.from("general").select("*").in("proyecto_id", proyectoIds));
}
