import { useContext } from "react";
import { LocaleContext } from "@/providers/LocaleProvider";

export const useLocale = () => {
  const state = useContext(LocaleContext);
  if (state === undefined) throw new Error("useLocale must be used within a LocaleProvider");
  return state;
};
