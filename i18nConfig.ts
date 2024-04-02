// export const locales = ["en", "de", "it", "es", "fr", "pl", "zh", "ru"] as const;
export const locales = ["en", "zh", "ru"] as const;
export type Locale = (typeof locales)[number];

export const pages = ["", "accounts", "budgets", "contact", "expenses", "incomes", "profile", "settings", "statistics"];

export const i18nConfig = {
  locales,
  defaultLocale: "en",
};
