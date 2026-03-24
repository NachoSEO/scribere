"use client";

import { useCallback, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useDebouncedSave } from "@/lib/hooks/use-debounced-save";
import { useWorldbuildingStore } from "./store";
import * as q from "./queries";
import type {
  MundoInsert, MundoUpdate,
  EraInsert, EraUpdate,
  EventoCronologiaInsert, EventoCronologiaUpdate,
  RegionInsert, RegionUpdate,
  CulturaInsert, CulturaUpdate,
  SistemaInsert, SistemaUpdate,
} from "@/types/worldbuilding";

const sb = createClient();

// ── Mundos ────────────────────────────────────────────────

export function useMundos() {
  const { mundos, setMundos, addMundo, removeMundo } = useWorldbuildingStore();

  useEffect(() => {
    q.fetchMundos(sb).then(setMundos).catch(console.error);
  }, [setMundos]);

  const create = useCallback(async (data: MundoInsert) => {
    const mundo = await q.createMundo(sb, data);
    addMundo(mundo);
    return mundo;
  }, [addMundo]);

  const remove = useCallback(async (id: string) => {
    await q.deleteMundo(sb, id);
    removeMundo(id);
  }, [removeMundo]);

  return { mundos, create, remove };
}

export function useMundo(mundoId: string) {
  const { currentMundo, setCurrentMundo, updateMundoInList } = useWorldbuildingStore();

  useEffect(() => {
    q.fetchMundo(sb, mundoId).then(setCurrentMundo).catch(console.error);
    return () => setCurrentMundo(null);
  }, [mundoId, setCurrentMundo]);

  const save = useCallback(async (data: MundoUpdate) => {
    const updated = await q.updateMundo(sb, mundoId, data);
    updateMundoInList(updated);
  }, [mundoId, updateMundoInList]);

  const debouncedSave = useDebouncedSave(save);

  return { mundo: currentMundo, save: debouncedSave, saveImmediate: save };
}

// ── Eras ──────────────────────────────────────────────────

export function useEras(mundoId: string) {
  const { eras, setEras, addEra, removeEra } = useWorldbuildingStore();

  useEffect(() => {
    q.fetchEras(sb, mundoId).then(setEras).catch(console.error);
    return () => setEras([]);
  }, [mundoId, setEras]);

  const create = useCallback(async (data: EraInsert) => {
    const era = await q.createEra(sb, mundoId, data);
    addEra(era);
    return era;
  }, [mundoId, addEra]);

  const remove = useCallback(async (id: string) => {
    await q.deleteEra(sb, id);
    removeEra(id);
  }, [removeEra]);

  return { eras, create, remove };
}

export function useEra(eraId: string) {
  const { updateEraInList } = useWorldbuildingStore();
  const era = useWorldbuildingStore((s) => s.eras.find((e) => e.id === eraId) ?? null);

  useEffect(() => {
    if (!era) {
      q.fetchEra(sb, eraId).then(updateEraInList).catch(console.error);
    }
  }, [eraId, era, updateEraInList]);

  const save = useCallback(async (data: EraUpdate) => {
    const updated = await q.updateEra(sb, eraId, data);
    updateEraInList(updated);
  }, [eraId, updateEraInList]);

  const debouncedSave = useDebouncedSave(save);

  return { era, save: debouncedSave };
}

// ── Eventos de cronología ─────────────────────────────────

export function useEventos(eraId: string) {
  const { eventos, setEventos, addEvento, removeEvento, updateEventoInList } = useWorldbuildingStore();

  useEffect(() => {
    q.fetchEventos(sb, eraId).then(setEventos).catch(console.error);
    return () => setEventos([]);
  }, [eraId, setEventos]);

  const create = useCallback(async (data: EventoCronologiaInsert) => {
    const evento = await q.createEvento(sb, eraId, data);
    addEvento(evento);
    return evento;
  }, [eraId, addEvento]);

  const update = useCallback(async (id: string, data: EventoCronologiaUpdate) => {
    const updated = await q.updateEvento(sb, id, data);
    updateEventoInList(updated);
  }, [updateEventoInList]);

  const debouncedUpdate = useDebouncedSave(({ id, ...data }: EventoCronologiaUpdate & { id: string }) => update(id, data));

  const remove = useCallback(async (id: string) => {
    await q.deleteEvento(sb, id);
    removeEvento(id);
  }, [removeEvento]);

  // Filter to only this era's events
  const eraEventos = useMemo(
    () => eventos.filter((e) => e.era_id === eraId),
    [eventos, eraId]
  );

  return { eventos: eraEventos, create, update: debouncedUpdate, remove };
}

