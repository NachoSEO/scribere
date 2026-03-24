"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
}

export function FAQSection({
  title = "Preguntas frecuentes",
  items,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-ink)]">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--color-border)] bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-[var(--color-ink)]"
              >
                {item.question}
                <span className="ml-4 text-[var(--color-ink-muted)]">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="border-t border-[var(--color-border)] px-6 py-4 text-sm leading-relaxed text-[var(--color-ink-light)]">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
