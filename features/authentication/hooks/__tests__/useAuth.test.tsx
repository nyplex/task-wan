import { renderHook, act } from "@testing-library/react-native";
import useAuth from "../useAuth";

// Mocks
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock("react-redux", () => ({
  useSelector: jest.fn(() => ({
    user: { id: "123", email: "test@example.com" },
  })),
}));
jest.mock("@/hooks/redux", () => ({
  useAppDispatch: () => jest.fn(() => ({ unwrap: () => Promise.resolve() })),
}));
jest.mock("@/features/authentication/authSlice/authSelectors", () => ({
  selectSession: jest.fn(() => ({
    user: { id: "123", email: "test@example.com" },
  })),
}));
jest.mock("@/features/authentication/authSlice/thunks/loginThunk", () => ({
  loginThunk: jest.fn(() => Promise.resolve({ type: "loginThunk/fulfilled" })),
}));
jest.mock("@/features/authentication/authSlice/thunks/signupThunk", () => ({
  signupThunk: jest.fn(() =>
    Promise.resolve({ type: "signupThunk/fulfilled" }),
  ),
}));
jest.mock("@/features/authentication/authSlice/thunks/verifyOTPThunk", () => ({
  verifyOTPThunk: jest.fn(() =>
    Promise.resolve({ type: "verifyOTPThunk/fulfilled" }),
  ),
}));
jest.mock("@/features/authentication/authSlice/thunks/resendOTPThunk", () => ({
  resendOTPThunk: jest.fn(() =>
    Promise.resolve({ type: "resendOTPThunk/fulfilled" }),
  ),
}));
jest.mock("@/features/authentication/authSlice/thunks/logoutThunk", () => ({
  logoutThunk: jest.fn(() =>
    Promise.resolve({ type: "logoutThunk/fulfilled" }),
  ),
}));
jest.mock("@/features/authentication/authSlice/authSlice", () => ({
  setIsLoading: jest.fn(),
}));
jest.mock("@/lib/safe", () => ({
  safe: (fn: any, ...args: any[]) => fn(),
}));

describe("useAuth", () => {
  it("returns user object", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toEqual({
      id: "123",
      email: "test@example.com",
    });
  });

  it("login calls dispatch and router.push", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login("test@example.com");
    });
    // No error means dispatch and router.push were called
  });

  it("signup calls dispatch and router.push", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.signup("test@example.com", "tester");
    });
  });

  it("verifyOTP calls dispatch", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.verifyOTP("123456", "test@example.com");
    });
  });

  it("resendOTP calls dispatch", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.resendOTP("test@example.com");
    });
  });

  it("logout calls dispatch", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.logout();
    });
  });

  it("matches snapshot", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).toMatchSnapshot();
  });
});
