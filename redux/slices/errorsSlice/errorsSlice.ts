import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ------------------------------
// Define the State Interface
// ------------------------------
export interface ErrorsStateType {
  message: string | null;
  statusCode?: number; // optional, e.g. HTTP errors
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: ErrorsStateType = {
  message: null,
  statusCode: undefined,
};

// ------------------------------
// Slice Definition
// ------------------------------
export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{
        message: string;
        type?: "network" | "auth" | "form" | "unknown";
        statusCode?: number;
        source?: string;
      }>
    ) => {
      const { message, type, statusCode, source } = action.payload;
      state.message = message;
      state.statusCode = statusCode;
    },
    clearError: (state) => {
      state.message = null;
      state.statusCode = undefined;
    },
  },
});

// ------------------------------
// Exports
// ------------------------------
export const { clearError, setError } = errorsSlice.actions;
export default errorsSlice.reducer;

// ------------------------------
// Selectors
// ------------------------------
export const selectErrorMessage = (state: { errors: ErrorsStateType }) =>
  state.errors.message;
export const selectErrorStatusCode = (state: { errors: ErrorsStateType }) =>
  state.errors.statusCode;
export const selectError = (state: { errors: ErrorsStateType }) => state.errors;
