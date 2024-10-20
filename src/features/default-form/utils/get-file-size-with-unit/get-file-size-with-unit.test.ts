import { getFileSizeWithUnit } from "./get-file-size-with-unit";
import { describe, expect, it } from "@jest/globals";

describe("getFileSizeWithUnit", () => {
  it("returns size in bytes for values less than 1024", () => {
    const result = getFileSizeWithUnit(512);
    expect(result).toBe("512 B");
  });

  it("returns size in kilobytes for values between 1024 and 1048576", () => {
    const result = getFileSizeWithUnit(2048);
    expect(result).toBe("2.00 KB");
  });

  it("returns size in megabytes for values greater than or equal to 1048576", () => {
    const result = getFileSizeWithUnit(2097152);
    expect(result).toBe("2.00 MB");
  });

  it("returns size in kilobytes with two decimal places", () => {
    const result = getFileSizeWithUnit(1536);
    expect(result).toBe("1.50 KB");
  });

  it("returns size in megabytes with two decimal places", () => {
    const result = getFileSizeWithUnit(1572864);
    expect(result).toBe("1.50 MB");
  });

  it("handles zero size correctly", () => {
    const result = getFileSizeWithUnit(0);
    expect(result).toBe("0 B");
  });

  it("handles very large sizes correctly", () => {
    const result = getFileSizeWithUnit(1073741824);
    expect(result).toBe("1024.00 MB");
  });
});
