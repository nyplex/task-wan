import { User } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

// ------------------------------
// Define the State Interface
// ------------------------------
export interface AuthStateType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: AuthStateType = {
  session: null,
  user: null,
  isLoading: true,
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
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.session = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

// ------------------------------
// Exports
// ------------------------------
export const { setSession, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
