import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import type { AnalysisIssue, CategoryId } from "@/lib/analysis/types";
import { CATEGORIES } from "@/lib/analysis/types";
import type { OffsetMapping } from "./text-extraction";
import { buildOffsetMap, textRangeToPmRange } from "./text-extraction";

const categoryClassMap = new Map(
  CATEGORIES.map((c) => [c.id, c.highlightClass])
);

export const analysisPluginKey = new PluginKey("analysisDecorations");

export interface AnalysisPluginState {
  issues: AnalysisIssue[];
  focusedCategory: CategoryId | null;
  decorations: DecorationSet;
  offsetMapping: OffsetMapping | null;
}

function buildDecorations(
  issues: AnalysisIssue[],
  focusedCategory: CategoryId | null,
  mapping: OffsetMapping,
  doc: Parameters<typeof DecorationSet.create>[0]
): DecorationSet {
  const decorations: Decoration[] = [];

  for (const issue of issues) {
    // If focused, only show that category
    if (focusedCategory && issue.category !== focusedCategory) continue;

    const range = textRangeToPmRange(mapping, issue.start, issue.end);
    if (!range) continue;

    let className = categoryClassMap.get(issue.category) ?? "";

    // Frases largas uses severity-based coloring
    if (issue.category === "frases-largas") {
      if (issue.severity === "info") className = "highlight-frases-largas-green";
      else if (issue.severity === "warning")
        className = "highlight-frases-largas-orange";
      else if (issue.severity === "error")
        className = "highlight-frases-largas-red";
    }

    decorations.push(
      Decoration.inline(range.from, range.to, {
        class: `analysis-highlight ${className}`,
        "data-category": issue.category,
        "data-message": issue.message,
      })
    );
  }

  return DecorationSet.create(doc, decorations);
}

export function createAnalysisPlugin() {
  return new Plugin<AnalysisPluginState>({
    key: analysisPluginKey,

    state: {
      init() {
        return {
          issues: [],
          focusedCategory: null,
          decorations: DecorationSet.empty,
          offsetMapping: null,
        };
      },
      apply(tr, pluginState) {
        // Check for metadata set by our React component
        const meta = tr.getMeta(analysisPluginKey) as
          | Partial<AnalysisPluginState>
          | undefined;

        if (meta) {
          const issues = meta.issues ?? pluginState.issues;
          const focusedCategory =
            meta.focusedCategory !== undefined
              ? meta.focusedCategory
              : pluginState.focusedCategory;

          const mapping = buildOffsetMap(tr.doc);
          const decorations = buildDecorations(
            issues,
            focusedCategory,
            mapping,
            tr.doc
          );

          return { issues, focusedCategory, decorations, offsetMapping: mapping };
        }

        // If document changed, remap decorations
        if (tr.docChanged) {
          return {
            ...pluginState,
            decorations: pluginState.decorations.map(tr.mapping, tr.doc),
          };
        }

        return pluginState;
      },
    },

    props: {
      decorations(state) {
        return this.getState(state)?.decorations ?? DecorationSet.empty;
      },
    },
  });
}
