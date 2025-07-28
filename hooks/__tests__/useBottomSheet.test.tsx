import React from "react";
import { renderHook } from "@testing-library/react-native";
import { useBottomSheet } from "../useBottomSheet";
import { BottomSheetContext } from "../../context/BottomSheetProvider";

// Minimal context value for testing
const mockContextValue = {
  openBottomSheet: jest.fn(),
  closeBottomSheet: jest.fn(),
};

describe("useBottomSheet", () => {
  it("throws if used outside BottomSheetProvider", () => {
    expect(() => renderHook(() => useBottomSheet())).toThrow(
      "useBottomSheet must be used within BottomSheetProvider"
    );
  });

  it("returns context if used inside BottomSheetProvider", () => {
    const wrapper = ({ children }: any) => (
      <BottomSheetContext.Provider value={mockContextValue}>{children}</BottomSheetContext.Provider>
    );
    const { result } = renderHook(() => useBottomSheet(), { wrapper });
    expect(result.current).toBe(mockContextValue);
  });
});
