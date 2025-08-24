import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HeaderLayout from "../HeaderLayout";

const icon = "arrow-left";

describe("HeaderLayout", () => {
  it("renders the title", () => {
    const { getByText } = render(
      <HeaderLayout title="Profile" icon={icon} onPressIcon={() => {}} />,
    );
    expect(getByText("Profile")).toBeTruthy();
  });

  it("renders the icon button", () => {
    const { getByTestId } = render(
      <HeaderLayout title="Profile" icon={icon} onPressIcon={() => {}} />,
    );
    const iconButton = getByTestId("icon-button");
    expect(iconButton).toBeTruthy();
  });

  it("calls onPressIcon when icon button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <HeaderLayout title="Profile" icon={icon} onPressIcon={onPressMock} />,
    );
    const iconButton = getByTestId("icon-button");
    fireEvent.press(iconButton);
    expect(onPressMock).toHaveBeenCalled();
  });
});
