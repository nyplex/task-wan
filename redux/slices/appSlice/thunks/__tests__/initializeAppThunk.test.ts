import { initializeAppThunk } from "../initializeAppThunk";

describe("initializeAppThunk", () => {
  const dispatch = jest.fn((fn) => (typeof fn === "function" ? fn() : fn));
  const getState = jest.fn();
  const rejectWithValue = jest.fn((v) => v);
  const thunkAPI = { dispatch, getState, rejectWithValue };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("runs without error and returns undefined", async () => {
    const result = await initializeAppThunk()(dispatch, getState, thunkAPI);
    expect(result.payload).toBeUndefined();
  });

  it("returns error message when an error is thrown", async () => {
    // Mock setTimeout to throw an error
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = (() => {
      throw new Error("Simulated error during app initialization");
    }) as any;
    const result = await initializeAppThunk()(dispatch, getState, thunkAPI);
    expect(result.payload).toBe("Simulated error during app initialization");
    global.setTimeout = originalSetTimeout;
  });
});
