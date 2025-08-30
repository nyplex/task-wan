import React from "react";
import { render } from "@testing-library/react-native";
import EmptyDailyTask from "../EmptyDailyTask";

jest.mock("@/gluestack-ui/box", () => ({
  __esModule: true,
  Box: ({ children }: any) => <>{children}</>,
}));
jest.mock("@/components/UI/Text", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => {
    const { Text: RNText } = require("react-native");
    return <RNText {...props}>{children}</RNText>;
  },
}));

describe("EmptyDailyTask", () => {
  it("renders correctly", () => {
    const { getByText } = render(<EmptyDailyTask />);
    expect(getByText("No daily tasks available")).toBeTruthy();
  });

  it("matches snapshot", () => {
    const tree = render(<EmptyDailyTask />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
