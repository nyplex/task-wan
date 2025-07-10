import { RootState } from "@/redux/store";
import { GlobalError } from "@/types/errors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ------------------------------
// Define the State Interface
// ------------------------------
export interface ErrorsStateType {
  errors: GlobalError[];
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
    addError: (state, action: PayloadAction<GlobalError>) => {
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
