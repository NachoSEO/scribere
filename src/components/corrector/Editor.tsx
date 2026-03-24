"use client";

import { useCallback, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useCorrectorStore } from "@/lib/store";
import {
  createAnalysisPlugin,
  analysisPluginKey,
} from "@/lib/editor/analysis-decoration-plugin";
import { buildOffsetMap, textRangeToPmRange } from "@/lib/editor/text-extraction";

const analysisPlugin = createAnalysisPlugin();

interface EditorProps {
  onOffsetMapReady?: (
    navigate: (start: number, end: number) => void
  ) => void;
}

export function Editor({ onOffsetMapReady }: EditorProps) {
  const setText = useCorrectorStore((s) => s.setText);
  const analyze = useCorrectorStore((s) => s.analyzeWithAutoEnable);
  const issues = useCorrectorStore((s) => s.issues);
  const focusedCategory = useCorrectorStore((s) => s.focusedCategory);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Placeholder.configure({
        placeholder:
          "Escribe o pega tu texto aquí. El análisis se ejecutará automáticamente...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "tiptap prose prose-lg max-w-none focus:outline-none",
      },
    },
    onCreate({ editor }) {
      editor.view.updateState(
        editor.view.state.reconfigure({
          plugins: [...editor.view.state.plugins, analysisPlugin],
        })
      );
    },
    onUpdate({ editor }) {
      const mapping = buildOffsetMap(editor.state.doc);
      setText(mapping.text);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        analyze();
      }, 400);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const tr = editor.view.state.tr;
    tr.setMeta(analysisPluginKey, { issues, focusedCategory });
    editor.view.dispatch(tr);
  }, [editor, issues, focusedCategory]);

  const navigateToIssue = useCallback(
    (start: number, end: number) => {
      if (!editor) return;
      const mapping = buildOffsetMap(editor.state.doc);
      const range = textRangeToPmRange(mapping, start, end);
      if (!range) return;
      editor.commands.setTextSelection(range);
      editor.commands.scrollIntoView();
      editor.commands.focus();
    },
    [editor]
  );

  useEffect(() => {
    if (editor && onOffsetMapReady) {
      onOffsetMapReady(navigateToIssue);
    }
  }, [editor, onOffsetMapReady, navigateToIssue]);

  return (
    <div className="custom-scrollbar min-h-[400px] flex-1 overflow-y-auto bg-white">
      <EditorContent editor={editor} />
    </div>
  );
}
