import { renderHook } from "@testing-library/react-native";
import useErrors from "@/hooks/useErrors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useToast from "@/hooks/useToast";

jest.mock("react-redux", () => ({ useSelector: jest.fn() }));
jest.mock("@/hooks/redux", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
jest.mock("@/redux/slices/errorsSlice/errorsSlice", () => ({
  clearErrors: jest.fn(() => ({ type: "CLEAR_ERRORS" })),
  selectErrors: jest.fn(() => []),
  popError: jest.fn(() => ({ type: "POP_ERROR" })),
}));
jest.mock("@/hooks/useToast", () => jest.fn());

const mockDispatch = jest.fn();
const mockHandleToast = jest.fn();
(useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
(useAppSelector as unknown as jest.Mock).mockImplementation((selector) =>
  selector({ errors: { current: [] } }),
);
(useToast as jest.Mock).mockReturnValue({ handleToast: mockHandleToast });

const errorObj = { message: "Test error", severity: "error" };

describe("useErrors", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does nothing if there are no errors", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([]);
    renderHook(() => useErrors());
    expect(mockHandleToast).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("shows toast and dispatches clearErrors for each error", () => {
    // Simulate two errors by rendering the hook twice with different current error
    (useAppSelector as unknown as jest.Mock).mockReturnValue(errorObj);
    renderHook(() => useErrors());
    (useAppSelector as unknown as jest.Mock).mockReturnValue(errorObj);
    renderHook(() => useErrors());
    expect(mockHandleToast).toHaveBeenCalledTimes(2);
    mockHandleToast.mock.calls.forEach((call) => {
      expect(call[0]).toBe("Error");
      expect(call[1]).toBe("Test error");
      // Simulate the callback to clear errors
      call[2]();
    });
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
