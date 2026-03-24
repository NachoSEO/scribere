import type { AnalysisContext, AnalysisIssue } from "./types";

// Single-word conjunctions
const CONJUNCIONES_SIMPLES = new Set([
  // Copulativas
  "y",
  "e",
  "ni",
  // Disyuntivas
  "o",
  "u",
  // Adversativas
  "pero",
  "sino",
  "aunque",
  "mas",
  // Causales
  "porque",
  "pues",
  // Condicionales
  "si",
  // Temporales
  "cuando",
  "mientras",
  "apenas",
  // Concesivas
  "aunque",
  // Consecutivas
  "luego",
  // Finales
  "que",
  // Comparativas
  "como",
]);

// Multi-word conjunctive expressions (locuciones conjuntivas)
const LOCUCIONES_CONJUNTIVAS = [
  "sin embargo",
  "no obstante",
  "por lo tanto",
  "por consiguiente",
  "en consecuencia",
  "a pesar de que",
  "a fin de que",
  "con tal de que",
  "ya que",
  "puesto que",
  "dado que",
  "debido a que",
  "a medida que",
  "con el fin de",
  "en caso de que",
  "siempre que",
  "siempre y cuando",
  "a menos que",
  "a no ser que",
  "por más que",
  "así que",
  "de modo que",
  "de manera que",
  "de forma que",
  "tal como",
  "así como",
  "tanto como",
  "al igual que",
  "por lo que",
  "es decir",
  "o sea",
  "en cambio",
  "por el contrario",
  "con todo",
  "aun así",
  "ahora bien",
  "más bien",
];

export function analyzeConjunciones(
  context: AnalysisContext
): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];
  const textLower = context.text.toLowerCase();

  // Match multi-word locuciones first
  for (const locucion of LOCUCIONES_CONJUNTIVAS) {
    const regex = new RegExp(`(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])${escapeRegex(locucion)}(?![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])`, "gi");
    let match: RegExpExecArray | null;
    while ((match = regex.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        category: "conjunciones",
        message: `Conjunción: "${match[0]}"`,
        severity: "info",
        match: match[0],
      });
    }
  }

  // Match single-word conjunctions
  const wordRegex = /(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])([a-záéíóúñüA-ZÁÉÍÓÚÑÜ]+)(?![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])/gi;
  let match: RegExpExecArray | null;
  while ((match = wordRegex.exec(context.text)) !== null) {
    const word = match[1].toLowerCase();
    if (!CONJUNCIONES_SIMPLES.has(word)) continue;

    // Skip if already covered by a multi-word locución
    const alreadyCovered = issues.some(
      (issue) =>
        match!.index >= issue.start && match!.index + match![0].length <= issue.end
    );
    if (alreadyCovered) continue;

    // "que" is very common and often not a conjunction — only flag if preceded by a verb pattern
    if (word === "que") continue;

    // "si" as conditional — skip "sí" (with accent, means yes)
    if (word === "si" && match[0] === "sí") continue;

    // "como" is often comparative, not conjunction — skip
    if (word === "como") continue;

    issues.push({
      start: match.index,
      end: match.index + match[0].length,
      category: "conjunciones",
      message: `Conjunción: "${match[0]}"`,
      severity: "info",
      match: match[0],
    });
  }

  return issues;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
