"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useDebouncedSave } from "@/lib/hooks/use-debounced-save";
import { useProyectosStore } from "./store";
import * as q from "./queries";
import type {
  ProyectoInsert, ProyectoUpdate,
  GeneralUpdate,
  FaccionInsert, FaccionUpdate,
  FaccionRelacionInsert,
  PersonajeInsert, PersonajeUpdate,
  PersonajeRelacionInsert,
  PersonajeEvolucionInsert, PersonajeEvolucionUpdate,
  FaseInsert, FaseUpdate,
  Lugar, LugarInsert, LugarUpdate, LugarPin,
  EventoInsert, EventoUpdate,
  HitoInsert, HitoUpdate,
  ArcoInsert, ArcoUpdate,
  EscenaInsert, EscenaUpdate,
  EventoPersonaje, EventoLugar,
  HitoPersonaje, HitoEvento,
  ArcoPersonaje,
  EscenaPersonaje,
  EscenaEvento,
  PersonajeEvolucion,
  ManuscritoCarpeta, ManuscritoCarpetaInsert, ManuscritoCarpetaUpdate,
  EscenaVersion, EscenaVersionInsert,
  EscenaTarea, EscenaTareaInsert, EscenaTareaUpdate,
  Idea, IdeaInsert, IdeaUpdate,
  EscenaIdea,
  LugarRuta, LugarRutaInsert, LugarRutaUpdate,
} from "@/types/proyectos";

const sb = createClient();

// ── Proyectos ─────────────────────────────────────────────

export function useProyectos() {
  const { proyectos, setProyectos, addProyecto, removeProyecto } = useProyectosStore();

  useEffect(() => {
    q.fetchProyectos(sb).then(setProyectos).catch(console.error);
  }, [setProyectos]);

  const create = useCallback(async (data: ProyectoInsert) => {
    const proyecto = await q.createProyecto(sb, data);
    addProyecto(proyecto);
    return proyecto;
  }, [addProyecto]);

  const remove = useCallback(async (id: string) => {
    await q.deleteProyecto(sb, id);
    removeProyecto(id);
  }, [removeProyecto]);

  return { proyectos, create, remove };
}

export function useProyecto(projectId: string) {
  const { currentProyecto, setCurrentProyecto, updateProyectoInList } = useProyectosStore();

  useEffect(() => {
    q.fetchProyecto(sb, projectId).then(setCurrentProyecto).catch(console.error);
    return () => setCurrentProyecto(null);
  }, [projectId, setCurrentProyecto]);

  const save = useCallback(async (data: ProyectoUpdate) => {
    const updated = await q.updateProyecto(sb, projectId, data);
    updateProyectoInList(updated);
  }, [projectId, updateProyectoInList]);

  const debouncedSave = useDebouncedSave(save);

  return { proyecto: currentProyecto, save: debouncedSave };
}

// ── General ───────────────────────────────────────────────

export function useGeneral(projectId: string) {
  const { general, setGeneral } = useProyectosStore();

  useEffect(() => {
    q.fetchGeneral(sb, projectId).then(setGeneral).catch(console.error);
    return () => setGeneral(null);
  }, [projectId, setGeneral]);

  const save = useCallback(async (data: GeneralUpdate) => {
    const updated = await q.upsertGeneral(sb, projectId, data);
    setGeneral(updated);
  }, [projectId, setGeneral]);

  const debouncedSave = useDebouncedSave(save);

  return { general, save: debouncedSave };
}

// ── Facciones ─────────────────────────────────────────────

export function useFacciones(projectId: string) {
  const { facciones, setFacciones, addFaccion, removeFaccion } = useProyectosStore();

  useEffect(() => {
    q.fetchFacciones(sb, projectId).then(setFacciones).catch(console.error);
    return () => setFacciones([]);
  }, [projectId, setFacciones]);

  const create = useCallback(async (data: FaccionInsert) => {
    const faccion = await q.createFaccion(sb, projectId, data);
    addFaccion(faccion);
    return faccion;
  }, [projectId, addFaccion]);

  const remove = useCallback(async (id: string) => {
    await q.deleteFaccion(sb, id);
    removeFaccion(id);
  }, [removeFaccion]);

  return { facciones, create, remove };
}

