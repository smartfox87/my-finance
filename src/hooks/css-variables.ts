import { useCallback, useEffect } from "react";

export const useCssVariables = () => {
  const handleResizeWindow = useCallback((): void => {
    const heightValue = window.innerHeight / 100;
    const widthValue = window.innerWidth / 100;

    document.documentElement.style.setProperty("--vh", `${heightValue}px`);
    document.documentElement.style.setProperty("--vw", `${widthValue}px`);
  }, []);

  useEffect((): (() => void) => {
    handleResizeWindow();
    window.addEventListener("resize", handleResizeWindow);

    return (): void => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
};
