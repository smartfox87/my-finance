import { describe, expect, it, jest } from "@jest/globals";

jest.unstable_mockModule("@/utils/get-storage-item-by-regexp", () => ({
  findStorageItemByRegExp: jest.fn(),
}));

describe("getSession", () => {
  it("returns the session token if it exists in localStorage", async () => {
    const { findStorageItemByRegExp } = await import("@/utils/get-storage-item-by-regexp");
    (findStorageItemByRegExp as jest.Mock).mockReturnValue("sb-12345-auth-token");
    const { getSession } = await import("./get-session");

    const result = getSession();
    expect(result).toBe("sb-12345-auth-token");
  });

  it("returns null if no session token exists in localStorage", async () => {
    const { findStorageItemByRegExp } = await import("@/utils/get-storage-item-by-regexp");
    (findStorageItemByRegExp as jest.Mock).mockReturnValue(null);
    const { getSession } = await import("./get-session");

    const result = getSession();
    expect(result).toBeNull();
  });

  it("returns null if the session token does not match the regex pattern", async () => {
    const { findStorageItemByRegExp } = await import("@/utils/get-storage-item-by-regexp");
    (findStorageItemByRegExp as jest.Mock).mockReturnValue(null);
    const { getSession } = await import("./get-session");

    const result = getSession();
    expect(result).toBeNull();
  });
});
