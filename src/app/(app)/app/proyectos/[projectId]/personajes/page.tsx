"use client";

import { use } from "react";
import { usePersonajes } from "@/lib/proyectos/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function PersonajesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { personajes, create } = usePersonajes(projectId);

  return (
    <EntityList
      title="Personajes"
      items={personajes}
      basePath={`/app/proyectos/${projectId}/personajes`}
      onCreate={(nombre) => create({ nombre })}
      entityLabel="personaje"
    />
  );
}
