import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FocusModeState {
  focusMode: boolean;
  typewriterScroll: boolean;
  toggleFocusMode: () => void;
  exitFocusMode: () => void;
  toggleTypewriterScroll: () => void;
}

export const useFocusModeStore = create<FocusModeState>()(
  persist(
    (set) => ({
      focusMode: false,
      typewriterScroll: false,
      toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
      exitFocusMode: () => set({ focusMode: false }),
      toggleTypewriterScroll: () => set((s) => ({ typewriterScroll: !s.typewriterScroll })),
    }),
    { name: "focus-mode" }
  )
);
