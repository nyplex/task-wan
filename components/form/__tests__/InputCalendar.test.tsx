import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InputCalendar from "../InputCalendar";

// Basic render test
describe("InputCalendar", () => {
  it("renders with placeholder", () => {
    const { getByText } = render(<InputCalendar placeholder="Select date" />);
    expect(getByText("Select date")).toBeTruthy();
  });

  it("renders with value", () => {
    const { getByText } = render(
      <InputCalendar value="2025-08-19" placeholder="Select date" />,
    );
    expect(getByText("2025-08-19")).toBeTruthy();
  });

  it("shows error message when isInvalid and invalidText are set", () => {
    const { getByText } = render(
      <InputCalendar isInvalid invalidText="Invalid date" />,
    );
    expect(getByText("Invalid date")).toBeTruthy();
  });

  it("disables Pressable when isDisabled is true", () => {
    const { getByTestId } = render(
      <InputCalendar isDisabled placeholder="Disabled" />,
    );
    const pressable = getByTestId("input-pressable");
    expect(pressable.props.states.disabled).toBe(true);
  });

  it("calls onPress when Pressable is pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <InputCalendar onPress={onPressMock} placeholder="Press me" />,
    );
    const pressable = getByTestId("input-pressable");
    fireEvent.press(pressable);
    expect(onPressMock).toHaveBeenCalled();
  });
});