export function useFaccion(faccionId: string) {
  const { updateFaccionInList } = useProyectosStore();
  const faccion = useProyectosStore((s) => s.facciones.find((f) => f.id === faccionId) ?? null);

  useEffect(() => {
    if (!faccion) {
      q.fetchFaccion(sb, faccionId).then(updateFaccionInList).catch(console.error);
    }
  }, [faccionId, faccion, updateFaccionInList]);

  const save = useCallback(async (data: FaccionUpdate) => {
    const updated = await q.updateFaccion(sb, faccionId, data);
    updateFaccionInList(updated);
  }, [faccionId, updateFaccionInList]);

  const debouncedSave = useDebouncedSave(save);

  return { faccion, save: debouncedSave };
}

// ── Facción Relaciones ────────────────────────────────────

export function useFaccionRelaciones(faccionId: string) {
  const { faccionRelaciones, setFaccionRelaciones, addFaccionRelacion, removeFaccionRelacion, updateFaccionRelacionInList } = useProyectosStore();
  const facciones = useProyectosStore((s) => s.facciones);

  useEffect(() => {
    q.fetchFaccionRelaciones(sb, faccionId).then(setFaccionRelaciones).catch(console.error);
    return () => setFaccionRelaciones([]);
  }, [faccionId, setFaccionRelaciones]);

  const create = useCallback(async (data: FaccionRelacionInsert) => {
    const relacion = await q.createFaccionRelacion(sb, data);
    addFaccionRelacion(relacion);
    return relacion;
  }, [addFaccionRelacion]);

  const update = useCallback(async (id: string, data: { descripcion?: string; tipo?: string }) => {
    const updated = await q.updateFaccionRelacion(sb, id, data);
    updateFaccionRelacionInList(updated);
  }, [updateFaccionRelacionInList]);

  const debouncedUpdate = useDebouncedSave(({ id, ...data }: { id: string; descripcion?: string; tipo?: string }) => update(id, data));

  const remove = useCallback(async (id: string) => {
    await q.deleteFaccionRelacion(sb, id);
    removeFaccionRelacion(id);
  }, [removeFaccionRelacion]);

  // Available factions to relate to (excluding current)
  const available = useMemo(
    () => facciones.filter((f) => f.id !== faccionId),
    [facciones, faccionId]
  );

  return { relaciones: faccionRelaciones, available, create, update: debouncedUpdate, remove };
}

// ── Personajes ────────────────────────────────────────────

export function usePersonajes(projectId: string) {
  const { personajes, setPersonajes, addPersonaje, removePersonaje } = useProyectosStore();

  useEffect(() => {
    q.fetchPersonajes(sb, projectId).then(setPersonajes).catch(console.error);
    return () => setPersonajes([]);
  }, [projectId, setPersonajes]);

  const create = useCallback(async (data: PersonajeInsert) => {
    const personaje = await q.createPersonaje(sb, projectId, data);
    addPersonaje(personaje);
    return personaje;
  }, [projectId, addPersonaje]);

  const remove = useCallback(async (id: string) => {
    await q.deletePersonaje(sb, id);
    removePersonaje(id);
  }, [removePersonaje]);

  return { personajes, create, remove };
}

export function usePersonaje(personajeId: string) {
  const { updatePersonajeInList } = useProyectosStore();
  const personaje = useProyectosStore((s) => s.personajes.find((p) => p.id === personajeId) ?? null);

  useEffect(() => {
    if (!personaje) {
      q.fetchPersonaje(sb, personajeId).then(updatePersonajeInList).catch(console.error);
    }
  }, [personajeId, personaje, updatePersonajeInList]);

  const save = useCallback(async (data: PersonajeUpdate) => {
    const updated = await q.updatePersonaje(sb, personajeId, data);
    updatePersonajeInList(updated);
  }, [personajeId, updatePersonajeInList]);

  const debouncedSave = useDebouncedSave(save);

  return { personaje, save: debouncedSave };
}

// ── Personaje Relaciones ──────────────────────────────────

