import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NotificationCard from "../NotificationCard";

describe("NotificationCard", () => {
  const defaultProps = {
    icon: "bell" as const,
    title: "New Message",
    description: "You have a new message",
    onPress: jest.fn(),
  };

  it("renders title and description", () => {
    const { getByText } = render(<NotificationCard {...defaultProps} />);
    expect(getByText("New Message")).toBeTruthy();
    expect(getByText("You have a new message")).toBeTruthy();
  });

  it("renders icon with correct props", () => {
    const { getByTestId } = render(<NotificationCard {...defaultProps} />);
    // Assuming Icon component has testID="icon"
    const icon = getByTestId("icon");
    expect(icon).toBeTruthy();
  });

  it("applies unread styles when unread is true", () => {
    const { getByTestId } = render(
      <NotificationCard
        {...defaultProps}
        unread
      />
    );

    const pressable = getByTestId("pressable");
    // backgroundColor of Pressable
    expect(pressable.props.style.backgroundColor).toBe("#F1F7FE");

    const iconBox = getByTestId("icon-box");
    expect(iconBox.props.style.backgroundColor).toBe("#7A9CC3");
  });

  it("applies default styles when unread is false", () => {
    const { getByTestId } = render(
      <NotificationCard
        {...defaultProps}
        unread={false}
      />
    );
    const pressable = getByTestId("pressable");
    expect(pressable.props.style.backgroundColor).toBe("transparent");

    const iconBox = getByTestId("icon-box");
    expect(iconBox.props.style.backgroundColor).toBe("#006EE9");
  });

  it("calls onPress when pressed and not disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <NotificationCard
        {...defaultProps}
        onPress={onPressMock}
      />
    );
    fireEvent.press(getByTestId("pressable"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <NotificationCard
        {...defaultProps}
        onPress={onPressMock}
        disabled
      />
    );
    fireEvent.press(getByTestId("pressable"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders without description if not provided", () => {
    const { queryByText } = render(
      <NotificationCard
        {...defaultProps}
        description={undefined}
      />
    );
    expect(queryByText(defaultProps.description)).toBeNull();
  });
});
