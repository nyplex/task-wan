import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { setSession } from "./authSlice";
import { initializeApp } from "../appSlice/appThunks";
import { powersync } from "@/powersync/system";
import { GET_PROFILE_BY_ID } from "@/powersync/sql/profile.queries";
import { apiSlice } from "../apiSlice/apiSlice";

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
        console.log("Login error:", error);

        return thunkAPI.rejectWithValue(error);
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

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (credentials: { email: string; username: string }, thunkAPI) => {
    try {
      const { error, data } = await supabase.auth.signInWithOtp({
        email: credentials.email,
        options: {
          shouldCreateUser: true,
          data: {
            username: credentials.username,
          },
        },
      });

      if (error) {
        return thunkAPI.rejectWithValue(error);
      }

      return data.user; // Return the user on successful signup
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred during signup");
      }
    }
  }
);

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
        return thunkAPI.rejectWithValue(error);
      }

      return true; // Return true on successful OTP verification
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
      console.log("RUNNING INITIALIZE AUTH THUNK");
      await thunkAPI.dispatch(initializeApp()).unwrap();
      // fakse await of 10 sec
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      thunkAPI.dispatch(setSession(session));

      // const res = await powersync.get(GET_PROFILE_BY_ID, [session?.user.id])
      if (!session) {
        console.log("No session found, skipping profile fetch");
        return;
      }

      await thunkAPI.dispatch(
        apiSlice.endpoints.getProfile.initiate({
          userID: session.user.id,
        })
      );
    } catch (error) {
      console.log("Error in initializeAuthThunk:", error);

      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred during initialization");
      }
    }
  }
);