export function usePersonajeRelaciones(personajeId: string) {
  const { personajeRelaciones, setPersonajeRelaciones, addPersonajeRelacion, removePersonajeRelacion, updatePersonajeRelacionInList } = useProyectosStore();
  const personajes = useProyectosStore((s) => s.personajes);

  useEffect(() => {
    q.fetchPersonajeRelaciones(sb, personajeId).then(setPersonajeRelaciones).catch(console.error);
    return () => setPersonajeRelaciones([]);
  }, [personajeId, setPersonajeRelaciones]);

  const create = useCallback(async (data: PersonajeRelacionInsert) => {
    const relacion = await q.createPersonajeRelacion(sb, data);
    addPersonajeRelacion(relacion);
    return relacion;
  }, [addPersonajeRelacion]);

  const update = useCallback(async (id: string, data: { descripcion?: string; tipo?: string }) => {
    const updated = await q.updatePersonajeRelacion(sb, id, data);
    updatePersonajeRelacionInList(updated);
  }, [updatePersonajeRelacionInList]);

  const debouncedUpdate = useDebouncedSave(({ id, ...data }: { id: string; descripcion?: string; tipo?: string }) => update(id, data));

  const remove = useCallback(async (id: string) => {
    await q.deletePersonajeRelacion(sb, id);
    removePersonajeRelacion(id);
  }, [removePersonajeRelacion]);

  const available = useMemo(
    () => personajes.filter((p) => p.id !== personajeId),
    [personajes, personajeId]
  );

  return { relaciones: personajeRelaciones, available, create, update: debouncedUpdate, remove };
}

// ── Fases ─────────────────────────────────────────────────

export function useFases(projectId: string) {
  const { fases, setFases, addFase, removeFase } = useProyectosStore();

  useEffect(() => {
    q.fetchFases(sb, projectId).then(setFases).catch(console.error);
    return () => setFases([]);
  }, [projectId, setFases]);

  const create = useCallback(async (data: FaseInsert) => {
    const fase = await q.createFase(sb, projectId, data);
    addFase(fase);
    return fase;
  }, [projectId, addFase]);

  const remove = useCallback(async (id: string) => {
    await q.deleteFase(sb, id);
    removeFase(id);
  }, [removeFase]);

  return { fases, create, remove };
}

export function useFase(faseId: string) {
  const { updateFaseInList } = useProyectosStore();
  const fase = useProyectosStore((s) => s.fases.find((f) => f.id === faseId) ?? null);

  useEffect(() => {
    if (!fase) {
      q.fetchFase(sb, faseId).then(updateFaseInList).catch(console.error);
    }
  }, [faseId, fase, updateFaseInList]);

  const save = useCallback(async (data: FaseUpdate) => {
    const updated = await q.updateFase(sb, faseId, data);
    updateFaseInList(updated);
  }, [faseId, updateFaseInList]);

  const debouncedSave = useDebouncedSave(save);

  return { fase, save: debouncedSave };
}

// ── Lugares ───────────────────────────────────────────────

export function useLugares(projectId: string) {
  const { lugares, setLugares, addLugar, removeLugar } = useProyectosStore();

  useEffect(() => {
    q.fetchLugares(sb, projectId).then(setLugares).catch(console.error);
    return () => setLugares([]);
  }, [projectId, setLugares]);

  const create = useCallback(async (data: LugarInsert) => {
    const lugar = await q.createLugar(sb, projectId, data);
    addLugar(lugar);
    return lugar;
  }, [projectId, addLugar]);

  const remove = useCallback(async (id: string) => {
    await q.deleteLugar(sb, id);
    removeLugar(id);
  }, [removeLugar]);

  return { lugares, create, remove };
}

export function useLugar(lugarId: string) {
  const { updateLugarInList } = useProyectosStore();
  const lugar = useProyectosStore((s) => s.lugares.find((l) => l.id === lugarId) ?? null);

  useEffect(() => {
    if (!lugar) {
      q.fetchLugar(sb, lugarId).then(updateLugarInList).catch(console.error);
    }
  }, [lugarId, lugar, updateLugarInList]);

  const save = useCallback(async (data: LugarUpdate) => {
    const updated = await q.updateLugar(sb, lugarId, data);
    updateLugarInList(updated);
  }, [lugarId, updateLugarInList]);

  const debouncedSave = useDebouncedSave(save);

  return { lugar, save: debouncedSave };
}

