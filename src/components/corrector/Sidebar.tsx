"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/analysis/types";
import { CategoryCard } from "./CategoryCard";
import { WordFrequencyPanel } from "./WordFrequencyPanel";

type Tab = "analysis" | "frequency";

interface SidebarProps {
  onNavigateToIssue?: (start: number, end: number) => void;
}

export function Sidebar({ onNavigateToIssue }: SidebarProps) {
  const [tab, setTab] = useState<Tab>("analysis");

  return (
    <div className="flex h-full flex-col border-l border-[var(--color-border)] bg-[var(--color-cream)]">
      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        <button
          onClick={() => setTab("analysis")}
          className={`flex-1 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
            tab === "analysis"
              ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-light)]"
          }`}
        >
          Análisis
        </button>
        <button
          onClick={() => setTab("frequency")}
          className={`flex-1 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
            tab === "frequency"
              ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-light)]"
          }`}
        >
          Frecuencia
        </button>
      </div>

      {/* Content */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {tab === "analysis" ? (
          <div className="py-1">
            {CATEGORIES.map((config) => (
              <CategoryCard
                key={config.id}
                config={config}
                onNavigateToIssue={onNavigateToIssue}
              />
            ))}
          </div>
        ) : (
          <WordFrequencyPanel />
        )}
      </div>
    </div>
  );
}
