import quarterOfYear from "dayjs/plugin/quarterOfYear";
import dayjs from "dayjs";
import { PERIODS } from "@/constants/date";
import { type DatesPeriod, DatesStrings } from "@/types/date";

dayjs.extend(quarterOfYear);

export const findMatchingDatesPeriodName = (datesArray: DatesStrings): null | DatesPeriod => {
  if (datesArray.length !== 2) return null;
  const date = dayjs(datesArray[0]);
  for (const period of PERIODS) {
    const startOfPeriod = date.startOf(period).format("YYYY-MM-DD");
    const endOfPeriod = date.endOf(period).format("YYYY-MM-DD");
    if (startOfPeriod === datesArray[0] && endOfPeriod === datesArray[1]) return period;
  }
  return null;
};
