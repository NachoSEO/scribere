"use client";

import { useCallback, useEffect, useRef, useState, lazy, Suspense } from "react";

const MentionField = lazy(() => import("./MentionField").then(m => ({ default: m.MentionField })));

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
  projectId?: string;
}

export function FormField({ label, value, onChange, multiline = false, placeholder, rows = 3, projectId }: FormFieldProps) {
  const [local, setLocal] = useState(value);
  const isTyping = useRef(false);

  // Sync from parent when value changes externally (not from typing)
  useEffect(() => {
    if (!isTyping.current) {
      setLocal(value);
    }
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      isTyping.current = true;
      const newValue = e.target.value;
      setLocal(newValue);
      onChange(newValue);
      // Reset typing flag after a delay longer than debounce
      setTimeout(() => { isTyping.current = false; }, 1000);
    },
    [onChange]
  );

  if (projectId) {
    return (
      <Suspense fallback={<div className="h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] animate-pulse" />}>
        <MentionField
          label={label}
          value={value}
          onChange={onChange}
          multiline={multiline}
          placeholder={placeholder}
          projectId={projectId}
          rows={rows}
        />
      </Suspense>
    );
  }

  const inputClasses =
    "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors";

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={local}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          className={`${inputClasses} resize-y`}
        />
      ) : (
        <input
          type="text"
          value={local}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
}
