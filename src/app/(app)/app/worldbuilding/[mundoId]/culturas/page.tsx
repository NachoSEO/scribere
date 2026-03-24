"use client";

import { use } from "react";
import { useCulturas } from "@/lib/worldbuilding/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function CulturasPage({
  params,
}: {
  params: Promise<{ mundoId: string }>;
}) {
  const { mundoId } = use(params);
  const { culturas, create } = useCulturas(mundoId);

  return (
    <EntityList
      title="Culturas"
      items={culturas}
      basePath={`/app/worldbuilding/${mundoId}/culturas`}
      onCreate={(nombre) => create({ nombre })}
      entityLabel="cultura"
    />
  );
}
