import { getPeriodValuesFromJSON } from "./get-period-values-from-json";
import { describe, expect, it } from "@jest/globals";

describe("getPeriodValuesFromJSON", () => {
  it("returns array of date strings for valid JSON input", () => {
    expect(getPeriodValuesFromJSON('["2023-10-01", "2023-10-31"]')).toEqual(["2023-10-01", "2023-10-31"]);
  });

  it("throws an error for invalid JSON input", () => {
    expect(() => getPeriodValuesFromJSON('["invalid-date", "2023-10-31"]')).toThrow("Invalid dates value");
  });

  it("throws an error for non-array JSON input", () => {
    expect(() => getPeriodValuesFromJSON('{"start": "2023-10-01", "end": "2023-10-31"}')).toThrow("Invalid dates value");
  });

  it("throws an error for empty array input", () => {
    expect(() => getPeriodValuesFromJSON("[]")).toThrow("Invalid dates value");
  });

  it("throws an error for invalid date format in array", () => {
    expect(() => getPeriodValuesFromJSON('["2023-10-01", "invalid-date"]')).toThrow("Invalid dates value");
  });
});
