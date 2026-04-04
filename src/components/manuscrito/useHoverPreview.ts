"use client";

import { useEffect, useRef } from "react";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import type { Editor } from "@tiptap/react";
import type { Instance as TippyInstance } from "tippy.js";
import { MentionPreviewCard } from "./MentionPreviewCard";

export function useHoverPreview(editor: Editor | null) {
  const tippyRef = useRef<TippyInstance | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentMentionRef = useRef<Element | null>(null);
  const rendererRef = useRef<InstanceType<typeof ReactRenderer> | null>(null);
  const popupLeaveHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);

  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom;

    const clearPendingTimeout = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };

    const removePopupLeaveListener = () => {
      if (popupLeaveHandlerRef.current) {
        document.body.removeEventListener("mouseout", popupLeaveHandlerRef.current);
        popupLeaveHandlerRef.current = null;
      }
    };

    const hidePreview = () => {
      clearPendingTimeout();
      removePopupLeaveListener();
      tippyRef.current?.hide();
    };

    const showPreview = (mention: Element) => {
      if (currentMentionRef.current === mention) return;

      hidePreview();

      const type = mention.getAttribute("data-mention-type");
      const id = mention.getAttribute("data-id");
      if (!type || !id) return;

      currentMentionRef.current = mention;

      rendererRef.current = new ReactRenderer(MentionPreviewCard, {
        props: { type, id },
        editor,
      });

      const instances = tippy(mention as HTMLElement, {
        content: rendererRef.current.element,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
        appendTo: document.body,
        showOnCreate: true,
        theme: "mention-preview",
        maxWidth: 320,
        onHidden: (inst) => {
          inst.destroy();
          rendererRef.current?.destroy();
          rendererRef.current = null;
          if (tippyRef.current === inst) {
            tippyRef.current = null;
            currentMentionRef.current = null;
          }
          removePopupLeaveListener();
        },
      });

      tippyRef.current = Array.isArray(instances) ? instances[0] : instances;

      // Attach body listener only while popup is open
      const handlePopupLeave = (e: MouseEvent) => {
        const related = e.relatedTarget as HTMLElement | null;
        if (related?.closest(".mention[data-mention-type]")) return;
        if (related?.closest(".tippy-box[data-theme~='mention-preview']")) return;

        hoverTimeoutRef.current = setTimeout(() => hidePreview(), 150);
      };
      popupLeaveHandlerRef.current = handlePopupLeave;
      document.body.addEventListener("mouseout", handlePopupLeave);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const mention = (e.target as HTMLElement).closest(".mention[data-mention-type]");
      if (!mention) return;

      clearPendingTimeout();

      if (currentMentionRef.current !== mention) {
        hoverTimeoutRef.current = setTimeout(() => showPreview(mention), 200);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (related?.closest(".tippy-box[data-theme~='mention-preview']")) return;
      if (related?.closest(".mention[data-mention-type]")) return;

      hoverTimeoutRef.current = setTimeout(() => hidePreview(), 150);
    };

    dom.addEventListener("mouseover", handleMouseOver);
    dom.addEventListener("mouseout", handleMouseOut);

    return () => {
      dom.removeEventListener("mouseover", handleMouseOver);
      dom.removeEventListener("mouseout", handleMouseOut);
      removePopupLeaveListener();
      clearPendingTimeout();
      tippyRef.current?.destroy();
      rendererRef.current?.destroy();
    };
  }, [editor]);
}
