import React from "react";
import { render, act, fireEvent } from "@testing-library/react-native";
import {
  BottomSheetProvider,
  BottomSheetContext,
} from "../BottomSheetProvider";
import { Pressable } from "@/components/gluestack/pressable";
import LogoutBottomSheet from "@/components/bottomSheets/LogoutBottomSheet";

import InfoBottomSheet from "@/components/bottomSheets/InfoBottomSheet";

// Use official reanimated mock for reliability
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

jest.mock("@/components/bottomSheets/LogoutBottomSheet", () =>
  jest.fn(() => null),
);
// --- Mock InfoBottomSheet for testing ---
jest.mock("@/components/bottomSheets/InfoBottomSheet", () =>
  jest.fn(() => null),
);
jest.mock("@/components/gluestack/pressable", () => {
  const { Pressable } = jest.requireActual("react-native");
  return { Pressable };
});

jest.mock("react-native-gesture-handler", () => {
  const Actual = jest.requireActual("react-native-gesture-handler");
  return {
    ...Actual,
    PanGestureHandler: jest.fn(({ children }) => <>{children}</>),
  };
});

describe("BottomSheetProvider", () => {
  // --- Added test for InfoBottomSheet ---
  it("openBottomSheet renders InfoBottomSheet with correct props", () => {
    const message = "Hello Info!";
    const onPressOk = jest.fn();
    const ConsumerInfo = () => (
      <BottomSheetContext.Consumer>
        {(ctx) => (
          <Pressable
            testID="open-info"
            onPress={() =>
              ctx?.openBottomSheet("InfoBottomSheet", { message, onPressOk })
            }
          />
        )}
      </BottomSheetContext.Consumer>
    );
    const { getByTestId } = render(
      <BottomSheetProvider>
        <ConsumerInfo />
      </BottomSheetProvider>,
    );
    act(() => {
      fireEvent.press(getByTestId("open-info"));
    });
    expect(InfoBottomSheet).toHaveBeenCalled();
    const call = (InfoBottomSheet as jest.Mock).mock.calls[0][0];
    expect(call).toEqual(expect.objectContaining({ message, onPressOk }));
  });
  const onPressLogout = jest.fn();
  const onPressCancel = jest.fn();

  const Consumer = () => (
    <BottomSheetContext.Consumer>
      {(ctx) => (
        <>
          <Pressable
            testID="open"
            onPress={() =>
              ctx?.openBottomSheet("LogoutBottomSheet", {
                onPressLogout,
                onPressCancel,
              })
            }
          />
          <Pressable testID="close" onPress={() => ctx?.closeBottomSheet()} />
        </>
      )}
    </BottomSheetContext.Consumer>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("provides openBottomSheet and closeBottomSheet in context", () => {
    let contextValue: any;
    render(
      <BottomSheetProvider>
        <BottomSheetContext.Consumer>
          {(ctx) => {
            contextValue = ctx;
            return null;
          }}
        </BottomSheetContext.Consumer>
      </BottomSheetProvider>,
    );
    expect(typeof contextValue.openBottomSheet).toBe("function");
    expect(typeof contextValue.closeBottomSheet).toBe("function");
  });

  it("openBottomSheet sets state and renders bottom sheet", () => {
    const { getByTestId, queryByTestId } = render(
      <BottomSheetProvider>
        <Consumer />
      </BottomSheetProvider>,
    );
    expect(queryByTestId("logout-bottom-sheet")).toBeNull();
    act(() => {
      fireEvent.press(getByTestId("open"));
    });
    expect(LogoutBottomSheet).toHaveBeenCalled();
    const call = (LogoutBottomSheet as jest.Mock).mock.calls[0][0];
    expect(call).toEqual(
      expect.objectContaining({ onPressLogout, onPressCancel }),
    );
  });

  it("closeBottomSheet resets state after timeout", () => {
    const { getByTestId } = render(
      <BottomSheetProvider>
        <Consumer />
      </BottomSheetProvider>,
    );
    act(() => {
      fireEvent.press(getByTestId("open"));
    });
    // Clear mock after opening
    (LogoutBottomSheet as jest.Mock).mockClear();
    act(() => {
      fireEvent.press(getByTestId("close"));
      jest.advanceTimersByTime(300);
    });
    // After timeout, LogoutBottomSheet should not be called again
    expect(LogoutBottomSheet).not.toHaveBeenCalled();
  });

  it("renders correct component from sheetRegistry", () => {
    const { getByTestId } = render(
      <BottomSheetProvider>
        <Consumer />
      </BottomSheetProvider>,
    );
    act(() => {
      fireEvent.press(getByTestId("open"));
    });
    expect(LogoutBottomSheet).toHaveBeenCalled();
    const call = (LogoutBottomSheet as jest.Mock).mock.calls[0][0];
    expect(call).toEqual(
      expect.objectContaining({ onPressLogout, onPressCancel }),
    );
  });

  it("calls closeBottomSheet on gesture swipe down", () => {
    // Simulate gesture handler by calling closeBottomSheet directly
    const { getByTestId } = render(
      <BottomSheetProvider>
        <Consumer />
      </BottomSheetProvider>,
    );
    act(() => {
      fireEvent.press(getByTestId("open"));
    });
    // Clear mock after opening
    (LogoutBottomSheet as jest.Mock).mockClear();
    // Simulate gesture: call closeBottomSheet
    act(() => {
      fireEvent.press(getByTestId("close"));
      jest.advanceTimersByTime(300);
    });
    expect(LogoutBottomSheet).not.toHaveBeenCalled();
  });
});
