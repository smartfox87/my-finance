import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { checkIsStringValidDate } from "@/utils/check-is-string-valid-date";
import { type DatesPeriod, type DatesStrings, DatesPeriods } from "@/types/date";

dayjs.extend(quarterOfYear);

export const getPeriodValuesByDate = (date: string, period: DatesPeriod = DatesPeriods.YEAR): DatesStrings => {
  if (!checkIsStringValidDate(date)) throw new Error(`Invalid start date: ${date}`);
  const processedDate = dayjs(date);
  return [processedDate.startOf(period).format("YYYY-MM-DD"), processedDate.endOf(period).format("YYYY-MM-DD")];
};
