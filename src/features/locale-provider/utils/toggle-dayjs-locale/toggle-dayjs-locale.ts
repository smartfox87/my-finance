import dayjs from "dayjs";
import { type Locale, Locales } from "@/types/locales";

export const toggleDayjsLocale = (locale: Locale): void => {
  if (locale === Locales.EN) dayjs.locale(locale);
  if (dayjs.locale() === locale) return;
  import(`dayjs/locale/${locale}.js`).then(() => dayjs.locale(locale));
};
