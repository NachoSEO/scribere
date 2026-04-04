"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import tippy from "tippy.js";
import type { Instance as TippyInstance } from "tippy.js";
import { MentionPreviewCard } from "./MentionPreviewCard";

interface PreviewLinkProps {
  type: string;
  id: string;
  children: ReactNode;
  className?: string;
  href?: string;
}

/**
 * Wraps any element with a tippy.js hover tooltip showing a MentionPreviewCard.
 * Works outside of the tiptap editor context.
 */
export function PreviewLink({ type, id, children, className, href }: PreviewLinkProps) {
  const ref = useRef<HTMLElement>(null);
  const tippyRef = useRef<TippyInstance | null>(null);
  const rootRef = useRef<Root | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Create a container and React root for the preview card
    const container = document.createElement("div");
    containerRef.current = container;
    const root = createRoot(container);
    rootRef.current = root;
    root.render(<MentionPreviewCard type={type} id={id} />);

    const instance = tippy(ref.current, {
      content: container,
      interactive: true,
      placement: "bottom-start",
      appendTo: document.body,
      theme: "mention-preview",
      maxWidth: 320,
      delay: [200, 100],
      trigger: "mouseenter",
    });

    tippyRef.current = Array.isArray(instance) ? instance[0] : instance;

    return () => {
      tippyRef.current?.destroy();
      tippyRef.current = null;
      // Defer root unmount to avoid React warnings
      setTimeout(() => {
        rootRef.current?.unmount();
        rootRef.current = null;
      }, 0);
    };
  }, [type, id]);

  const Tag = href ? "a" : "span";

  return (
    <Tag ref={ref as any} href={href} className={className}>
      {children}
    </Tag>
  );
}
