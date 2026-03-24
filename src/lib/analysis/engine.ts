import type {
  AnalysisContext,
  AnalysisIssue,
  AnalysisResult,
  Analyzer,
  CategoryId,
  ParagraphInfo,
  SentenceInfo,
  TextMetrics,
} from "./types";
import { analyzeAdverbiosMente } from "./adverbios-mente";
import { analyzeGerundios } from "./gerundios";
import { analyzeConjunciones } from "./conjunciones";
import { analyzePosesivos } from "./posesivos";
import { analyzeVerbosDebiles } from "./verbos-debiles";
import { analyzeFrasesLargas } from "./frases-largas";
import { analyzeReiteraciones } from "./reiteraciones";
import { analyzeVocativos } from "./vocativos";
import { analyzeDialogos } from "./dialogos";
import { analyzeParrafosCortos } from "./parrafos-cortos";

const analyzers: Record<CategoryId, Analyzer> = {
  "adverbios-mente": analyzeAdverbiosMente,
  gerundios: analyzeGerundios,
  conjunciones: analyzeConjunciones,
  posesivos: analyzePosesivos,
  "verbos-debiles": analyzeVerbosDebiles,
  "frases-largas": analyzeFrasesLargas,
  reiteraciones: analyzeReiteraciones,
  vocativos: analyzeVocativos,
  dialogos: analyzeDialogos,
  "parrafos-cortos": analyzeParrafosCortos,
};

function splitSentences(text: string): SentenceInfo[] {
  const sentences: SentenceInfo[] = [];
  // Match sentences ending with .!? or spanning to end of text
  const regex = /[^.!?¿¡]*[.!?]+|[^.!?¿¡]+$/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const trimmed = match[0].trim();
    if (trimmed.length === 0) continue;

    // Calculate actual start position (accounting for leading whitespace)
    const leadingSpaces = match[0].length - match[0].trimStart().length;
    const start = match.index + leadingSpaces;

    sentences.push({
      text: trimmed,
      start,
      end: start + trimmed.length,
      index: sentences.length,
    });
  }

  return sentences;
}

function splitParagraphs(
  text: string,
  sentences: SentenceInfo[]
): ParagraphInfo[] {
  const paragraphs: ParagraphInfo[] = [];
  const parts = text.split(/\n\s*\n/);
  let offset = 0;

  for (const part of parts) {
    // Find the actual start in the original text
    const idx = text.indexOf(part, offset);
    if (idx === -1) continue;

    const trimmed = part.trim();
    if (trimmed.length === 0) {
      offset = idx + part.length;
      continue;
    }

    const leadingSpaces = part.length - part.trimStart().length;
    const pStart = idx + leadingSpaces;
    const pEnd = pStart + trimmed.length;

    const paraSentences = sentences.filter(
      (s) => s.start >= pStart && s.end <= pEnd
    );

    paragraphs.push({
      text: trimmed,
      start: pStart,
      end: pEnd,
      index: paragraphs.length,
      sentences: paraSentences,
    });

    offset = idx + part.length;
  }

  return paragraphs;
}

function computeMetrics(
  text: string,
  sentences: SentenceInfo[],
  paragraphs: ParagraphInfo[]
): TextMetrics {
  const words = text
    .match(/[a-záéíóúñüA-ZÁÉÍÓÚÑÜ]+/g)?.length ?? 0;

  return {
    words,
    characters: text.length,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    pages: Math.round((words / 350) * 10) / 10,
    readingTimeMinutes: Math.max(1, Math.ceil(words / 220)),
  };
}

export function runFullAnalysis(text: string): {
  issuesByCategory: Map<CategoryId, AnalysisIssue[]>;
  metrics: TextMetrics;
} {
  const issuesByCategory = new Map<CategoryId, AnalysisIssue[]>();
  if (!text.trim()) {
    return {
      issuesByCategory,
      metrics: { words: 0, characters: 0, sentences: 0, paragraphs: 0, pages: 0, readingTimeMinutes: 0 },
    };
  }

  const sentences = splitSentences(text);
  const paragraphs = splitParagraphs(text, sentences);
  const context: AnalysisContext = { text, sentences, paragraphs };
  const metrics = computeMetrics(text, sentences, paragraphs);

  for (const [categoryId, analyzer] of Object.entries(analyzers)) {
    try {
      const issues = analyzer(context);
      issuesByCategory.set(categoryId as CategoryId, issues);
    } catch (err) {
      console.error(`Analyzer ${categoryId} failed:`, err);
    }
  }

  return { issuesByCategory, metrics };
}

export function runAnalysis(
  text: string,
  enabledCategories: Set<CategoryId>
): AnalysisResult {
  if (!text.trim()) {
    return {
      issues: [],
      metrics: {
        words: 0,
        characters: 0,
        sentences: 0,
        paragraphs: 0,
        pages: 0,
        readingTimeMinutes: 0,
      },
    };
  }

  const sentences = splitSentences(text);
  const paragraphs = splitParagraphs(text, sentences);
  const context: AnalysisContext = { text, sentences, paragraphs };
  const metrics = computeMetrics(text, sentences, paragraphs);

  const issues: AnalysisIssue[] = [];

  for (const categoryId of enabledCategories) {
    const analyzer = analyzers[categoryId];
    if (analyzer) {
      try {
        const categoryIssues = analyzer(context);
        issues.push(...categoryIssues);
      } catch (err) {
        console.error(`Analyzer ${categoryId} failed:`, err);
      }
    }
  }

  return { issues, metrics };
}
