import { InputRef } from "antd";
import { type MutableRefObject, type SetStateAction, useEffect, useRef, useState } from "react";
import type { BaseSelectRef } from "rc-select";

export const useFieldFocus = <T extends BaseSelectRef | InputRef | HTMLInputElement>(): [MutableRefObject<T | null>, (value: SetStateAction<boolean>) => void] => {
  const fieldRef = useRef<T | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      const timeout = setTimeout(() => fieldRef.current?.focus());
      return () => clearTimeout(timeout);
    }
  }, [isMounted]);

  return [fieldRef, setIsMounted];
};
