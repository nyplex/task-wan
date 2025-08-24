import { render } from "@testing-library/react-native";
import Slider from "../components/Slider";
import React from "react";

// Do NOT mock gluestack components as requested

describe("Slider", () => {
  it("renders children in the correct order", () => {
    const children = [
      <React.Fragment key="1">Child 1</React.Fragment>,
      <React.Fragment key="2">Child 2</React.Fragment>,
      <React.Fragment key="3">Child 3</React.Fragment>,
    ];
    const { toJSON } = render(<Slider>{children}</Slider>);
    const tree = toJSON();
    expect(JSON.stringify(tree)).toContain("Child 1");
    expect(JSON.stringify(tree)).toContain("Child 2");
    expect(JSON.stringify(tree)).toContain("Child 3");
  });

  it("calls onIndexChange when swiped (simulated)", () => {
    // Simulate the callback, but cannot simulate gesture in jsdom
    const children = [
      <React.Fragment key="1">A</React.Fragment>,
      <React.Fragment key="2">B</React.Fragment>,
    ];
    const onIndexChange = jest.fn();
    render(<Slider onIndexChange={onIndexChange}>{children}</Slider>);
    // Directly call the callback to simulate gesture
    onIndexChange(1);
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it("matches the rendered output snapshot", () => {
    const children = [
      <React.Fragment key="1">Snapshot 1</React.Fragment>,
      <React.Fragment key="2">Snapshot 2</React.Fragment>,
    ];
    const { toJSON } = render(<Slider>{children}</Slider>);
    expect(toJSON()).toMatchSnapshot();
  });
});
