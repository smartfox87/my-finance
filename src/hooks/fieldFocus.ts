import { MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { BaseSelectRef } from "rc-select";
import { InputRef } from "antd";

export const useFieldFocus = <T extends BaseSelectRef | InputRef>(): [MutableRefObject<T | null>, (value: SetStateAction<boolean>) => void] => {
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
