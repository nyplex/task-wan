import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initializeAuthThunk } from "@/features/authentication/authSlice/thunks/initializeAuthThunk";

export interface AppStateType {
  isAppReady: boolean;
  isLoading: boolean;
  appVersion: string;
  theme: "light" | "dark" | "system";
  authInitDone: boolean;
}

const initialState: AppStateType = {
  isAppReady: false,
  isLoading: true,
  appVersion: "1.0.0",
  theme: "system",
  authInitDone: false,
};

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
    setAuthInitDone: (state, action: PayloadAction<boolean>) => {
      state.authInitDone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.isLoading = false;
        state.isAppReady = true;
      });
  },
});

export const {
  setAppReady,
  setIsLoading,
  setAppVersion,
  toggleTheme,
  setAuthInitDone,
} = appSlice.actions;

export default appSlice.reducer;
