import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase";

export const loginThunk = createAsyncThunk<void, { email: string }>(
  "auth/login",
  async (credentials: { email: string }, thunkAPI) => {
    try {
      if (!credentials.email) {
        return thunkAPI.rejectWithValue({
          message: "Email is required for login",
          source: "loginThunk",
          type: "auth",
        });
      }

      // ---- Skip OTP resend for Maestro ----
      if (
        ["development", "preview"].includes(
          process.env.EXPO_PUBLIC_APP_VARIANT!,
        ) &&
        credentials.email === "maestro@e2e.com"
      ) {
        return;
      }
      // -------------------------------------

      const { error } = await supabase.auth.signInWithOtp({
        email: credentials.email,
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
