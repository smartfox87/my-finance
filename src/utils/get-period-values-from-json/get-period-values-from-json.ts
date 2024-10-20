import { checkIsStringValidDate } from "@/utils/check-is-string-valid-date";
import type { DatesStrings } from "@/types/date";

export const getPeriodValuesFromJSON = (dates: string): DatesStrings => {
  const array = JSON.parse(dates);
  if (!Array.isArray(array) || array.length !== 2 || array.some((date: string) => !checkIsStringValidDate(date))) throw new Error("Invalid dates value");
  const [from, to] = array;
  return [from.substring(0, 10), to.substring(0, 10)];
};
