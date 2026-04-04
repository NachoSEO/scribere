"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { getMentionItems, createMentionSuggestionRenderer } from "./MentionSuggestion";
import { getMentionEntityUrl } from "@/lib/proyectos/entity-config";
import { CustomMention } from "@/components/manuscrito/CustomMention";

interface EscenaEditorProps {
  content: Record<string, unknown> | null;
  onChange: (content: Record<string, unknown>) => void;
  projectId: string;
}

export function EscenaEditor({ content, onChange, projectId }: EscenaEditorProps) {
  const router = useRouter();
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const initialized = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Escribe el contenido de la escena... Usa @ para mencionar personajes, lugares y más.",
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
        class: "tiptap prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4",
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
      onChangeRef.current(editor.getJSON() as Record<string, unknown>);
    },
  });

  useEffect(() => {
    if (editor && content && !initialized.current) {
      editor.commands.setContent(content);
      initialized.current = true;
    }
  }, [editor, content]);

  const resetInit = useCallback(() => {
    initialized.current = false;
  }, []);
  useEffect(() => resetInit, [resetInit]);

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[var(--color-ink-light)] uppercase tracking-wide">
        Contenido
      </label>
      <div className="rounded-md border border-[var(--color-border)] bg-white overflow-hidden">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
