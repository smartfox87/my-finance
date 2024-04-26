import { useCallback, useRef } from "react";

export const useThrottle = (callback: (...args: any[]) => any, delay: number) => {
  const isThrottled = useRef(false);
  return useCallback(
    (...args: any[]) => {
      if (isThrottled.current) return;
      callback(...args);
      isThrottled.current = true;
      setTimeout(() => (isThrottled.current = false), delay);
    },
    [callback, delay],
  );
};
