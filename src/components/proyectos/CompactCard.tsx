"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface CompactCardProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CompactCard({ label, value, onChange, placeholder }: CompactCardProps) {
  const [local, setLocal] = useState(value);
  const isTyping = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isTyping.current) {
      setLocal(value);
    }
  }, [value]);

  // Auto-grow the textarea to fit content
  const autoGrow = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    // Clamp between ~1 row and ~3 lines
    const lineHeight = 20;
    const minHeight = lineHeight;
    const maxHeight = lineHeight * 3 + 8;
    el.style.height = `${Math.min(Math.max(el.scrollHeight, minHeight), maxHeight)}px`;
  }, []);

  useEffect(() => {
    autoGrow();
  }, [local, autoGrow]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      isTyping.current = true;
      const newValue = e.target.value;
      setLocal(newValue);
      onChange(newValue);
      setTimeout(() => { isTyping.current = false; }, 1000);
    },
    [onChange]
  );

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-3">
      <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] font-medium mb-1">
        {label}
      </p>
      <textarea
        ref={textareaRef}
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        rows={1}
        className="w-full resize-none border-none bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none leading-5 p-0"
      />
    </div>
  );
}
