import { getDatesPeriodName } from "./get-dates-period-name";
import { DatesPeriods } from "@/types/date";
import { expect } from "@jest/globals";

describe("getPeriodName", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns YEAR when localStorage period is empty", () => {
    localStorage.removeItem("period");
    expect(getDatesPeriodName()).toBe(DatesPeriods.YEAR);
  });

  it("returns YEAR when localStorage period is a valid DatesPeriod", () => {
    localStorage.setItem("period", DatesPeriods.MONTH);
    expect(getDatesPeriodName()).toBe(DatesPeriods.YEAR);
  });

  it("returns YEAR when localStorage period is not a valid DatesPeriod", () => {
    localStorage.setItem("period", "invalid-period");
    expect(getDatesPeriodName()).toBe(DatesPeriods.YEAR);
  });
});