// ── Lugar children & map ────────────────────────────────

export function useLugarChildren(lugarPadreId: string | null) {
  const [children, setChildren] = useState<Lugar[]>([]);

  useEffect(() => {
    if (!lugarPadreId) {
      setChildren([]);
      return;
    }
    q.fetchLugarChildren(sb, lugarPadreId).then(setChildren).catch(console.error);
  }, [lugarPadreId]);

  return { children };
}

export function useLugaresRaiz(projectId: string) {
  const [raiz, setRaiz] = useState<Lugar[]>([]);

  useEffect(() => {
    q.fetchLugaresRaiz(sb, projectId).then(setRaiz).catch(console.error);
  }, [projectId]);

  return { raiz };
}

export function useLugarMapa(lugarId: string) {
  const { updateLugarInList } = useProyectosStore();
  const lugar = useProyectosStore((s) => s.lugares.find((l) => l.id === lugarId) ?? null);

  const uploadMapa = useCallback(async (file: File) => {
    const url = await q.uploadMapaLugar(sb, file);
    const updated = await q.updateLugar(sb, lugarId, { mapa_url: url });
    updateLugarInList(updated);
    return url;
  }, [lugarId, updateLugarInList]);

  const removeMapa = useCallback(async () => {
    if (lugar?.mapa_url) {
      await q.deleteMapaLugar(sb, lugar.mapa_url);
    }
    const updated = await q.updateLugar(sb, lugarId, { mapa_url: "" });
    updateLugarInList(updated);
  }, [lugarId, lugar?.mapa_url, updateLugarInList]);

  const savePins = useCallback(async (pins: LugarPin[]) => {
    const updated = await q.updateLugar(sb, lugarId, { mapa_pins: pins });
    updateLugarInList(updated);
  }, [lugarId, updateLugarInList]);

  return { uploadMapa, removeMapa, savePins };
}

// ── Eventos ──────────────────────────────────────────────

export function useEventos(projectId: string) {
  const { eventos, setEventos, addEvento, removeEvento } = useProyectosStore();

  useEffect(() => {
    q.fetchEventos(sb, projectId).then(setEventos).catch(console.error);
    return () => setEventos([]);
  }, [projectId, setEventos]);

  const create = useCallback(async (data: EventoInsert) => {
    const evento = await q.createEvento(sb, projectId, data);
    addEvento(evento);
    return evento;
  }, [projectId, addEvento]);

  const remove = useCallback(async (id: string) => {
    await q.deleteEvento(sb, id);
    removeEvento(id);
  }, [removeEvento]);

  return { eventos, create, remove };
}

export function useEvento(eventoId: string) {
  const { updateEventoInList } = useProyectosStore();
  const evento = useProyectosStore((s) => s.eventos.find((e) => e.id === eventoId) ?? null);

  useEffect(() => {
    if (!evento) {
      q.fetchEvento(sb, eventoId).then(updateEventoInList).catch(console.error);
    }
  }, [eventoId, evento, updateEventoInList]);

  const save = useCallback(async (data: EventoUpdate) => {
    const updated = await q.updateEvento(sb, eventoId, data);
    updateEventoInList(updated);
  }, [eventoId, updateEventoInList]);

  const debouncedSave = useDebouncedSave(save);

  return { evento, save: debouncedSave };
}

// ── Evento Junctions ─────────────────────────────────────

