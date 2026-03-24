"use client";

import { SectionNav } from "./SectionNav";

interface ProyectosShellProps {
  projectId: string;
  projectName: string;
  children: React.ReactNode;
}

export function ProyectosShell({ projectId, projectName, children }: ProyectosShellProps) {
  return (
    <div className="flex h-full">
      <SectionNav projectId={projectId} projectName={projectName} />
      <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
