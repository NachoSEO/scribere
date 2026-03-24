"use client";

import { useCallback, useRef } from "react";

export function useDebouncedSave<T>(saveFn: (data: T) => Promise<unknown>, delay = 500) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestFn = useRef(saveFn);
  latestFn.current = saveFn;

  return useCallback(
    (data: T) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => latestFn.current(data), delay);
    },
    [delay]
  );
}
