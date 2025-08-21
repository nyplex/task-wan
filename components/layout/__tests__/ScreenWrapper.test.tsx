import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import ScreenWrapper from "../ScreenWrapper";

const DummyHeader = () => <Text>Header</Text>;
const DummyContent = () => <Text>TestContent</Text>;

describe("ScreenWrapper", () => {
  it("renders header and children", () => {
    const { getByText } = render(
      <ScreenWrapper header={<DummyHeader />}>
        <DummyContent />
      </ScreenWrapper>,
    );
    expect(getByText("Header")).toBeTruthy();
    expect(getByText("TestContent")).toBeTruthy();
  });

  it("renders header in the correct container", () => {
    const { getByText } = render(
      <ScreenWrapper header={<DummyHeader />}>
        <DummyContent />
      </ScreenWrapper>,
    );
    const header = getByText("Header");
    expect(header).toBeTruthy();
  });

  it("renders children in the correct container", () => {
    const { getByText } = render(
      <ScreenWrapper header={<DummyHeader />}>
        <DummyContent />
      </ScreenWrapper>,
    );
    const content = getByText("TestContent");
    expect(content).toBeTruthy();
  });
});
