"use client";

import { use } from "react";
import { GeneralMundoForm } from "@/components/worldbuilding/GeneralMundoForm";

export default function GeneralMundoPage({
  params,
}: {
  params: Promise<{ mundoId: string }>;
}) {
  const { mundoId } = use(params);
  return <GeneralMundoForm mundoId={mundoId} />;
}
