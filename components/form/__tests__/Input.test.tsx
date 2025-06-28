import React from "react";
import { TextInput } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import Input from "../Input";

// Mock the left icon component if needed
const MockIcon = () => (
  <TextInput
    testID="icon-wrapper"
    style={{ width: 24, height: 24, backgroundColor: "lightgray" }}
  />
);

describe("Input", () => {
  it("renders correctly with placeholder", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter your name" />);

    expect(getByPlaceholderText("Enter your name")).toBeTruthy();
  });

  it("displays the passed value", () => {
    const { getByDisplayValue } = render(
      <Input
        value="Hello"
        placeholder="Type..."
      />
    );

    expect(getByDisplayValue("Hello")).toBeTruthy();
  });

  it("calls onChangeText when input changes", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Type here"
        onChangeText={onChangeTextMock}
      />
    );

    const input = getByPlaceholderText("Type here");
    fireEvent.changeText(input, "New Value");

    expect(onChangeTextMock).toHaveBeenCalledWith("New Value");
  });

  it("disables the input when isDisabled is true", () => {
    const { getByTestId } = render(
      <Input
        placeholder="Disabled"
        isDisabled
      />
    );

    const input = getByTestId("input-field");
    expect(input.props.states.disabled).toBe(true);
  });

  it("shows error message when isInvalid is true", () => {
    const { getByText } = render(
      <Input
        isInvalid
        invalidText="Invalid input"
      />
    );

    expect(getByText("Invalid input")).toBeTruthy();
  });

  it("renders left icon if provided", () => {
    const { getByTestId } = render(
      <Input
        leftIcon={<MockIcon />}
        placeholder="With icon"
      />
    );

    expect(getByTestId("icon-wrapper")).toBeTruthy();
  });
});
