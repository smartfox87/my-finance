import dayjs from "dayjs";
import { checkIsStringValidDate } from "@/utils/check-is-string-valid-date";

export const getFormattedDateString = (date: string, format: string = "YYYY MMMM DD"): string => {
  if (!checkIsStringValidDate(date)) throw new Error(`Invalid start date: ${date}`);
  return dayjs(date).format(format);
};
