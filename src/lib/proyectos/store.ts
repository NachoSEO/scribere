import { create } from "zustand";
import type {
  Proyecto,
  General,
  Faccion,
  FaccionRelacion,
  Personaje,
  PersonajeRelacion,
  PersonajeEvolucion,
  Fase,
  Lugar,
  Evento,
  Hito,
  Arco,
  Escena,
} from "@/types/proyectos";

interface PlanificadorState {
  // Current project
  proyectos: Proyecto[];
  currentProyecto: Proyecto | null;
  setProyectos: (proyectos: Proyecto[]) => void;
  setCurrentProyecto: (proyecto: Proyecto | null) => void;
  updateProyectoInList: (proyecto: Proyecto) => void;
  addProyecto: (proyecto: Proyecto) => void;
  removeProyecto: (id: string) => void;

  // General
  general: General | null;
  setGeneral: (general: General | null) => void;

  // Facciones
  facciones: Faccion[];
  setFacciones: (facciones: Faccion[]) => void;
  addFaccion: (faccion: Faccion) => void;
  updateFaccionInList: (faccion: Faccion) => void;
  removeFaccion: (id: string) => void;

  // Faccion relaciones
  faccionRelaciones: FaccionRelacion[];
  setFaccionRelaciones: (relaciones: FaccionRelacion[]) => void;
  addFaccionRelacion: (relacion: FaccionRelacion) => void;
  updateFaccionRelacionInList: (relacion: FaccionRelacion) => void;
  removeFaccionRelacion: (id: string) => void;

  // Personajes
  personajes: Personaje[];
  setPersonajes: (personajes: Personaje[]) => void;
  addPersonaje: (personaje: Personaje) => void;
  updatePersonajeInList: (personaje: Personaje) => void;
  removePersonaje: (id: string) => void;

  // Personaje relaciones
  personajeRelaciones: PersonajeRelacion[];
  setPersonajeRelaciones: (relaciones: PersonajeRelacion[]) => void;
  addPersonajeRelacion: (relacion: PersonajeRelacion) => void;
  updatePersonajeRelacionInList: (relacion: PersonajeRelacion) => void;
  removePersonajeRelacion: (id: string) => void;

  // Fases
  fases: Fase[];
  setFases: (fases: Fase[]) => void;
  addFase: (fase: Fase) => void;
  updateFaseInList: (fase: Fase) => void;
  removeFase: (id: string) => void;

  // Lugares
  lugares: Lugar[];
  setLugares: (lugares: Lugar[]) => void;
  addLugar: (lugar: Lugar) => void;
  updateLugarInList: (lugar: Lugar) => void;
  removeLugar: (id: string) => void;

  // Eventos
  eventos: Evento[];
  setEventos: (eventos: Evento[]) => void;
  addEvento: (evento: Evento) => void;
  updateEventoInList: (evento: Evento) => void;
  removeEvento: (id: string) => void;

  // Hitos
  hitos: Hito[];
  setHitos: (hitos: Hito[]) => void;
  addHito: (hito: Hito) => void;
  updateHitoInList: (hito: Hito) => void;
  removeHito: (id: string) => void;

  // Arcos
  arcos: Arco[];
  setArcos: (arcos: Arco[]) => void;
  addArco: (arco: Arco) => void;
  updateArcoInList: (arco: Arco) => void;
  removeArco: (id: string) => void;

  // Escenas
  escenas: Escena[];
  setEscenas: (escenas: Escena[]) => void;
  addEscena: (escena: Escena) => void;
  updateEscenaInList: (escena: Escena) => void;
  removeEscena: (id: string) => void;

  // Personaje evoluciones
  personajeEvoluciones: PersonajeEvolucion[];
  setPersonajeEvoluciones: (evoluciones: PersonajeEvolucion[]) => void;
  addPersonajeEvolucion: (evolucion: PersonajeEvolucion) => void;
  updatePersonajeEvolucionInList: (evolucion: PersonajeEvolucion) => void;
  removePersonajeEvolucion: (id: string) => void;
}

