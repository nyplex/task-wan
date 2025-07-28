import { renderHook, act } from "@testing-library/react-native";
import useToast from "../useToast";
import { useToast as useToastGS } from "@/components/gluestack/toast";

jest.mock("@/components/gluestack/toast", () => ({
  useToast: jest.fn(),
  Toast: jest.fn(({ children }) => children),
}));

const showMock = jest.fn();
const isActiveMock = jest.fn();

(useToastGS as jest.Mock).mockReturnValue({
  show: showMock,
  isActive: isActiveMock,
});

describe("useToast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls toast.show with expected arguments when not active", () => {
    isActiveMock.mockReturnValue(false);
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.handleToast("Title", "Description");
    });
    expect(showMock).toHaveBeenCalledWith(
      expect.objectContaining({
        placement: "top",
        duration: 5000,
        render: expect.any(Function),
        onCloseComplete: expect.any(Function),
      })
    );
  });

  it("does not call toast.show if toast is already active", () => {
    isActiveMock.mockReturnValue(true);
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.handleToast("Title", "Description");
    });
    expect(showMock).not.toHaveBeenCalled();
  });

  it("calls onCloseComplete callback if provided", () => {
    isActiveMock.mockReturnValue(false);
    const { result } = renderHook(() => useToast());
    const onClose = jest.fn();
    act(() => {
      result.current.handleToast("Title", "Description", onClose);
    });
    // Simulate onCloseComplete being called by the toast system
    const config = showMock.mock.calls[0][0];
    act(() => {
      config.onCloseComplete();
    });
    expect(onClose).toHaveBeenCalled();
  });
});
