import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { initializeAuthThunk } from "./thunks/initializeAuthThunk";

// ------------------------------
// Define the State Interface
// ------------------------------
export interface AuthStateType {
  session: Session | null;
  isLoading: boolean;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: AuthStateType = {
  session: null,
  isLoading: false,
};

// ------------------------------
// Slice Definition
// ------------------------------
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.isLoading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearAuth: (state) => {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuthThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(initializeAuthThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// ------------------------------
// Exports
// ------------------------------
export const { setSession, clearAuth, setIsLoading } = authSlice.actions;
export default authSlice.reducer;
