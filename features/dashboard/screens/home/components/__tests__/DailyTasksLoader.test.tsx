import React from "react";
import { render } from "@testing-library/react-native";
import DailTasksLoader from "../DailyTasksLoader";

// You may need to mock hooks or data sources used inside PriorityTasksLoader
jest.mock("@/features/dashboard/hooks/useGetDailyTasks", () => ({
  __esModule: true,
  default: jest.fn(() => [
    {
      id: 1,
      title: "Late Task",
      end_date: "2025-08-25",
      started_on: "2025-08-20",
    },
    { id: 2, title: "Upcoming Task", end_date: "2025-08-30", started_on: null },
  ]),
}));

describe("DailyTasksLoader", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<DailTasksLoader />);
    expect(toJSON()).toBeTruthy();
  });

  it("matches snapshot", () => {
    const tree = render(<DailTasksLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
