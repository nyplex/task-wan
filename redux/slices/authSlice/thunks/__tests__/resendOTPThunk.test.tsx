import { resendOTPThunk } from "../resendOTPThunk";
import { supabase } from "@/lib/supabase";

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn(),
    },
  },
}));

describe("resendOTPThunk", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const rejectWithValue = jest.fn((v) => v);
  const thunkAPI = { dispatch, getState, rejectWithValue };

  it("rejects if email is missing", async () => {
    const result = await resendOTPThunk({ email: "" })(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.payload).toEqual({
      message: "Email is required to resend OTP",
      source: "resendOTPThunk",
      type: "auth",
    });
  });

  it("rejects if supabase returns error", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
      error: { message: "Resend error" },
    });
    const result = await resendOTPThunk({ email: "test@example.com" })(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.payload).toEqual({
      message: "Resend error",
      source: "resendOTPThunk/supabase",
      type: "auth",
    });
  });

  it("resolves if resend is successful", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
      error: null,
    });
    const result = await resendOTPThunk({ email: "test@example.com" })(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.payload).toBeUndefined();
  });

  it("rejects with error if exception is thrown", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockImplementation(() => {
      throw new Error("Network error");
    });
    const result = await resendOTPThunk({ email: "test@example.com" })(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.payload).toEqual({
      message: "Network error",
      source: "resendOTPThunk",
      type: "auth",
    });
  });
});
