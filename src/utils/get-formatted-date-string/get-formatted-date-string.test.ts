import { getFormattedDateString } from "./get-formatted-date-string";
import { expect } from "@jest/globals";

describe("getFullDate", () => {
  it("returns formatted date when valid date is provided", () => {
    const result = getFormattedDateString("2023-10-01");
    expect(result).toBe("2023 October 01");
  });

  it("returns empty string when no date is provided", () => {
    const result = getFormattedDateString();
    expect(result).toBe("");
  });

  it("returns formatted date with custom format", () => {
    const result = getFormattedDateString("2023-10-01", "DD/MM/YYYY");
    expect(result).toBe("01/10/2023");
  });

  it("returns empty string when invalid date is provided", () => {
    const result = getFormattedDateString("invalid-date");
    expect(result).toBe("");
  });
});
