"use client";

import { useCorrectorStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/analysis/types";

interface IssueListProps {
  onNavigateToIssue?: (start: number, end: number) => void;
}

export function IssueList({ onNavigateToIssue }: IssueListProps) {
  const focusedCategory = useCorrectorStore((s) => s.focusedCategory);
  const issues = useCorrectorStore((s) => s.issues);

  if (!focusedCategory) return null;

  const categoryIssues = issues.filter(
    (i) => i.category === focusedCategory
  );
  const categoryConfig = CATEGORIES.find((c) => c.id === focusedCategory);

  if (!categoryConfig || categoryIssues.length === 0) {
    return (
      <div className="px-3 py-4 text-center text-xs text-[var(--color-ink-muted)]">
        No se encontraron problemas
      </div>
    );
  }

  return (
    <div className="custom-scrollbar max-h-64 overflow-y-auto border-t border-[var(--color-border-light)]">
      {categoryIssues.slice(0, 50).map((issue, idx) => (
        <button
          key={`${issue.start}-${issue.end}-${idx}`}
          onClick={() => onNavigateToIssue?.(issue.start, issue.end)}
          className="flex w-full items-start gap-2 border-b border-[var(--color-border-light)] px-3 py-2 text-left transition-colors hover:bg-white"
        >
          <div
            className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
            style={{ backgroundColor: categoryConfig.color }}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-[var(--color-ink-light)]">
              &ldquo;{issue.match}&rdquo;
            </p>
            <p className="mt-0.5 text-[10px] text-[var(--color-ink-muted)]">
              {issue.message}
            </p>
          </div>
        </button>
      ))}
      {categoryIssues.length > 50 && (
        <div className="px-3 py-2 text-center text-[10px] text-[var(--color-ink-muted)]">
          +{categoryIssues.length - 50} más
        </div>
      )}
    </div>
  );
}
