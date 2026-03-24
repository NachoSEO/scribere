"use client";

import { use } from "react";
import { EraDetail } from "@/components/worldbuilding/EraDetail";

export default function EraDetailPage({
  params,
}: {
  params: Promise<{ mundoId: string; eraId: string }>;
}) {
  const { mundoId, eraId } = use(params);
  return <EraDetail mundoId={mundoId} eraId={eraId} />;
}
