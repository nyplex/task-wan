import { signupThunk } from "../signupThunk";
import { supabase } from "@/lib/supabase";

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn(),
    },
  },
}));

describe("signupThunk", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const rejectWithValue = jest.fn((v) => v);
  const thunkAPI = { dispatch, getState, rejectWithValue };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects if email or username is missing", async () => {
    const result = await signupThunk({ email: "", username: "" })(dispatch, getState, thunkAPI);
    expect(result.payload).toEqual({
      message: "Email and username are required for signup",
      source: "signupThunk",
      type: "auth",
    });
  });

  it("rejects if supabase returns error", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
      error: { message: "Signup error" },
    });
    const result = await signupThunk({ email: "test@example.com", username: "alex" })(
      dispatch,
      getState,
      thunkAPI
    );
    expect(result.payload).toEqual({
      message: "Signup error",
      source: "signupThunk/supabase",
      type: "auth",
    });
  });

  it("resolves if signup is successful", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({ error: null });
    const result = await signupThunk({ email: "test@example.com", username: "alex" })(
      dispatch,
      getState,
      thunkAPI
    );
    expect(result.payload).toBeUndefined();
  });

  it("rejects with error if exception is thrown", async () => {
    (supabase.auth.signInWithOtp as jest.Mock).mockImplementation(() => {
      throw new Error("Network error");
    });
    const result = await signupThunk({ email: "test@example.com", username: "alex" })(
      dispatch,
      getState,
      thunkAPI
    );
    expect(result.payload).toEqual({
      message: "Network error",
      source: "signupThunk",
      type: "auth",
    });
  });
});
