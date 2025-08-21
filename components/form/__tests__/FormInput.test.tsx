import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput";

// Dummy icon type for testing
const icon = "user";

type TestFormValues = {
  name: string;
};

describe("FormInput", () => {
  const Wrapper = (props: any) => {
    const { control } = useForm<TestFormValues>({
      defaultValues: { name: "John" },
    });
    return <FormInput control={control} name="name" icon={icon} {...props} />;
  };

  it("renders with placeholder", () => {
    const { getByPlaceholderText } = render(<Wrapper placeholder="Name" />);
    expect(getByPlaceholderText("Name")).toBeTruthy();
  });

  it("displays the passed value", () => {
    const { getByDisplayValue } = render(<Wrapper placeholder="Name" />);
    expect(getByDisplayValue("John")).toBeTruthy();
  });

  it("calls onChangeText", () => {
    const { getByPlaceholderText } = render(<Wrapper placeholder="Name" />);
    const input = getByPlaceholderText("Name");
    fireEvent.changeText(input, "Alex");
    expect(input.props.value).toBe("Alex");
  });

  it("disables the input when isDisabled is true", () => {
    const { getByTestId } = render(<Wrapper placeholder="Name" isDisabled />);
    const input = getByTestId("input-field");
    expect(input.props.states.disabled).toBe(true);
  });

  it("shows error message when invalidText is set", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Wrapper
        placeholder="Name"
        rules={{ required: { value: true, message: "Required" } }}
      />,
    );
    // Simulate blur to trigger validation
    const input = getByPlaceholderText("Name");
    fireEvent(input, "blur");
    expect(getByTestId("input-invalid-text")).toBeTruthy();
  });

  it("calls onPress when provided", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Wrapper placeholder="Name" onPress={onPressMock} />,
    );
    const pressable = getByTestId("input-pressable");
    fireEvent.press(pressable);
    expect(onPressMock).toHaveBeenCalled();
  });

  it("calls onFocus when provided", () => {
    const onFocusMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Wrapper placeholder="Name" onFocus={onFocusMock} />,
    );
    const input = getByPlaceholderText("Name");
    fireEvent(input, "focus");
    expect(onFocusMock).toHaveBeenCalled();
  });
});
