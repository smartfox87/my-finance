import { useCallback, useEffect } from "react";
import { ThemeTypes } from "../types";
import { useLocalStorage } from "@/hooks/local-storage";

export const useTheme = (): [boolean, string, () => void] => {
  const [state, setState] = useLocalStorage<ThemeTypes>("theme");
  const darkTheme = state === ThemeTypes.DARK;

  const setClass = useCallback((value: ThemeTypes): void => {
    if (typeof document !== "undefined") {
      if (value === ThemeTypes.LIGHT) {
        document.documentElement.classList.add(ThemeTypes.LIGHT);
        document.documentElement.classList.remove(ThemeTypes.DARK);
      } else {
        document.documentElement.classList.remove(ThemeTypes.LIGHT);
        document.documentElement.classList.add(ThemeTypes.DARK);
      }
    }
  }, []);

  const setTheme = useCallback(
    (value: ThemeTypes): void => {
      if (value === ThemeTypes.LIGHT) {
        setState(ThemeTypes.LIGHT);
        setClass(ThemeTypes.LIGHT);
      } else {
        setState(ThemeTypes.DARK);
        setClass(ThemeTypes.DARK);
      }
    },
    [state],
  );

  const toggleTheme = useCallback((): void => {
    if (state === ThemeTypes.LIGHT) {
      setTheme(ThemeTypes.DARK);
      setClass(ThemeTypes.DARK);
    } else {
      setTheme(ThemeTypes.LIGHT);
      setClass(ThemeTypes.LIGHT);
    }
  }, [state]);

  const handleThemeChange = useCallback((event: MediaQueryList | MediaQueryListEvent) => setTheme(event.matches ? ThemeTypes.DARK : ThemeTypes.LIGHT), []);
  useEffect((): (() => void) => {
    const mediaQuery = matchMedia("(prefers-color-scheme: dark)");

    if (state) setClass(state);
    else handleThemeChange(mediaQuery);

    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return [darkTheme, state, toggleTheme];
};
