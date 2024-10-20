import dayjs from "dayjs";
import { type Locale, Locales } from "@/types/locales";

export const toggleDayjsLocale = async (locale: Locale): Promise<void> => {
  if (locale === Locales.EN || dayjs.locale() === locale) return;
  try {
    await import(`dayjs/locale/${locale}.js`);
    dayjs.locale(locale);
  } catch (error) {
    console.error(`Failed to load locale: ${locale}`, error);
  }
};
