import { render } from "@testing-library/react-native";
import SliderChild from "../components/SliderChild";
import React from "react";

describe("SliderChild", () => {
  it("renders title, description, and image", () => {
    const { getByText } = render(
      <SliderChild
        title="Test Title"
        description="Test Description"
        imageSource="test.png"
      />
    );
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Description")).toBeTruthy();
  });

  it("matches the rendered output snapshot", () => {
    const { toJSON } = render(
      <SliderChild
        title="Snapshot Title"
        description="Snapshot Description"
        imageSource="snapshot.png"
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
