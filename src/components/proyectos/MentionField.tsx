"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { getMentionItems, createMentionSuggestionRenderer } from "./MentionSuggestion";
import { getMentionEntityUrl } from "@/lib/proyectos/entity-config";
import { CustomMention } from "@/components/manuscrito/CustomMention";

interface MentionFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  projectId: string;
  rows?: number;
}

function extractPlainText(json: Record<string, unknown>): string {
  const content = json.content as Array<Record<string, unknown>> | undefined;
  if (!content) return "";
  return content
    .map((node) => {
      if (node.type === "paragraph" || node.type === "heading") {
        const inner = node.content as Array<Record<string, unknown>> | undefined;
        if (!inner) return "";
        return inner
          .map((child) => {
            if (child.type === "text") return child.text as string;
            if (child.type === "mention") {
              const attrs = child.attrs as Record<string, string>;
              return `@${attrs?.label ?? ""}`;
            }
            return "";
          })
          .join("");
      }
      return "";
    })
    .join("\n");
}

export function MentionField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder: placeholderText,
  projectId,
  rows = 3,
}: MentionFieldProps) {
  const router = useRouter();
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const initialized = useRef(false);
  const [local, setLocal] = useState(value);
  const isTyping = useRef(false);

  // Sync from parent when value changes externally
  useEffect(() => {
    if (!isTyping.current) {
      setLocal(value);
    }
  }, [value]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // For single-line, disable most block features
        ...(multiline ? {} : {
          heading: false,
          bulletList: false,
          orderedList: false,
          blockquote: false,
          codeBlock: false,
          horizontalRule: false,
          hardBreak: false,
        }),
      }),
      Placeholder.configure({
        placeholder: placeholderText ?? "",
      }),
      CustomMention.configure({
        HTMLAttributes: { class: "mention" },
        suggestion: {
          items: getMentionItems,
          render: createMentionSuggestionRenderer,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: multiline
          ? "mention-field-editor mention-field-multiline"
          : "mention-field-editor mention-field-singleline",
        style: multiline ? `min-height: ${rows * 1.5}em` : "",
      },
      handleKeyDown(_view, event) {
        // For single-line mode, prevent Enter from creating new lines
        if (!multiline && event.key === "Enter" && !event.shiftKey) {
          return true;
        }
        return false;
      },
      handleClick(_view, _pos, event) {
        const el = (event.target as HTMLElement).closest("[data-mention-type]");
        if (el) {
          const type = el.getAttribute("data-mention-type");
          const id = el.getAttribute("data-id");
          if (type && id) {
            router.push(getMentionEntityUrl(projectId, type, id));
            return true;
          }
        }
        return false;
      },
    },
    onUpdate({ editor }) {
      isTyping.current = true;
      const json = editor.getJSON() as Record<string, unknown>;
      const text = extractPlainText(json);
      setLocal(text);
      onChangeRef.current(text);
      setTimeout(() => { isTyping.current = false; }, 1000);
    },
  });

  // Initialize content from plain text value
  useEffect(() => {
    if (editor && !initialized.current && value !== undefined) {
      if (value) {
        editor.commands.setContent(`<p>${value.replace(/\n/g, "</p><p>")}</p>`);
      }
      initialized.current = true;
    }
  }, [editor, value]);

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className={`rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] overflow-hidden transition-colors focus-within:border-[var(--color-accent)] focus-within:ring-1 focus-within:ring-[var(--color-accent)]`}>
        <EditorContent editor={editor} />
      </div>
      <style jsx global>{`
        .mention-field-editor {
          outline: none;
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--color-ink);
        }
        .mention-field-editor p {
          margin: 0;
        }
        .mention-field-singleline {
          padding: 0.5rem 0.75rem;
          white-space: nowrap;
          overflow: hidden;
        }
        .mention-field-singleline p {
          display: inline;
        }
        .mention-field-multiline {
          padding: 0.5rem 0.75rem;
        }
        .mention-field-editor p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--color-ink-muted);
          pointer-events: none;
          height: 0;
        }
        .mention-field-editor .mention {
          background-color: rgba(139, 111, 71, 0.1);
          border-radius: 4px;
          padding: 1px 4px;
          color: var(--color-accent);
          font-weight: 500;
          cursor: pointer;
        }
        .mention-field-editor .mention:hover {
          background-color: rgba(139, 111, 71, 0.2);
        }
      `}</style>
    </div>
  );
}
