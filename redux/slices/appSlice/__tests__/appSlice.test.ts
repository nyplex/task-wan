import appReducer, {
  setAppReady,
  setIsLoading,
  setAppVersion,
  toggleTheme,
  AppStateType,
} from "../appSlice";

// Mock thunks
jest.mock("@/redux/slices/appSlice/thunks/initializeAppThunk", () => ({
  initializeAppThunk: {
    pending: { type: "initializeAppThunk/pending" },
    fulfilled: { type: "initializeAppThunk/fulfilled" },
    rejected: { type: "initializeAppThunk/rejected" },
  },
}));

jest.mock("@/redux/slices/authSlice/thunks/initializeAuthThunk", () => ({
  initializeAuthThunk: {
    pending: { type: "initializeAuthThunk/pending" },
    fulfilled: { type: "initializeAuthThunk/fulfilled" },
    rejected: { type: "initializeAuthThunk/rejected" },
  },
}));

const getInitialState: AppStateType = {
  isAppReady: false,
  isLoading: false,
  appVersion: "1.0.0",
  theme: "system",
  appInitDone: false,
  authInitDone: false,
};

describe("appSlice", () => {
  it("should handle setAppReady", () => {
    const state = appReducer(getInitialState, setAppReady(true));
    expect(state.isAppReady).toBe(true);
  });

  it("should handle setIsLoading", () => {
    const state = appReducer(getInitialState, setIsLoading(true));
    expect(state.isLoading).toBe(true);
  });

  it("should handle setAppVersion", () => {
    const state = appReducer(getInitialState, setAppVersion("2.0.0"));
    expect(state.appVersion).toBe("2.0.0");
  });

  it("should handle toggleTheme", () => {
    const state = appReducer(
      { ...getInitialState, theme: "light" },
      toggleTheme(),
    );
    expect(state.theme).toBe("dark");
  });

  it("should handle initializeApp.pending", () => {
    const prevState = { ...getInitialState, isLoading: true };
    const action = { type: "initializeAppThunk/pending" };
    const state = appReducer(prevState, action);
    expect(state.isLoading).toBe(true);
  });

  it("should handle initializeApp.rejected", () => {
    const prevState = { ...getInitialState, isLoading: true };
    const action = {
      type: "initializeAppThunk/rejected",
      payload: new Error("Initialization failed"),
    };
    const state = appReducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.appInitDone).toBe(true);
    expect(state.isAppReady).toBe(false);
  });

  it("should handle initializeApp.fulfilled when authInitDone is false", () => {
    const prevState = { ...getInitialState, authInitDone: false };
    const action = { type: "initializeAppThunk/fulfilled" };
    const state = appReducer(prevState, action);
    expect(state.appInitDone).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.isAppReady).toBe(false);
  });

  it("should handle initializeApp.fulfilled when authInitDone is true", () => {
    const prevState = { ...getInitialState, authInitDone: true };
    const action = { type: "initializeAppThunk/fulfilled" };
    const state = appReducer(prevState, action);
    expect(state.appInitDone).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.isAppReady).toBe(true);
  });

  it("should handle initializeAuthThunk.pending", () => {
    const prevState = { ...getInitialState, isLoading: true };
    const action = { type: "initializeAuthThunk/pending" };
    const state = appReducer(prevState, action);
    expect(state.isLoading).toBe(true);
  });

  it("should handle initializeAuthThunk.rejected", () => {
    const prevState = { ...getInitialState, isLoading: true };
    const action = {
      type: "initializeAuthThunk/rejected",
      payload: new Error("Initialization failed"),
    };
    const state = appReducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.authInitDone).toBe(true);
    expect(state.isAppReady).toBe(false);
  });

  it("should handle initializeAuthThunk.fulfilled when appInitDone is false", () => {
    const prevState = { ...getInitialState, appInitDone: false };
    const action = { type: "initializeAuthThunk/fulfilled" };
    const state = appReducer(prevState, action);
    expect(state.authInitDone).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.isAppReady).toBe(false);
  });

  it("should handle initializeAuthThunk.fulfilled when appInitDone is true", () => {
    const prevState = { ...getInitialState, appInitDone: true };
    const action = { type: "initializeAuthThunk/fulfilled" };
    const state = appReducer(prevState, action);
    expect(state.authInitDone).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.isAppReady).toBe(true);
  });
});