// ── Regiones ──────────────────────────────────────────────

export function useRegiones(mundoId: string) {
  const { regiones, setRegiones, addRegion, removeRegion } = useWorldbuildingStore();

  useEffect(() => {
    q.fetchRegiones(sb, mundoId).then(setRegiones).catch(console.error);
    return () => setRegiones([]);
  }, [mundoId, setRegiones]);

  const create = useCallback(async (data: RegionInsert) => {
    const region = await q.createRegion(sb, mundoId, data);
    addRegion(region);
    return region;
  }, [mundoId, addRegion]);

  const remove = useCallback(async (id: string) => {
    await q.deleteRegion(sb, id);
    removeRegion(id);
  }, [removeRegion]);

  return { regiones, create, remove };
}

export function useRegion(regionId: string) {
  const { updateRegionInList } = useWorldbuildingStore();
  const region = useWorldbuildingStore((s) => s.regiones.find((r) => r.id === regionId) ?? null);

  useEffect(() => {
    if (!region) {
      q.fetchRegion(sb, regionId).then(updateRegionInList).catch(console.error);
    }
  }, [regionId, region, updateRegionInList]);

  const save = useCallback(async (data: RegionUpdate) => {
    const updated = await q.updateRegion(sb, regionId, data);
    updateRegionInList(updated);
  }, [regionId, updateRegionInList]);

  const debouncedSave = useDebouncedSave(save);

  return { region, save: debouncedSave };
}

// ── Culturas ──────────────────────────────────────────────

export function useCulturas(mundoId: string) {
  const { culturas, setCulturas, addCultura, removeCultura } = useWorldbuildingStore();

  useEffect(() => {
    q.fetchCulturas(sb, mundoId).then(setCulturas).catch(console.error);
    return () => setCulturas([]);
  }, [mundoId, setCulturas]);

  const create = useCallback(async (data: CulturaInsert) => {
    const cultura = await q.createCultura(sb, mundoId, data);
    addCultura(cultura);
    return cultura;
  }, [mundoId, addCultura]);

  const remove = useCallback(async (id: string) => {
    await q.deleteCultura(sb, id);
    removeCultura(id);
  }, [removeCultura]);

  return { culturas, create, remove };
}

export function useCultura(culturaId: string) {
  const { updateCulturaInList } = useWorldbuildingStore();
  const cultura = useWorldbuildingStore((s) => s.culturas.find((c) => c.id === culturaId) ?? null);

  useEffect(() => {
    if (!cultura) {
      q.fetchCultura(sb, culturaId).then(updateCulturaInList).catch(console.error);
    }
  }, [culturaId, cultura, updateCulturaInList]);

  const save = useCallback(async (data: CulturaUpdate) => {
    const updated = await q.updateCultura(sb, culturaId, data);
    updateCulturaInList(updated);
  }, [culturaId, updateCulturaInList]);

  const debouncedSave = useDebouncedSave(save);

  return { cultura, save: debouncedSave };
}

// ── Sistemas ──────────────────────────────────────────────

export function useSistemas(mundoId: string) {
  const { sistemas, setSistemas, addSistema, removeSistema } = useWorldbuildingStore();

  useEffect(() => {
    q.fetchSistemas(sb, mundoId).then(setSistemas).catch(console.error);
    return () => setSistemas([]);
  }, [mundoId, setSistemas]);

  const create = useCallback(async (data: SistemaInsert) => {
    const sistema = await q.createSistema(sb, mundoId, data);
    addSistema(sistema);
    return sistema;
  }, [mundoId, addSistema]);

  const remove = useCallback(async (id: string) => {
    await q.deleteSistema(sb, id);
    removeSistema(id);
  }, [removeSistema]);

  return { sistemas, create, remove };
}

export function useSistema(sistemaId: string) {
  const { updateSistemaInList } = useWorldbuildingStore();
  const sistema = useWorldbuildingStore((s) => s.sistemas.find((si) => si.id === sistemaId) ?? null);

  useEffect(() => {
    if (!sistema) {
      q.fetchSistema(sb, sistemaId).then(updateSistemaInList).catch(console.error);
    }
  }, [sistemaId, sistema, updateSistemaInList]);

  const save = useCallback(async (data: SistemaUpdate) => {
    const updated = await q.updateSistema(sb, sistemaId, data);
    updateSistemaInList(updated);
  }, [sistemaId, updateSistemaInList]);

  const debouncedSave = useDebouncedSave(save);

  return { sistema, save: debouncedSave };
}
