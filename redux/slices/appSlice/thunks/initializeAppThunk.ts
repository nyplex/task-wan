import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeAppThunk = createAsyncThunk("app/initializeApp", async (_, thunkAPI) => {
  try {
    // Simulate async boot logic (e.g., fetch remote config, permissions, OTAs, appVersion etc...)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // throw new Error("Simulated error during app initialization"); // Simulate an error for testing
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Failed to initialize app");
  }
});
