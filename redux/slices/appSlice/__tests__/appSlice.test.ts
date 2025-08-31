import appReducer, {
  setAppReady,
  setIsLoading,
  setAppVersion,
  toggleTheme,
  AppStateType,
} from "../appSlice";

jest.mock(
  "@/features/authentication/authSlice/thunks/initializeAuthThunk",
  () => ({
    initializeAuthThunk: {
      pending: { type: "initializeAuthThunk/pending" },
      fulfilled: { type: "initializeAuthThunk/fulfilled" },
      rejected: { type: "initializeAuthThunk/rejected" },
    },
  }),
);

const getInitialState: AppStateType = {
  isAppReady: false,
  isLoading: false,
  appVersion: "1.0.0",
  theme: "system",
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
});
