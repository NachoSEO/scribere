"use client";

import { use } from "react";
import { redirect } from "next/navigation";

export default function MundoRootPage({
  params,
}: {
  params: Promise<{ mundoId: string }>;
}) {
  const { mundoId } = use(params);
  redirect(`/app/worldbuilding/${mundoId}/general`);
}
