import { DatesStrings } from "@/types/date";
import dayjs, { type Dayjs } from "dayjs";

export const convertDatesToDayjs = (dates: DatesStrings): [Dayjs, Dayjs] => {
  const [from, to] = dates;
  return [dayjs(from), dayjs(to)];
};
