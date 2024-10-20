import { getFormattedDateString } from "./get-formatted-date-string";
import { describe, expect, it } from "@jest/globals";

describe("getFormattedDateString", () => {
  it("returns formatted date when valid date is provided", () => {
    const result = getFormattedDateString("2023-10-01");
    expect(result).toBe("2023 October 01");
  });

  it("returns formatted date with custom format", () => {
    const result = getFormattedDateString("2023-10-01", "DD/MM/YYYY");
    expect(result).toBe("01/10/2023");
  });

  it("throws an error when invalid date is provided", () => {
    expect(() => getFormattedDateString("invalid-date")).toThrow("Invalid start date: invalid-date");
  });

  it("returns formatted date when valid date with time is provided", () => {
    const result = getFormattedDateString("2023-10-01T12:00:00", "YYYY-MM-DD HH:mm:ss");
    expect(result).toBe("2023-10-01 12:00:00");
  });
});
