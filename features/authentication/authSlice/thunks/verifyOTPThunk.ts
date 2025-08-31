import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase";

export const verifyOTPThunk = createAsyncThunk<
  void,
  { email: string; token: string }
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
      ["development", "preview"].includes(
        process.env.EXPO_PUBLIC_APP_VARIANT!,
      ) &&
      otp.email === "maestro@e2e.com" &&
      otp.token === "123456"
    ) {
      const { error } = await supabase.auth.signInWithPassword({
        email: otp.email,
        password: process.env.EXPO_PUBLIC_MAESTRO_USER_PASSWORD!,
      });
      if (error) {
        throw error;
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
      throw error;
    }
  } catch (error) {
    throw error;
  }
});
