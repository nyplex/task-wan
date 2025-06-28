import React from "react";
import { render } from "@testing-library/react-native";
import ProgressBar from "../ProgressBar";

describe("ProgressBar", () => {
  it("renders the progress text correctly", () => {
    const { getByText } = render(<ProgressBar progress={45} />);
    expect(getByText("45%")).toBeTruthy();
  });

  it("applies the correct width style based on progress", () => {
    const progress = 75;
    const { getByTestId } = render(<ProgressBar progress={progress} />);
    const progressBar = getByTestId("progress-bar-fill");

    expect(progressBar.props.style.width).toBe(`${progress}%`);
  });
});
