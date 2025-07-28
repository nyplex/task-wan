import { render } from "@testing-library/react-native";
import SliderIndicator from "../components/SliderIndicator";
import React from "react";

describe("SliderIndicator", () => {
  it("renders the correct number of indicators", () => {
    const { getAllByTestId } = render(
      <SliderIndicator
        length={5}
        currentIndex={2}
      />
    );
    expect(getAllByTestId(/slider-indicator-/).length).toBe(5);
  });

  it("applies the correct style to the active indicator (snapshot)", () => {
    const { toJSON } = render(
      <SliderIndicator
        length={3}
        currentIndex={1}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with no active indicator if currentIndex is undefined (snapshot)", () => {
    const { toJSON } = render(<SliderIndicator length={3} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with length=1 (snapshot)", () => {
    const { toJSON } = render(
      <SliderIndicator
        length={1}
        currentIndex={0}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
