import { describe, expect, it, jest } from "@jest/globals";

describe("getPublicUrl", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("returns PUBLIC_URL with https if PUBLIC_URL is defined", async () => {
    jest.unstable_mockModule("@/constants/config", () => ({
      PUBLIC_URL: "public-url.com",
      VERCEL_URL: "vercel-url.com",
    }));

    const { getPublicUrl } = await import("./get-public-url");
    const result = getPublicUrl();
    expect(result).toBe("https://public-url.com");
  });

  it("returns VERCEL_URL with https if PUBLIC_URL is not defined", async () => {
    jest.unstable_mockModule("@/constants/config", () => ({
      PUBLIC_URL: "",
      VERCEL_URL: "vercel-url.com",
    }));

    const { getPublicUrl } = await import("./get-public-url");
    const result = getPublicUrl();
    expect(result).toBe("https://vercel-url.com");
  });

  it("throws an error if neither PUBLIC_URL nor VERCEL_URL is defined", async () => {
    jest.unstable_mockModule("@/constants/config", () => ({
      PUBLIC_URL: "",
      VERCEL_URL: "",
    }));

    const { getPublicUrl } = await import("./get-public-url");
    expect(() => getPublicUrl()).toThrow("No public URL found in environment variables");
  });
});
