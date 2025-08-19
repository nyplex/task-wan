import { setSession } from "../../authSlice";
import { initializeAuthThunk } from "../initializeAuthThunk";
import { getProfileApi } from "@/redux/slices/apiSlice/endpoints/profile/getProfile";

jest.mock("../../authSlice", () => ({ setSession: jest.fn() }));
jest.mock("@/redux/slices/apiSlice/endpoints/profile/getProfile", () => ({
  getProfileApi: {
    endpoints: {
      getProfile: {
        initiate: jest.fn(),
      },
    },
  },
}));

describe("initializeAuthThunk", () => {
  const dispatch = jest.fn((fn) => (typeof fn === "function" ? fn() : fn));
  const getState = jest.fn();
  const rejectWithValue = jest.fn((v) => v);
  const thunkAPI = { dispatch, getState, rejectWithValue };
  const session = {
    access_token: "token",
    refresh_token: "refresh",
    expires_in: 3600,
    token_type: "bearer",
    user: {
      id: "user123",
      app_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
      user_metadata: {},
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches setSession with null session and returns undefined", async () => {
    const result = await initializeAuthThunk(null)(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(setSession).toHaveBeenCalledWith(null);
    expect(result.payload).toBeUndefined();
  });

  it("dispatches setSession and getProfile with valid session", async () => {
    const unwrap = jest.fn().mockResolvedValue({ profile: "data" });
    (getProfileApi.endpoints.getProfile.initiate as jest.Mock).mockReturnValue({
      unwrap,
    });
    const result = await initializeAuthThunk(session)(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(setSession).toHaveBeenCalledWith(session);
    expect(getProfileApi.endpoints.getProfile.initiate).toHaveBeenCalledWith({
      userID: "user123",
    });
    expect(unwrap).toHaveBeenCalled();
    expect(result.payload).toBeUndefined();
  });

  it("rejects with error if getProfile throws", async () => {
    const unwrap = jest.fn().mockRejectedValue(new Error("Profile error"));
    (getProfileApi.endpoints.getProfile.initiate as jest.Mock).mockReturnValue({
      unwrap,
    });
    const result = await initializeAuthThunk(session)(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.payload).toBe("Profile error");
  });

  it("rejects with unknown error if getProfile throws non-Error", async () => {
    const unwrap = jest.fn().mockRejectedValue("Unknown");
    (getProfileApi.endpoints.getProfile.initiate as jest.Mock).mockReturnValue({
      unwrap,
    });
    const result = await initializeAuthThunk(session)(
      dispatch,
      getState,
      thunkAPI,
    );
    expect(result.payload).toBe(
      "An unknown error occurred during initialization",
    );
  });
});
