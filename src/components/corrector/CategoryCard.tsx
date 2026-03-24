"use client";

import { useMemo } from "react";
import { useCorrectorStore } from "@/lib/store";
import type { CategoryConfig } from "@/lib/analysis/types";

interface CategoryCardProps {
  config: CategoryConfig;
  onNavigateToIssue?: (start: number, end: number) => void;
}

export function CategoryCard({ config, onNavigateToIssue }: CategoryCardProps) {
  const enabled = useCorrectorStore((s) => s.enabledCategories[config.id]);
  const toggleCategory = useCorrectorStore((s) => s.toggleCategory);
  const focusedCategory = useCorrectorStore((s) => s.focusedCategory);
  const setFocusedCategory = useCorrectorStore((s) => s.setFocusedCategory);
  const allIssues = useCorrectorStore((s) => s.issues);

  const isFocused = focusedCategory === config.id;
  const categoryIssues = useMemo(
    () => allIssues.filter((i) => i.category === config.id),
    [allIssues, config.id]
  );
  const count = categoryIssues.length;

  return (
    <div className={`${!enabled ? "opacity-40" : ""}`}>
      {/* Row */}
      <div className="flex items-center gap-2 py-1.5 px-2">
        <button
          onClick={() => {
            if (!enabled) return;
            setFocusedCategory(isFocused ? null : config.id);
          }}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
          disabled={!enabled}
        >
          <span
            className="flex-shrink-0 text-[8px] text-[var(--color-ink-muted)] transition-transform"
            style={{ transform: isFocused && count > 0 ? "rotate(90deg)" : "rotate(0)" }}
          >
            &#9654;
          </span>
          <div
            className="h-2 w-2 flex-shrink-0 rounded-full"
            style={{ backgroundColor: enabled ? config.color : "#ccc" }}
          />
          <span className="truncate text-xs font-medium text-[var(--color-ink)]">
            {config.label}
          </span>
          {enabled && count > 0 && (
            <span
              className="flex-shrink-0 rounded-full px-1.5 py-px text-[10px] font-semibold text-white"
              style={{ backgroundColor: config.color }}
            >
              {count}
            </span>
          )}
        </button>

        <button
          onClick={() => toggleCategory(config.id)}
          className={`relative h-3.5 w-6 flex-shrink-0 rounded-full transition-colors ${
            enabled ? "bg-[var(--color-accent)]" : "bg-[var(--color-parchment)]"
          }`}
        >
          <div
            className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white shadow-sm transition-transform ${
              enabled ? "left-[11px]" : "left-0.5"
            }`}
          />
        </button>
      </div>

      {/* Expanded issue list */}
      {enabled && isFocused && count > 0 && (
        <div className="max-h-52 overflow-y-auto border-t border-[var(--color-border-light)] ml-6">
          {categoryIssues.slice(0, 50).map((issue, idx) => (
            <button
              key={`${issue.start}-${issue.end}-${idx}`}
              onClick={() => onNavigateToIssue?.(issue.start, issue.end)}
              className="flex w-full items-start gap-1.5 border-b border-[var(--color-border-light)] px-2 py-1 text-left transition-colors last:border-b-0 hover:bg-[var(--color-cream-dark)]"
            >
              <div
                className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-[var(--color-ink-light)]">
                  &ldquo;{issue.match}&rdquo;
                </p>
                <p className="mt-0.5 truncate text-[10px] leading-snug text-[var(--color-ink-muted)]">
                  {issue.message}
                </p>
              </div>
            </button>
          ))}
          {count > 50 && (
            <div className="px-2 py-1 text-center text-[10px] text-[var(--color-ink-muted)]">
              +{count - 50} más
            </div>
          )}
        </div>
      )}

      {enabled && isFocused && count === 0 && (
        <p className="ml-6 px-2 py-1 text-[10px] text-[var(--color-ink-muted)]">
          No se encontraron problemas
        </p>
      )}
    </div>
  );
}
