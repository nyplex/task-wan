import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { setSession } from "./authSlice";
import { apiSlice } from "../apiSlice/apiSlice";
import { RootState } from "@/redux/store";
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

export const verifyOTPThunk = createAsyncThunk<
  void,
  { email: string; token: string },
  {
    rejectValue: GlobalError;
  }
>("auth/verifyOTP", async (otp: { email: string; token: string }, thunkAPI) => {
  try {
    if (!otp.email || !otp.token) {
      return thunkAPI.rejectWithValue({
        message: "Email and token are required for verification",
        source: "verifyOTPThunk",
        type: "auth",
      });
    }
    const { error } = await supabase.auth.verifyOtp({
      email: otp.email,
      token: otp.token,
      type: "email",
    });

    if (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        source: "verifyOTPThunk/supabase",
        type: "auth",
      });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error instanceof Error ? error?.message : "Unknown error",
      source: "verifyOTPThunk",
      type: "auth",
    });
  }
});

export const resendOTPThunk = createAsyncThunk<
  void,
  { email: string },
  {
    rejectValue: GlobalError;
  }
>("auth/resendOTP", async (params: { email: string }, thunkAPI) => {
  try {
    if (!params.email) {
      return thunkAPI.rejectWithValue({
        message: "Email is required to resend OTP",
        source: "resendOTPThunk",
        type: "auth",
      });
    }
    const { error } = await supabase.auth.signInWithOtp({
      email: params.email,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        source: "resendOTPThunk/supabase",
        type: "auth",
      });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error instanceof Error ? error?.message : "Unknown error",
      source: "resendOTPThunk",
      type: "auth",
    });
  }
});

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

// This thunk initializes the authentication by downloading necessary data
export const initializeAuthThunk = createAsyncThunk(
  "auth/initialize",
  async (session: Session | null, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      thunkAPI.dispatch(setSession(session));

      if (!session) {
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
