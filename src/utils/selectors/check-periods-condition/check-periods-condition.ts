import type { DatesStrings } from "@/types/date";

export const checkPeriodsCondition = (dates: DatesStrings | undefined, [itemFrom, itemTo]: DatesStrings) => dates !== undefined && itemFrom >= dates[0] && itemTo <= dates[1];
