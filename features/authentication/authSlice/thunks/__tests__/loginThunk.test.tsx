import { loginThunk } from "../loginThunk";
import { supabase } from "@/lib/supabase";

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn(),
    },
  },
}));

describe("loginThunk", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const rejectWithValue = jest.fn((v) => v);
  const thunkAPI = { dispatch, getState, rejectWithValue };

  it("rejects if email is missing", async () => {
    const result = await loginThunk({ email: "" })(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.payload).toEqual({
      message: "Email is required for login",
      source: "loginThunk",
      type: "auth",
    });
    expect(result.meta.requestStatus).toBe("rejected");
  });

  it("skips OTP for Maestro in development/preview", async () => {
    const OLD_ENV = process.env.EXPO_PUBLIC_APP_VARIANT;
    process.env.EXPO_PUBLIC_APP_VARIANT = "development";
    const result = await loginThunk({ email: "maestro@e2e.com" })(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.payload).toBeUndefined();
    expect(result.meta.requestStatus).toBe("fulfilled");
    process.env.EXPO_PUBLIC_APP_VARIANT = OLD_ENV;
  });

  it("rejects if supabase returns error", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
      error: { message: "Login error" },
    });
    const result = await loginThunk({ email: "test@example.com" })(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.meta.requestStatus).toBe("rejected");
    expect((result as any).error.message).toBe("Login error");
  });

  it("resolves if login is successful", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
      error: null,
    });
    const result = await loginThunk({ email: "test@example.com" })(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.payload).toBeUndefined();
    expect(result.meta.requestStatus).toBe("fulfilled");
  });

  it("rejects with error if exception is thrown", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockImplementation(() => {
      throw new Error("Network error");
    });
    const result = await loginThunk({ email: "test@example.com" })(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.meta.requestStatus).toBe("rejected");
    expect((result as any).error.message).toBe("Network error");
  });
});
