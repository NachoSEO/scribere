"use client";

import { use } from "react";
import { useArcos } from "@/lib/proyectos/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function ArcosPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { arcos, create } = useArcos(projectId);

  return (
    <EntityList
      title="Arcos"
      items={arcos}
      basePath={`/app/proyectos/${projectId}/arcos`}
      onCreate={(nombre) => create({ nombre })}
      entityLabel="arco"
    />
  );
}
