import { getFromPeriodApiValues } from "./get-from-period-api-values";
import { describe, expect, it } from "@jest/globals";

describe("getFromPeriodApiValues", () => {
  it("returns formatted string for valid date range", () => {
    const result = getFromPeriodApiValues(["2023-10-01", "2023-10-31"]);
    expect(result).toBe("[2023-10-01 00:00:00,2023-10-31 00:00:00)");
  });

  it("returns formatted string for same start and end date", () => {
    const result = getFromPeriodApiValues(["2023-10-01", "2023-10-01"]);
    expect(result).toBe("[2023-10-01 00:00:00,2023-10-01 00:00:00)");
  });

  it("throws an error for empty date strings", () => {
    expect(() => getFromPeriodApiValues(["", ""])).toThrow("Invalid start date: ");
  });

  it("throws an error when start date is after end date", () => {
    expect(() => getFromPeriodApiValues(["2023-10-31", "2023-10-01"])).toThrow("Start date cannot be after end date");
  });

  it("throws an error for invalid start date", () => {
    expect(() => getFromPeriodApiValues(["invalid-date", "2023-10-31"])).toThrow("Invalid start date: invalid-date");
  });

  it("throws an error for invalid end date", () => {
    expect(() => getFromPeriodApiValues(["2023-10-01", "invalid-date"])).toThrow("Invalid end date: invalid-date");
  });
});
