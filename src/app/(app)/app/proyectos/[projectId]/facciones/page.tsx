"use client";

import { use } from "react";
import { useFacciones } from "@/lib/proyectos/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function FaccionesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { facciones, create } = useFacciones(projectId);

  return (
    <EntityList
      title="Facciones"
      items={facciones}
      basePath={`/app/proyectos/${projectId}/facciones`}
      onCreate={(nombre) => create({ nombre })}
      entityLabel="facción"
    />
  );
}
