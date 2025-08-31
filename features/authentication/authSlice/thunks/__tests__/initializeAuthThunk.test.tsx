import { setSession } from "@/features/authentication/authSlice/authSlice";
import { initializeAuthThunk } from "../initializeAuthThunk";

jest.mock("@/features/authentication/authSlice/authSlice", () => ({
  setSession: jest.fn(),
}));
jest.mock("@/powersync/system", () => ({
  setupPowerSync: jest.fn().mockResolvedValue(undefined),
}));

describe("initializeAuthThunk", () => {
  const dispatch = jest.fn((fn) => (typeof fn === "function" ? fn() : fn));
  const getState = jest.fn();
  const rejectWithValue = jest.fn((v) => v);
  const thunkAPI = { dispatch, getState, rejectWithValue };
  const session = {
    access_token: "token",
    refresh_token: "refresh",
    expires_in: 3600,
    token_type: "bearer",
    user: {
      id: "user123",
      app_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
      user_metadata: {},
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches setSession with null session and returns undefined", async () => {
    const result = await initializeAuthThunk(null)(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(setSession).toHaveBeenCalledWith(null);
    expect(result.payload).toBeUndefined();
  });

  it("dispatches setSession and calls setupPowerSync with valid session", async () => {
    const { setupPowerSync } = require("@/powersync/system");
    const result = await initializeAuthThunk(session)(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(setSession).toHaveBeenCalledWith(session);
    expect(setupPowerSync).toHaveBeenCalledWith(session.access_token);
    expect(result.payload).toBeUndefined();
  });

  it("rejects with error if setupPowerSync throws", async () => {
    const { setupPowerSync } = require("@/powersync/system");
    setupPowerSync.mockRejectedValueOnce(new Error("PowerSync error"));
    const result = await initializeAuthThunk(session)(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.meta.requestStatus).toBe("rejected");
    expect((result as any).error.message).toBe("PowerSync error");
  });
});
