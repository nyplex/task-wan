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
    const result = await loginThunk({ email: "" })(dispatch, getState, thunkAPI);
    expect(result.payload).toEqual({
      message: "Email is required for login",
      source: "loginThunk",
      type: "auth",
    });
  });

  it("rejects if supabase returns error", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
      error: { message: "Login error" },
    });
    const result = await loginThunk({ email: "test@example.com" })(dispatch, getState, thunkAPI);
    expect(result.payload).toEqual({
      message: "Login error",
      source: "loginThunk/supabase",
      type: "auth",
    });
  });

  it("resolves if login is successful", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({ error: null });
    const result = await loginThunk({ email: "test@example.com" })(dispatch, getState, thunkAPI);
    expect(result.payload).toBeUndefined();
  });

  it("rejects with error if exception is thrown", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockImplementation(() => {
      throw new Error("Network error");
    });
    const result = await loginThunk({ email: "test@example.com" })(dispatch, getState, thunkAPI);
    expect(result.payload).toEqual({
      message: "Network error",
      source: "loginThunk",
      type: "auth",
    });
  });
});
