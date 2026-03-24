export type Severity = "info" | "warning" | "error";

export interface AnalysisIssue {
  /** Character offset in plain text — start */
  start: number;
  /** Character offset in plain text — end */
  end: number;
  /** Category identifier */
  category: CategoryId;
  /** Human-readable message */
  message: string;
  /** Severity level */
  severity: Severity;
  /** The matched text */
  match: string;
  /** Optional sub-category / extra data */
  meta?: Record<string, unknown>;
}

export type CategoryId =
  | "adverbios-mente"
  | "gerundios"
  | "conjunciones"
  | "posesivos"
  | "verbos-debiles"
  | "frases-largas"
  | "reiteraciones"
  | "vocativos"
  | "dialogos"
  | "parrafos-cortos";

export interface CategoryConfig {
  id: CategoryId;
  label: string;
  description: string;
  color: string;
  highlightClass: string;
  defaultEnabled: boolean;
}

export interface AnalysisResult {
  issues: AnalysisIssue[];
  metrics: TextMetrics;
}

export interface TextMetrics {
  words: number;
  characters: number;
  sentences: number;
  paragraphs: number;
  pages: number;
  readingTimeMinutes: number;
}

export interface SentenceInfo {
  text: string;
  start: number;
  end: number;
  index: number;
}

export interface ParagraphInfo {
  text: string;
  start: number;
  end: number;
  index: number;
  sentences: SentenceInfo[];
}

export interface AnalysisContext {
  text: string;
  sentences: SentenceInfo[];
  paragraphs: ParagraphInfo[];
}

export type Analyzer = (context: AnalysisContext) => AnalysisIssue[];

export const CATEGORIES: CategoryConfig[] = [
  {
    id: "adverbios-mente",
    label: "Adverbios en -mente",
    description: "Adverbios terminados en -mente que pueden debilitar la prosa",
    color: "#c4a45f",
    highlightClass: "highlight-adverbios",
    defaultEnabled: true,
  },
  {
    id: "gerundios",
    label: "Gerundios",
    description: "Uso excesivo de gerundios (-ando, -endo, -iendo)",
    color: "#cc853d",
    highlightClass: "highlight-gerundios",
    defaultEnabled: true,
  },
  {
    id: "conjunciones",
    label: "Conjunciones",
    description: "Densidad de conjunciones coordinantes y subordinantes",
    color: "#93709e",
    highlightClass: "highlight-conjunciones",
    defaultEnabled: false,
  },
  {
    id: "posesivos",
    label: "Posesivos",
    description: "Pronombres y adjetivos posesivos",
    color: "#589b9b",
    highlightClass: "highlight-posesivos",
    defaultEnabled: false,
  },
  {
    id: "verbos-debiles",
    label: "Verbos débiles",
    description: "Formas conjugadas de ser, estar, decir, hacer, haber",
    color: "#bd5749",
    highlightClass: "highlight-verbos-debiles",
    defaultEnabled: true,
  },
  {
    id: "frases-largas",
    label: "Frases largas",
    description: "Frases que superan las 20 palabras",
    color: "#78a064",
    highlightClass: "highlight-frases-largas",
    defaultEnabled: true,
  },
  {
    id: "reiteraciones",
    label: "Reiteraciones",
    description: "Palabras repetidas en frases cercanas",
    color: "#af556e",
    highlightClass: "highlight-reiteraciones",
    defaultEnabled: true,
  },
  {
    id: "vocativos",
    label: "Comas de vocativo",
    description: "Falta de coma antes de vocativos",
    color: "#55699b",
    highlightClass: "highlight-vocativos",
    defaultEnabled: false,
  },
  {
    id: "dialogos",
    label: "Guiones de diálogo",
    description: "Uso correcto de la raya según la RAE",
    color: "#8c6e55",
    highlightClass: "highlight-dialogos",
    defaultEnabled: false,
  },
  {
    id: "parrafos-cortos",
    label: "Párrafos cortos",
    description: "Párrafos con solo 1-2 frases",
    color: "#9e9590",
    highlightClass: "highlight-parrafos-cortos",
    defaultEnabled: false,
  },
];
