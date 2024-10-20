import { getFromPeriodDatesForApi } from "./get-from-period-api-values";
import { describe, expect, it } from "@jest/globals";

describe("getFromPeriodDatesForApi", () => {
  it("returns formatted string for valid date range", () => {
    const result = getFromPeriodDatesForApi(["2023-10-01", "2023-10-31"]);
    expect(result).toBe("[2023-10-01 00:00:00,2023-10-31 00:00:00)");
  });

  it("returns formatted string for same start and end date", () => {
    const result = getFromPeriodDatesForApi(["2023-10-01", "2023-10-01"]);
    expect(result).toBe("[2023-10-01 00:00:00,2023-10-01 00:00:00)");
  });

  it("throws an error for empty date strings", () => {
    expect(() => getFromPeriodDatesForApi(["", ""])).toThrow("Invalid start date: ");
  });

  it("throws an error when start date is after end date", () => {
    expect(() => getFromPeriodDatesForApi(["2023-10-31", "2023-10-01"])).toThrow("Start date cannot be after end date");
  });

  it("throws an error for invalid start date", () => {
    expect(() => getFromPeriodDatesForApi(["invalid-date", "2023-10-31"])).toThrow("Invalid start date: invalid-date");
  });

  it("throws an error for invalid end date", () => {
    expect(() => getFromPeriodDatesForApi(["2023-10-01", "invalid-date"])).toThrow("Invalid end date: invalid-date");
  });
});
