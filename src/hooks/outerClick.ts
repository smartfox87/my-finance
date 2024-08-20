import { type RefObject, useEffect } from "react";

export const useOuterClick = (ref: RefObject<HTMLElement>, callback: () => void): void => {
  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) callback();
  };

  useEffect((): (() => void) => {
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, []);
};
