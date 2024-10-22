import { checkIsStringValidDate } from "@/utils/check-is-string-valid-date";
import dayjs, { type Dayjs } from "dayjs";
import type { DatesStrings } from "../../types";

export const convertDatesToDayjs = ([from, to]: DatesStrings): [Dayjs, Dayjs] => {
  if (!checkIsStringValidDate(from)) throw new Error(`Invalid start date: ${from}`);
  if (!checkIsStringValidDate(to)) throw new Error(`Invalid end date: ${to}`);
  if (dayjs(from).isAfter(dayjs(to))) throw new Error("Start date cannot be after end date");
  return [dayjs(from), dayjs(to)];
};
