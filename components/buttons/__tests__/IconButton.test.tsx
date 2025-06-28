import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import IconButton from "../IconButton"; // Adjust the path

// Mock the Icon component
jest.mock("../../UI/Icon", () => {
  const { Text } = require("react-native");
  return ({ icon, size, color }: { icon: string; size: string; color: string }) => (
    <Text testID="icon">{`Icon: ${icon}, Size: ${size}, Color: ${color}`}</Text>
  );
});

describe("IconButton", () => {
  const onPressMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default props (color=primary, size=medium)", () => {
    const { getByTestId } = render(
      <IconButton
        icon="calendar"
        onPress={onPressMock}
        size="medium"
      />
    );

    const icon = getByTestId("icon");
    expect(icon.props.children).toContain("Icon: calendar");
    expect(icon.props.children).toContain("Size: medium");
    expect(icon.props.children).toContain("Color: white");
  });

  it("calls onPress when pressed", () => {
    const { getByRole } = render(
      <IconButton
        icon="bell"
        onPress={onPressMock}
        size="small"
      />
    );

    fireEvent.press(getByRole("button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const { getByRole } = render(
      <IconButton
        icon="bell"
        onPress={onPressMock}
        size="large"
        isDisabled
      />
    );

    fireEvent.press(getByRole("button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders destructive style and white icon color", () => {
    const { getByTestId } = render(
      <IconButton
        icon="bell"
        onPress={onPressMock}
        size="medium"
        isDestructive
      />
    );

    const icon = getByTestId("icon");
    expect(icon.props.children).toContain("Color: white");
  });

  it("renders with white background and primary icon color", () => {
    const { getByTestId } = render(
      <IconButton
        icon="bell"
        onPress={onPressMock}
        size="medium"
        color="white"
      />
    );

    const icon = getByTestId("icon");
    expect(icon.props.children).toContain("Color: primary");
  });

  it("renders correct sizes", () => {
    const sizes: Array<"small" | "medium" | "large"> = ["small", "medium", "large"];

    sizes.forEach((size) => {
      const { getByTestId, unmount } = render(
        <IconButton
          icon="bell"
          onPress={onPressMock}
          size={size}
        />
      );
      const icon = getByTestId("icon");
      expect(icon.props.children).toContain(`Size: ${size}`);
      unmount();
    });
  });
});
