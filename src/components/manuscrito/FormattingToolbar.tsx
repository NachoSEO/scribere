"use client";

import type { Editor } from "@tiptap/react";

export function FormattingToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `p-1.5 rounded transition-colors ${
      active
        ? "bg-[var(--color-accent)] text-white"
        : "text-[var(--color-ink-light)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)]"
    }`;

  const separator = (
    <div className="w-px h-5 bg-[var(--color-border)] mx-1" />
  );

  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-[var(--color-border)] bg-[var(--color-cream)] shrink-0 flex-wrap">
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
        title="Negrita (Ctrl+B)"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4v8h3.5a2.5 2.5 0 0 0 .7-4.9A2 2 0 0 0 8 4H6zm2 3.5V5.5h.5a1 1 0 1 1 0 2H8zm0 1.5h1a1.5 1.5 0 1 1 0 3H8V9z" fill="currentColor" />
        </svg>
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
        title="Cursiva (Ctrl+I)"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 4h4M6 12h4M9.5 4L7.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {separator}

      {/* Heading 2 */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive("heading", { level: 2 }))}
        title="Título de capítulo (H2)"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <text x="2" y="12" fontSize="10" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">H2</text>
        </svg>
      </button>

      {/* Heading 3 */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={btnClass(editor.isActive("heading", { level: 3 }))}
        title="Título de sección (H3)"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <text x="2" y="12" fontSize="10" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">H3</text>
        </svg>
      </button>

      {separator}

      {/* Bullet List */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
        title="Lista con viñetas"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 4h8M5 8h8M5 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="2.5" cy="4" r="1" fill="currentColor" />
          <circle cx="2.5" cy="8" r="1" fill="currentColor" />
          <circle cx="2.5" cy="12" r="1" fill="currentColor" />
        </svg>
      </button>

      {/* Ordered List */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive("orderedList"))}
        title="Lista numerada"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4h8M6 8h8M6 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <text x="1" y="5.5" fontSize="4.5" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">1.</text>
          <text x="1" y="9.5" fontSize="4.5" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">2.</text>
          <text x="1" y="13.5" fontSize="4.5" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">3.</text>
        </svg>
      </button>

      {separator}

      {/* Blockquote */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive("blockquote"))}
        title="Cita"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 4h8M5 8h8M5 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Horizontal Rule */}
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={btnClass(false)}
        title="Separador (***)"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {separator}

      {/* Undo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-1.5 rounded transition-colors text-[var(--color-ink-light)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)] disabled:opacity-30 disabled:cursor-not-allowed"
        title="Deshacer (Ctrl+Z)"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 7l3-3M4 7l3 3M5 7h4a3 3 0 0 1 0 6H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Redo */}
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-1.5 rounded transition-colors text-[var(--color-ink-light)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-ink)] disabled:opacity-30 disabled:cursor-not-allowed"
        title="Rehacer (Ctrl+Y)"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 7l-3-3M12 7l-3 3M11 7H7a3 3 0 0 0 0 6h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
