import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue?: T): [T, (value: T) => void] => {
  const isClient = typeof window !== "undefined";

  const [state, setState] = useState<T>(() => {
    try {
      if (!isClient) return initialValue;
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.error(error);
    }
  });

  const handleStorageChange = useCallback(({ newValue }: StorageEvent): void => {
    try {
      setState(newValue ? JSON.parse(newValue) : initialValue);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect((): (() => void) => {
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setValue = useCallback(
    (value: T): void => {
      try {
        const valueToStore = value instanceof Function ? value(state) : value;
        if (isClient) window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setState(value);
      } catch (error) {
        console.log(error);
      }
    },
    [state],
  );

  return [state, setValue];
};
