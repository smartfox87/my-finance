import { AntdLocale, Locale } from "@/types/locales";

export interface LocaleContextType {
  antdLocale: AntdLocale | undefined;
  changeLocale: (lang: Locale) => Promise<void>;
}
