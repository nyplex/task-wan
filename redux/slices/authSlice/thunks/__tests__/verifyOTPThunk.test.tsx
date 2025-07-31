import { verifyOTPThunk } from "../verifyOTPThunk";
import { supabase } from "@/lib/supabase";

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      // verify OTP should be a promise that resolves or rejects and async function
      verifyOtp: jest.fn(),
    },
  },
}));

describe("verifyOTPThunk", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const rejectWithValue = jest.fn((v) => v);
  const thunkAPI = { dispatch, getState, rejectWithValue };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects if email or token is missing", async () => {
    const result = await verifyOTPThunk({ email: "", token: "" })(dispatch, getState, thunkAPI);
    expect(result.payload).toEqual({
      message: "Email and token are required for verification",
      source: "verifyOTPThunk",
      type: "auth",
    });
  });

  it("rejects if supabase returns error", async () => {
    (supabase.auth.verifyOtp as jest.Mock).mockResolvedValue({ error: { message: "Invalid OTP" } });
    const result = await verifyOTPThunk({ email: "test@example.com", token: "123456" })(
      dispatch,
      getState,
      thunkAPI
    );
    expect(result.payload).toEqual({
      message: "Invalid OTP",
      source: "verifyOTPThunk/supabase",
      type: "auth",
    });
  });

  it("resolves if OTP is valid", async () => {
    (supabase.auth.verifyOtp as jest.Mock).mockResolvedValue({ error: null });
    const result = await verifyOTPThunk({ email: "test@example.com", token: "123456" })(
      dispatch,
      getState,
      thunkAPI
    );
    expect(result.payload).toBeUndefined();
  });

  it("rejects with error if exception is thrown", async () => {
    (supabase.auth.verifyOtp as jest.Mock).mockImplementation(() => {
      throw new Error("Network error");
    });
    const result = await verifyOTPThunk({ email: "test@example.com", token: "123456" })(
      dispatch,
      getState,
      thunkAPI
    );
    expect(result.payload).toEqual({
      message: "Network error",
      source: "verifyOTPThunk",
      type: "auth",
    });
  });
});
