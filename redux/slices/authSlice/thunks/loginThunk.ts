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
