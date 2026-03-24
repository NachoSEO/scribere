"use client";

import { use } from "react";
import { useEventos } from "@/lib/proyectos/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function EventosPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { eventos, create } = useEventos(projectId);

  return (
    <EntityList
      title="Eventos"
      items={eventos}
      basePath={`/app/proyectos/${projectId}/eventos`}
      onCreate={(nombre) => create({ nombre })}
      entityLabel="evento"
    />
  );
}
