import { checkIsStringValidDate } from "./check-is-string-valid-date";
import { describe, expect, it } from "@jest/globals";

describe("checkIsStringValidDate", () => {
  it("returns false for a string shorter than 10 characters", () => {
    expect(checkIsStringValidDate("2023-10")).toBe(false);
  });

  it("returns true for a valid date string", () => {
    expect(checkIsStringValidDate("2023-10-01")).toBe(true);
  });

  it("returns false for an invalid date string", () => {
    expect(checkIsStringValidDate("invalid-date")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(checkIsStringValidDate("")).toBe(false);
  });
});
