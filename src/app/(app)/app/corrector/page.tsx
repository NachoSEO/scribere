"use client";

import { useCallback, useRef, useState } from "react";
import { Editor } from "@/components/corrector/Editor";
import { Sidebar } from "@/components/corrector/Sidebar";
import { StatsBar } from "@/components/corrector/StatsBar";
import { HighlightTooltip } from "@/components/corrector/HighlightTooltip";

const MIN_SIDEBAR = 220;
const MAX_SIDEBAR = 600;
const DEFAULT_SIDEBAR = 280;

export default function CorrectorPage() {
  const navigateRef = useRef<((start: number, end: number) => void) | undefined>(undefined);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR);
  const dragging = useRef(false);

  const handleOffsetMapReady = useCallback(
    (navigate: (start: number, end: number) => void) => {
      navigateRef.current = navigate;
    },
    []
  );

  const handleNavigateToIssue = useCallback(
    (start: number, end: number) => {
      navigateRef.current?.(start, end);
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const newWidth = window.innerWidth - e.clientX;
      setSidebarWidth(Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, newWidth)));
    };

    const handleMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="flex h-full flex-col bg-[var(--color-cream)]">
      <StatsBar />
      <div className="flex min-h-0 flex-1">
        <div className="custom-scrollbar flex-1 overflow-y-auto">
          <Editor onOffsetMapReady={handleOffsetMapReady} />
        </div>
        {/* Drag handle */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1 flex-shrink-0 cursor-col-resize bg-[var(--color-border)] transition-colors hover:bg-[var(--color-accent-light)]"
        />
        <div
          className="flex-shrink-0 overflow-hidden"
          style={{ width: sidebarWidth }}
        >
          <Sidebar onNavigateToIssue={handleNavigateToIssue} />
        </div>
      </div>
      <HighlightTooltip />
    </div>
  );
}
