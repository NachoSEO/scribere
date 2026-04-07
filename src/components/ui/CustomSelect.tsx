"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  searchable?: boolean;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Seleccionar...",
  className = "",
  searchable,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const showSearch = searchable ?? options.length > 5;

  const filtered = useMemo(() => {
    if (!search) return options;
    const term = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(term));
  }, [options, search]);

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label,
    [options, value],
  );

  // Reset state when opening/closing
  useEffect(() => {
    if (open) {
      setSearch("");
      const idx = filtered.findIndex((o) => o.value === value);
      setHighlightIndex(idx >= 0 ? idx : 0);
      // Focus search input after dropdown renders
      requestAnimationFrame(() => {
        if (showSearch && searchInputRef.current) {
          searchInputRef.current.focus();
        }
      });
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll highlighted item into view
  useEffect(() => {
    if (!open || highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-option]");
    items[highlightIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const select = useCallback(
    (val: string) => {
      onChange(val);
      setOpen(false);
      // Return focus to trigger
      requestAnimationFrame(() => triggerRef.current?.focus());
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
          return;
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev < filtered.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev > 0 ? prev - 1 : filtered.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightIndex >= 0 && highlightIndex < filtered.length) {
            select(filtered[highlightIndex].value);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          requestAnimationFrame(() => triggerRef.current?.focus());
          break;
      }
    },
    [open, filtered, highlightIndex, select],
  );

  // When search changes, reset highlight
  useEffect(() => {
    setHighlightIndex(filtered.length > 0 ? 0 : -1);
  }, [search, filtered.length]);

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "flex w-full items-center justify-between gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1.5 text-sm text-[var(--color-ink)] transition-colors",
          "focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]",
          open && "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="truncate text-left">
          {selectedLabel ?? (
            <span className="text-[var(--color-ink-muted)]">{placeholder}</span>
          )}
        </span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 text-[var(--color-ink-muted)] transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-full min-w-[160px] overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-lg"
          style={{ animation: "customSelectFadeIn 120ms ease-out" }}
        >
          {/* Search input */}
          {showSearch && (
            <div className="sticky top-0 border-b border-[var(--color-border)] bg-white p-1.5">
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-2.5 py-1 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
              />
            </div>
          )}

          {/* Options list */}
          <div ref={listRef} className="max-h-60 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-[var(--color-ink-muted)]">
                Sin resultados
              </div>
            ) : (
              filtered.map((option, idx) => {
                const isSelected = option.value === value;
                const isHighlighted = idx === highlightIndex;
                return (
                  <button
                    key={option.value}
                    type="button"
                    data-option
                    onClick={() => select(option.value)}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    className={[
                      "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors",
                      isHighlighted
                        ? "bg-[var(--color-cream)]"
                        : "bg-transparent",
                      isSelected
                        ? "font-medium text-[var(--color-accent)]"
                        : "text-[var(--color-ink)]",
                    ].join(" ")}
                  >
                    {/* Selected indicator */}
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${isSelected ? "bg-[var(--color-accent)]" : "bg-transparent"}`}
                    />
                    <span className="truncate">{option.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Inline keyframe animation */}
      <style jsx>{`
        @keyframes customSelectFadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
