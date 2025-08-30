import React from "react";
import { render } from "@testing-library/react-native";
import PriorityTasksLoader from "../PriorityTasksLoader";

// You may need to mock hooks or data sources used inside PriorityTasksLoader
jest.mock("@/features/dashboard/hooks/useGetPriorityTasks", () => ({
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

describe("PriorityTasksLoader", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<PriorityTasksLoader />);
    expect(toJSON()).toBeTruthy();
  });

  it("matches snapshot", () => {
    const tree = render(<PriorityTasksLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
