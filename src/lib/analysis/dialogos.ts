import type { AnalysisContext, AnalysisIssue } from "./types";

// RAE dialogue rules:
// 1. Use em dash (—) not hyphen (-) or en dash (–) for dialogue
// 2. No space after opening em dash
// 3. Lowercase after attribution verb (—dijo él—)
// 4. Closing em dash before period

export function analyzeDialogos(context: AnalysisContext): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];
  const { text } = context;

  // Rule 1: Lines starting with hyphen (-) instead of em dash (—)
  const hyphenDialogue = /^[ \t]*-\s/gm;
  let match: RegExpExecArray | null;
  while ((match = hyphenDialogue.exec(text)) !== null) {
    // Check it's at line start (not a list item in middle of prose)
    issues.push({
      start: match.index,
      end: match.index + match[0].length,
      category: "dialogos",
      message: "Usa raya (—) en lugar de guión (-) para diálogos.",
      severity: "warning",
      match: match[0],
    });
  }

  // Rule 1b: En dash (–) instead of em dash
  const enDashDialogue = /^[ \t]*–\s/gm;
  while ((match = enDashDialogue.exec(text)) !== null) {
    issues.push({
      start: match.index,
      end: match.index + match[0].length,
      category: "dialogos",
      message: "Usa raya (—) en lugar de semirraya (–) para diálogos.",
      severity: "warning",
      match: match[0],
    });
  }

  // Rule 2: Space after opening em dash
  const spaceAfterDash = /—\s{2,}/g;
  while ((match = spaceAfterDash.exec(text)) !== null) {
    issues.push({
      start: match.index,
      end: match.index + match[0].length,
      category: "dialogos",
      message:
        "No dejar espacio extra después de la raya de diálogo.",
      severity: "info",
      match: match[0],
    });
  }

  // Rule 3: Attribution verb after em dash should be lowercase
  // Pattern: — + Uppercase word that is an attribution verb
  const ATTRIBUTION_VERBS = [
    "Dijo",
    "Exclamó",
    "Preguntó",
    "Respondió",
    "Contestó",
    "Gritó",
    "Susurró",
    "Murmuró",
    "Añadió",
    "Comentó",
    "Explicó",
    "Señaló",
    "Indicó",
    "Afirmó",
    "Negó",
    "Repitió",
    "Insistió",
    "Replicó",
    "Objetó",
    "Interrumpió",
  ];
  for (const verb of ATTRIBUTION_VERBS) {
    const pattern = new RegExp(`—\\s*${verb}(?![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])`, "g");
    while ((match = pattern.exec(text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        category: "dialogos",
        message: `El verbo de atribución debe ir en minúscula: "${verb.toLowerCase()}"`,
        severity: "warning",
        match: match[0],
      });
    }
  }

  return issues;
}
