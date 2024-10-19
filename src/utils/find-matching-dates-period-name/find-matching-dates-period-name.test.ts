import { findMatchingDatesPeriodName } from "./find-matching-dates-period-name";
import { DatesPeriods } from "@/types/date";
import { describe, expect, it } from "@jest/globals";

describe("findMatchingDatesPeriodName", () => {
  it("returns null when datesArray does not match any period", () => {
    expect(findMatchingDatesPeriodName(["2023-10-01", "2023-10-02"])).toBeNull();
  });

  it("returns 'year' when datesArray matches the start and end of the year", () => {
    expect(findMatchingDatesPeriodName(["2023-01-01", "2023-12-31"])).toBe(DatesPeriods.YEAR);
  });

  it("returns 'quarter' when datesArray matches the start and end of the month", () => {
    expect(findMatchingDatesPeriodName(["2023-10-01", "2023-12-31"])).toBe(DatesPeriods.QUARTER);
  });

  it("returns 'month' when datesArray matches the start and end of the month", () => {
    expect(findMatchingDatesPeriodName(["2023-10-01", "2023-10-31"])).toBe(DatesPeriods.MONTH);
  });

  it("returns 'week' when datesArray matches the start and end of the week", () => {
    expect(findMatchingDatesPeriodName(["2023-10-01", "2023-10-07"])).toBe(DatesPeriods.WEEK);
  });

  it("returns 'day' when datesArray matches the start and end of the day", () => {
    expect(findMatchingDatesPeriodName(["2023-10-01", "2023-10-01"])).toBe(DatesPeriods.DAY);
  });
});
