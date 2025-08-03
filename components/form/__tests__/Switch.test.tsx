import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Switch from "../Switch";

describe("Switch component", () => {
  const onValueChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct colors when ON and enabled", () => {
    const { getByTestId } = render(
      <Switch value={true} onValueChange={onValueChangeMock} />,
    );

    const track = getByTestId("switch-track");
    const thumb = getByTestId("switch-thumb");

    expect(track.props.style.backgroundColor).toBe("#57a0f2"); // ON track color
    expect(thumb.props.style[0].backgroundColor).toBe("#006EE9"); // active thumb color
  });

  it("renders with correct colors when OFF and enabled", () => {
    const { getByTestId } = render(
      <Switch value={false} onValueChange={onValueChangeMock} />,
    );

    const track = getByTestId("switch-track");
    const thumb = getByTestId("switch-thumb");

    expect(track.props.style.backgroundColor).toBe("#d6d4d4"); // OFF track color
    expect(thumb.props.style[0].backgroundColor).toBe("#006EE9"); // active thumb color
  });

  it("renders with disabled colors", () => {
    const { getByTestId } = render(
      <Switch value={true} disabled onValueChange={onValueChangeMock} />,
    );

    const track = getByTestId("switch-track");
    const thumb = getByTestId("switch-thumb");

    expect(track.props.style.backgroundColor).toBe("#DEE2E6"); // disabled track color
    expect(thumb.props.style[0].backgroundColor).toBe("#ADB5BD"); // disabled thumb color
  });

  it("calls onValueChange with toggled value when pressed", () => {
    const { getByTestId } = render(
      <Switch value={false} onValueChange={onValueChangeMock} />,
    );

    fireEvent.press(getByTestId("switch-pressable"));
    expect(onValueChangeMock).toHaveBeenCalledWith(true);
  });

  it("does NOT call onValueChange when pressed if disabled", () => {
    const { getByTestId } = render(
      <Switch value={false} disabled onValueChange={onValueChangeMock} />,
    );

    fireEvent.press(getByTestId("switch-pressable"));
    expect(onValueChangeMock).not.toHaveBeenCalled();
  });
});
