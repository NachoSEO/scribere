"use client";

import { use } from "react";
import { useEscenas } from "@/lib/proyectos/hooks";
import { EntityList } from "@/components/proyectos/EntityList";

export default function EscenasPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { escenas, create } = useEscenas(projectId);

  // EntityList expects `nombre`; escenas use `resumen`
  const items = escenas.map((e) => ({ id: e.id, nombre: e.resumen, descripcion: e.objetivo }));

  return (
    <EntityList
      title="Escenas"
      items={items}
      basePath={`/app/proyectos/${projectId}/escenas`}
      onCreate={(nombre) => create({ resumen: nombre })}
      entityLabel="escena"
    />
  );
}
