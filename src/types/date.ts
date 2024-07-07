export enum PickerPeriods {
  DATE = "date",
  WEEK = "week",
  MONTH = "month",
  QUARTER = "quarter",
  YEAR = "year",
}

export enum DatesPeriods {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  QUARTER = "quarter",
  YEAR = "year",
}

export type DatesPeriod = `${DatesPeriods}`;

export type PickerPeriod = `${PickerPeriods}`;

export type DatesStrings = [string, string];

export const isDatesStrings = (dates: unknown): dates is DatesStrings => Array.isArray(dates) && dates.length === 2 && dates.every((date) => typeof date === "string");
