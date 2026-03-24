"use client";

import { use } from "react";
import { useRegiones } from "@/lib/worldbuilding/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function RegionesPage({
  params,
}: {
  params: Promise<{ mundoId: string }>;
}) {
  const { mundoId } = use(params);
  const { regiones, create } = useRegiones(mundoId);

  return (
    <EntityList
      title="Regiones"
      items={regiones}
      basePath={`/app/worldbuilding/${mundoId}/regiones`}
      onCreate={(nombre) => create({ nombre })}
      entityLabel="región"
    />
  );
}
