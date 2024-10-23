import { getPeriodName } from "./get-period-name";
import { DatesPeriods } from "../../types";
import { describe, expect, it } from "@jest/globals";

describe("getPeriodName", () => {
  it("returns YEAR when localStorage period is empty", () => {
    localStorage.removeItem("period");
    expect(getPeriodName()).toBe(DatesPeriods.YEAR);
  });

  it("returns YEAR when localStorage period is a valid DatesPeriod", () => {
    localStorage.setItem("period", DatesPeriods.MONTH);
    expect(getPeriodName()).toBe(DatesPeriods.MONTH);
  });

  it("returns YEAR when localStorage period is not a valid DatesPeriod", () => {
    localStorage.setItem("period", "invalid-period");
    expect(getPeriodName()).toBe(DatesPeriods.YEAR);
  });
});
