import { setUppercaseFirstLetter } from "./set-uppercase-first-letter";
import { describe, expect, it } from "@jest/globals";

describe("setUppercaseFirstLetter", () => {
  it("returns the string with the first letter capitalized", () => {
    const result = setUppercaseFirstLetter("hello");
    expect(result).toBe("Hello");
  });

  it("returns an empty string if the input is an empty string", () => {
    const result = setUppercaseFirstLetter("");
    expect(result).toBe("");
  });

  it("returns the same string if the first character is already uppercase", () => {
    const result = setUppercaseFirstLetter("Hello");
    expect(result).toBe("Hello");
  });

  it("returns the string with the first letter capitalized for single character input", () => {
    const result = setUppercaseFirstLetter("h");
    expect(result).toBe("H");
  });

  it("handles strings with leading whitespace correctly", () => {
    const result = setUppercaseFirstLetter(" hello");
    expect(result).toBe(" hello");
  });

  it("handles strings with special characters correctly", () => {
    const result = setUppercaseFirstLetter("!hello");
    expect(result).toBe("!hello");
  });
});
