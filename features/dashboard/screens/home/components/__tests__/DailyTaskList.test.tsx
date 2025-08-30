import React from "react";
import { render } from "@testing-library/react-native";
import DailyTaskList from "../DailyTaskList";
import { SubtaskRecord } from "@/powersync/AppSchema";

// Mock dependencies
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ navigate: jest.fn() })),
}));
jest.mock("@shopify/flash-list", () => ({
  FlashList: jest.fn(({ data, renderItem }) => {
    const { View } = require("react-native");
    return (
      <View testID="flash-list">
        {data &&
          data.map((item: SubtaskRecord, idx: number) => {
            const key = item.id || `item-${idx}`;
            return (
              <View key={key} testID={`flash-list-item-${idx}`}>
                {renderItem({ item, index: idx })}
              </View>
            );
          })}
      </View>
    );
  }),
}));
jest.mock("@/features/dashboard/hooks/useGetDailyTasks", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    tasks: [
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ],
    isLoading: false,
  })),
}));

describe("DailyTaskList", () => {
  it("renders the list of daily tasks", () => {
    const { getByText } = render(<DailyTaskList />);
    expect(getByText("Daily Tasks")).toBeTruthy();
    expect(getByText("Task 1")).toBeTruthy();
    expect(getByText("Task 2")).toBeTruthy();
  });

  it("matches snapshot", () => {
    const tree = render(<DailyTaskList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
