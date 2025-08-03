import { renderHook } from "@testing-library/react-native";
import useAuthListener from "../useAuthListener";
import { useAppDispatch } from "../redux";
import { initializeAuthThunk } from "@/redux/slices/authSlice/thunks/initializeAuthThunk";

jest.mock("../redux", () => ({ useAppDispatch: jest.fn() }));
jest.mock("@/redux/slices/authSlice/thunks/initializeAuthThunk", () => ({
  initializeAuthThunk: jest.fn((session) => ({
    type: "INIT",
    payload: session,
  })),
}));

const mockDispatch = jest.fn();
const mockUnsubscribe = jest.fn();

const mockOnAuthStateChange = jest.fn((_cb: any) => ({
  data: { subscription: { unsubscribe: mockUnsubscribe } },
}));

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      onAuthStateChange: jest.fn(),
    },
  },
}));

const { supabase } = require("@/lib/supabase");
supabase.auth.onAuthStateChange = mockOnAuthStateChange;
(useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

describe("useAuthListener", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("subscribes and unsubscribes properly", () => {
    const { unmount } = renderHook(() => useAuthListener());
    expect(mockOnAuthStateChange).toHaveBeenCalledWith(expect.any(Function));
    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it("dispatches initializeAuthThunk with session on auth change", () => {
    let callback!: (event: string, session: any) => void; // definite assignment assertion
    mockOnAuthStateChange.mockImplementation((cb) => {
      callback = cb;
      return { data: { subscription: { unsubscribe: mockUnsubscribe } } };
    });
    renderHook(() => useAuthListener());
    const fakeSession = { user: { id: "123" } };
    callback("SIGNED_IN", fakeSession);
    expect(initializeAuthThunk).toHaveBeenCalledWith(fakeSession);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "INIT",
      payload: fakeSession,
    });
  });

  it("does not break if unsubscribe is missing", () => {
    mockOnAuthStateChange.mockReturnValueOnce({
      data: { subscription: {} },
    } as any);
    expect(() => {
      const { unmount } = renderHook(() => useAuthListener());
      unmount();
    }).not.toThrow();
  });
});
