import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeApp = createAsyncThunk(
  "app/initializeApp",
  async (_, thunkAPI) => {
    console.log("RUNNING INITIALIZE APP THUNK");

    try {
      // Simulate async boot logic (e.g., fetch remote config, permissions, OTAs, appVersion etc...)
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to initialize app");
    }
  }
);
