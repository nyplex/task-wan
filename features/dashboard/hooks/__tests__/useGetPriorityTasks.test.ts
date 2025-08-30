import { renderHook } from "@testing-library/react-native";
import useGetPriorityTasks from "../useGetPriorityTasks";

// Mock the API hook and filter function
jest.mock("@/redux/slices/apiSlice/endpoints/tasks/getTasks", () => ({
  useGetActiveTasksQuery: jest.fn(),
}));

jest.mock("../../utils/filterAndOrderTasks", () => ({
  filterAndOrderTasks: jest.fn(),
}));

const {
  useGetActiveTasksQuery,
} = require("@/redux/slices/apiSlice/endpoints/tasks/getTasks");
const { filterAndOrderTasks } = require("../../utils/filterAndOrderTasks");

describe("useGetPriorityTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns ordered tasks and status flags", () => {
    const mockTasks = [
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ];
    const mockOrdered = [
      { id: 2, title: "Task 2" },
      { id: 1, title: "Task 1" },
    ];
    useGetActiveTasksQuery.mockReturnValue({
      data: mockTasks,
      isError: false,
      isLoading: false,
      isSuccess: true,
      status: "fulfilled",
    });
    filterAndOrderTasks.mockReturnValue(mockOrdered);

    const { result } = renderHook(() => useGetPriorityTasks());
    expect(result.current.tasks).toEqual(mockOrdered);
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.status).toBe("fulfilled");
  });

  it("returns empty array if no tasks", () => {
    useGetActiveTasksQuery.mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: false,
      isSuccess: true,
      status: "fulfilled",
    });
    filterAndOrderTasks.mockReturnValue([]);
    const { result } = renderHook(() => useGetPriorityTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it("passes correct tasks to filterAndOrderTasks", () => {
    const mockTasks = [{ id: 1 }, { id: 2 }];
    useGetActiveTasksQuery.mockReturnValue({ data: mockTasks });
    filterAndOrderTasks.mockReturnValue([]);
    renderHook(() => useGetPriorityTasks());
    expect(filterAndOrderTasks).toHaveBeenCalledWith(mockTasks);
  });

  it("returns correct status flags from API hook", () => {
    useGetActiveTasksQuery.mockReturnValue({
      data: [],
      isError: true,
      isLoading: true,
      isSuccess: false,
      status: "pending",
    });
    filterAndOrderTasks.mockReturnValue([]);
    const { result } = renderHook(() => useGetPriorityTasks());
    expect(result.current.isError).toBe(true);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.status).toBe("pending");
  });
});
