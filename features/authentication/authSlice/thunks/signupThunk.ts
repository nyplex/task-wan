import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase";

export const signupThunk = createAsyncThunk<
  void,
  { email: string; username: string }
>(
  "auth/signup",
  async (credentials: { email: string; username: string }, thunkAPI) => {
    try {
      if (!credentials.email || !credentials.username) {
        return thunkAPI.rejectWithValue({
          message: "Email and username are required for signup",
          source: "signupThunk",
          type: "auth",
        });
      }

      // ---- Skip OTP for Maestro ----
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
          shouldCreateUser: true,
          data: {
            username: credentials.username,
          },
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
