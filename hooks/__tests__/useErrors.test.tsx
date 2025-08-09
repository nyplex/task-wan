import { renderHook } from "@testing-library/react-native";
import useErrors from "../useErrors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux";
import { clearErrors } from "@/redux/slices/errorsSlice/errorsSlice";
import useToast from "../useToast";

jest.mock("react-redux", () => ({ useSelector: jest.fn() }));
jest.mock("../redux", () => ({ useAppDispatch: jest.fn() }));
jest.mock("@/redux/slices/errorsSlice/errorsSlice", () => ({
  clearErrors: jest.fn(() => ({ type: "CLEAR_ERRORS" })),
  selectErrors: jest.fn(() => []),
}));
jest.mock("../useToast", () => jest.fn());

const mockDispatch = jest.fn();
const mockHandleToast = jest.fn();
(useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
(useToast as jest.Mock).mockReturnValue({ handleToast: mockHandleToast });

const errorObj = { message: "Test error" };

describe("useErrors", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does nothing if there are no errors", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
    renderHook(() => useErrors());
    expect(mockHandleToast).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("shows toast and dispatches clearErrors for each error", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([errorObj, errorObj]);
    renderHook(() => useErrors());
    expect(mockHandleToast).toHaveBeenCalledTimes(2);
    mockHandleToast.mock.calls.forEach((call) => {
      expect(call[0]).toBe("Oops! An error occurred");
      expect(call[1]).toBe("Test error");
      // Simulate the callback to clear errors
      call[2]();
    });
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(clearErrors).toHaveBeenCalledTimes(2);
  });
});
