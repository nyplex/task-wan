import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// define the error type here
export type Severity = "info" | "error" | "critical";

type AppError = {
  id: string;
  message: string;
  severity: Severity;
  code?: string | number;
  details?: any;
};

type State = {
  current?: AppError;
  queue: AppError[];
};

export const errorsSlice = createSlice({
  name: "appError",
  initialState: { queue: [] } as State,
  reducers: {
    pushError(state, action: PayloadAction<AppError>) {
      state.queue.push(action.payload);
      state.current = action.payload;
    },
    popError(state) {
      state.queue.shift();
      state.current = state.queue[0];
    },
    clearErrors(state) {
      state.queue = [];
      state.current = undefined;
    },
  },
});

export const { clearErrors, popError, pushError } = errorsSlice.actions;
export default errorsSlice.reducer;

export const selectErrors = (state: RootState) => state.errors.queue;
