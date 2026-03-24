import type { Node as PmNode } from "@tiptap/pm/model";

export interface OffsetMapping {
  /** Plain text extracted from the document */
  text: string;
  /**
   * Maps plain-text character index → ProseMirror position.
   * posMap[i] gives the PM position of the i-th character in `text`.
   */
  posMap: number[];
}

/**
 * Walk a ProseMirror document, extract plain text, and build
 * a character-level offset map from text positions to PM positions.
 *
 * Block nodes are separated by \n (single newline).
 * Paragraphs separated by double newline to match how analysis detects paragraphs.
 */
export function buildOffsetMap(doc: PmNode): OffsetMapping {
  const textParts: string[] = [];
  const posMap: number[] = [];
  let isFirstBlock = true;

  doc.descendants((node, pos) => {
    if (node.isBlock && node.isTextblock) {
      if (!isFirstBlock) {
        // Double newline between paragraphs
        textParts.push("\n\n");
        // Map these newlines to the position between blocks
        posMap.push(pos, pos);
      }
      isFirstBlock = false;

      // Walk text nodes within this block
      let inlineOffset = 0;
      node.forEach((child, childOffset) => {
        if (child.isText && child.text) {
          for (let i = 0; i < child.text.length; i++) {
            textParts.push(child.text[i]);
            // +1 because PM positions are 1-based for content inside a node
            posMap.push(pos + 1 + childOffset + i);
          }
          inlineOffset += child.text.length;
        }
      });

      return false; // don't descend further
    }
    return true;
  });

  return { text: textParts.join(""), posMap };
}

/**
 * Convert a plain-text character range [start, end) to PM positions.
 */
export function textRangeToPmRange(
  mapping: OffsetMapping,
  start: number,
  end: number
): { from: number; to: number } | null {
  if (start < 0 || end > mapping.posMap.length || start >= end) {
    return null;
  }
  return {
    from: mapping.posMap[start],
    to: mapping.posMap[end - 1] + 1,
  };
}
