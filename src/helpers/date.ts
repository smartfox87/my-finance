import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { type Locale } from "@/types/router";
import { type Period, Periods } from "@/types/date";
import { periods } from "@/constants/date";
dayjs.extend(quarterOfYear);

export const toggleDayjsLocale = async (locale: Locale): Promise<void> => {
  if (locale === "en" || dayjs.locale() === locale) return;
  try {
    await import(`dayjs/locale/${locale}.js`);
    dayjs.locale(locale);
  } catch (error) {
    console.error(`Failed to load locale: ${locale}`, error);
  }
};

export const periodOptions = periods.map((period) => ({ label: `complex.period.options.${period}`, value: period }));

export const getPeriod = () => (typeof window !== "undefined" && localStorage.getItem("period") ? localStorage.getItem("period") : "year");

export const getCurrentDate = () => new Date().toISOString();

export const getFullDate = (date: string, format = "YYYY MMMM DD") => {
  if (!date) return "";
  return dayjs(date).format(format);
};

export const getDatesPeriod = (initialDate: string, period: Period = "month") => {
  const date = dayjs(initialDate);
  return [date.startOf(period).format("YYYY-MM-DD"), date.endOf(period).format("YYYY-MM-DD")];
};

export const isStringADate = (str: any) => {
  if (typeof str !== "string" || str.length < 10) return false;
  const date = Date.parse(str);
  return !isNaN(date);
};

export const findMatchingPeriod = (datesArray: string[]) => {
  if (datesArray.length !== 2) return false;
  const date1 = dayjs(datesArray[0]);
  for (let period of periods) {
    const startOfPeriod = date1.startOf(period).format("YYYY-MM-DD");
    const endOfPeriod = date1.endOf(period).format("YYYY-MM-DD");
    if (startOfPeriod === datesArray[0] && endOfPeriod === datesArray[1]) return period;
  }
  return null;
};

export type DatesPeriod = [string, string];

export const getPeriodDates = (dates: string) => JSON.parse(dates).map((date: string) => date.substring(0, 10));

export const getFromPeriodDatesForApi = ([from, to]: string[]) => `[${from + " 00:00:00"},${to + " 00:00:00"})`;
export const getToPeriodDatesForApi = ([from, to]: string[]) => `[${from + " 00:00:00"},${to + " 00:00:01"})`;
