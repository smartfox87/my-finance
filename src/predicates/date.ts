import { DatesStrings } from "@/types/date";

export const isDatesStrings = (dates: unknown): dates is DatesStrings => Array.isArray(dates) && dates.length === 2 && dates.every((date) => typeof date === "string");
