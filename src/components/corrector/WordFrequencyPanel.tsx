"use client";

import { Fragment, useMemo, useState } from "react";
import { useCorrectorStore } from "@/lib/store";

const STOP_WORDS = new Set([
  // Artículos
  "el", "la", "los", "las", "un", "una", "unos", "unas",
  // Preposiciones
  "a", "al", "ante", "bajo", "con", "contra", "de", "del", "desde",
  "en", "entre", "hacia", "hasta", "para", "por", "sin", "sobre", "tras",
  // Conjunciones
  "y", "e", "o", "u", "pero", "sino", "aunque", "ni", "que", "si",
  "como", "porque", "cuando", "donde",
  // Pronombres
  "me", "te", "se", "nos", "os", "le", "les", "lo",
  "yo", "tú", "él", "ella", "nosotros", "nosotras", "ellos", "ellas",
  "mi", "tu", "su", "mis", "tus", "sus",
  "este", "esta", "estos", "estas", "ese", "esa", "esos", "esas",
  "aquel", "aquella", "aquellos", "aquellas",
  // Verbos auxiliares comunes
  "es", "son", "está", "están", "ser", "estar", "hay", "fue", "fueron",
  "era", "eran", "sea", "sean", "ha", "han", "he", "hemos", "había", "habían",
  // Adverbios muy comunes
  "no", "sí", "muy", "más", "menos", "ya", "aún", "también", "tampoco",
  "todo", "toda", "todos", "todas", "otro", "otra", "otros", "otras",
  "mucho", "mucha", "muchos", "muchas", "poco", "poca", "pocos", "pocas",
  // Números
  "uno", "dos", "tres", "cuatro", "cinco",
]);

export function WordFrequencyPanel() {
  const wordFrequency = useCorrectorStore((s) => s.wordFrequency);
  const metrics = useCorrectorStore((s) => s.metrics);
  const [search, setSearch] = useState("");
  const [expandedWord, setExpandedWord] = useState<string | null>(null);
  const [hideStopWords, setHideStopWords] = useState(true);

  const filtered = useMemo(() => {
    let result = wordFrequency;
    if (hideStopWords) {
      result = result.filter((w) => !STOP_WORDS.has(w.word));
    }
    if (search) {
      const term = search.toLowerCase();
      result = result.filter((w) => w.word.includes(term));
    }
    return result;
  }, [wordFrequency, search, hideStopWords]);

  function exportCSV() {
    if (filtered.length === 0) return;
    let csv = "Palabra,Frecuencia,Porcentaje,Frase de ejemplo\n";
    for (const entry of filtered) {
      const phrase = (entry.phrases[0] ?? "").replace(/"/g, '""');
      csv += `"${entry.word}",${entry.count},${entry.percentage.toFixed(2)}%,"${phrase}"\n`;
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "frecuencia_palabras.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function highlightWord(text: string, word: string): string {
    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    return text.replace(regex, '<span class="freq-highlight">$1</span>');
  }

  if (wordFrequency.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-xs text-[var(--color-ink-muted)]">
        Escribe algo para ver la frecuencia
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Controls */}
      <div className="space-y-2 border-b border-[var(--color-border-light)] px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[var(--color-ink-muted)]">
            {filtered.length} de {metrics.uniqueWords} únicas
          </span>
          <button
            onClick={exportCSV}
            className="text-[10px] font-medium text-[var(--color-accent)] hover:underline"
          >
            CSV
          </button>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar palabra..."
          className="w-full rounded-md border border-[var(--color-border)] bg-white px-2.5 py-1.5 text-xs text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none"
        />
        <label className="flex cursor-pointer items-center gap-2">
          <button
            onClick={() => setHideStopWords(!hideStopWords)}
            className={`relative h-4 w-7 rounded-full transition-colors ${
              hideStopWords ? "bg-[var(--color-accent)]" : "bg-[var(--color-parchment)]"
            }`}
          >
            <div
              className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${
                hideStopWords ? "left-[14px]" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-[10px] text-[var(--color-ink-light)]">
            Solo palabras importantes
          </span>
        </label>
      </div>

      {/* Word list */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {filtered.slice(0, 150).map((entry) => {
          const isExpanded = expandedWord === entry.word;
          return (
            <Fragment key={entry.word}>
              <button
                onClick={() => setExpandedWord(isExpanded ? null : entry.word)}
                className="flex w-full items-center gap-2 border-b border-[var(--color-border-light)] px-3 py-2 text-left transition-colors hover:bg-white"
              >
                <span
                  className="text-[9px] text-[var(--color-ink-muted)] transition-transform"
                  style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0)" }}
                >
                  &#9654;
                </span>
                <span className="flex-1 truncate text-xs font-medium text-[var(--color-accent-dark)]">
                  {entry.word}
                </span>
                <span className="text-xs font-semibold tabular-nums text-[var(--color-ink)]">
                  {entry.count}
                </span>
                <span className="w-12 text-right text-[10px] tabular-nums text-[var(--color-ink-muted)]">
                  {entry.percentage.toFixed(1)}%
                </span>
              </button>
              {isExpanded && (
                <div className="border-b border-[var(--color-border-light)] bg-white px-3 py-2">
                  <p className="mb-1.5 text-[10px] font-semibold text-[var(--color-accent)]">
                    Frases con &ldquo;{entry.word}&rdquo; ({entry.phrases.length}):
                  </p>
                  <div className="space-y-1">
                    {entry.phrases.slice(0, 5).map((phrase, idx) => (
                      <div
                        key={idx}
                        className="rounded bg-[var(--color-cream)] px-2 py-1.5 text-[10px] leading-relaxed text-[var(--color-ink-light)]"
                        dangerouslySetInnerHTML={{
                          __html: highlightWord(phrase, entry.word),
                        }}
                      />
                    ))}
                    {entry.phrases.length > 5 && (
                      <p className="text-[10px] text-[var(--color-ink-muted)]">
                        +{entry.phrases.length - 5} más
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
        {filtered.length > 150 && (
          <div className="px-3 py-2 text-center text-[10px] text-[var(--color-ink-muted)]">
            Mostrando 150 de {filtered.length}
          </div>
        )}
      </div>
    </div>
  );
}
