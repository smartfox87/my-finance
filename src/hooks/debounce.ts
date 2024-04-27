import { useCallback, useRef } from "react";

export const useDebounce = (callback: (...args: any[]) => any, delay: number) => {
  const timerRef = useRef<number | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};
