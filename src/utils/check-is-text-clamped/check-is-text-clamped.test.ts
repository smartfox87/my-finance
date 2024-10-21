import { checkIsTextClamped } from "./check-is-text-clamped";
import { describe, expect, it } from "@jest/globals";

describe("checkIsTextClamped", () => {
  it("returns true if element's scrollHeight is greater than clientHeight", () => {
    const element = {
      scrollHeight: 200,
      clientHeight: 100,
      scrollWidth: 100,
      clientWidth: 100,
    } as HTMLElement;
    const result = checkIsTextClamped(element);
    expect(result).toBe(true);
  });

  it("returns true if element's scrollWidth is greater than clientWidth", () => {
    const element = {
      scrollHeight: 100,
      clientHeight: 100,
      scrollWidth: 200,
      clientWidth: 100,
    } as HTMLElement;
    const result = checkIsTextClamped(element);
    expect(result).toBe(true);
  });

  it("returns false if element's scrollHeight and scrollWidth are equal to clientHeight and clientWidth", () => {
    const element = {
      scrollHeight: 100,
      clientHeight: 100,
      scrollWidth: 100,
      clientWidth: 100,
    } as HTMLElement;
    const result = checkIsTextClamped(element);
    expect(result).toBe(false);
  });
});
