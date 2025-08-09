import { RootState } from "@/redux/store";
import { GlobalError } from "@/types/errors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorsStateType {
  errors: GlobalError[];
}

const initialState: ErrorsStateType = {
  errors: [],
};

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

export const { clearErrors, addError } = errorsSlice.actions;
export default errorsSlice.reducer;

export const selectErrors = (state: RootState) => state.errors.errors;
