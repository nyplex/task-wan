import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { setSession } from "./authSlice";
import { apiSlice } from "../apiSlice/apiSlice";
import { RootState } from "@/redux/store";
import { GlobalError } from "@/types/errors";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string }, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: credentials.email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data.session; // Return the session on successful login
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred during login");
      }
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
    return null; // Return null to signify logout
  } catch (error) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

export const signupThunk = createAsyncThunk<
  void,
  { email: string; username: string },
  {
    rejectValue: GlobalError;
  }
>("auth/signup", async (credentials: { email: string; username: string }, thunkAPI) => {
  try {
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

export const verifyOTPThunk = createAsyncThunk(
  "auth/verifyOTP",
  async (otp: { email: string; token: string }, thunkAPI) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: otp.email,
        token: otp.token,
        type: "email",
      });

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred during OTP verification");
      }
    }
  }
);

// This thunk initializes the authentication by downloading necessary data
export const initializeAuthThunk = createAsyncThunk(
  "auth/initialize",
  async (session: Session | null, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      thunkAPI.dispatch(setSession(session));

      if (!session) {
        console.log("No session found, skipping profile fetch");
        return;
      }

      const state = thunkAPI.getState() as RootState;
      const cached = apiSlice.endpoints.getProfile.select({ userID: session.user.id })(state);

      if (!cached?.status || cached.status === "uninitialized") {
        await thunkAPI
          .dispatch(apiSlice.endpoints.getProfile.initiate({ userID: session.user.id }))
          .unwrap();
      }
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred during initialization");
      }
    }
  }
);
