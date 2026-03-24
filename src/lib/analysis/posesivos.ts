import type { AnalysisContext, AnalysisIssue } from "./types";

const POSESIVOS = new Set([
  "mi",
  "tu",
  "su",
  "mis",
  "tus",
  "sus",
  "nuestro",
  "nuestra",
  "nuestros",
  "nuestras",
  "vuestro",
  "vuestra",
  "vuestros",
  "vuestras",
  "mío",
  "mía",
  "míos",
  "mías",
  "tuyo",
  "tuya",
  "tuyos",
  "tuyas",
  "suyo",
  "suya",
  "suyos",
  "suyas",
]);

export function analyzePosesivos(context: AnalysisContext): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];
  const regex = /(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])([a-záéíóúñüA-ZÁÉÍÓÚÑÜ]+)(?![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(context.text)) !== null) {
    const word = match[1].toLowerCase();
    if (!POSESIVOS.has(word)) continue;

    issues.push({
      start: match.index,
      end: match.index + match[0].length,
      category: "posesivos",
      message: `Posesivo: "${match[0]}". ¿Es necesario o se sobreentiende?`,
      severity: "info",
      match: match[0],
    });
  }

  return issues;
}
