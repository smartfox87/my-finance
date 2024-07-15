import { MutableRefObject, useLayoutEffect, useRef } from "react";

export const useFilterFocus = (isOpen: boolean, isInitialized: boolean): [MutableRefObject<HTMLInputElement | null>] => {
  const fieldRef = useRef<HTMLInputElement | null>(null);
  useLayoutEffect(() => {
    if (isOpen && isInitialized) setTimeout(() => fieldRef.current?.focus());
  }, [isOpen, isInitialized]);
  return [fieldRef];
};
