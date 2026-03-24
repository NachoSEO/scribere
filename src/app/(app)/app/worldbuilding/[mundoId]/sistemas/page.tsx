"use client";

import { use } from "react";
import { useSistemas } from "@/lib/worldbuilding/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function SistemasPage({
  params,
}: {
  params: Promise<{ mundoId: string }>;
}) {
  const { mundoId } = use(params);
  const { sistemas, create } = useSistemas(mundoId);

  return (
    <EntityList
      title="Sistemas"
      items={sistemas}
      basePath={`/app/worldbuilding/${mundoId}/sistemas`}
      onCreate={(nombre) => create({ nombre })}
      entityLabel="sistema"
    />
  );
}
