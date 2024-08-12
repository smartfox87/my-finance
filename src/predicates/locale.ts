import { Locale, Locales } from "@/types/locales";

export const isStringLocale = (str: string): str is Locale => !!Object.values(Locales).find((locale) => locale === str);
