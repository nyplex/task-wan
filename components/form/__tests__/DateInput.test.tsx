import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DateInput from "../DateInput";

describe("DateInput", () => {
  const testTimestamp = new Date("2024-06-01T12:00:00Z").getTime(); // 1 June 2024

  it("renders correctly with formatted date", () => {
    const { getByText } = render(<DateInput timestamp={testTimestamp} />);
    expect(getByText("1 Jun 2024")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <DateInput
        timestamp={testTimestamp}
        onPress={onPressMock}
      />
    );

    fireEvent.press(getByRole("button"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <DateInput
        timestamp={testTimestamp}
        onPress={onPressMock}
        disabled
      />
    );

    fireEvent.press(getByRole("button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders with correct background color when disabled", () => {
    const { getByRole } = render(
      <DateInput
        timestamp={testTimestamp}
        disabled
      />
    );

    const pressable = getByRole("button");
    expect(pressable.props.style.backgroundColor).toBe("#EEF5FD");
  });

  it("renders with correct background color when enabled", () => {
    const { getByRole } = render(<DateInput timestamp={testTimestamp} />);

    const pressable = getByRole("button");
    expect(pressable.props.style.backgroundColor).toBe("#FFFFFF");
  });
});
