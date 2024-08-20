import { type Locale, Locales } from "@/types/locales";

export const isLocale = (value: string): value is Locale => {
  return Object.values(Locales).includes(value as Locales);
};
