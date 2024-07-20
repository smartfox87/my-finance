import { MutableRefObject, useEffect, useRef } from "react";
import { BaseSelectRef } from "rc-select";

export const useFilterFocus = <T extends BaseSelectRef | HTMLInputElement>(isOpen: boolean, isInitialized: boolean): [MutableRefObject<T | null>] => {
  const fieldRef = useRef<T | null>(null);
  useEffect(() => {
    if (isOpen && isInitialized) {
      const timeout = setTimeout(() => fieldRef.current?.focus());
      return () => clearTimeout(timeout);
    }
  }, [isOpen, isInitialized]);
  return [fieldRef];
};
