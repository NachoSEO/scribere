import { create } from "zustand";
import type {
  AnalysisIssue,
  CategoryId,
  TextMetrics,
} from "./analysis/types";
import { CATEGORIES } from "./analysis/types";
import { runAnalysis, runFullAnalysis } from "./analysis/engine";

type EnabledMap = Record<CategoryId, boolean>;

const defaultEnabled: EnabledMap = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, false])
) as EnabledMap;

export interface WordFreqEntry {
  word: string;
  count: number;
  percentage: number;
  phrases: string[];
}

interface CorrectorState {
  text: string;
  setText: (text: string) => void;

  issues: AnalysisIssue[];
  metrics: TextMetrics & { uniqueWords: number };

  // Word frequency data
  wordFrequency: WordFreqEntry[];

  enabledCategories: EnabledMap;
  toggleCategory: (id: CategoryId) => void;

  focusedCategory: CategoryId | null;
  setFocusedCategory: (id: CategoryId | null) => void;

  analyze: () => void;
  analyzeWithAutoEnable: () => void;

  selectedIssueIndex: number | null;
  setSelectedIssueIndex: (index: number | null) => void;
}

function getEnabledSet(map: EnabledMap): Set<CategoryId> {
  const set = new Set<CategoryId>();
  for (const [key, value] of Object.entries(map)) {
    if (value) set.add(key as CategoryId);
  }
  return set;
}

function computeWordFrequency(text: string): WordFreqEntry[] {
  if (!text.trim()) return [];

  const sentences = text.match(/[^.!?¿¡]+[.!?]+|[^.!?¿¡]+$/g) ?? [text];
  const cleanSentences = sentences.map((s) => s.trim()).filter((s) => s.length > 0);
  const wordData: Record<string, { count: number; phrases: Set<string> }> = {};
  let totalWords = 0;

  for (const sentence of cleanSentences) {
    const words = sentence.toLowerCase().match(/[a-záéíóúñü]+/gi) ?? [];
    for (const word of words) {
      if (!word) continue;
      totalWords++;
      if (!Object.prototype.hasOwnProperty.call(wordData, word)) {
        wordData[word] = { count: 0, phrases: new Set<string>() };
      }
      wordData[word].count++;
      wordData[word].phrases.add(sentence);
    }
  }

  if (totalWords === 0) return [];

  return Object.entries(wordData)
    .map(([word, data]) => ({
      word,
      count: data.count,
      percentage: (data.count / totalWords) * 100,
      phrases: Array.from(data.phrases),
    }))
    .sort((a, b) => b.count - a.count);
}

export const useCorrectorStore = create<CorrectorState>((set, get) => ({
  text: "",
  setText: (text) => set({ text }),

  issues: [],
  metrics: {
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    pages: 0,
    readingTimeMinutes: 0,
    uniqueWords: 0,
  },

  wordFrequency: [],

  enabledCategories: defaultEnabled,
  toggleCategory: (id) => {
    const current = get().enabledCategories;
    const next = { ...current, [id]: !current[id] };
    set({ enabledCategories: next });
    setTimeout(() => get().analyze(), 0);
  },

  focusedCategory: null,
  setFocusedCategory: (id) => set({ focusedCategory: id }),

  analyze: () => {
    const { text, enabledCategories } = get();
    const enabledSet = getEnabledSet(enabledCategories);
    const { issues, metrics } = runAnalysis(text, enabledSet);
    const wordFrequency = computeWordFrequency(text);
    set({
      issues,
      metrics: { ...metrics, uniqueWords: wordFrequency.length },
      wordFrequency,
    });
  },

  analyzeWithAutoEnable: () => {
    const { text } = get();
    const { issuesByCategory, metrics } = runFullAnalysis(text);
    const newEnabled = { ...defaultEnabled };
    const allIssues: AnalysisIssue[] = [];

    for (const cat of CATEGORIES) {
      const catIssues = issuesByCategory.get(cat.id) ?? [];
      newEnabled[cat.id] = catIssues.length > 0;
      if (catIssues.length > 0) allIssues.push(...catIssues);
    }

    const wordFrequency = computeWordFrequency(text);
    set({
      enabledCategories: newEnabled,
      issues: allIssues,
      metrics: { ...metrics, uniqueWords: wordFrequency.length },
      wordFrequency,
    });
  },

  selectedIssueIndex: null,
  setSelectedIssueIndex: (index) => set({ selectedIssueIndex: index }),
}));
