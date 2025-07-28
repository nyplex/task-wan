import { renderHook, act } from "@testing-library/react-native";
import useAuth from "../useAuth";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { setIsLoading } from "@/redux/slices/authSlice/authSlice";

// Mocks
jest.mock("expo-router", () => ({ useRouter: jest.fn() }));
jest.mock("react-redux", () => ({ useSelector: jest.fn() }));
jest.mock("../redux", () => ({ useAppDispatch: () => jest.fn() }));
jest.mock("@/redux/slices/authSlice/thunks/loginThunk", () => ({
  loginThunk: jest.fn(() => async () => {}),
}));

jest.mock("@/redux/slices/authSlice/thunks/signupThunk", () => ({
  signupThunk: jest.fn(() => async () => {}),
}));

jest.mock("@/redux/slices/authSlice/thunks/verifyOTPThunk", () => ({
  verifyOTPThunk: jest.fn(() => async () => {}),
}));

jest.mock("@/redux/slices/authSlice/thunks/resendOTPThunk", () => ({
  resendOTPThunk: jest.fn(() => async () => {}),
}));

jest.mock("@/redux/slices/authSlice/thunks/logoutThunk", () => ({
  logoutThunk: jest.fn(() => async () => {}),
}));

jest.mock("@/redux/slices/errorsSlice/errorsSlice", () => ({ addError: jest.fn() }));
jest.mock("@/redux/slices/authSlice/authSlice", () => ({ setIsLoading: jest.fn() }));

const unwrapMock = jest.fn().mockResolvedValue({});
const unwrapRejectMock = jest.fn().mockRejectedValue(new Error("fail"));
const mockDispatch = jest.fn(() => ({ unwrap: unwrapMock }));
const mockDispatchReject = jest.fn(() => ({ unwrap: unwrapRejectMock }));
const mockRouterPush = jest.fn();

// Helper to re-mock useAppDispatch and useRouter for each test
jest.mock("../redux", () => ({
  useAppDispatch: () => mockDispatch,
}));
(useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

// Silence act() warnings for async
const flushPromises = () => new Promise(setImmediate);

describe("useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSelector as unknown as jest.Mock).mockReturnValue({
      user: { id: "1", email: "test@test.com" },
    });
  });

  it("login calls dispatch, sets loading, and navigates to VerificationCode", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login("test@test.com");
      await flushPromises();
    });
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(unwrapMock).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: "/(app)/VerificationCode",
      params: { email: "test@test.com" },
    });
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  it("signup calls dispatch, sets loading, and navigates to VerificationCode", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.signup("test@test.com", "testuser");
      await flushPromises();
    });
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: "/(app)/VerificationCode",
      params: { email: "test@test.com" },
    });
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  it("verifyOTP calls dispatch and sets loading", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.verifyOTP("123456", "test@test.com");
      await flushPromises();
    });
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(unwrapMock).toHaveBeenCalled();
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  it("resendOTP calls dispatch and sets loading", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.resendOTP("test@test.com");
      await flushPromises();
    });
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(unwrapMock).toHaveBeenCalled();
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  it("logout calls dispatch and sets loading", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.logout();
      await flushPromises();
    });
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(unwrapMock).toHaveBeenCalled();
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });
  it("login dispatches addError on error", async () => {
    jest.resetModules();
    jest.doMock("../redux", () => ({ useAppDispatch: () => mockDispatchReject }));
    jest.doMock("@/redux/slices/errorsSlice/errorsSlice", () => ({ addError: jest.fn() }));
    jest.doMock("@/redux/slices/authSlice/authSlice", () => ({ setIsLoading: jest.fn() }));

    const { default: useAuthError } = require("../useAuth");
    const { addError: addErrorMock } = require("@/redux/slices/errorsSlice/errorsSlice");
    const { setIsLoading: setIsLoadingMock } = require("@/redux/slices/authSlice/authSlice");

    const { result } = renderHook(() => useAuthError());
    await act(async () => {
      await result.current.login("test@test.com");
      await flushPromises();
    });
    expect(addErrorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
        source: "useAuth/login",
        type: "auth",
      })
    );
    expect(setIsLoadingMock).toHaveBeenCalledWith(false);
  });

  it("returns user from selector", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      user: { id: "1", email: "test@test.com" },
    });
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toEqual({ id: "1", email: "test@test.com" });
  });
});
