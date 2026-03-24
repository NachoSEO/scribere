"use client";

import { use } from "react";
import { useHitos } from "@/lib/proyectos/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function HitosPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { hitos, create } = useHitos(projectId);

  // EntityList expects items with `nombre`, but hitos use `hito` field
  const items = hitos.map((h) => ({ id: h.id, nombre: h.hito, descripcion: h.informacion }));

  return (
    <EntityList
      title="Hitos"
      items={items}
      basePath={`/app/proyectos/${projectId}/hitos`}
      onCreate={(nombre) => create({ hito: nombre })}
      entityLabel="hito"
    />
  );
}
