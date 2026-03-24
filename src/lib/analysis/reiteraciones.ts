import type { AnalysisContext, AnalysisIssue } from "./types";

// Spanish stop words to exclude from repetition analysis
const STOP_WORDS = new Set([
  "el", "la", "los", "las", "un", "una", "unos", "unas",
  "de", "del", "a", "al", "en", "con", "por", "para", "sin", "sobre",
  "entre", "hasta", "desde", "hacia",
  "y", "e", "o", "u", "pero", "sino", "aunque", "ni", "que", "si",
  "como", "porque", "cuando", "donde",
  "es", "son", "está", "están", "ser", "estar", "hay", "fue", "fueron",
  "era", "eran", "sea", "sean",
  "he", "ha", "han", "hemos", "había", "habían",
  "muy", "más", "menos", "mucho", "mucha", "muchos", "muchas",
  "poco", "poca", "pocos", "pocas",
  "todo", "toda", "todos", "todas", "otro", "otra", "otros", "otras",
  "este", "esta", "estos", "estas", "ese", "esa", "esos", "esas",
  "aquel", "aquella", "aquellos", "aquellas",
  "me", "te", "se", "nos", "os", "le", "les", "lo",
  "mi", "tu", "su", "mis", "tus", "sus", "nuestro", "nuestra",
  "yo", "tú", "él", "ella", "nosotros", "nosotras", "ellos", "ellas",
  "no", "sí", "también", "tampoco", "ya", "aún", "todavía",
  "uno", "dos", "tres", "cuatro", "cinco",
]);

const MIN_WORD_LENGTH = 4;
const PROXIMITY_RANGE = 2; // sentences

export function analyzeReiteraciones(
  context: AnalysisContext
): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];
  const { sentences, text } = context;

  // Build word → sentence occurrences map
  interface WordOccurrence {
    word: string;
    sentenceIndex: number;
    start: number;
    end: number;
  }

  const occurrences: WordOccurrence[] = [];

  for (const sentence of sentences) {
    // Use a regex that doesn't rely on \b for accented characters
    const regex = /(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])([a-záéíóúñüA-ZÁÉÍÓÚÑÜ]+)(?![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(sentence.text)) !== null) {
      const word = match[1].toLowerCase();
      if (word.length < MIN_WORD_LENGTH) continue;
      if (STOP_WORDS.has(word)) continue;

      occurrences.push({
        word,
        sentenceIndex: sentence.index,
        start: sentence.start + match.index,
        end: sentence.start + match.index + match[0].length,
      });
    }
  }

  // Find words that repeat within PROXIMITY_RANGE sentences
  const reported = new Set<string>(); // "word-sentIdx1-sentIdx2"

  for (let i = 0; i < occurrences.length; i++) {
    for (let j = i + 1; j < occurrences.length; j++) {
      const a = occurrences[i];
      const b = occurrences[j];
      if (a.word !== b.word) continue;
      if (a.sentenceIndex === b.sentenceIndex) continue;

      const distance = Math.abs(a.sentenceIndex - b.sentenceIndex);
      if (distance > PROXIMITY_RANGE) continue;

      // Report each occurrence once per pair
      const key = `${a.word}-${Math.min(a.sentenceIndex, b.sentenceIndex)}-${Math.max(a.sentenceIndex, b.sentenceIndex)}`;
      if (reported.has(key)) continue;
      reported.add(key);

      // Mark first occurrence
      issues.push({
        start: a.start,
        end: a.end,
        category: "reiteraciones",
        message: `"${a.word}" se repite en frases cercanas (${distance === 1 ? "consecutivas" : `a ${distance} frases`}).`,
        severity: "warning",
        match: text.slice(a.start, a.end),
        meta: { distance, pairedWith: { start: b.start, end: b.end } },
      });

      // Mark second occurrence
      issues.push({
        start: b.start,
        end: b.end,
        category: "reiteraciones",
        message: `"${b.word}" se repite en frases cercanas (${distance === 1 ? "consecutivas" : `a ${distance} frases`}).`,
        severity: "warning",
        match: text.slice(b.start, b.end),
        meta: { distance, pairedWith: { start: a.start, end: a.end } },
      });
    }
  }

  return issues;
}
