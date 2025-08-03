import React from "react";
import { render, fireEvent, userEvent } from "@testing-library/react-native";
import Icon from "../Icon";

describe("Icon component", () => {
  it("renders the correct icon", () => {
    const { getByTestId } = render(<Icon icon="mail" />);
    const icon = getByTestId("icon");

    expect(icon.props.name).toBe("mail");
  });
  it("applies the correct size", () => {
    const { getByTestId, rerender } = render(<Icon icon="mail" size="small" />);
    expect(getByTestId("icon").props.size).toBe(20);

    rerender(<Icon icon="mail" size="medium" />);
    expect(getByTestId("icon").props.size).toBe(24);

    rerender(<Icon icon="mail" size="large" />);
    expect(getByTestId("icon").props.size).toBe(28);
  });

  it("applies the correct color", () => {
    const { getByTestId, rerender } = render(
      <Icon icon="mail" color="primary" />,
    );
    expect(getByTestId("icon").props.color).toBe("#006EE9");

    rerender(<Icon icon="mail" color="white" />);
    expect(getByTestId("icon").props.color).toBe("#fff");

    rerender(<Icon icon="mail" />);
    expect(getByTestId("icon").props.color).toBe("#006EE9");
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<Icon icon="mail" onPress={onPress} />);
    fireEvent.press(getByTestId("icon"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("respects the disabled prop", async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Icon icon="mail" onPress={onPress} disabled />,
    );
    const icon = getByTestId("icon");

    await user.press(icon);
    expect(icon.props.disabled).toBe(true);
    expect(onPress).not.toHaveBeenCalled();
  });
});
