import type { AnalysisContext, AnalysisIssue } from "./types";

// Words ending in -ando/-endo/-iendo that are NOT gerunds
const FALSE_POSITIVES = new Set([
  "cuando",
  "bando",
  "mando",
  "comando",
  "orlando",
  "fernando",
  "armando",
  "rolando",
  "hernando",
  "facundo",
  "segundo",
  "tremendo",
  "estupendo",
  "horrendo",
  "reverendo",
  "dividendo",
  "haciendo",
  "vivienda",
  "leyenda",
  "merienda",
  "hacienda",
  "ofrenda",
  "molienda",
  "encomienda",
  "contienda",
  "tienda",
  "rienda",
  "riendo",
  "siendo",
  "viendo",
  "yendo",
  "pudiendo",
  "trayendo",
  "cayendo",
  "leyendo",
  "oyendo",
  "creyendo",
  "operando",
  "memorando",
  "sumando",
  "demando",
  "blando",
  "grande",
]);

export function analyzeGerundios(context: AnalysisContext): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];
  const regex = /(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])[a-záéíóúñüA-ZÁÉÍÓÚÑÜ]+(ando|endo|iendo)(?![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(context.text)) !== null) {
    const word = match[0].toLowerCase();
    if (FALSE_POSITIVES.has(word)) continue;
    if (word.length < 5) continue;

    issues.push({
      start: match.index,
      end: match.index + match[0].length,
      category: "gerundios",
      message: `Gerundio: "${match[0]}". Revisa si es necesario.`,
      severity: "info",
      match: match[0],
    });
  }

  return issues;
}
