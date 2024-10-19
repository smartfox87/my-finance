import { DatesPeriod, DatesPeriods } from "@/types/date";
import { isDatesPeriod } from "@/predicates/field";

export const getDatesPeriodName = (): DatesPeriod => {
  if (typeof window === "undefined") return DatesPeriods.YEAR;
  const period = localStorage.getItem("period");
  return isDatesPeriod(period) ? period : DatesPeriods.YEAR;
};
