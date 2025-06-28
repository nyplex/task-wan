import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileItem from "../ProfileItem";

describe("ProfileItem", () => {
  const defaultProps = {
    icon: "user" as const,
    title: "Profile",
    badgeCounter: 0,
    onPress: jest.fn(),
  };

  it("renders the title text", () => {
    const { getByText } = render(<ProfileItem {...defaultProps} />);
    expect(getByText("Profile")).toBeTruthy();
  });

  it("renders the icon component", () => {
    const { getByTestId } = render(<ProfileItem {...defaultProps} />);
    // Add testID="icon" to your Icon component for this to work
    expect(getByTestId("icon")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <ProfileItem
        {...defaultProps}
        onPress={onPress}
      />
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <ProfileItem
        {...defaultProps}
        onPress={onPress}
        disabled
      />
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("renders badgeCounter if > 0", () => {
    const { getByText } = render(
      <ProfileItem
        {...defaultProps}
        badgeCounter={5}
      />
    );
    expect(getByText("5")).toBeTruthy();
  });

  it("does not render badgeCounter if 0", () => {
    const { queryByText } = render(
      <ProfileItem
        {...defaultProps}
        badgeCounter={0}
      />
    );
    expect(queryByText("0")).toBeNull();
  });

  it("shows '99+' when badgeCounter is greater than 99", () => {
    const { getByText } = render(
      <ProfileItem
        {...defaultProps}
        badgeCounter={150}
      />
    );
    expect(getByText("99+")).toBeTruthy();
  });
});
