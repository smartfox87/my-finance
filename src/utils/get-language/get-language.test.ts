import { getLanguage } from "./get-language";
import { describe, expect, it } from "@jest/globals";

describe("getLanguage", () => {
  it("returns the language if NEXT_LOCALE cookie is present", () => {
    Object.defineProperty(document, "cookie", {
      value: "NEXT_LOCALE=en-US",
      writable: true,
    });
    const result = getLanguage();
    expect(result).toBe("en-US");
  });

  it("returns undefined if NEXT_LOCALE cookie is not present", () => {
    Object.defineProperty(document, "cookie", {
      value: "OTHER_COOKIE=value",
      writable: true,
    });
    const result = getLanguage();
    expect(result).toBeUndefined();
  });

  it("returns the correct language when multiple cookies are present", () => {
    Object.defineProperty(document, "cookie", {
      value: "OTHER_COOKIE=value; NEXT_LOCALE=fr-FR",
      writable: true,
    });
    const result = getLanguage();
    expect(result).toBe("fr-FR");
  });

  it("returns undefined if cookies are empty", () => {
    Object.defineProperty(document, "cookie", {
      value: "",
      writable: true,
    });
    const result = getLanguage();
    expect(result).toBeUndefined();
  });

  it("returns undefined if NEXT_LOCALE cookie has no value", () => {
    Object.defineProperty(document, "cookie", {
      value: "NEXT_LOCALE=",
      writable: true,
    });
    const result = getLanguage();
    expect(result).toBeUndefined();
  });
});
