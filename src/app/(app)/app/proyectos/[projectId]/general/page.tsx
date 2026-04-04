"use client";

import { use } from "react";
import { useEscenas } from "@/lib/proyectos/hooks";
import { GeneralForm } from "@/components/proyectos/GeneralForm";

export default function GeneralPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  // Load escenas into store so GeneralForm can show progress stats
  useEscenas(projectId);
  return <GeneralForm projectId={projectId} />;
}
