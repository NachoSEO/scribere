"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { useProyectosStore } from "@/lib/proyectos/store";
import { ENTITY_TYPE_CONFIG, type MentionType } from "@/lib/proyectos/entity-config";

interface MentionItem {
  id: string;
  label: string;
  type: MentionType;
}

export function getMentionItems({ query }: { query: string }): MentionItem[] {
  const state = useProyectosStore.getState();
  const allItems: MentionItem[] = [
    ...state.personajes.map((p) => ({ id: p.id, label: p.nombre, type: "personaje" as const })),
    ...state.lugares.map((l) => ({ id: l.id, label: l.nombre, type: "lugar" as const })),
    ...state.facciones.map((f) => ({ id: f.id, label: f.nombre, type: "faccion" as const })),
    ...state.eventos.map((e) => ({ id: e.id, label: e.nombre, type: "evento" as const })),
  ];

  return allItems
    .filter((item) => item.label && item.label.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8);
}

export interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

interface MentionListProps {
  items: MentionItem[];
  command: (item: { id: string; label: string; type: string }) => void;
}

export const MentionList = forwardRef<MentionListRef, MentionListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    const selectItem = useCallback(
      (index: number) => {
        const item = items[index];
        if (item) {
          command({ id: item.id, label: item.label, type: item.type });
        }
      },
      [items, command]
    );

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          setSelectedIndex((prev) => (prev + items.length - 1) % items.length);
          return true;
        }
        if (event.key === "ArrowDown") {
          setSelectedIndex((prev) => (prev + 1) % items.length);
          return true;
        }
        if (event.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      },
    }));

    if (items.length === 0) {
      return (
        <div className="rounded-lg border border-[var(--color-border)] bg-white shadow-lg p-3 text-xs text-[var(--color-ink-muted)]">
          Sin resultados
        </div>
      );
    }

    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-white shadow-lg overflow-hidden max-h-60 overflow-y-auto">
        {items.map((item, index) => {
          const config = ENTITY_TYPE_CONFIG[item.type];
          return (
            <button
              key={`${item.type}-${item.id}`}
              onClick={() => selectItem(index)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 text-left text-sm transition-colors ${
                index === selectedIndex
                  ? "bg-[var(--color-cream)] text-[var(--color-accent)]"
                  : "text-[var(--color-ink)] hover:bg-[var(--color-cream)]"
              }`}
            >
              <span
                className="shrink-0 h-2 w-2 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span className="flex-1 truncate">{item.label}</span>
              <span
                className="shrink-0 text-[10px] font-medium rounded-full px-1.5 py-0.5"
                style={{ backgroundColor: `${config.color}15`, color: config.color }}
              >
                {config.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);

MentionList.displayName = "MentionList";

export function createMentionSuggestionRenderer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let component: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let popup: any[] | null = null;

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onStart: (props: any) => {
      component = new ReactRenderer(MentionList, {
        props,
        editor: props.editor,
      });
      if (!props.clientRect) return;
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdate: (props: any) => {
      component?.updateProps(props);
      if (popup?.[0] && props.clientRect) {
        popup[0].setProps({ getReferenceClientRect: props.clientRect });
      }
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0]?.hide();
        return true;
      }
      return component?.ref?.onKeyDown(props) ?? false;
    },
    onExit: () => {
      popup?.[0]?.destroy();
      component?.destroy();
    },
  };
}
