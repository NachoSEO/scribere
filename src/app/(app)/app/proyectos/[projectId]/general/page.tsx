"use client";

import { use } from "react";
import { GeneralForm } from "@/components/proyectos/GeneralForm";

export default function GeneralPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  return <GeneralForm projectId={projectId} />;
}
