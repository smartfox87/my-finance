import { useContext } from "react";
import { LocaleContext } from "@/providers/LocaleProvider";

export const useLocale = () => useContext(LocaleContext);
