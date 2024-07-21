import { MutableRefObject, useEffect, useRef, useState } from "react";
import { BaseSelectRef } from "rc-select";

export const useFieldFocus = <T extends BaseSelectRef | HTMLInputElement>(): [MutableRefObject<T | null>, () => void] => {
  const fieldRef = useRef<T | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const mountField = (): void => setIsMounted(true);

  useEffect(() => {
    if (isMounted) {
      const timeout = setTimeout(() => fieldRef.current?.focus());
      return () => clearTimeout(timeout);
    }
  }, [isMounted]);
  return [fieldRef, mountField];
};
