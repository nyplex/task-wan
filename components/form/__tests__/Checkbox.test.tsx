import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Checkbox from "../Checkbox";

// Mock custom Icon component
jest.mock("../../UI/Icon", () => {
  const { Text } = require("react-native");
  return ({ icon }: { icon: string }) => <Text testID="icon">{icon}</Text>;
});

describe("Checkbox", () => {
  const onPressMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders unchecked by default", () => {
    const { queryByTestId } = render(<Checkbox />);
    expect(queryByTestId("icon")).toBeNull();
  });

  it("renders checked when `checked` prop is true", () => {
    const { getByTestId } = render(<Checkbox checked />);
    expect(getByTestId("icon").props.children).toBe("check");
  });

  it("toggles checked state on press and calls onPress", () => {
    const { getByRole, queryByTestId } = render(
      <Checkbox
        checked={false}
        onPress={onPressMock}
      />
    );

    const pressable = getByRole("button");
    expect(queryByTestId("icon")).toBeNull();

    fireEvent.press(pressable);

    expect(onPressMock).toHaveBeenCalled();
  });

  it("does not call onPress if disabled", () => {
    const { getByRole } = render(
      <Checkbox
        checked
        onPress={onPressMock}
        disabled
      />
    );

    fireEvent.press(getByRole("button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("updates checked state when prop changes", () => {
    const { queryByTestId, rerender } = render(<Checkbox checked={false} />);

    expect(queryByTestId("icon")).toBeNull();

    rerender(<Checkbox checked={true} />);
    expect(queryByTestId("icon")).toBeTruthy();

    rerender(<Checkbox checked={false} />);
    expect(queryByTestId("icon")).toBeNull();
  });

  it("applies correct background color when checked", () => {
    const { getByRole } = render(<Checkbox checked />);
    expect(getByRole("button").props.style.backgroundColor).toBe("#006EE9");
  });

  it("does not crash without onPress", () => {
    const { getByRole } = render(<Checkbox checked />);
    expect(() => fireEvent.press(getByRole("button"))).not.toThrow();
  });
});
