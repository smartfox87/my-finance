import { getCurrentISODate } from "./get-current-iso-date";
import { describe, expect, it } from "@jest/globals";

describe("getCurrentISODate", () => {
  it("returns a valid ISO date string", () => {
    const result = getCurrentISODate();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it("returns the current date in ISO format", () => {
    const now = new Date();
    const result = getCurrentISODate();
    const resultDate = new Date(result);
    expect(resultDate.getFullYear()).toBe(now.getFullYear());
    expect(resultDate.getMonth()).toBe(now.getMonth());
    expect(resultDate.getDate()).toBe(now.getDate());
    expect(resultDate.getMinutes()).toBe(now.getMinutes());
  });
});
