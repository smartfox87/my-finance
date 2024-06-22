import { useContext } from "react";
import { LocaleContext } from "@/providers/LocaleProvider.tsx";

export const useLocale = () => useContext(LocaleContext);
