import { convertDatesToDayjs } from "./convert-dates-to-dayjs";
import dayjs from "dayjs";
import { describe, expect, it } from "@jest/globals";

describe("convertDatesToDayjs", () => {
  it("converts valid date strings to Dayjs objects", () => {
    const result = convertDatesToDayjs(["2023-10-01", "2023-10-31"]);
    expect(result[0].isSame(dayjs("2023-10-01"))).toBe(true);
    expect(result[1].isSame(dayjs("2023-10-31"))).toBe(true);
  });

  it("handles invalid date strings gracefully", () => {
    const result = convertDatesToDayjs(["invalid-date", "2023-10-31"]);
    expect(result[0].isValid()).toBe(false);
    expect(result[1].isSame(dayjs("2023-10-31"))).toBe(true);
  });

  it("handles empty date strings gracefully", () => {
    const result = convertDatesToDayjs(["", "2023-10-31"]);
    expect(result[0].isValid()).toBe(false);
    expect(result[1].isSame(dayjs("2023-10-31"))).toBe(true);
  });
});
