"use client";

import { use } from "react";
import { WorldbuildingShell } from "@/components/worldbuilding/WorldbuildingShell";
import { useMundo } from "@/lib/worldbuilding/hooks";

export default function MundoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ mundoId: string }>;
}) {
  const { mundoId } = use(params);
  const { mundo } = useMundo(mundoId);

  return (
    <div className="h-full bg-[var(--color-cream)]">
      <WorldbuildingShell
        mundoId={mundoId}
        mundoName={mundo?.nombre ?? "Cargando..."}
      >
        {children}
      </WorldbuildingShell>
    </div>
  );
}
