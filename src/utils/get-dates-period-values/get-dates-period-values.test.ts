import { getDatesPeriodValues } from "./get-dates-period-values";
import { describe, expect, it } from "@jest/globals";
import { DatesPeriods } from "@/types/date";
import dayjs from "dayjs";

describe("getDatesPeriodValues", () => {
  it("returns start and end of the year for a given date", () => {
    const result = getDatesPeriodValues("2023-10-01", DatesPeriods.YEAR);
    expect(result).toEqual(["2023-01-01", "2023-12-31"]);
  });

  it("returns start and end of the quarter for a given date", () => {
    const result = getDatesPeriodValues("2023-10-01", DatesPeriods.QUARTER);
    expect(result).toEqual(["2023-10-01", "2023-12-31"]);
  });

  it("returns start and end of the month for a given date", () => {
    const result = getDatesPeriodValues("2023-10-01", DatesPeriods.MONTH);
    expect(result).toEqual(["2023-10-01", "2023-10-31"]);
  });

  it("returns start and end of the week for a given date", () => {
    const result = getDatesPeriodValues("2023-10-01", DatesPeriods.WEEK);
    expect(result).toEqual(["2023-10-01", "2023-10-07"]);
  });

  it("returns start and end of the day for a given date", () => {
    const result = getDatesPeriodValues("2023-10-01", DatesPeriods.DAY);
    expect(result).toEqual(["2023-10-01", "2023-10-01"]);
  });

  it("returns start and end of the year when no date is provided", () => {
    const result = getDatesPeriodValues(undefined, DatesPeriods.YEAR);
    const now = dayjs();
    expect(result).toEqual([now.startOf("year").format("YYYY-MM-DD"), now.endOf("year").format("YYYY-MM-DD")]);
  });

  it("returns start and end of the year when no period is provided", () => {
    const result = getDatesPeriodValues("2023-10-01");
    expect(result).toEqual(["2023-01-01", "2023-12-31"]);
  });
});
