import quarterOfYear from "dayjs/plugin/quarterOfYear";
import dayjs from "dayjs";
import { checkIsStringValidDate } from "@/utils/check-is-string-valid-date";
import { PERIODS } from "@/constants/date";
import { type DatesPeriod, type DatesStrings, DatesPeriods } from "@/types/date";

dayjs.extend(quarterOfYear);

export const findMatchingPeriodName = (dates: DatesStrings): DatesPeriod => {
  const [from, to] = dates;
  if (!checkIsStringValidDate(from)) throw new Error(`Invalid start date: ${from}`);
  if (!checkIsStringValidDate(to)) throw new Error(`Invalid end date: ${to}`);
  if (dayjs(from).isAfter(dayjs(to))) throw new Error("Start date cannot be after end date");

  const date = dayjs(from);
  for (const period of PERIODS) {
    const startOfPeriod = date.startOf(period).format("YYYY-MM-DD");
    const endOfPeriod = date.endOf(period).format("YYYY-MM-DD");
    if (startOfPeriod === from && endOfPeriod === to) return period;
  }

  return DatesPeriods.YEAR;
};