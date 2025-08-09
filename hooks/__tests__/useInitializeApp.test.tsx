import { renderHook } from "@testing-library/react-native";
import useInitializeApp from "../useInitializeApp";
import { useAppDispatch } from "../redux";
import { initializeAppThunk } from "@/redux/slices/appSlice/thunks/initializeAppThunk";
import { addError } from "@/redux/slices/errorsSlice/errorsSlice";

jest.mock("../redux", () => ({ useAppDispatch: jest.fn() }));

jest.mock("@/redux/slices/appSlice/thunks/initializeAppThunk", () => ({
  initializeAppThunk: jest.fn(() => ({ type: "initializeAppThunk" })),
}));
jest.mock("@/redux/slices/errorsSlice/errorsSlice", () => ({
  addError: jest.fn(),
}));

const unwrapMock = jest.fn().mockResolvedValue({});
const unwrapRejectMock = jest.fn().mockRejectedValue(new Error("fail"));
const mockDispatch = jest.fn(() => ({ unwrap: unwrapMock }));
const mockDispatchReject = jest.fn(() => ({ unwrap: unwrapRejectMock }));

describe("useInitializeApp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("should dispatch initializeApp on mount", async () => {
    renderHook(() => useInitializeApp());
    // Wait for useEffect to run
    await Promise.resolve();
    expect(mockDispatch).toHaveBeenCalledWith(initializeAppThunk());
    expect(unwrapMock).toHaveBeenCalled();
  });

  it("should dispatch addError if initializeApp fails", async () => {
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(
      mockDispatchReject,
    );
    renderHook(() => useInitializeApp());
    // Wait for useEffect to run
    await Promise.resolve();
    expect(mockDispatchReject).toHaveBeenCalledWith(initializeAppThunk());
    expect(unwrapRejectMock).toHaveBeenCalled();
    expect(addError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Failed to initialize app",
        source: "useInitializeApp",
        type: "unknown",
      }),
    );
  });
});
