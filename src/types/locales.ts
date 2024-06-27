import en from "antd/lib/locale/en_US";

export enum Locales {
  EN = "en",
  DE = "de",
  IT = "it",
  ES = "es",
  FR = "fr",
  PL = "pl",
  ZH = "zh",
  HI = "hi",
  RU = "ru",
}

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

export type AntdLocales = typeof AntdLocales;

export type AntdLocale = typeof en;

export type Locale = `${Locales}`;

export const isStringLocale = (locale: any): locale is Locale => Object.values(Locales).includes(locale);

export const Languages = {
  [Locales.EN]: "english",
  [Locales.DE]: "german",
  [Locales.IT]: "italian",
  [Locales.ES]: "spanish",
  [Locales.FR]: "french",
  [Locales.PL]: "polish",
  [Locales.ZH]: "chinese",
  [Locales.HI]: "hindi",
  [Locales.RU]: "russian",
};

export type Languages = typeof Languages;

export type Language = (typeof Languages)[keyof Languages];
