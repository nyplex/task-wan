import React from "react";
import { render } from "@testing-library/react-native";
import { Circle } from "react-native-svg";
import CircularChart from "../CircularChart";

describe("CircularChart", () => {
  it("renders title when showTitle is true", () => {
    const { getByText } = render(
      <CircularChart title="Progress" showTitle progress={50} />,
    );
    expect(getByText("Progress")).toBeTruthy();
  });

  it("does not render title when showTitle is false", () => {
    const { queryByText } = render(
      <CircularChart title="Hidden Title" showTitle={false} progress={30} />,
    );
    expect(queryByText("Hidden Title")).toBeNull();
  });

  it("renders progress value when showValue is true", () => {
    const { getByText } = render(
      <CircularChart title="Chart" showTitle progress={75} showValue />,
    );
    expect(getByText("75%")).toBeTruthy();
  });

  it("does not render progress value when showValue is false", () => {
    const { queryByText } = render(
      <CircularChart title="Chart" showTitle progress={90} showValue={false} />,
    );
    expect(queryByText("90%")).toBeNull();
  });

  it("renders SVG with 2 circles", () => {
    const { UNSAFE_queryAllByType, getByTestId } = render(
      <CircularChart title="Chart" showTitle progress={60} />,
    );
    const svg = getByTestId("circular-chart-svg");
    const circles = UNSAFE_queryAllByType(Circle);
    expect(svg).toBeTruthy();
    expect(circles.length).toBe(2); // One for background and one for animated progress
  });
});
