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

    // ---- Skip OTP verification for Maestro ----
    if (
      ["development", "preview"].includes(process.env.EXPO_PUBLIC_APP_VARIANT!) &&
      otp.email === "maestro@e2e.com" &&
      otp.token === "123456"
    ) {
      const { error } = await supabase.auth.signInWithPassword({
        email: otp.email,
        password: process.env.EXPO_PUBLIC_MAESTRO_USER_PASSWORD!,
      });
      if (error) {
        return thunkAPI.rejectWithValue({
          message: error.message,
          source: "verifyOTPThunk/supabase",
          type: "auth",
        });
      }
      return;
    }
    // -------------------------------------

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
