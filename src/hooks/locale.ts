import { useContext } from "react";
import { LocaleContext } from "@/providers/LocaleProvider.jsx";

export const useLocale = () => useContext(LocaleContext);
