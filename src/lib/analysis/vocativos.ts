import type { AnalysisContext, AnalysisIssue } from "./types";

// Common greetings and interjections that should be followed by comma + name
const GREETING_WORDS = [
  "hola",
  "adiós",
  "buenos días",
  "buenas tardes",
  "buenas noches",
  "oye",
  "oiga",
  "mira",
  "mire",
  "escucha",
  "escuche",
  "ven",
  "venga",
  "perdona",
  "perdone",
  "disculpa",
  "disculpe",
  "gracias",
  "por favor",
];

export function analyzeVocativos(context: AnalysisContext): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];

  // Pattern 1: Greeting/interjection + capitalized word without comma
  // e.g., "Hola María" should be "Hola, María"
  for (const greeting of GREETING_WORDS) {
    const pattern = new RegExp(
      `(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])(${escapeRegex(greeting)})\\s+([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+)`,
      "gi"
    );
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(context.text)) !== null) {
      const fullMatch = match[0];
      const greetingPart = match[1];

      // Check if there's already a comma between greeting and name
      const textBetween = fullMatch.slice(greetingPart.length);
      if (textBetween.includes(",")) continue;

      issues.push({
        start: match.index,
        end: match.index + fullMatch.length,
        category: "vocativos",
        message: `Falta coma de vocativo: "${greetingPart}, ${match[2]}"`,
        severity: "info",
        match: fullMatch,
      });
    }
  }

  // Pattern 2: Imperative sentence ending with name without comma
  // e.g., "Escúchame Juan" → "Escúchame, Juan"
  const imperativePattern =
    /(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])([a-záéíóúñüA-ZÁÉÍÓÚÑÜ]+(?:me|te|le|nos|les|lo|la|los|las)?)\s+([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+)\s*[.!?]/g;
  let match: RegExpExecArray | null;
  while ((match = imperativePattern.exec(context.text)) !== null) {
    const verb = match[1].toLowerCase();
    // Only flag if it looks like an imperative (ends in -a, -e, or has pronoun attached)
    if (
      verb.endsWith("me") ||
      verb.endsWith("te") ||
      verb.endsWith("le") ||
      verb.endsWith("nos")
    ) {
      const textBetween = match[0].slice(match[1].length);
      if (textBetween.includes(",")) continue;

      issues.push({
        start: match.index,
        end: match.index + match[0].length - 1, // exclude punctuation
        category: "vocativos",
        message: `Posible vocativo sin coma: "${match[1]}, ${match[2]}"`,
        severity: "info",
        match: match[0],
      });
    }
  }

  return issues;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
