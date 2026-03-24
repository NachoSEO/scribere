import { create } from "zustand";
import type {
  Mundo,
  Era,
  EventoCronologia,
  Region,
  Cultura,
  Sistema,
} from "@/types/worldbuilding";

interface WorldbuildingState {
  // Mundos
  mundos: Mundo[];
  currentMundo: Mundo | null;
  setMundos: (mundos: Mundo[]) => void;
  setCurrentMundo: (mundo: Mundo | null) => void;
  updateMundoInList: (mundo: Mundo) => void;
  addMundo: (mundo: Mundo) => void;
  removeMundo: (id: string) => void;

  // Eras
  eras: Era[];
  setEras: (eras: Era[]) => void;
  addEra: (era: Era) => void;
  updateEraInList: (era: Era) => void;
  removeEra: (id: string) => void;

  // Eventos (cronología)
  eventos: EventoCronologia[];
  setEventos: (eventos: EventoCronologia[]) => void;
  addEvento: (evento: EventoCronologia) => void;
  updateEventoInList: (evento: EventoCronologia) => void;
  removeEvento: (id: string) => void;

  // Regiones
  regiones: Region[];
  setRegiones: (regiones: Region[]) => void;
  addRegion: (region: Region) => void;
  updateRegionInList: (region: Region) => void;
  removeRegion: (id: string) => void;

  // Culturas
  culturas: Cultura[];
  setCulturas: (culturas: Cultura[]) => void;
  addCultura: (cultura: Cultura) => void;
  updateCulturaInList: (cultura: Cultura) => void;
  removeCultura: (id: string) => void;

  // Sistemas
  sistemas: Sistema[];
  setSistemas: (sistemas: Sistema[]) => void;
  addSistema: (sistema: Sistema) => void;
  updateSistemaInList: (sistema: Sistema) => void;
  removeSistema: (id: string) => void;
}

export const useWorldbuildingStore = create<WorldbuildingState>((set) => ({
  // Mundos
  mundos: [],
  currentMundo: null,
  setMundos: (mundos) => set({ mundos }),
  setCurrentMundo: (currentMundo) => set({ currentMundo }),
  updateMundoInList: (mundo) =>
    set((s) => ({
      mundos: s.mundos.map((m) => (m.id === mundo.id ? mundo : m)),
      currentMundo: s.currentMundo?.id === mundo.id ? mundo : s.currentMundo,
    })),
  addMundo: (mundo) => set((s) => ({ mundos: [mundo, ...s.mundos] })),
  removeMundo: (id) => set((s) => ({ mundos: s.mundos.filter((m) => m.id !== id) })),

  // Eras
  eras: [],
  setEras: (eras) => set({ eras }),
  addEra: (era) => set((s) => ({ eras: [...s.eras, era] })),
  updateEraInList: (era) => set((s) => ({ eras: s.eras.map((e) => (e.id === era.id ? era : e)) })),
  removeEra: (id) => set((s) => ({ eras: s.eras.filter((e) => e.id !== id) })),

  // Eventos
  eventos: [],
  setEventos: (eventos) => set({ eventos }),
  addEvento: (evento) => set((s) => ({ eventos: [...s.eventos, evento] })),
  updateEventoInList: (evento) =>
    set((s) => ({ eventos: s.eventos.map((e) => (e.id === evento.id ? evento : e)) })),
  removeEvento: (id) => set((s) => ({ eventos: s.eventos.filter((e) => e.id !== id) })),

  // Regiones
  regiones: [],
  setRegiones: (regiones) => set({ regiones }),
  addRegion: (region) => set((s) => ({ regiones: [...s.regiones, region] })),
  updateRegionInList: (region) =>
    set((s) => ({ regiones: s.regiones.map((r) => (r.id === region.id ? region : r)) })),
  removeRegion: (id) => set((s) => ({ regiones: s.regiones.filter((r) => r.id !== id) })),

  // Culturas
  culturas: [],
  setCulturas: (culturas) => set({ culturas }),
  addCultura: (cultura) => set((s) => ({ culturas: [...s.culturas, cultura] })),
  updateCulturaInList: (cultura) =>
    set((s) => ({ culturas: s.culturas.map((c) => (c.id === cultura.id ? cultura : c)) })),
  removeCultura: (id) => set((s) => ({ culturas: s.culturas.filter((c) => c.id !== id) })),

  // Sistemas
  sistemas: [],
  setSistemas: (sistemas) => set({ sistemas }),
  addSistema: (sistema) => set((s) => ({ sistemas: [...s.sistemas, sistema] })),
  updateSistemaInList: (sistema) =>
    set((s) => ({ sistemas: s.sistemas.map((si) => (si.id === sistema.id ? sistema : si)) })),
  removeSistema: (id) => set((s) => ({ sistemas: s.sistemas.filter((si) => si.id !== id) })),
}));
