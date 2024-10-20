import { convertDatesToDayjs } from "./convert-dates-to-dayjs";
import dayjs from "dayjs";
import { describe, expect, it } from "@jest/globals";

describe("convertDatesToDayjs", () => {
  it("throws an error when start date is invalid", () => {
    expect(() => convertDatesToDayjs(["invalid-date", "2023-10-31"])).toThrow("Invalid start date: invalid-date");
  });

  it("throws an error when end date is invalid", () => {
    expect(() => convertDatesToDayjs(["2023-10-01", "invalid-date"])).toThrow("Invalid end date: invalid-date");
  });

  it("throws an error when start date is after end date", () => {
    expect(() => convertDatesToDayjs(["2023-10-31", "2023-10-01"])).toThrow("Start date cannot be after end date");
  });

  it("converts valid date strings to Dayjs objects", () => {
    const result = convertDatesToDayjs(["2023-10-01", "2023-10-31"]);
    expect(result[0].isSame(dayjs("2023-10-01"))).toBe(true);
    expect(result[1].isSame(dayjs("2023-10-31"))).toBe(true);
  });

  it("throws an error when start date is empty", () => {
    expect(() => convertDatesToDayjs(["", "2023-10-31"])).toThrow("Invalid start date: ");
  });

  it("throws an error when end date is empty", () => {
    expect(() => convertDatesToDayjs(["2023-10-01", ""])).toThrow("Invalid end date: ");
  });
});
