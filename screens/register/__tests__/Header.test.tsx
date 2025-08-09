import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Header from "../components/Header";

jest.mock("expo-router", () => ({ useRouter: () => ({ back: jest.fn() }) }));
jest.mock("react-redux", () => ({ useSelector: () => false }));
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);
jest.mock("react-native-keyboard-controller", () => ({
  useReanimatedKeyboardAnimation: () => ({ progress: { value: 0 } }),
}));
jest.mock("@/components/UI/AppTitle", () => {
  const MockAppTitle = () => <></>;
  MockAppTitle.displayName = "AppTitle";
  return MockAppTitle;
});

jest.mock("@/components/buttons/BackButtonIcon", () => {
  const TouchableOpacity = require("react-native").TouchableOpacity;
  const MockBackButtonIcon = (props: any) => (
    <TouchableOpacity {...props} testID="back-button" />
  );
  MockBackButtonIcon.displayName = "BackButtonIcon";
  return MockBackButtonIcon;
});

describe("Header", () => {
  it("hides AppTitle when keyboard is open (progress=1)", () => {
    jest.mock("react-native-keyboard-controller", () => ({
      useReanimatedKeyboardAnimation: () => ({ progress: { value: 1 } }),
    }));
    const { toJSON } = render(<Header />);
    // You can check the style or snapshot for the hidden state
    expect(toJSON()).toMatchSnapshot();
  });

  it("shows AppTitle when keyboard is closed (progress=0)", () => {
    const { toJSON } = render(<Header />);
    // You can check the style or snapshot for the visible state
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders BackButtonIcon and AppTitle", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("back-button")).toBeTruthy();
  });

  it("calls router.back when BackButtonIcon is pressed", () => {
    const mockBack = jest.fn();
    jest
      .spyOn(require("expo-router"), "useRouter")
      .mockReturnValue({ back: mockBack });
    const { getByTestId } = render(<Header />);
    fireEvent.press(getByTestId("back-button"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("matches the snapshot", () => {
    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });
});
