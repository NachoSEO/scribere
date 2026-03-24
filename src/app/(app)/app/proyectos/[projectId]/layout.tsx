"use client";

import { use } from "react";
import { ProyectosShell } from "@/components/proyectos/ProyectosShell";
import { useProyecto } from "@/lib/proyectos/hooks";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { proyecto } = useProyecto(projectId);

  return (
    <div className="h-full bg-[var(--color-cream)]">
      <ProyectosShell
        projectId={projectId}
        projectName={proyecto?.nombre ?? "Cargando..."}
      >
        {children}
      </ProyectosShell>
    </div>
  );
}
