"use client";

import { WorldbuildingSectionNav } from "./WorldbuildingSectionNav";

interface WorldbuildingShellProps {
  mundoId: string;
  mundoName: string;
  children: React.ReactNode;
}

export function WorldbuildingShell({ mundoId, mundoName, children }: WorldbuildingShellProps) {
  return (
    <div className="flex h-full">
      <WorldbuildingSectionNav mundoId={mundoId} mundoName={mundoName} />
      <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
