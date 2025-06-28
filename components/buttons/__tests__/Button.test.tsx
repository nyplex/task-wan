import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "../Button";

describe("Button component", () => {
  it("renders with title", () => {
    const { getByText } = render(<Button title="Submit" />);
    expect(getByText("Submit")).toBeTruthy();
  });

  it("fires onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button
        title="Click"
        onPress={onPressMock}
      />
    );
    fireEvent.press(getByTestId("Button"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button
        title="Click"
        disabled
        onPress={onPressMock}
      />
    );
    fireEvent.press(getByTestId("Button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("shows spinner when loading", () => {
    const { queryByText, getByTestId } = render(
      <Button
        title="Submit"
        isLoading
      />
    );
    expect(queryByText("Submit")).toBeNull();
    expect(getByTestId("Button")).toBeTruthy();
  });

  it("renders left and right icons", () => {
    const left = <Text testID="left-icon">👈</Text>;
    const right = <Text testID="right-icon">👉</Text>;

    const { getByTestId } = render(
      <Button
        title="Icons"
        leftIcon={left}
        rightIcon={right}
      />
    );

    expect(getByTestId("left-icon")).toBeTruthy();
    expect(getByTestId("right-icon")).toBeTruthy();
  });

  it("applies correct styles for primary variant", () => {
    const { getByTestId } = render(
      <Button
        title="Primary"
        variant="primary"
      />
    );
    expect(getByTestId("Button").props.className).toContain("bg-primary-0");
  });

  it("applies correct styles for secondary variant", () => {
    const { getByTestId } = render(
      <Button
        title="Secondary"
        variant="secondary"
      />
    );
    expect(getByTestId("Button").props.className).toContain("bg-transparent");
  });

  it("applies correct styles when destructive", () => {
    const { getByTestId } = render(
      <Button
        title="Delete"
        variant="primary"
        destructive
      />
    );
    expect(getByTestId("Button").props.className).toContain("bg-error");
  });

  it("handles onTouchEnd event", () => {
    const onTouchEndMock = jest.fn();
    const { getByTestId } = render(
      <Button
        title="Touch"
        onTouchEnd={onTouchEndMock}
      />
    );
    fireEvent(getByTestId("Button"), "onTouchEnd");
    expect(onTouchEndMock).toHaveBeenCalled();
  });
  it("does not call onTouchEnd when disabled", () => {
    const onTouchEndMock = jest.fn();
    const { getByTestId } = render(
      <Button
        title="Touch"
        disabled
        onTouchEnd={onTouchEndMock}
      />
    );
    fireEvent(getByTestId("Button"), "onTouchEnd");
    expect(onTouchEndMock).not.toHaveBeenCalled();
  });
  it("applies correct styles for small size", () => {
    const { getByTestId } = render(
      <Button
        title="Small Button"
        size="small"
      />
    );
    expect(getByTestId("Button").props.className).toContain("h-[36px]");
  });
  it("applies correct styles for large size", () => {
    const { getByTestId } = render(
      <Button
        title="Large Button"
        size="large"
      />
    );
    expect(getByTestId("Button").props.className).toContain("h-[48px]");
  });
  it("applies correct styles when disabled", () => {
    const { getByTestId } = render(
      <Button
        title="Disabled Button"
        disabled
      />
    );
    expect(getByTestId("Button").props.className).toContain("bg-[#C6C2C2]");
  });
  it("applies correct styles when loading", () => {
    const { getByTestId } = render(
      <Button
        title="Loading Button"
        isLoading
        variant="secondary"
      />
    );
    expect(getByTestId("Button").props.className).toContain("border-[#C6C2C2]");
  });
  it("applies correct styles when destructive and disabled", () => {
    const { getByTestId } = render(
      <Button
        title="Destructive Disabled"
        variant="secondary"
        destructive
        disabled
      />
    );
    expect(getByTestId("Button").props.className).toContain("border-[#C6C2C2]");
  });
  it("applies correct styles when destructive and active", () => {
    const { getByTestId } = render(
      <Button
        title="Destructive Active"
        variant="secondary"
        destructive
        onPress={() => {}}
      />
    );
    fireEvent.press(getByTestId("Button"));
    expect(getByTestId("Button").props.className).toContain("border-error");
  });
  it("applies correct styles when secondary and active", () => {
    const { getByTestId } = render(
      <Button
        title="Secondary Active"
        variant="secondary"
        onPress={() => {}}
      />
    );
    fireEvent.press(getByTestId("Button"));
    expect(getByTestId("Button").props.className).toContain("border-primary-0");
  });
  it("applies correct styles when primary and active", () => {
    const { getByTestId } = render(
      <Button
        title="Primary Active"
        variant="primary"
        onPress={() => {}}
      />
    );
    fireEvent.press(getByTestId("Button"));
    expect(getByTestId("Button").props.className).toContain("bg-primary-50");
  });
});
