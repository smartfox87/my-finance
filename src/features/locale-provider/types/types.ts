import { type Locale, Locales } from "@/types/locales";
import en from "antd/lib/locale/en_US";

export const AntdLocales = {
  [Locales.EN]: "en_US",
  [Locales.DE]: "de_DE",
  [Locales.IT]: "it_IT",
  [Locales.ES]: "es_ES",
  [Locales.FR]: "fr_FR",
  [Locales.PL]: "pl_PL",
  [Locales.ZH]: "zh_CN",
  [Locales.HI]: "hi_IN",
  [Locales.RU]: "ru_RU",
};

export type AntdLocale = typeof en;

export interface LocaleContextType {
  antdLocale: AntdLocale | undefined;
  changeLocale: (lang: Locale) => Promise<void>;
}
