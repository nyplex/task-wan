import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError } from "@/types/errors";

export const loginThunk = createAsyncThunk<
  void,
  { email: string },
  {
    rejectValue: GlobalError;
  }
>("auth/login", async (credentials: { email: string }, thunkAPI) => {
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
      ["development", "preview"].includes(process.env.EXPO_PUBLIC_APP_VARIANT!) &&
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
      return thunkAPI.rejectWithValue({
        message: error.message,
        source: "loginThunk/supabase",
        type: "auth",
      });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error instanceof Error ? error?.message : "Unknown error",
      source: "loginThunk",
      type: "auth",
    });
  }
});
