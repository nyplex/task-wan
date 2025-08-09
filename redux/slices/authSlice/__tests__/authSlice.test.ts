import authReducer, {
  setSession,
  setIsLoading,
  clearAuth,
  AuthStateType,
} from "../authSlice";
import { initializeAuthThunk } from "../thunks/initializeAuthThunk";
import { Session } from "@supabase/supabase-js";

jest.mock("@powersync/react-native", () => ({}));
jest.mock("@powersync/op-sqlite", () => ({}));
jest.mock("@/redux/slices/authSlice/thunks/initializeAuthThunk", () => ({
  initializeAuthThunk: {
    pending: { type: "initializeAuthThunk/pending" },
    fulfilled: { type: "initializeAuthThunk/fulfilled" },
    rejected: { type: "initializeAuthThunk/rejected" },
  },
}));

describe("authSlice reducer", () => {
  const initialState: AuthStateType = {
    session: null,
    isLoading: false,
  };

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle setSession", () => {
    const session = { access_token: "token123" } as Session;
    const nextState = authReducer(initialState, setSession(session));
    expect(nextState.session).toEqual(session);
    expect(nextState.isLoading).toBe(false);
  });

  it("should handle setIsLoading", () => {
    const nextState = authReducer(initialState, setIsLoading(true));
    expect(nextState.isLoading).toBe(true);
  });

  it("should handle clearAuth", () => {
    const prevState: AuthStateType = {
      session: { access_token: "abc" } as Session,
      isLoading: false,
    };
    const nextState = authReducer(prevState, clearAuth());
    expect(nextState.session).toBeNull();
  });

  it("should handle initializeAuthThunk.pending", () => {
    const action = { type: initializeAuthThunk.pending.type };
    const nextState = authReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
  });

  it("should handle initializeAuthThunk.fulfilled", () => {
    const prevState: AuthStateType = {
      session: null,
      isLoading: true,
    };
    const action = { type: initializeAuthThunk.fulfilled.type };
    const nextState = authReducer(prevState, action);
    expect(nextState.isLoading).toBe(false);
  });

  it("should handle initializeAuthThunk.rejected", () => {
    const prevState: AuthStateType = {
      session: null,
      isLoading: true,
    };
    const action = { type: initializeAuthThunk.rejected.type };
    const nextState = authReducer(prevState, action);
    expect(nextState.isLoading).toBe(false);
  });
});
