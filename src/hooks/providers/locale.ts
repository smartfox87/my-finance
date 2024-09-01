import { useContext } from "react";
import { LocaleContext } from "@/providers/locale";
import type { LocaleContextType } from "@/types/providers/locale";

export const useLocale = (): LocaleContextType => {
  const state = useContext(LocaleContext);
  if (state === undefined) throw new Error("useLocale must be used within a LocaleProvider");
  return state;
};
