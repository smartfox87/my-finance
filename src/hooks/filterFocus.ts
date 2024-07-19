import { MutableRefObject, useLayoutEffect, useRef } from "react";
import { BaseSelectRef } from "rc-select";

export const useFilterFocus = <T extends BaseSelectRef | HTMLInputElement>(isOpen: boolean, isInitialized: boolean): [MutableRefObject<T | null>] => {
  const fieldRef = useRef<T | null>(null);
  useLayoutEffect(() => {
    if (isOpen && isInitialized) setTimeout(() => fieldRef.current?.focus());
  }, [isOpen, isInitialized]);
  return [fieldRef];
};
