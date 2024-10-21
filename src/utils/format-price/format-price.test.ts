import { describe, expect, it, jest } from "@jest/globals";

jest.unstable_mockModule("@/utils/local-storage", () => ({
  getLanguage: jest.fn(),
}));

describe("formatPrice", () => {
  it("returns '0' if price is an empty string", async () => {
    const { getLanguage } = await import("@/utils/local-storage");
    const { formatPrice } = await import("./format-price");
    (getLanguage as jest.Mock).mockReturnValue("en-US");
    const result = formatPrice("");
    expect(result).toBe("0.00");
  });

  it("returns '0' if price is not a number", async () => {
    const { getLanguage } = await import("@/utils/local-storage");
    const { formatPrice } = await import("./format-price");
    (getLanguage as jest.Mock).mockReturnValue("en-US");
    const result = formatPrice("abc");
    expect(result).toBe("0.00");
  });

  it("handles zero price correctly", async () => {
    const { getLanguage } = await import("@/utils/local-storage");
    const { formatPrice } = await import("./format-price");
    (getLanguage as jest.Mock).mockReturnValue("en-US");
    const result = formatPrice(0);
    expect(result).toBe("0.00");
  });

  it("formats price correctly with default decimals", async () => {
    const { getLanguage } = await import("@/utils/local-storage");
    const { formatPrice } = await import("./format-price");
    (getLanguage as jest.Mock).mockReturnValue("en-US");
    const result = formatPrice(1234.567);
    expect(result).toBe("1,234.57");
  });

  it("formats price correctly with specified decimals", async () => {
    const { getLanguage } = await import("@/utils/local-storage");
    const { formatPrice } = await import("./format-price");
    (getLanguage as jest.Mock).mockReturnValue("en-US");
    const result = formatPrice(1234.567, 1);
    expect(result).toBe("1,234.6");
  });

  it("formats price correctly for different locales", async () => {
    const { getLanguage } = await import("@/utils/local-storage");
    const { formatPrice } = await import("./format-price");
    (getLanguage as jest.Mock).mockReturnValue("de-DE");
    const result = formatPrice(1234.567);
    expect(result).toBe("1.234,57");
  });

  it("handles negative price correctly", async () => {
    const { getLanguage } = await import("@/utils/local-storage");
    const { formatPrice } = await import("./format-price");
    (getLanguage as jest.Mock).mockReturnValue("en-US");
    const result = formatPrice(-1234.567);
    expect(result).toBe("-1,234.57");
  });
});
