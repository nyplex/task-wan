import { RootState } from "@/redux/store";
import { Error } from "@/types/Error";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ------------------------------
// Define the State Interface
// ------------------------------
export interface ErrorsStateType {
  errors: Error[];
}

// ------------------------------
// Initial State
// ------------------------------
const initialState: ErrorsStateType = {
  errors: [],
};

// ------------------------------
// Slice Definition
// ------------------------------
export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<Error>) => {
      const newError = action.payload;
      state.errors.push(newError);
    },
    clearErrors: (state) => {
      state.errors = [];
    },
  },
});

// ------------------------------
// Exports
// ------------------------------
export const { clearErrors, addError } = errorsSlice.actions;
export default errorsSlice.reducer;

// ------------------------------
// Selectors
// ------------------------------
export const selectErrors = (state: RootState) => state.errors.errors;
