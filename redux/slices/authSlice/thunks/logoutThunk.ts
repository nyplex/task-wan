import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError } from "@/types/errors";

export const logoutThunk = createAsyncThunk<
  void,
  void,
  {
    rejectValue: GlobalError;
  }
>("auth/logout", async (_, thunkAPI) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        source: "logoutThunk/supabase",
        type: "auth",
      });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error instanceof Error ? error?.message : "Unknown error",
      source: "logoutThunk",
      type: "auth",
    });
  }
});
