import React from "react";
import { render } from "@testing-library/react-native";
import EmptyPriorityTask from "../EmptyPriorityTask";

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

describe("EmptyPriorityTask", () => {
  it("renders correctly", () => {
    const { getByText } = render(<EmptyPriorityTask />);
    expect(getByText("No priority tasks available")).toBeTruthy();
  });

  it("matches snapshot", () => {
    const tree = render(<EmptyPriorityTask />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