export const useProyectosStore = create<PlanificadorState>((set) => ({
  // Proyectos
  proyectos: [],
  currentProyecto: null,
  setProyectos: (proyectos) => set({ proyectos }),
  setCurrentProyecto: (currentProyecto) => set({ currentProyecto }),
  updateProyectoInList: (proyecto) =>
    set((s) => ({
      proyectos: s.proyectos.map((p) => (p.id === proyecto.id ? proyecto : p)),
      currentProyecto: s.currentProyecto?.id === proyecto.id ? proyecto : s.currentProyecto,
    })),
  addProyecto: (proyecto) => set((s) => ({ proyectos: [proyecto, ...s.proyectos] })),
  removeProyecto: (id) => set((s) => ({ proyectos: s.proyectos.filter((p) => p.id !== id) })),

  // General
  general: null,
  setGeneral: (general) => set({ general }),

  // Facciones
  facciones: [],
  setFacciones: (facciones) => set({ facciones }),
  addFaccion: (faccion) => set((s) => ({ facciones: [...s.facciones, faccion] })),
  updateFaccionInList: (faccion) =>
    set((s) => ({ facciones: s.facciones.map((f) => (f.id === faccion.id ? faccion : f)) })),
  removeFaccion: (id) => set((s) => ({ facciones: s.facciones.filter((f) => f.id !== id) })),

  // Faccion relaciones
  faccionRelaciones: [],
  setFaccionRelaciones: (faccionRelaciones) => set({ faccionRelaciones }),
  addFaccionRelacion: (relacion) => set((s) => ({ faccionRelaciones: [...s.faccionRelaciones, relacion] })),
  updateFaccionRelacionInList: (relacion) =>
    set((s) => ({ faccionRelaciones: s.faccionRelaciones.map((r) => (r.id === relacion.id ? relacion : r)) })),
  removeFaccionRelacion: (id) => set((s) => ({ faccionRelaciones: s.faccionRelaciones.filter((r) => r.id !== id) })),

  // Personajes
  personajes: [],
  setPersonajes: (personajes) => set({ personajes }),
  addPersonaje: (personaje) => set((s) => ({ personajes: [...s.personajes, personaje] })),
  updatePersonajeInList: (personaje) =>
    set((s) => ({ personajes: s.personajes.map((p) => (p.id === personaje.id ? personaje : p)) })),
  removePersonaje: (id) => set((s) => ({ personajes: s.personajes.filter((p) => p.id !== id) })),

  // Personaje relaciones
  personajeRelaciones: [],
  setPersonajeRelaciones: (personajeRelaciones) => set({ personajeRelaciones }),
  addPersonajeRelacion: (relacion) => set((s) => ({ personajeRelaciones: [...s.personajeRelaciones, relacion] })),
  updatePersonajeRelacionInList: (relacion) =>
    set((s) => ({ personajeRelaciones: s.personajeRelaciones.map((r) => (r.id === relacion.id ? relacion : r)) })),
  removePersonajeRelacion: (id) =>
    set((s) => ({ personajeRelaciones: s.personajeRelaciones.filter((r) => r.id !== id) })),

  // Fases
  fases: [],
  setFases: (fases) => set({ fases }),
  addFase: (fase) => set((s) => ({ fases: [...s.fases, fase] })),
  updateFaseInList: (fase) => set((s) => ({ fases: s.fases.map((f) => (f.id === fase.id ? fase : f)) })),
  removeFase: (id) => set((s) => ({ fases: s.fases.filter((f) => f.id !== id) })),

  // Lugares
  lugares: [],
  setLugares: (lugares) => set({ lugares }),
  addLugar: (lugar) => set((s) => ({ lugares: [...s.lugares, lugar] })),
  updateLugarInList: (lugar) => set((s) => ({ lugares: s.lugares.map((l) => (l.id === lugar.id ? lugar : l)) })),
  removeLugar: (id) => set((s) => ({ lugares: s.lugares.filter((l) => l.id !== id) })),

  // Eventos
  eventos: [],
  setEventos: (eventos) => set({ eventos }),
  addEvento: (evento) => set((s) => ({ eventos: [...s.eventos, evento] })),
  updateEventoInList: (evento) => set((s) => ({ eventos: s.eventos.map((e) => (e.id === evento.id ? evento : e)) })),
  removeEvento: (id) => set((s) => ({ eventos: s.eventos.filter((e) => e.id !== id) })),

  // Hitos
  hitos: [],
  setHitos: (hitos) => set({ hitos }),
  addHito: (hito) => set((s) => ({ hitos: [...s.hitos, hito] })),
  updateHitoInList: (hito) => set((s) => ({ hitos: s.hitos.map((h) => (h.id === hito.id ? hito : h)) })),
  removeHito: (id) => set((s) => ({ hitos: s.hitos.filter((h) => h.id !== id) })),

  // Arcos
  arcos: [],
  setArcos: (arcos) => set({ arcos }),
  addArco: (arco) => set((s) => ({ arcos: [...s.arcos, arco] })),
  updateArcoInList: (arco) => set((s) => ({ arcos: s.arcos.map((a) => (a.id === arco.id ? arco : a)) })),
  removeArco: (id) => set((s) => ({ arcos: s.arcos.filter((a) => a.id !== id) })),

  // Escenas
  escenas: [],
  setEscenas: (escenas) => set({ escenas }),
  addEscena: (escena) => set((s) => ({ escenas: [...s.escenas, escena] })),
  updateEscenaInList: (escena) => set((s) => ({ escenas: s.escenas.map((e) => (e.id === escena.id ? escena : e)) })),
  removeEscena: (id) => set((s) => ({ escenas: s.escenas.filter((e) => e.id !== id) })),

  // Personaje evoluciones
  personajeEvoluciones: [],
  setPersonajeEvoluciones: (personajeEvoluciones) => set({ personajeEvoluciones }),
  addPersonajeEvolucion: (evolucion) => set((s) => ({ personajeEvoluciones: [...s.personajeEvoluciones, evolucion] })),
  updatePersonajeEvolucionInList: (evolucion) =>
    set((s) => ({ personajeEvoluciones: s.personajeEvoluciones.map((e) => (e.id === evolucion.id ? evolucion : e)) })),
  removePersonajeEvolucion: (id) => set((s) => ({ personajeEvoluciones: s.personajeEvoluciones.filter((e) => e.id !== id) })),
}));
