"use client";

import { use } from "react";
import { useEras } from "@/lib/worldbuilding/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function CronologiaPage({
  params,
}: {
  params: Promise<{ mundoId: string }>;
}) {
  const { mundoId } = use(params);
  const { eras, create } = useEras(mundoId);

  return (
    <EntityList
      title="Cronología"
      items={eras}
      basePath={`/app/worldbuilding/${mundoId}/cronologia`}
      onCreate={(nombre) => create({ nombre })}
      entityLabel="era"
    />
  );
}
