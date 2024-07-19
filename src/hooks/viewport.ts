import { useEffect, useMemo, useState } from "react";
import { Breakpoints, Viewport, Viewports } from "@/types/viewport";

const viewports: { name: Viewport; query: string }[] = [
  { name: Viewports.XL, query: `(min-width: ${Breakpoints["XL-MIN"]}px)` },
  { name: Viewports.LG, query: `(min-width: ${Breakpoints["LG-MIN"]}px) and (max-width: ${Breakpoints["LG-MAX"]}px)` },
  { name: Viewports.MD, query: `(min-width: ${Breakpoints["MD-MIN"]}px) and (max-width: ${Breakpoints["MD-MAX"]}px)` },
  { name: Viewports.SM, query: `(min-width: ${Breakpoints["SM-MIN"]}px) and (max-width: ${Breakpoints["SM-MAX"]}px)` },
  { name: Viewports.XS, query: `(min-width: ${Breakpoints["2XS-MIN"]}px) and (max-width: ${Breakpoints["XS-MAX"]}px)` },
  { name: Viewports.XXS, query: `(max-width: ${Breakpoints["3XS-MAX"]}px)` },
];
const mobileViewports: Viewport[] = [Viewports.XXS, Viewports.XS, Viewports.SM];

const getTrueValueIndex = (mediaQueryLists: MediaQueryList[]): number => mediaQueryLists.map((list) => list.matches).findIndex(Boolean);

const getViewportByIndex = (index: number): Viewport => viewports[index].name;

export const useViewport = (): { viewport: Viewport; isTouchDevice: Boolean; isMobile: Boolean } => {
  const [viewport, setViewport] = useState<Viewport>(getViewportByIndex(4));
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isMobile = useMemo(() => mobileViewports.includes(viewport), [viewport]);

  useEffect(() => {
    const mediaQueryLists: MediaQueryList[] = viewports.map(({ query }) => matchMedia(query));
    setViewport(getViewportByIndex(getTrueValueIndex(mediaQueryLists)));

    setIsTouchDevice("ontouchstart" in document.documentElement);

    const handleMatchMediaChange = (event: MediaQueryListEvent): void => {
      const target = event.target as MediaQueryList;
      if (!target) return;
      const newViewport: Viewport = getViewportByIndex(getTrueValueIndex(mediaQueryLists));
      if (target.matches) setViewport(newViewport);
    };

    mediaQueryLists.forEach((list) => list.addEventListener("change", handleMatchMediaChange));
    return () => mediaQueryLists.forEach((list) => list.removeEventListener("change", handleMatchMediaChange));
  }, []);

  return { viewport, isTouchDevice, isMobile };
};
