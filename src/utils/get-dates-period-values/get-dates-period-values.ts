import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { DatesPeriod, DatesPeriods, DatesStrings } from "@/types/date";

dayjs.extend(quarterOfYear);

export const getDatesPeriodValues = (initialDate: string | undefined, period: DatesPeriod = DatesPeriods.YEAR): DatesStrings => {
  const date = dayjs(initialDate);
  return [date.startOf(period).format("YYYY-MM-DD"), date.endOf(period).format("YYYY-MM-DD")];
};
