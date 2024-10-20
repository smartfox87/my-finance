import { addHttpsToUrl } from "./add-https-to-url";
import { describe, expect, it } from "@jest/globals";

describe("addHttpsToUrl", () => {
  it("returns the same URL if it already includes http", () => {
    const result = addHttpsToUrl("http://example.com");
    expect(result).toBe("http://example.com");
  });

  it("returns the same URL if it already includes https", () => {
    const result = addHttpsToUrl("https://example.com");
    expect(result).toBe("https://example.com");
  });

  it("adds https to the URL if it does not include http or https", () => {
    const result = addHttpsToUrl("example.com");
    expect(result).toBe("https://example.com");
  });

  it("handles URLs with subdomains correctly", () => {
    const result = addHttpsToUrl("sub.example.com");
    expect(result).toBe("https://sub.example.com");
  });

  it("handles URLs with paths correctly", () => {
    const result = addHttpsToUrl("example.com/path");
    expect(result).toBe("https://example.com/path");
  });

  it("handles URLs with query parameters correctly", () => {
    const result = addHttpsToUrl("example.com?query=param");
    expect(result).toBe("https://example.com?query=param");
  });

  it("handles URLs with fragments correctly", () => {
    const result = addHttpsToUrl("example.com#fragment");
    expect(result).toBe("https://example.com#fragment");
  });
});
