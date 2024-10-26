import { useContext } from "react";
import { UIContext } from "../provider";
import type { UIContextType } from "../types";

export const useUIThemeContext = (): UIContextType => {
  const state = useContext(UIContext);
  if (!state) throw new Error("useUIThemeContext must be used within a UIProvider");
  return state;
};
