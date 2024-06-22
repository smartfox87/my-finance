import { type Locale } from "@/types/router";
import { type DatesPeriod, DatesPeriods, DatesStrings } from "@/types/date";
import { periods } from "@/constants/date";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { isDatesPeriod } from "@/types/predicates";
import { ComplexFieldNames, FieldTranslationRadioButtonOption } from "@/types/field";
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

export const periodOptions = periods.map((period): { label_translation: FieldTranslationRadioButtonOption; value: DatesPeriod } => ({
  label_translation: `complex.${ComplexFieldNames.PERIOD}.options.${period}`,
  value: period,
}));

export const getPeriod = (): DatesPeriod => {
  if (typeof window !== "undefined") return DatesPeriods.YEAR;
  const period = localStorage.getItem("period");
  return isDatesPeriod(period) ? period : DatesPeriods.YEAR;
};

export const getCurrentDate = () => new Date().toISOString();

export const getFullDate = (date: string, format = "YYYY MMMM DD") => {
  if (!date) return "";
  return dayjs(date).format(format);
};

export const getDatesPeriod = (initialDate: string | undefined, period: DatesPeriod = DatesPeriods.MONTH): DatesStrings => {
  const date = dayjs(initialDate);
  return [date.startOf(period).format("YYYY-MM-DD"), date.endOf(period).format("YYYY-MM-DD")];
};

export const isStringADate = (str: any) => {
  if (typeof str !== "string" || str.length < 10) return false;
  const date = Date.parse(str);
  return !isNaN(date);
};

export const findMatchingPeriod = (datesArray: DatesStrings): null | DatesPeriod => {
  if (datesArray.length !== 2) return null;
  const date = dayjs(datesArray[0]);
  for (let period of periods) {
    const startOfPeriod = date.startOf(period).format("YYYY-MM-DD");
    const endOfPeriod = date.endOf(period).format("YYYY-MM-DD");
    if (startOfPeriod === datesArray[0] && endOfPeriod === datesArray[1]) return period;
  }
  return null;
};

export const getPeriodDates = (dates: string) => JSON.parse(dates).map((date: string) => date.substring(0, 10));

export const getFromPeriodDatesForApi = ([from, to]: string[]) => `[${from + " 00:00:00"},${to + " 00:00:00"})`;
export const getToPeriodDatesForApi = ([from, to]: string[]) => `[${from + " 00:00:00"},${to + " 00:00:01"})`;
