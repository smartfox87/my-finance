import { checkIsStringValidDate } from "@/utils/check-is-string-valid-date";
import type { DatesStrings } from "@/types/date";
import dayjs from "dayjs";

export const getFromPeriodApiValues = ([from, to]: DatesStrings): string => {
  if (!checkIsStringValidDate(from)) throw new Error(`Invalid start date: ${from}`);
  if (!checkIsStringValidDate(to)) throw new Error(`Invalid end date: ${to}`);
  if (dayjs(from).isAfter(dayjs(to))) throw new Error("Start date cannot be after end date");
  return `[${from + " 00:00:00"},${to + " 00:00:00"})`;
};
