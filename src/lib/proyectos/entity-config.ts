export type MentionType = "personaje" | "lugar" | "faccion" | "evento";

export const ENTITY_TYPE_CONFIG: Record<MentionType, { label: string; color: string }> = {
  personaje: { label: "Personaje", color: "#8b6f47" },
  lugar: { label: "Lugar", color: "#589b9b" },
  faccion: { label: "Facción", color: "#93709e" },
  evento: { label: "Evento", color: "#cc853d" },
};

export function getMentionEntityUrl(projectId: string, type: string, id: string): string {
  const plural = type === "faccion" ? "facciones" : `${type}s`;
  return `/app/proyectos/${projectId}/${plural}/${id}`;
}
