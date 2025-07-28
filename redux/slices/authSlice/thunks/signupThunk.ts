import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError } from "@/types/errors";

export const signupThunk = createAsyncThunk<
  void,
  { email: string; username: string },
  {
    rejectValue: GlobalError;
  }
>("auth/signup", async (credentials: { email: string; username: string }, thunkAPI) => {
  try {
    if (!credentials.email || !credentials.username) {
      return thunkAPI.rejectWithValue({
        message: "Email and username are required for signup",
        source: "signupThunk",
        type: "auth",
      });
    }
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
      return thunkAPI.rejectWithValue({
        message: error.message,
        source: "signupThunk/supabase",
        type: "auth",
      });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error instanceof Error ? error?.message : "Unknown error",
      source: "signupThunk",
      type: "auth",
    });
  }
});
