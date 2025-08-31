import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSession } from "@/features/authentication/authSlice/authSlice";
import { Session } from "@supabase/supabase-js";
import { setupPowerSync } from "@/powersync/system";

// This thunk initializes the authentication by downloading necessary data
export const initializeAuthThunk = createAsyncThunk(
  "auth/initialize",
  async (session: Session | null, thunkAPI) => {
    try {
      thunkAPI.dispatch(setSession(session));

      if (!session) {
        return;
      }
      await setupPowerSync(session.access_token);
    } catch (error) {
      throw error;
    }
  },
);
