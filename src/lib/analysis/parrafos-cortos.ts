import type { AnalysisContext, AnalysisIssue } from "./types";

export function analyzeParrafosCortos(
  context: AnalysisContext
): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];

  for (const para of context.paragraphs) {
    if (para.sentences.length <= 2 && para.sentences.length > 0) {
      issues.push({
        start: para.start,
        end: para.end,
        category: "parrafos-cortos",
        message: `Párrafo corto (${para.sentences.length} ${para.sentences.length === 1 ? "frase" : "frases"}). Considera expandirlo o unirlo con otro.`,
        severity: "info",
        match: para.text,
        meta: { sentenceCount: para.sentences.length },
      });
    }
  }

  return issues;
}