export function useEventoPersonajes(eventoId: string) {
  const [links, setLinks] = useState<EventoPersonaje[]>([]);

  useEffect(() => {
    q.fetchEventoPersonajes(sb, eventoId).then(setLinks).catch(console.error);
  }, [eventoId]);

  const add = useCallback(async (personajeId: string) => {
    const link = await q.addEventoPersonaje(sb, eventoId, personajeId);
    setLinks((prev) => [...prev, link]);
  }, [eventoId]);

  const remove = useCallback(async (id: string) => {
    await q.removeEventoPersonaje(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

export function useEventoLugares(eventoId: string) {
  const [links, setLinks] = useState<EventoLugar[]>([]);

  useEffect(() => {
    q.fetchEventoLugares(sb, eventoId).then(setLinks).catch(console.error);
  }, [eventoId]);

  const add = useCallback(async (lugarId: string) => {
    const link = await q.addEventoLugar(sb, eventoId, lugarId);
    setLinks((prev) => [...prev, link]);
  }, [eventoId]);

  const remove = useCallback(async (id: string) => {
    await q.removeEventoLugar(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

// ── Hitos ────────────────────────────────────────────────

export function useHitos(projectId: string) {
  const { hitos, setHitos, addHito, removeHito } = useProyectosStore();

  useEffect(() => {
    q.fetchHitos(sb, projectId).then(setHitos).catch(console.error);
    return () => setHitos([]);
  }, [projectId, setHitos]);

  const create = useCallback(async (data: HitoInsert) => {
    const hito = await q.createHito(sb, projectId, data);
    addHito(hito);
    return hito;
  }, [projectId, addHito]);

  const remove = useCallback(async (id: string) => {
    await q.deleteHito(sb, id);
    removeHito(id);
  }, [removeHito]);

  return { hitos, create, remove };
}

export function useHito(hitoId: string) {
  const { updateHitoInList } = useProyectosStore();
  const hito = useProyectosStore((s) => s.hitos.find((h) => h.id === hitoId) ?? null);

  useEffect(() => {
    if (!hito) {
      q.fetchHito(sb, hitoId).then(updateHitoInList).catch(console.error);
    }
  }, [hitoId, hito, updateHitoInList]);

  const save = useCallback(async (data: HitoUpdate) => {
    const updated = await q.updateHito(sb, hitoId, data);
    updateHitoInList(updated);
  }, [hitoId, updateHitoInList]);

  const debouncedSave = useDebouncedSave(save);

  return { hito, save: debouncedSave };
}

// ── Hito Junctions ───────────────────────────────────────

export function useHitoPersonajes(hitoId: string) {
  const [links, setLinks] = useState<HitoPersonaje[]>([]);

  useEffect(() => {
    q.fetchHitoPersonajes(sb, hitoId).then(setLinks).catch(console.error);
  }, [hitoId]);

  const add = useCallback(async (personajeId: string) => {
    const link = await q.addHitoPersonaje(sb, hitoId, personajeId);
    setLinks((prev) => [...prev, link]);
  }, [hitoId]);

  const remove = useCallback(async (id: string) => {
    await q.removeHitoPersonaje(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

export function useHitoEventos(hitoId: string) {
  const [links, setLinks] = useState<HitoEvento[]>([]);

  useEffect(() => {
    q.fetchHitoEventos(sb, hitoId).then(setLinks).catch(console.error);
  }, [hitoId]);

  const add = useCallback(async (eventoId: string) => {
    const link = await q.addHitoEvento(sb, hitoId, eventoId);
    setLinks((prev) => [...prev, link]);
  }, [hitoId]);

  const remove = useCallback(async (id: string) => {
    await q.removeHitoEvento(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

// ── Arcos ────────────────────────────────────────────────

export function useArcos(projectId: string) {
  const { arcos, setArcos, addArco, removeArco } = useProyectosStore();

  useEffect(() => {
    q.fetchArcos(sb, projectId).then(setArcos).catch(console.error);
    return () => setArcos([]);
  }, [projectId, setArcos]);

  const create = useCallback(async (data: ArcoInsert) => {
    const arco = await q.createArco(sb, projectId, data);
    addArco(arco);
    return arco;
  }, [projectId, addArco]);

  const remove = useCallback(async (id: string) => {
    await q.deleteArco(sb, id);
    removeArco(id);
  }, [removeArco]);

  return { arcos, create, remove };
}

export function useArco(arcoId: string) {
  const { updateArcoInList } = useProyectosStore();
  const arco = useProyectosStore((s) => s.arcos.find((a) => a.id === arcoId) ?? null);

  useEffect(() => {
    if (!arco) {
      q.fetchArco(sb, arcoId).then(updateArcoInList).catch(console.error);
    }
  }, [arcoId, arco, updateArcoInList]);

  const save = useCallback(async (data: ArcoUpdate) => {
    const updated = await q.updateArco(sb, arcoId, data);
    updateArcoInList(updated);
  }, [arcoId, updateArcoInList]);

  const debouncedSave = useDebouncedSave(save);

  return { arco, save: debouncedSave };
}

// ── Arco Junctions ──────────────────────────────────────

export function useArcoPersonajes(arcoId: string) {
  const [links, setLinks] = useState<ArcoPersonaje[]>([]);

  useEffect(() => {
    q.fetchArcoPersonajes(sb, arcoId).then(setLinks).catch(console.error);
  }, [arcoId]);

  const add = useCallback(async (personajeId: string) => {
    const link = await q.addArcoPersonaje(sb, arcoId, personajeId);
    setLinks((prev) => [...prev, link]);
  }, [arcoId]);

  const remove = useCallback(async (id: string) => {
    await q.removeArcoPersonaje(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

// ── Escenas ──────────────────────────────────────────────

export function useEscenas(projectId: string) {
  const { escenas, setEscenas, addEscena, removeEscena } = useProyectosStore();

  useEffect(() => {
    q.fetchEscenas(sb, projectId).then(setEscenas).catch(console.error);
    return () => setEscenas([]);
  }, [projectId, setEscenas]);

  const create = useCallback(async (data: EscenaInsert) => {
    const escena = await q.createEscena(sb, projectId, data);
    addEscena(escena);
    return escena;
  }, [projectId, addEscena]);

  const remove = useCallback(async (id: string) => {
    await q.deleteEscena(sb, id);
    removeEscena(id);
  }, [removeEscena]);

  return { escenas, create, remove };
}

export function useEscena(escenaId: string) {
  const { updateEscenaInList } = useProyectosStore();
  const escena = useProyectosStore((s) => s.escenas.find((e) => e.id === escenaId) ?? null);

  useEffect(() => {
    if (!escena) {
      q.fetchEscena(sb, escenaId).then(updateEscenaInList).catch(console.error);
    }
  }, [escenaId, escena, updateEscenaInList]);

  const save = useCallback(async (data: EscenaUpdate) => {
    const updated = await q.updateEscena(sb, escenaId, data);
    updateEscenaInList(updated);
  }, [escenaId, updateEscenaInList]);

  const debouncedSave = useDebouncedSave(save);

  return { escena, save: debouncedSave };
}

// ── Escena Junctions ─────────────────────────────────────

export function useEscenaPersonajes(escenaId: string) {
  const [links, setLinks] = useState<EscenaPersonaje[]>([]);

  useEffect(() => {
    q.fetchEscenaPersonajes(sb, escenaId).then(setLinks).catch(console.error);
  }, [escenaId]);

  const add = useCallback(async (personajeId: string) => {
    const link = await q.addEscenaPersonaje(sb, escenaId, personajeId);
    setLinks((prev) => [...prev, link]);
  }, [escenaId]);

  const remove = useCallback(async (id: string) => {
    await q.removeEscenaPersonaje(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

export function useEscenaEventos(escenaId: string) {
  const [links, setLinks] = useState<EscenaEvento[]>([]);

  useEffect(() => {
    q.fetchEscenaEventos(sb, escenaId).then(setLinks).catch(console.error);
  }, [escenaId]);

  const add = useCallback(async (eventoId: string) => {
    const link = await q.addEscenaEvento(sb, escenaId, eventoId);
    setLinks((prev) => [...prev, link]);
  }, [escenaId]);

  const remove = useCallback(async (id: string) => {
    await q.removeEscenaEvento(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

// ── Evento → Hito junction ──────────────────────────────────
export function useEventoHitos(eventoId: string) {
  const [links, setLinks] = useState<HitoEvento[]>([]);

  useEffect(() => {
    q.fetchEventoHitos(sb, eventoId).then(setLinks).catch(console.error);
  }, [eventoId]);

  const add = useCallback(async (hitoId: string) => {
    const link = await q.addEventoHito(sb, eventoId, hitoId);
    setLinks((prev) => [...prev, link]);
  }, [eventoId]);

  const remove = useCallback(async (id: string) => {
    await q.removeEventoHito(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

// ── Evento → Escena junction ────────────────────────────────
export function useEventoEscenas(eventoId: string) {
  const [links, setLinks] = useState<EscenaEvento[]>([]);

  useEffect(() => {
    q.fetchEventoEscenas(sb, eventoId).then(setLinks).catch(console.error);
  }, [eventoId]);

  const add = useCallback(async (escenaId: string) => {
    const link = await q.addEventoEscena(sb, eventoId, escenaId);
    setLinks((prev) => [...prev, link]);
  }, [eventoId]);

  const remove = useCallback(async (id: string) => {
    await q.removeEventoEscena(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

// ── Escena Personajes by Personaje ──────────────────────

export function useEscenasByPersonaje(personajeId: string) {
  const [links, setLinks] = useState<EscenaPersonaje[]>([]);

  useEffect(() => {
    q.fetchEscenaPersonajesByPersonaje(sb, personajeId).then(setLinks).catch(console.error);
  }, [personajeId]);

  return { links };
}

// ── Personaje Evoluciones ───────────────────────────────

export function usePersonajeEvoluciones(personajeId: string) {
  const { personajeEvoluciones, setPersonajeEvoluciones, addPersonajeEvolucion, removePersonajeEvolucion, updatePersonajeEvolucionInList } = useProyectosStore();

  useEffect(() => {
    q.fetchPersonajeEvoluciones(sb, personajeId).then(setPersonajeEvoluciones).catch(console.error);
    return () => setPersonajeEvoluciones([]);
  }, [personajeId, setPersonajeEvoluciones]);

  const create = useCallback(async (data: PersonajeEvolucionInsert) => {
    const evolucion = await q.createPersonajeEvolucion(sb, personajeId, data);
    addPersonajeEvolucion(evolucion);
    return evolucion;
  }, [personajeId, addPersonajeEvolucion]);

  const update = useCallback(async (id: string, data: PersonajeEvolucionUpdate) => {
    const updated = await q.updatePersonajeEvolucion(sb, id, data);
    updatePersonajeEvolucionInList(updated);
  }, [updatePersonajeEvolucionInList]);

  const debouncedUpdate = useDebouncedSave(({ id, ...data }: { id: string } & PersonajeEvolucionUpdate) => update(id, data));

  const remove = useCallback(async (id: string) => {
    await q.deletePersonajeEvolucion(sb, id);
    removePersonajeEvolucion(id);
  }, [removePersonajeEvolucion]);

  return { evoluciones: personajeEvoluciones, create, update: debouncedUpdate, remove };
}

// ── Manuscrito Carpetas ────────────────────────────────────

export function useManuscritoCarpetas(projectId: string) {
  const [carpetas, setCarpetas] = useState<ManuscritoCarpeta[]>([]);

  useEffect(() => {
    q.fetchManuscritoCarpetas(sb, projectId).then(setCarpetas).catch(console.error);
    return () => setCarpetas([]);
  }, [projectId]);

  const create = useCallback(async (data: ManuscritoCarpetaInsert) => {
    const carpeta = await q.createManuscritoCarpeta(sb, projectId, data);
    setCarpetas((prev) => [...prev, carpeta]);
    return carpeta;
  }, [projectId]);

  const update = useCallback(async (id: string, data: ManuscritoCarpetaUpdate) => {
    const updated = await q.updateManuscritoCarpeta(sb, id, data);
    setCarpetas((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  }, []);

  const remove = useCallback(async (id: string) => {
    await q.deleteManuscritoCarpeta(sb, id);
    setCarpetas((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { carpetas, create, update, remove };
}

// ── Escena Versiones ──────────────────────────────────────

export function useEscenaVersiones(escenaId: string) {
  const [versiones, setVersiones] = useState<EscenaVersion[]>([]);

  useEffect(() => {
    q.fetchEscenaVersiones(sb, escenaId).then(setVersiones).catch(console.error);
    return () => setVersiones([]);
  }, [escenaId]);

  const create = useCallback(async (data: EscenaVersionInsert) => {
    const version = await q.createEscenaVersion(sb, escenaId, data);
    setVersiones((prev) => [version, ...prev]);
    return version;
  }, [escenaId]);

  const remove = useCallback(async (id: string) => {
    await q.deleteEscenaVersion(sb, id);
    setVersiones((prev) => prev.filter((v) => v.id !== id));
  }, []);

  return { versiones, create, remove };
}

// ── Escena Tareas ─────────────────────────────────────────

export function useEscenaTareas(escenaId: string) {
  const [tareas, setTareas] = useState<EscenaTarea[]>([]);
  const proyectoId = useProyectosStore((s) => s.currentProyecto?.id);

  useEffect(() => {
    q.fetchEscenaTareas(sb, escenaId).then(setTareas).catch(console.error);
    return () => setTareas([]);
  }, [escenaId]);

  const create = useCallback(async (data: EscenaTareaInsert) => {
    if (!proyectoId) throw new Error("No proyecto selected");
    const tarea = await q.createEscenaTarea(sb, escenaId, proyectoId, data);
    setTareas((prev) => [...prev, tarea]);
    return tarea;
  }, [escenaId, proyectoId]);

  const update = useCallback(async (id: string, data: EscenaTareaUpdate) => {
    const updated = await q.updateEscenaTarea(sb, id, data);
    setTareas((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const remove = useCallback(async (id: string) => {
    await q.deleteEscenaTarea(sb, id);
    setTareas((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tareas, create, update, remove };
}

// ── Proyecto Tareas (kanban) ──────────────────────────────

export function useProyectoTareas(proyectoId: string) {
  const [tareas, setTareas] = useState<EscenaTarea[]>([]);

  useEffect(() => {
    q.fetchProyectoTareas(sb, proyectoId).then(setTareas).catch(console.error);
    return () => setTareas([]);
  }, [proyectoId]);

  const update = useCallback(async (id: string, data: EscenaTareaUpdate) => {
    const updated = await q.updateEscenaTarea(sb, id, data);
    setTareas((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  return { tareas, update };
}

// ── Ideas ─────────────────────────────────────────────────

export function useIdeas(proyectoId: string) {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    q.fetchIdeas(sb, proyectoId).then(setIdeas).catch(console.error);
    return () => setIdeas([]);
  }, [proyectoId]);

  const create = useCallback(async (data: IdeaInsert) => {
    const idea = await q.createIdea(sb, proyectoId, data);
    setIdeas((prev) => [idea, ...prev]);
    return idea;
  }, [proyectoId]);

  const update = useCallback(async (id: string, data: IdeaUpdate) => {
    const updated = await q.updateIdea(sb, id, data);
    setIdeas((prev) => prev.map((i) => (i.id === id ? updated : i)));
    return updated;
  }, []);

  const remove = useCallback(async (id: string) => {
    await q.deleteIdea(sb, id);
    setIdeas((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return { ideas, create, update, remove };
}

// ── Escena Ideas (junction) ──────────────────────────────

export function useEscenaIdeas(escenaId: string) {
  const [links, setLinks] = useState<EscenaIdea[]>([]);

  useEffect(() => {
    q.fetchEscenaIdeas(sb, escenaId).then(setLinks).catch(console.error);
  }, [escenaId]);

  const add = useCallback(async (ideaId: string) => {
    const link = await q.addEscenaIdea(sb, escenaId, ideaId);
    setLinks((prev) => [...prev, link]);
  }, [escenaId]);

  const remove = useCallback(async (id: string) => {
    await q.removeEscenaIdea(sb, id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { links, add, remove };
}

// ── Lugar Rutas ───────────────────────────────────────────

export function useLugarRutas(lugarId: string) {
  const [rutas, setRutas] = useState<LugarRuta[]>([]);
  const proyectoId = useProyectosStore((s) => s.currentProyecto?.id);

  useEffect(() => {
    q.fetchLugarRutas(sb, lugarId).then(setRutas).catch(console.error);
    return () => setRutas([]);
  }, [lugarId]);

  const create = useCallback(async (data: LugarRutaInsert) => {
    if (!proyectoId) throw new Error("No proyecto selected");
    const ruta = await q.createLugarRuta(sb, proyectoId, lugarId, data);
    setRutas((prev) => [...prev, ruta]);
    return ruta;
  }, [lugarId, proyectoId]);

  const update = useCallback(async (id: string, data: LugarRutaUpdate) => {
    const updated = await q.updateLugarRuta(sb, id, data);
    setRutas((prev) => prev.map((r) => (r.id === id ? updated : r)));
    return updated;
  }, []);

  const remove = useCallback(async (id: string) => {
    await q.deleteLugarRuta(sb, id);
    setRutas((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { rutas, create, update, remove };
}
