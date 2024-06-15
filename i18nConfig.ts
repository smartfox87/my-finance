import { locales } from "@/constants/router";

export type Locale = (typeof locales)[number];

export const i18nConfig = {
  locales,
  defaultLocale: "en",
};
