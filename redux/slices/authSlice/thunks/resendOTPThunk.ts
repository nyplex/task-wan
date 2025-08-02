import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError } from "@/types/errors";

export const resendOTPThunk = createAsyncThunk<
  void,
  { email: string },
  {
    rejectValue: GlobalError;
  }
>("auth/resendOTP", async (params: { email: string }, thunkAPI) => {
  try {
    if (!params.email) {
      return thunkAPI.rejectWithValue({
        message: "Email is required to resend OTP",
        source: "resendOTPThunk",
        type: "auth",
      });
    }

    // ---- Skip OTP resend for Maestro ----
    if (
      ["development", "preview"].includes(process.env.EXPO_PUBLIC_APP_VARIANT!) &&
      params.email === "maestro@e2e.com"
    ) {
      return;
    }
    // -------------------------------------

    const { error } = await supabase.auth.signInWithOtp({
      email: params.email,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        source: "resendOTPThunk/supabase",
        type: "auth",
      });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error instanceof Error ? error?.message : "Unknown error",
      source: "resendOTPThunk",
      type: "auth",
    });
  }
});
