import { useEffect, useState } from "react";
import { breakpoints } from "@/initial-data/breakpoints.js";

const viewports = [
  { name: "xl", query: `(min-width: ${breakpoints["xl-min"]}px)` },
  { name: "lg", query: `(min-width: ${breakpoints["lg-min"]}px) and (max-width: ${breakpoints["lg-max"]}px)` },
  { name: "md", query: `(min-width: ${breakpoints["md-min"]}px) and (max-width: ${breakpoints["md-max"]}px)` },
  { name: "sm", query: `(min-width: ${breakpoints["sm-min"]}px) and (max-width: ${breakpoints["sm-max"]}px)` },
  { name: "xs", query: `(min-width: ${breakpoints["2xs-min"]}px) and (max-width: ${breakpoints["xs-max"]}px)` },
  { name: "xxs", query: `(max-width: ${breakpoints["3xs-max"]}px)` },
];

const getTrueValueIndex = (mediaQueryLists) => mediaQueryLists.map((list) => list.matches).findIndex((value) => value);

const getViewportByIndex = (index) => viewports[index].name;

export const useViewport = () => {
  const [viewport, setViewport] = useState(getViewportByIndex(4));
  const [isTouchDevice, setIsTouchDevice] = useState();

  useEffect(() => {
    const mediaQueryLists = viewports.map(({ query }) => matchMedia(query));
    setViewport(getViewportByIndex(getTrueValueIndex(mediaQueryLists)));

    setIsTouchDevice("ontouchstart" in document.documentElement);

    const handleMatchMediaChange = ({ target: { matches } }) => {
      const newViewport = getViewportByIndex(getTrueValueIndex(mediaQueryLists));
      if (matches) setViewport((prevViewport) => (newViewport !== prevViewport ? newViewport : prevViewport));
    };

    mediaQueryLists.forEach((list) => list.addEventListener("change", handleMatchMediaChange));
    return () => mediaQueryLists.forEach((list) => list.removeEventListener("change", handleMatchMediaChange));
  }, []);

  return { viewport, isTouchDevice };
};
