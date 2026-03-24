"use client";

import { useCallback, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

interface EscenaEditorProps {
  content: Record<string, unknown> | null;
  onChange: (content: Record<string, unknown>) => void;
}

export function EscenaEditor({ content, onChange }: EscenaEditorProps) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const initialized = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Escribe el contenido de la escena...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "tiptap prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
    onUpdate({ editor }) {
      onChangeRef.current(editor.getJSON() as Record<string, unknown>);
    },
  });

  // Set initial content once
  useEffect(() => {
    if (editor && content && !initialized.current) {
      editor.commands.setContent(content);
      initialized.current = true;
    }
  }, [editor, content]);

  // Reset initialized flag when editor changes
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
