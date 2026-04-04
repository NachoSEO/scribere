"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

import { useEscena } from "@/lib/proyectos/hooks";
import { useCorrectorStore } from "@/lib/store";
import {
  createAnalysisPlugin,
  analysisPluginKey,
} from "@/lib/editor/analysis-decoration-plugin";
import { buildOffsetMap, textRangeToPmRange } from "@/lib/editor/text-extraction";
import { getMentionItems, createMentionSuggestionRenderer } from "@/components/proyectos/MentionSuggestion";
import { getMentionEntityUrl } from "@/lib/proyectos/entity-config";
import { useFocusModeStore } from "@/lib/manuscrito/focus-mode-store";
import { CustomMention } from "./CustomMention";
import { FormattingToolbar } from "./FormattingToolbar";
import { useHoverPreview } from "./useHoverPreview";

function useAnalysisPlugin() {
  const ref = useRef<ReturnType<typeof createAnalysisPlugin> | null>(null);
  if (!ref.current) ref.current = createAnalysisPlugin();
  return ref.current;
}

export interface SceneEditorProps {
  escenaId: string;
  projectId: string;
  correctorEnabled: boolean;
  onNavigateReady: (fn: (start: number, end: number) => void) => void;
}

export function SceneEditor({
  escenaId,
  projectId,
  correctorEnabled,
  onNavigateReady,
}: SceneEditorProps) {
  const router = useRouter();
  const { escena, save } = useEscena(escenaId);
  const analysisPlugin = useAnalysisPlugin();

  const setText = useCorrectorStore((s) => s.setText);
  const analyze = useCorrectorStore((s) => s.analyzeWithAutoEnable);
  const issues = useCorrectorStore((s) => s.issues);
  const focusedCategory = useCorrectorStore((s) => s.focusedCategory);

  const focusMode = useFocusModeStore((s) => s.focusMode);
  const typewriterScroll = useFocusModeStore((s) => s.typewriterScroll);

  const initialized = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveRef = useRef(save);
  saveRef.current = save;
  const correctorEnabledRef = useRef(correctorEnabled);
  correctorEnabledRef.current = correctorEnabled;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Escribe la escena... Usa @ para mencionar personajes, lugares y más.",
      }),
      CharacterCount,
      CustomMention.configure({
        HTMLAttributes: { class: "mention" },
        suggestion: {
          items: getMentionItems,
          render: createMentionSuggestionRenderer,
        },
      }),
    ],
    editorProps: {
      attributes: { class: "manuscrito-editor" },
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
    onCreate({ editor }) {
      editor.view.updateState(
        editor.view.state.reconfigure({
          plugins: [...editor.view.state.plugins, analysisPlugin],
        })
      );
    },
    onUpdate({ editor }) {
      // Debounce both save and corrector analysis
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const json = editor.getJSON() as Record<string, unknown>;
        saveRef.current({ contenido: json });

        if (correctorEnabledRef.current) {
          const mapping = buildOffsetMap(editor.state.doc);
          setText(mapping.text);
          analyze();
        }
      }, 400);
    },
    onSelectionUpdate({ editor }) {
      if (!typewriterScroll || !focusMode) return;
      const container = scrollContainerRef.current;
      if (!container) return;

      const { node } = editor.view.domAtPos(editor.state.selection.from);
      const el = node instanceof HTMLElement ? node : node.parentElement;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const targetY = containerRect.height / 2;
      const offset = rect.top - containerRect.top - targetY;
      container.scrollBy({ top: offset, behavior: "smooth" });
    },
  });

  useEffect(() => {
    if (!editor || initialized.current) return;
    if (escena?.contenido) {
      editor.commands.setContent(escena.contenido);
      initialized.current = true;
      // Trigger corrector analysis on initial load
      if (correctorEnabledRef.current) {
        const mapping = buildOffsetMap(editor.state.doc);
        setText(mapping.text);
        analyze();
      }
    } else if (escena && !escena.contenido) {
      editor.commands.clearContent();
      initialized.current = true;
    }
  }, [editor, escena, setText, analyze]);

  useEffect(() => {
    initialized.current = false;
  }, [escenaId]);

  useEffect(() => {
    if (!editor) return;
    const tr = editor.view.state.tr;
    if (correctorEnabled) {
      tr.setMeta(analysisPluginKey, { issues, focusedCategory });
    } else {
      tr.setMeta(analysisPluginKey, { issues: [], focusedCategory: null });
    }
    editor.view.dispatch(tr);
  }, [editor, issues, focusedCategory, correctorEnabled]);


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
    onNavigateReady(navigateToIssue);
  }, [navigateToIssue, onNavigateReady]);

  useHoverPreview(editor);

  const wordCount = editor?.storage.characterCount?.words() ?? 0;
  const charCount = editor?.storage.characterCount?.characters() ?? 0;

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      <FormattingToolbar editor={editor} />

      <div className="flex-1 relative min-h-0">
        <div ref={scrollContainerRef} className="manuscrito-scroll absolute inset-0 overflow-y-auto custom-scrollbar bg-white">
          <EditorContent editor={editor} />
        </div>
      </div>

      <style jsx global>{`
        .manuscrito-editor {
          outline: none;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.1rem;
          line-height: 1.9;
          padding: 2.5rem 3rem;
          color: var(--color-ink);
          max-width: 720px;
          margin: 0 auto;
          min-height: 100%;
        }
        .manuscrito-editor p {
          text-indent: 1.5em;
          margin-bottom: 0;
        }
        .manuscrito-editor p:first-child,
        .manuscrito-editor h2 + p,
        .manuscrito-editor h3 + p,
        .manuscrito-editor blockquote + p,
        .manuscrito-editor hr + p {
          text-indent: 0;
        }
        .manuscrito-editor h2 {
          font-size: 1.4rem;
          font-weight: 700;
          text-align: center;
          margin: 2.5rem 0 1.5rem;
          letter-spacing: 0.02em;
          color: var(--color-ink);
        }
        .manuscrito-editor h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 2rem 0 1rem;
          color: var(--color-ink-light);
        }
        .manuscrito-editor blockquote {
          border-left: 3px solid var(--color-border);
          padding-left: 1.5em;
          margin: 1.5em 0;
          font-style: italic;
          color: var(--color-ink-light);
        }
        .manuscrito-editor blockquote p {
          text-indent: 0;
        }
        .manuscrito-editor hr {
          border: none;
          text-align: center;
          margin: 2rem 0;
        }
        .manuscrito-editor hr::after {
          content: "* * *";
          color: var(--color-ink-muted);
          font-size: 0.9rem;
          letter-spacing: 0.5em;
        }
        .manuscrito-editor ul,
        .manuscrito-editor ol {
          padding-left: 2em;
          margin: 1em 0;
        }
        .manuscrito-editor li {
          text-indent: 0;
        }
        .manuscrito-editor p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--color-ink-muted);
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
      `}</style>

      <div className="flex items-center gap-4 px-5 py-2 border-t border-[var(--color-border)] bg-[var(--color-cream-dark)] text-xs text-[var(--color-ink-muted)]">
        <span>
          <span className="font-medium text-[var(--color-ink)] tabular-nums">{wordCount.toLocaleString("es-ES")}</span>
          {" palabras"}
        </span>
        <span>
          <span className="font-medium text-[var(--color-ink)] tabular-nums">{charCount.toLocaleString("es-ES")}</span>
          {" caracteres"}
        </span>
        <span className="ml-auto text-[10px] italic opacity-60">Guardado automático</span>
      </div>
    </div>
  );
}
