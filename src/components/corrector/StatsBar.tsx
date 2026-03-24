"use client";

import { useCorrectorStore } from "@/lib/store";

export function StatsBar() {
  const metrics = useCorrectorStore((s) => s.metrics);

  const stats = [
    { label: "palabras", value: metrics.words.toLocaleString("es-ES") },
    { label: "únicas", value: metrics.uniqueWords.toString() },
    { label: "páginas", value: metrics.pages.toFixed(1) },
    { label: "lectura", value: `${metrics.readingTimeMinutes} min` },
    { label: "frases", value: metrics.sentences.toString() },
  ];

  return (
    <div className="flex items-center gap-5 border-b border-[var(--color-border)] bg-white px-5 py-2.5">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-1.5 text-xs">
          <span className="font-semibold tabular-nums text-[var(--color-ink)]">
            {stat.value}
          </span>
          <span className="text-[var(--color-ink-muted)]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
