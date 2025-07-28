import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "../HomeScreen";

// Named function mocks for child components
const Header = () => <></>;
Header.displayName = "Header";
const WelcomeMessage = () => <></>;
WelcomeMessage.displayName = "WelcomeMessage";
const PriorityTaskList = () => <></>;
PriorityTaskList.displayName = "PriorityTaskList";
const DailyTaskList = () => <></>;
DailyTaskList.displayName = "DailyTaskList";

jest.mock("../components/Header", () => Header);
jest.mock("../components/WelcomeMessage", () => WelcomeMessage);
jest.mock("../components/PriorityTaskList", () => PriorityTaskList);
jest.mock("../components/DailyTaskList", () => DailyTaskList);
jest.mock("@/components/gluestack/box", () => ({ Box: ({ children }: any) => <>{children}</> }));

describe("HomeScreen", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<HomeScreen />);
    // No error thrown means pass
  });

  it("renders Header, WelcomeMessage, PriorityTaskList, and DailyTaskList", () => {
    const { UNSAFE_queryAllByType } = render(<HomeScreen />);
    expect(UNSAFE_queryAllByType(Header).length).toBe(1);
    expect(UNSAFE_queryAllByType(WelcomeMessage).length).toBe(1);
    expect(UNSAFE_queryAllByType(PriorityTaskList).length).toBe(1);
    expect(UNSAFE_queryAllByType(DailyTaskList).length).toBe(1);
  });

  it("renders a ScrollView as the root element", () => {
    const { UNSAFE_getByType } = render(<HomeScreen />);
    expect(UNSAFE_getByType(require("react-native").ScrollView)).toBeTruthy();
  });
});
