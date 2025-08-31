import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { supabase } from "@/lib/supabase";

export const logoutThunk = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signOut();
      thunkAPI.dispatch(apiSlice.util.resetApiState());
      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  },
);
