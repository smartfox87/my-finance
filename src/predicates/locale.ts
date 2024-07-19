import { Locale, Locales } from "@/types/locales";

export const isStringLocale = (locale: any): locale is Locale => Object.values(Locales).includes(locale);
