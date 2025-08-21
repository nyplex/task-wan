import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Text from "../Text";

describe("Text component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Text>Test Content</Text>);
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("applies default classes", () => {
    const { getByText } = render(<Text>Default</Text>);
    const element = getByText("Default");
    // default size is 'body' (text-[16px]), weight 'regular' (font-regular), color 'primary' (text-typography-primary)
    expect(element.props.className).toContain("text-[16px]");
    expect(element.props.className).toContain("font-regular");
    expect(element.props.className).toContain("text-typography-primary");
  });

  it("applies correct size, weight, and color classes", () => {
    const { getByText } = render(
      <Text size="heading" weight="bold" color="secondary">
        Styled Text
      </Text>,
    );
    const element = getByText("Styled Text");
    expect(element.props.className).toContain("text-[24px]"); // heading
    expect(element.props.className).toContain("font-bold");
    expect(element.props.className).toContain("text-typography-secondary");
  });

  it("includes additional className prop", () => {
    const { getByText } = render(
      <Text className="custom-class">With Extra Class</Text>,
    );
    const element = getByText("With Extra Class");
    expect(element.props.className).toContain("custom-class");
  });

  it("handles disabled prop", () => {
    const { getByText } = render(<Text disabled>Disabled Text</Text>);
    const element = getByText("Disabled Text");
    expect(element.props.disabled).toBe(true);
  });

  it("calls onPress handler when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Text onPress={onPressMock}>Clickable Text</Text>,
    );
    fireEvent.press(getByText("Clickable Text"));
    expect(onPressMock).toHaveBeenCalled();
  });
});
