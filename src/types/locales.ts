export enum I18nNamespaces {
  COMMON = "common",
}

export type I18nNamespace = `${I18nNamespaces}`;

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

export type Locale = `${Locales}`;

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
