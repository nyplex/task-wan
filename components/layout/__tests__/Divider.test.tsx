import React from "react";
import { render } from "@testing-library/react-native";
import Divider from "../Divider";

describe("Divider component", () => {
  it("renders with default full width", () => {
    const { getByTestId } = render(<Divider />);
    const container = getByTestId("divider-container");
    expect(container.props.style.width).toBe("100%");
  });

  it("renders with custom width", () => {
    const { getByTestId } = render(<Divider width={150} />);
    const container = getByTestId("divider-container");
    expect(container.props.style.width).toBe(150);
  });

  it("renders a simple divider without title", () => {
    const { queryByText, getByTestId } = render(<Divider />);
    expect(queryByText(/./)).toBeNull(); // no text content
    const divider = getByTestId("simple-divider");
    expect(divider).toBeTruthy();
  });

  it("renders a divider with title", () => {
    const title = "Section Title";
    const { getByText, getAllByTestId } = render(<Divider title={title} />);
    expect(getByText(title)).toBeTruthy();

    // There should be two dividers with title
    const dividers = getAllByTestId("divider-with-title");
    expect(dividers.length).toBe(2);
  });
});
