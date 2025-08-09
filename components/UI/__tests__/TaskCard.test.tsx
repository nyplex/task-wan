import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskCard from "../TaskCard";

describe("TaskCard", () => {
  const title = "Test Task";

  it("renders the title", () => {
    const { getByText } = render(<TaskCard title={title} />);
    expect(getByText(title)).toBeTruthy();
  });

  it("applies selected styles when isSelected is true", () => {
    const { getByText } = render(<TaskCard title={title} isSelected />);
    const text = getByText(title);
    // Check className includes text-primary-0 (adapt if needed to your testing setup)
    expect(text.props.className).toContain("text-primary-0");
  });

  it("shows the select circle when showSelect is true", () => {
    const { getByTestId } = render(<TaskCard title={title} showSelect />);
    const selectCircle = getByTestId("select-circle");
    expect(selectCircle).toBeTruthy();
  });

  it("renders inner filled circle when selected", () => {
    const { getByTestId } = render(
      <TaskCard title={title} showSelect isSelected />,
    );
    const filledCircle = getByTestId("filled-circle");
    expect(filledCircle).toBeTruthy();
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <TaskCard title={title} onPress={onPress} disabled />,
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByRole } = render(<TaskCard title={title} onPress={onPress} />);
    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalled();
  });
});
