import { locales } from "@/initial-data/router";

export type Locale = (typeof locales)[number];

export const i18nConfig = {
  locales,
  defaultLocale: "en",
};
