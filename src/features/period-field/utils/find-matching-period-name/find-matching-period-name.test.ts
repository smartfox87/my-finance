import { findMatchingPeriodName } from "./find-matching-period-name";
import { DatesPeriods } from "@/features/fields";
import { describe, expect, it } from "@jest/globals";

describe("findMatchingDatesPeriodName", () => {
  it("throws an error when start date is invalid", () => {
    expect(() => findMatchingPeriodName(["invalid-date", "2023-10-31"])).toThrow("Invalid start date: invalid-date");
  });

  it("throws an error when end date is invalid", () => {
    expect(() => findMatchingPeriodName(["2023-10-01", "invalid-date"])).toThrow("Invalid end date: invalid-date");
  });

  it("throws an error when start date is after end date", () => {
    expect(() => findMatchingPeriodName(["2023-10-31", "2023-10-01"])).toThrow("Start date cannot be after end date");
  });

  it("returns 'year' when datesArray matches the start and end of the year", () => {
    expect(findMatchingPeriodName(["2023-01-01", "2023-12-31"])).toBe(DatesPeriods.YEAR);
  });

  it("returns 'quarter' when datesArray matches the start and end of the quarter", () => {
    expect(findMatchingPeriodName(["2023-10-01", "2023-12-31"])).toBe(DatesPeriods.QUARTER);
  });

  it("returns 'month' when datesArray matches the start and end of the month", () => {
    expect(findMatchingPeriodName(["2023-10-01", "2023-10-31"])).toBe(DatesPeriods.MONTH);
  });

  it("returns 'week' when datesArray matches the start and end of the week", () => {
    expect(findMatchingPeriodName(["2023-10-01", "2023-10-07"])).toBe(DatesPeriods.WEEK);
  });

  it("returns 'day' when datesArray matches the start and end of the day", () => {
    expect(findMatchingPeriodName(["2023-10-01", "2023-10-01"])).toBe(DatesPeriods.DAY);
  });
});
