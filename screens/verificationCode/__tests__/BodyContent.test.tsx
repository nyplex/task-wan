import React from "react";
import { render } from "@testing-library/react-native";
import BodyContent from "../components/BodyContent";

// Mock Image import
jest.mock("@/assets/images/verifyEmail.png", () => "verifyEmail.png");

// Mock Animated and interpolation logic
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

// Mock keyboard animation hook
jest.mock("react-native-keyboard-controller", () => ({
  useReanimatedKeyboardAnimation: () => ({
    progress: { value: 0 },
  }),
}));

describe("BodyContent", () => {
  it("renders correctly and matches snapshot", () => {
    const { toJSON, getByText } = render(<BodyContent />);

    // Check essential content
    expect(getByText("Verify Account")).toBeTruthy();
    expect(getByText("Please enter the verification number we sent to your email")).toBeTruthy();

    // Snapshot
    expect(toJSON()).toMatchSnapshot();
  });
});
