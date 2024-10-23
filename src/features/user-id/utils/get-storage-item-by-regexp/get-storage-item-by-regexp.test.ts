import { findStorageItemByRegExp } from "./get-storage-item-by-regexp";
import { describe, expect, it } from "@jest/globals";

describe("findStorageItemByRegExp", () => {
  it("returns the value of the first matching key", () => {
    localStorage.setItem("testKey1", "value1");
    localStorage.setItem("testKey2", "value2");
    const result = findStorageItemByRegExp(/testKey1/);
    expect(result).toBe("value1");
  });

  it("returns null if no keys match the regex", () => {
    localStorage.setItem("testKey1", "value1");
    localStorage.setItem("testKey2", "value2");
    const result = findStorageItemByRegExp(/nonExistentKey/);
    expect(result).toBeNull();
  });

  it("returns the value of the first matching key when multiple keys match", () => {
    localStorage.setItem("testKey1", "value1");
    localStorage.setItem("testKey2", "value2");
    const result = findStorageItemByRegExp(/testKey/);
    expect(result).toBe("value1");
  });

  it("returns null if localStorage is empty", () => {
    localStorage.clear();
    const result = findStorageItemByRegExp(/anyKey/);
    expect(result).toBeNull();
  });

  it("handles special characters in regex correctly", () => {
    localStorage.setItem("special*Key", "specialValue");
    const result = findStorageItemByRegExp(/special\*Key/);
    expect(result).toBe("specialValue");
  });
});
