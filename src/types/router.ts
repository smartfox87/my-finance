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

export const isStringLocale = (locale: any): locale is Locale => Object.values(Locales).includes(locale);

export enum Languages {
  ENGLISH = "english",
  GERMAN = "german",
  ITALIAN = "italian",
  SPANISH = "spanish",
  FRENCH = "french",
  POLISH = "polish",
  CHINESE = "chinese",
  HINDI = "hindi",
  RUSSIAN = "russian",
}

export type Language = `${Languages}`;

export enum CeoPages {
  HOME = "",
  ACCOUNTS = "accounts",
  BUDGETS = "budgets",
  EXPENSES = "expenses",
  INCOMES = "incomes",
  STATISTICS = "statistics",
  CONTACT = "contact",
}

export type CeoPage = `${CeoPages}`;

export enum OtherPages {
  HOME = "home",
  PROFILE = "profile",
  SETTINGS = "settings",
}

export const Pages = {
  ...CeoPages,
  ...OtherPages,
};

export type Pages = typeof Pages;

export type Page = Pages[keyof Pages];
