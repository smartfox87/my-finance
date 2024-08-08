import { useCallback, useEffect, useState } from "react";

export const useDarkTheme = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const handleThemeChange = useCallback((event: MediaQueryListEvent) => setDarkTheme(event.matches), []);

  useEffect(() => {
    const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
    setDarkTheme(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return darkTheme;
};
