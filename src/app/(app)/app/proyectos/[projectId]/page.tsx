"use client";

import { use } from "react";
import { redirect } from "next/navigation";

export default function ProjectRootPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  redirect(`/app/proyectos/${projectId}/general`);
}
