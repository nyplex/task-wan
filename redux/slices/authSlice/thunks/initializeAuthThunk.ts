import { createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { setSession } from "../authSlice";
import { apiSlice } from "../../apiSlice/apiSlice";

// This thunk initializes the authentication by downloading necessary data
export const initializeAuthThunk = createAsyncThunk(
  "auth/initialize",
  async (session: Session | null, thunkAPI) => {
    try {
      thunkAPI.dispatch(setSession(session));

      if (!session) {
        return;
      }

      await thunkAPI
        .dispatch(apiSlice.endpoints.getProfile.initiate({ userID: session.user.id }))
        .unwrap();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred during initialization");
      }
    }
  }
);
