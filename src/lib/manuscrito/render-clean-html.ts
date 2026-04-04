import { createElement, Fragment, type ReactNode } from "react";

// TipTap JSON node types
interface TipTapNode {
  type: string;
  content?: TipTapNode[];
  text?: string;
  marks?: TipTapMark[];
  attrs?: Record<string, unknown>;
}

interface TipTapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

function renderMarks(text: string, marks: TipTapMark[] = []): ReactNode {
  let result: ReactNode = text;

  for (const mark of marks) {
    switch (mark.type) {
      case "bold":
        result = createElement("strong", null, result);
        break;
      case "italic":
        result = createElement("em", null, result);
        break;
      case "strike":
        result = createElement("s", null, result);
        break;
      case "code":
        result = createElement("code", null, result);
        break;
    }
  }

  return result;
}

function renderInlineContent(nodes: TipTapNode[] = []): ReactNode[] {
  return nodes.map((node, i) => {
    if (node.type === "text") {
      return createElement(Fragment, { key: i }, renderMarks(node.text ?? "", node.marks));
    }
    if (node.type === "mention") {
      // Clean text: just the entity name, no @, no pill
      const label = (node.attrs?.label as string) ?? "";
      return createElement(Fragment, { key: i }, label);
    }
    if (node.type === "hardBreak") {
      return createElement("br", { key: i });
    }
    return null;
  });
}

function renderNode(node: TipTapNode, key: number): ReactNode {
  switch (node.type) {
    case "doc":
      return createElement(
        Fragment,
        null,
        ...(node.content ?? []).map((child, i) => renderNode(child, i))
      );

    case "paragraph":
      return createElement("p", { key }, ...renderInlineContent(node.content));

    case "heading": {
      const level = (node.attrs?.level as number) ?? 2;
      const tag = `h${Math.min(Math.max(level, 1), 6)}`;
      return createElement(tag, { key }, ...renderInlineContent(node.content));
    }

    case "blockquote":
      return createElement(
        "blockquote",
        { key },
        ...(node.content ?? []).map((child, i) => renderNode(child, i))
      );

    case "bulletList":
      return createElement(
        "ul",
        { key },
        ...(node.content ?? []).map((child, i) => renderNode(child, i))
      );

    case "orderedList":
      return createElement(
        "ol",
        { key },
        ...(node.content ?? []).map((child, i) => renderNode(child, i))
      );

    case "listItem":
      return createElement(
        "li",
        { key },
        ...(node.content ?? []).map((child, i) => renderNode(child, i))
      );

    case "horizontalRule":
      return createElement("hr", { key });

    default:
      // Unknown nodes: try to render content if present
      if (node.content) {
        return createElement(
          Fragment,
          { key },
          ...(node.content ?? []).map((child, i) => renderNode(child, i))
        );
      }
      return null;
  }
}

export function renderCleanContent(content: Record<string, unknown> | null): ReactNode {
  if (!content) return null;
  return renderNode(content as unknown as TipTapNode, 0);
}
