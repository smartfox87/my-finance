import { DatesPeriod, DatesPeriods } from "../../types";
import { isDatesPeriod } from "../../predicates";

export const getPeriodName = (): DatesPeriod => {
  if (typeof window === "undefined") return DatesPeriods.YEAR;
  const period = localStorage.getItem("period");
  return isDatesPeriod(period) ? period : DatesPeriods.YEAR;
};
