import { useLayoutEffect, useRef } from "react";

export const useFilterFocus = (isOpen, isInitialized) => {
  const fieldRef = useRef(null);
  useLayoutEffect(() => {
    if (isOpen && isInitialized) setTimeout(() => fieldRef.current?.focus());
  }, [isOpen, isInitialized]);
  return [fieldRef];
};
