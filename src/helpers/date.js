import dayjs from "dayjs";
import { getLanguage } from "@/helpers/localStorage.js";
import "dayjs/locale/ru.js";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);

export const periods = ["day", "week", "month", "quarter", "year"];

export const periodOptions = periods.map((period) => ({ label: `filter.period.options.${period}`, value: period }));

export const getPeriod = () => localStorage.getItem("period") || "month";

export const getCurrentDate = () => new Date().toISOString();

export const getFullDate = (date, format = "YYYY MMMM DD") => {
  if (!date) return "";
  const currentLocale = getLanguage();
  if (dayjs.locale() !== currentLocale) dayjs.locale(currentLocale);
  return dayjs(date).format(format);
};

export const getDatesPeriod = (initialDate, period = "month") => {
  const date = dayjs(initialDate);
  return [date.startOf(period).format("YYYY-MM-DD"), date.endOf(period).format("YYYY-MM-DD")];
};

export const isStringADate = (str) => {
  if (typeof str !== "string" || str.length < 10) return false;
  const date = Date.parse(str);
  return !isNaN(date);
};

export const findMatchingPeriod = (datesArray) => {
  if (datesArray.length !== 2) return false;
  const date1 = dayjs(datesArray[0]);
  for (let period of periods) {
    const startOfPeriod = date1.startOf(period).format("YYYY-MM-DD");
    const endOfPeriod = date1.endOf(period).format("YYYY-MM-DD");
    if (startOfPeriod === datesArray[0] && endOfPeriod === datesArray[1]) return period;
  }
  return null;
};

export const getPeriodDates = (dates) => JSON.parse(dates).map((date) => date.substring(0, 10));

export const getFromPeriodDatesForApi = ([from, to]) => `[${from + " 00:00:00"},${to + " 00:00:00"})`;
export const getToPeriodDatesForApi = ([from, to]) => `[${from + " 00:00:00"},${to + " 00:00:01"})`;
