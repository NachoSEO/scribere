import type { AnalysisContext, AnalysisIssue, Severity } from "./types";

function countWords(text: string): number {
  return (text.match(/[a-záéíóúñüA-ZÁÉÍÓÚÑÜ]+/g) ?? []).length;
}

export function analyzeFrasesLargas(context: AnalysisContext): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];

  for (const sentence of context.sentences) {
    const wordCount = countWords(sentence.text);

    if (wordCount <= 40) continue;

    const severity: Severity = "error";
    const message = `Frase larga (${wordCount} palabras). Considera dividirla.`;

    issues.push({
      start: sentence.start,
      end: sentence.end,
      category: "frases-largas",
      message,
      severity,
      match: sentence.text,
      meta: { wordCount },
    });
  }

  return issues;
}
