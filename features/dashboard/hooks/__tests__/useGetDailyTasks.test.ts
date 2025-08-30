import { renderHook } from "@testing-library/react-native";
import useGetDailyTasks from "../useGetDailyTasks";

// Mock the API hook
jest.mock("@/redux/slices/apiSlice/endpoints/subtasks/getSubtasks", () => ({
  useGetTodaySubtasksQuery: jest.fn(),
}));

const {
  useGetTodaySubtasksQuery,
} = require("@/redux/slices/apiSlice/endpoints/subtasks/getSubtasks");

describe("useGetDailyTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns empty array when no tasks", () => {
    useGetTodaySubtasksQuery.mockReturnValue({ data: undefined });
    const { result } = renderHook(() => useGetDailyTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it("returns tasks ordered by start_date today first, then by end_date", () => {
    const today = new Date();
    const todayStr = today.toISOString();
    const tomorrowStr = new Date(
      today.getTime() + 24 * 60 * 60 * 1000,
    ).toISOString();
    const yesterdayStr = new Date(
      today.getTime() - 24 * 60 * 60 * 1000,
    ).toISOString();
    const tasks = [
      {
        id: 1,
        title: "Today Task",
        start_date: todayStr,
        end_date: tomorrowStr,
      },
      {
        id: 2,
        title: "Tomorrow Task",
        start_date: tomorrowStr,
        end_date: tomorrowStr,
      },
      {
        id: 3,
        title: "Yesterday Task",
        start_date: yesterdayStr,
        end_date: todayStr,
      },
    ];
    useGetTodaySubtasksQuery.mockReturnValue({ data: tasks });
    const { result } = renderHook(() => useGetDailyTasks());
    // Today task first, then others by end_date ascending
    expect(result.current.tasks[0].title).toBe("Today Task");
    expect(result.current.tasks[1].title).toBe("Yesterday Task");
    expect(result.current.tasks[2].title).toBe("Tomorrow Task");
  });

  it("returns only today tasks if all start_date is today", () => {
    const today = new Date();
    const todayStr = today.toISOString();
    const tasks = [
      { id: 1, title: "Task 1", start_date: todayStr, end_date: todayStr },
      { id: 2, title: "Task 2", start_date: todayStr, end_date: todayStr },
    ];
    useGetTodaySubtasksQuery.mockReturnValue({ data: tasks });
    const { result } = renderHook(() => useGetDailyTasks());
    expect(result.current.tasks.length).toBe(2);
    expect(
      result.current.tasks.every((t: any) => t.start_date === todayStr),
    ).toBe(true);
  });

  it("returns empty array if API returns null", () => {
    useGetTodaySubtasksQuery.mockReturnValue({ data: null });
    const { result } = renderHook(() => useGetDailyTasks());
    expect(result.current.tasks).toEqual([]);
  });
});
