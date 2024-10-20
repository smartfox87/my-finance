import { getPeriodValuesByDate } from "./get-period-values-by-date";
import { describe, expect, it } from "@jest/globals";
import { DatesPeriods } from "@/types/date";

describe("getDatesPeriodValuesByDate", () => {
  it("throws an error when date is invalid", () => {
    expect(() => getPeriodValuesByDate("invalid-date", DatesPeriods.YEAR)).toThrow("Invalid start date: invalid-date");
  });

  it("returns start and end of the year", () => {
    const result = getPeriodValuesByDate("2023-01-15", DatesPeriods.YEAR);
    expect(result).toEqual(["2023-01-01", "2023-12-31"]);
  });

  it("returns start and end of the quarter", () => {
    const result = getPeriodValuesByDate("2023-04-15", DatesPeriods.QUARTER);
    expect(result).toEqual(["2023-04-01", "2023-06-30"]);
  });

  it("returns start and end of the month", () => {
    const result = getPeriodValuesByDate("2023-07-15", DatesPeriods.MONTH);
    expect(result).toEqual(["2023-07-01", "2023-07-31"]);
  });

  it("returns start and end of the week", () => {
    const result = getPeriodValuesByDate("2023-10-02", DatesPeriods.WEEK);
    expect(result).toEqual(["2023-10-01", "2023-10-07"]);
  });
});
