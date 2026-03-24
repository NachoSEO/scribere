"use client";

import { use } from "react";
import { useFases } from "@/lib/proyectos/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function FasesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { fases, create } = useFases(projectId);

  return (
    <EntityList
      title="Fases"
      items={fases}
      basePath={`/app/proyectos/${projectId}/fases`}
      onCreate={(nombre) => create({ nombre })}
      entityLabel="fase"
    />
  );
}
