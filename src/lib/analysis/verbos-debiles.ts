import type { AnalysisContext, AnalysisIssue } from "./types";

// All common conjugated forms of ser, estar, decir, hacer, haber
const VERBOS_DEBILES = new Set([
  // SER
  "soy", "eres", "es", "somos", "sois", "son",
  "era", "eras", "éramos", "erais", "eran",
  "fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron",
  "seré", "serás", "será", "seremos", "seréis", "serán",
  "sería", "serías", "seríamos", "seríais", "serían",
  "sea", "seas", "seamos", "seáis", "sean",
  "fuera", "fueras", "fuéramos", "fuerais", "fueran",
  "fuese", "fueses", "fuésemos", "fueseis", "fuesen",
  "sido", "ser",

  // ESTAR
  "estoy", "estás", "está", "estamos", "estáis", "están",
  "estaba", "estabas", "estábamos", "estabais", "estaban",
  "estuve", "estuviste", "estuvo", "estuvimos", "estuvisteis", "estuvieron",
  "estaré", "estarás", "estará", "estaremos", "estaréis", "estarán",
  "estaría", "estarías", "estaríamos", "estaríais", "estarían",
  "esté", "estés", "estemos", "estéis", "estén",
  "estuviera", "estuvieras", "estuviéramos", "estuvierais", "estuvieran",
  "estuviese", "estuvieses", "estuviésemos", "estuvieseis", "estuviesen",
  "estado", "estar",

  // DECIR
  "digo", "dices", "dice", "decimos", "decís", "dicen",
  "decía", "decías", "decíamos", "decíais", "decían",
  "dije", "dijiste", "dijo", "dijimos", "dijisteis", "dijeron",
  "diré", "dirás", "dirá", "diremos", "diréis", "dirán",
  "diría", "dirías", "diríamos", "diríais", "dirían",
  "diga", "digas", "digamos", "digáis", "digan",
  "dijera", "dijeras", "dijéramos", "dijerais", "dijeran",
  "dijese", "dijeses", "dijésemos", "dijeseis", "dijesen",
  "dicho", "decir",

  // HACER
  "hago", "haces", "hace", "hacemos", "hacéis", "hacen",
  "hacía", "hacías", "hacíamos", "hacíais", "hacían",
  "hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron",
  "haré", "harás", "hará", "haremos", "haréis", "harán",
  "haría", "harías", "haríamos", "haríais", "harían",
  "haga", "hagas", "hagamos", "hagáis", "hagan",
  "hiciera", "hicieras", "hiciéramos", "hicierais", "hicieran",
  "hiciese", "hicieses", "hiciésemos", "hicieseis", "hiciesen",
  "hecho", "hacer",

  // HABER (auxiliary)
  "he", "has", "ha", "hemos", "habéis", "han",
  "había", "habías", "habíamos", "habíais", "habían",
  "hube", "hubiste", "hubo", "hubimos", "hubisteis", "hubieron",
  "habré", "habrás", "habrá", "habremos", "habréis", "habrán",
  "habría", "habrías", "habríamos", "habríais", "habrían",
  "haya", "hayas", "hayamos", "hayáis", "hayan",
  "hubiera", "hubieras", "hubiéramos", "hubierais", "hubieran",
  "hubiese", "hubieses", "hubiésemos", "hubieseis", "hubiesen",
  "habido", "haber", "hay",
]);

// Short words like "es", "ha", "he" at start of sentence might be too noisy.
// We keep them but with a lower severity approach.
const SHORT_FORMS = new Set(["es", "ha", "he", "son", "fue"]);

export function analyzeVerbosDebiles(
  context: AnalysisContext
): AnalysisIssue[] {
  const issues: AnalysisIssue[] = [];
  const regex = /(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])([a-záéíóúñüA-ZÁÉÍÓÚÑÜ]+)(?![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(context.text)) !== null) {
    const word = match[1].toLowerCase();
    if (!VERBOS_DEBILES.has(word)) continue;

    const isShort = SHORT_FORMS.has(word);
    const verbName = getVerbName(word);

    issues.push({
      start: match.index,
      end: match.index + match[0].length,
      category: "verbos-debiles",
      message: `Verbo débil (${verbName}): "${match[0]}". Busca un verbo más preciso.`,
      severity: isShort ? "info" : "warning",
      match: match[0],
      meta: { verb: verbName },
    });
  }

  return issues;
}

function getVerbName(word: string): string {
  const serForms = new Set(["soy", "eres", "es", "somos", "sois", "son", "era", "eras", "éramos", "erais", "eran", "fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron", "seré", "serás", "será", "seremos", "seréis", "serán", "sería", "serías", "seríamos", "seríais", "serían", "sea", "seas", "seamos", "seáis", "sean", "fuera", "fueras", "fuéramos", "fuerais", "fueran", "fuese", "fueses", "fuésemos", "fueseis", "fuesen", "sido", "ser"]);
  const estarForms = new Set(["estoy", "estás", "está", "estamos", "estáis", "están", "estaba", "estabas", "estábamos", "estabais", "estaban", "estuve", "estuviste", "estuvo", "estuvimos", "estuvisteis", "estuvieron", "estaré", "estarás", "estará", "estaremos", "estaréis", "estarán", "estaría", "estarías", "estaríamos", "estaríais", "estarían", "esté", "estés", "estemos", "estéis", "estén", "estuviera", "estuvieras", "estuviéramos", "estuvierais", "estuvieran", "estuviese", "estuvieses", "estuviésemos", "estuvieseis", "estuviesen", "estado", "estar"]);
  const decirForms = new Set(["digo", "dices", "dice", "decimos", "decís", "dicen", "decía", "decías", "decíamos", "decíais", "decían", "dije", "dijiste", "dijo", "dijimos", "dijisteis", "dijeron", "diré", "dirás", "dirá", "diremos", "diréis", "dirán", "diría", "dirías", "diríamos", "diríais", "dirían", "diga", "digas", "digamos", "digáis", "digan", "dijera", "dijeras", "dijéramos", "dijerais", "dijeran", "dijese", "dijeses", "dijésemos", "dijeseis", "dijesen", "dicho", "decir"]);
  const hacerForms = new Set(["hago", "haces", "hace", "hacemos", "hacéis", "hacen", "hacía", "hacías", "hacíamos", "hacíais", "hacían", "hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron", "haré", "harás", "hará", "haremos", "haréis", "harán", "haría", "harías", "haríamos", "haríais", "harían", "haga", "hagas", "hagamos", "hagáis", "hagan", "hiciera", "hicieras", "hiciéramos", "hicierais", "hicieran", "hiciese", "hicieses", "hiciésemos", "hicieseis", "hiciesen", "hecho", "hacer"]);

  if (serForms.has(word)) return "ser";
  if (estarForms.has(word)) return "estar";
  if (decirForms.has(word)) return "decir";
  if (hacerForms.has(word)) return "hacer";
  return "haber";
}
