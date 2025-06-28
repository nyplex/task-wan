// src/store/slices/appSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { initializeAuthThunk } from "../authSlice/authThunks";
import { apiSlice } from "../apiSlice/apiSlice";

// ------------------------------
// Define the State Interface
// ------------------------------
export interface AppStateType {
  isAppReady: boolean;
  isLoading: boolean;
  appVersion: string;
  theme: "light" | "dark" | "system";
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: AppStateType = {
  isAppReady: false,
  isLoading: true,
  appVersion: "1.0.0",
  theme: "system",
};

// ------------------------------
// Slice Definition
// ------------------------------
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Example of a simple reducer
    setAppReady: (state, action: PayloadAction<boolean>) => {
      state.isAppReady = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAppVersion: (state, action: PayloadAction<string>) => {
      state.appVersion = action.payload;
    },
    // Using `prepare` to automatically add timestamp or metadata
    // showToast: {
    //   reducer: (state, action: PayloadAction<string | null>) => {
    //     state.toastMessage = action.payload;
    //   },
    //   prepare: (message: string) => {
    //     return { payload: message + " 🔔" };
    //   },
    // },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
  extraReducers: (builder) => {
    // Handling async thunk states
    builder
      .addCase(initializeAuthThunk.pending, (state) => {
        console.log("INITIALIZE AUTH THUNK PENDING");
        state.isLoading = true;
      })
      .addCase(
        initializeAuthThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log("INITIALIZE AUTH THUNK FULFILLED");
          state.isAppReady = true;
          state.isLoading = false;
        }
      )
      .addCase(
        initializeAuthThunk.rejected,
        (state, action: PayloadAction<any>) => {
          console.log("Auth initialization failed:");
          state.isLoading = false;
        }
      )
      .addMatcher(
        apiSlice.endpoints.updateProfile.matchFulfilled,
        (state, action: PayloadAction<any>) => {
          console.log("Profile updated successfully:", action.payload);
          // Handle profile update logic if needed
        }
      );
  },
});

// ------------------------------
// Exports
// ------------------------------
export const { setAppReady, setIsLoading, setAppVersion, toggleTheme } =
  appSlice.actions;

export default appSlice.reducer;
