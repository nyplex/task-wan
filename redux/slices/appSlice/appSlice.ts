import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initializeAuthThunk } from "../authSlice/thunks/initializeAuthThunk";
import { initializeAppThunk } from "./thunks/initializeAppThunk";

// ------------------------------
// Define the State Interface
// ------------------------------
export interface AppStateType {
  isAppReady: boolean;
  isLoading: boolean;
  appVersion: string;
  theme: "light" | "dark" | "system";
  appInitDone: boolean;
  authInitDone: boolean;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: AppStateType = {
  isAppReady: false,
  isLoading: false,
  appVersion: "1.0.0",
  theme: "system",
  appInitDone: false,
  authInitDone: false,
};

// ------------------------------
// Slice Definition
// ------------------------------
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppReady: (state, action: PayloadAction<boolean>) => {
      state.isAppReady = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAppVersion: (state, action: PayloadAction<string>) => {
      state.appVersion = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAppThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAppThunk.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.appInitDone = true;
        state.isAppReady = false;
      })
      .addCase(initializeAppThunk.fulfilled, (state) => {
        state.appInitDone = true;
        if (state.authInitDone) {
          state.isLoading = false;
          state.isAppReady = true;
        }
      })
      .addCase(initializeAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuthThunk.rejected, (state) => {
        state.isLoading = false;
        state.authInitDone = true;
        state.isAppReady = false;
      })
      .addCase(initializeAuthThunk.fulfilled, (state) => {
        state.authInitDone = true;
        if (state.appInitDone) {
          state.isLoading = false;
          state.isAppReady = true;
        }
      });
  },
});

// ------------------------------
// Exports
// ------------------------------
export const { setAppReady, setIsLoading, setAppVersion, toggleTheme } = appSlice.actions;

export default appSlice.reducer;
