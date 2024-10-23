import { describe, expect, it, jest } from "@jest/globals";

jest.unstable_mockModule("@/utils/get-session", () => ({
  getSession: jest.fn(),
}));

describe("getUserId", () => {
  it("returns user id if session exists and is valid", async () => {
    const { getUserId } = await import("./get-user-id");
    const { getSession } = await import("@/features/user-id/utils/get-session");
    (getSession as jest.Mock).mockReturnValue(JSON.stringify({ user: { id: "user-123" } }));
    const result = getUserId();
    expect(result).toBe("user-123");
  });

  it("returns null if session does not exist", async () => {
    const { getUserId } = await import("./get-user-id");
    const { getSession } = await import("@/features/user-id/utils/get-session");
    (getSession as jest.Mock).mockReturnValue(null);
    const result = getUserId();
    expect(result).toBeNull();
  });

  it("returns null if session is invalid JSON", async () => {
    const { getUserId } = await import("./get-user-id");
    const { getSession } = await import("@/features/user-id/utils/get-session");
    (getSession as jest.Mock).mockReturnValue("invalid-json");
    const result = getUserId();
    expect(result).toBeNull();
  });

  it("returns null if session does not contain user id", async () => {
    const { getUserId } = await import("./get-user-id");
    const { getSession } = await import("@/features/user-id/utils/get-session");
    (getSession as jest.Mock).mockReturnValue(JSON.stringify({ user: {} }));
    const result = getUserId();
    expect(result).toBeNull();
  });
});
