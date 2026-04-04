"use client";

import { use } from "react";
import { ProyectosShell } from "@/components/proyectos/ProyectosShell";
import { useProyecto } from "@/lib/proyectos/hooks";
import { useProyectosStore } from "@/lib/proyectos/store";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { proyecto } = useProyecto(projectId);
  const cachedName = useProyectosStore(
    (s) => s.proyectos.find((p) => p.id === projectId)?.nombre
  );

  return (
    <div className="h-full bg-[var(--color-cream)]">
      <ProyectosShell
        projectId={projectId}
        projectName={proyecto?.nombre ?? cachedName ?? "Cargando..."}
      >
        {children}
      </ProyectosShell>
    </div>
  );
}
