import { logoutThunk } from "../logoutThunk";
import { supabase } from "@/lib/supabase";

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: jest.fn(),
    },
  },
}));

describe("logoutThunk", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const rejectWithValue = jest.fn((v) => v);
  const thunkAPI = { dispatch, getState, rejectWithValue };

  it("rejects if supabase returns error", async () => {
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: { message: "Logout error" } });
    const result = await logoutThunk()(dispatch, getState, thunkAPI);
    expect(result.payload).toEqual({
      message: "Logout error",
      source: "logoutThunk/supabase",
      type: "auth",
    });
  });

  it("resolves if logout is successful", async () => {
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });
    const result = await logoutThunk()(dispatch, getState, thunkAPI);
    expect(result.payload).toBeUndefined();
  });

  it("rejects with error if exception is thrown", async () => {
    (supabase.auth.signOut as jest.Mock).mockImplementation(() => {
      throw new Error("Network error");
    });
    const result = await logoutThunk()(dispatch, getState, thunkAPI);
    expect(result.payload).toEqual({
      message: "Network error",
      source: "logoutThunk",
      type: "auth",
    });
  });
});
