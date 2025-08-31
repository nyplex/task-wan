import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase";

export const resendOTPThunk = createAsyncThunk<void, { email: string }>(
  "auth/resendOTP",
  async (params: { email: string }, thunkAPI) => {
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
        ["development", "preview"].includes(
          process.env.EXPO_PUBLIC_APP_VARIANT!,
        ) &&
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
        throw error;
      }
    } catch (error) {
      throw error;
    }
  },
);
