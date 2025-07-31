import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError } from "@/types/errors";

export const verifyOTPThunk = createAsyncThunk<
  void,
  { email: string; token: string },
  {
    rejectValue: GlobalError;
  }
>("auth/verifyOTP", async (otp: { email: string; token: string }, thunkAPI) => {
  try {
    if (!otp.email || !otp.token) {
      return thunkAPI.rejectWithValue({
        message: "Email and token are required for verification",
        source: "verifyOTPThunk",
        type: "auth",
      });
    }
    const { error } = await supabase.auth.verifyOtp({
      email: otp.email,
      token: otp.token,
      type: "email",
    });

    if (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        source: "verifyOTPThunk/supabase",
        type: "auth",
      });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error instanceof Error ? error?.message : "Unknown error",
      source: "verifyOTPThunk",
      type: "auth",
    });
  }
});
