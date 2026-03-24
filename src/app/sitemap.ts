import type { MetadataRoute } from "next";

const BASE_URL = "https://scritura.app";

const MARKETING_PAGES = [
  "/",
  "/corrector",
  "/corrector/adverbios",
  "/corrector/gerundios",
  "/corrector/verbos-debiles",
  "/corrector/frases-largas",
  "/corrector/reiteraciones",
  "/corrector/conjunciones",
  "/corrector/posesivos",
  "/corrector/vocativos",
  "/corrector/dialogos",
  "/corrector/parrafos",
  "/corrector/frecuencia-palabras",
  "/corrector/metricas",
  "/planificador",
  "/planificador/personajes",
  "/planificador/arcos-narrativos",
  "/planificador/escenas",
  "/planificador/fases",
  "/planificador/hitos",
  "/planificador/lugares",
  "/planificador/eventos",
  "/planificador/facciones",
  "/planificador/relaciones",
  "/worldbuilding",
  "/worldbuilding/cronologia",
  "/worldbuilding/mapas",
  "/worldbuilding/regiones",
  "/worldbuilding/culturas",
  "/worldbuilding/sistemas",
  "/escritores",
  "/precios",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return MARKETING_PAGES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
