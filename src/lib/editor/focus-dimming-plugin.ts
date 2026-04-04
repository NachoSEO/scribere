import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export const focusDimmingPluginKey = new PluginKey("focusDimming");

interface FocusDimmingState {
  enabled: boolean;
  activeStart: number;
  activeEnd: number;
  decorations: DecorationSet;
}

function getActiveBlockRange(
  doc: Parameters<typeof DecorationSet.create>[0],
  pos: number
): { start: number; end: number } {
  const resolved = doc.resolve(pos);
  if (resolved.depth >= 1) {
    return { start: resolved.start(1), end: resolved.end(1) };
  }
  return { start: -1, end: -1 };
}

function buildDimmingDecorations(
  doc: Parameters<typeof DecorationSet.create>[0],
  activeStart: number,
  activeEnd: number
): DecorationSet {
  const decorations: Decoration[] = [];

  doc.forEach((node, offset) => {
    const nodeEnd = offset + node.nodeSize;
    if (offset >= activeStart && nodeEnd <= activeEnd + 1) return;

    decorations.push(
      Decoration.node(offset, nodeEnd, { class: "dimmed-paragraph" })
    );
  });

  return DecorationSet.create(doc, decorations);
}

export function createFocusDimmingPlugin() {
  return new Plugin<FocusDimmingState>({
    key: focusDimmingPluginKey,

    state: {
      init() {
        return {
          enabled: false,
          activeStart: -1,
          activeEnd: -1,
          decorations: DecorationSet.empty,
        };
      },
      apply(tr, pluginState, _oldState, newState) {
        const meta = tr.getMeta(focusDimmingPluginKey) as
          | { enabled: boolean }
          | undefined;

        const enabled = meta ? meta.enabled : pluginState.enabled;

        if (!enabled) {
          if (pluginState.enabled || meta) {
            return { enabled: false, activeStart: -1, activeEnd: -1, decorations: DecorationSet.empty };
          }
          return pluginState;
        }

        const { start, end } = getActiveBlockRange(newState.doc, newState.selection.from);

        // Skip rebuild if active block hasn't changed and doc hasn't changed
        if (!meta && !tr.docChanged && start === pluginState.activeStart && end === pluginState.activeEnd) {
          return pluginState;
        }

        const decorations = buildDimmingDecorations(newState.doc, start, end);
        return { enabled, activeStart: start, activeEnd: end, decorations };
      },
    },

    props: {
      decorations(state) {
        return this.getState(state)?.decorations ?? DecorationSet.empty;
      },
    },
  });
}
