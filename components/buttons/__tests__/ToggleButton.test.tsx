import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ToggleButton from "../ToggleButton"; // Adjust the path as needed

// Mock the custom Text component
jest.mock("../../Text", () => {
  const { Text } = require("react-native");
  const MockText = ({ children, ...props }: { children: string }) => (
    <Text testID="toggle-text" {...props}>
      {children}
    </Text>
  );
  MockText.displayName = "MockText";
  return MockText;
});

describe("ToggleButton", () => {
  const defaultProps = {
    title: "Toggle Me",
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct title", () => {
    const { getByTestId } = render(
      <ToggleButton {...defaultProps} isToggled={false} />,
    );

    expect(getByTestId("toggle-text").props.children).toBe("Toggle Me");
  });

  it("shows correct text color when toggled", () => {
    const { getByTestId, rerender } = render(
      <ToggleButton {...defaultProps} isToggled={false} />,
    );

    expect(getByTestId("toggle-text").props.className).toContain(
      "text-primary-50",
    );

    rerender(<ToggleButton {...defaultProps} isToggled={true} />);

    expect(getByTestId("toggle-text").props.className).toContain("text-white");
  });

  it("applies correct backgroundColor when toggled", () => {
    const { getByRole, rerender } = render(
      <ToggleButton {...defaultProps} isToggled={false} />,
    );

    expect(getByRole("button").props.style.backgroundColor).toBe("transparent");

    rerender(<ToggleButton {...defaultProps} isToggled={true} />);

    expect(getByRole("button").props.style.backgroundColor).toBe("#006EE9");
  });

  it("calls onPress with correct toggled value", () => {
    const { getByRole } = render(
      <ToggleButton {...defaultProps} isToggled={false} />,
    );

    fireEvent.press(getByRole("button"));
    expect(defaultProps.onPress).toHaveBeenCalledWith(true);
  });

  it("disables interaction when disabled is true", () => {
    const { getByRole } = render(
      <ToggleButton {...defaultProps} isToggled={false} disabled />,
    );

    fireEvent.press(getByRole("button"));
    expect(defaultProps.onPress).not.toHaveBeenCalled();
  });

  it("handles missing onPress safely", () => {
    const { getByRole } = render(
      <ToggleButton title="Safe Press" isToggled={false} />,
    );

    expect(() => {
      fireEvent.press(getByRole("button"));
    }).not.toThrow();
  });
});
