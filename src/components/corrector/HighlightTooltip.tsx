"use client";

import { useEffect, useRef, useState } from "react";

interface TooltipData {
  message: string;
  category: string;
  x: number;
  y: number;
}

export function HighlightTooltip() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("analysis-highlight")) {
        setTooltip(null);
        return;
      }

      const message = target.dataset.message;
      const category = target.dataset.category;
      if (!message || !category) return;

      const rect = target.getBoundingClientRect();
      setTooltip({
        message,
        category,
        x: rect.left + rect.width / 2,
        y: rect.top - 8,
      });
    }

    function handleMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.classList.contains("analysis-highlight")) {
        setTooltip(null);
      }
    }

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (!tooltip) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-50 max-w-xs -translate-x-1/2 -translate-y-full rounded-md bg-[var(--color-ink)] px-3 py-2 text-xs text-[var(--color-cream)] shadow-lg"
      style={{ left: tooltip.x, top: tooltip.y }}
    >
      {tooltip.message}
      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[var(--color-ink)]" />
    </div>
  );
}
