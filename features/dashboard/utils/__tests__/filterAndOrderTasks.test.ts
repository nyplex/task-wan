import { TaskWithSubtasks } from "@/redux/slices/apiSlice/endpoints/tasks/getTasks";
import { filterAndOrderTasks } from "../filterAndOrderTasks"; // Adjust import path as needed

// Mock data helper
const createMockTask = (
  id: string,
  title: string,
  end_date: string | null,
  completed_on: string | null = null,
): TaskWithSubtasks => ({
  id,
  title,
  description: `Description for ${title}`,
  start_date: null,
  end_date,
  completed_on,
  started_on: null,
  user_id: "user-123",
  icon: null,
  subtasks: [],
});

describe("filterAndOrderTasks", () => {
  beforeEach(() => {
    // Mock current date to ensure consistent tests
    jest.useFakeTimers();
    // Set mock date to 2024-01-15 12:00:00
    jest.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Edge Cases", () => {
    it("should handle empty array", () => {
      const result = filterAndOrderTasks([]);
      expect(result).toEqual([]);
    });

    it("should handle null/undefined input", () => {
      const result = filterAndOrderTasks(null as any);
      expect(result).toEqual([]);
    });

    it("should filter out tasks without end_date", () => {
      const tasks = [
        createMockTask("1", "Task 1", null),
        createMockTask("2", "Task 2", "2024-01-16T10:00:00Z"),
      ];

      const result = filterAndOrderTasks(tasks);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    it("should filter out completed tasks", () => {
      const tasks = [
        createMockTask(
          "1",
          "Completed Task",
          "2024-01-16T10:00:00Z",
          "2024-01-14T09:00:00Z",
        ),
        createMockTask("2", "Active Task", "2024-01-16T10:00:00Z"),
      ];

      const result = filterAndOrderTasks(tasks);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });
  });

  describe("Task Categorization", () => {
    it("should correctly identify tasks due today", () => {
      const tasks = [
        // Today (2024-01-15) - various times
        createMockTask("1", "Due Today Morning", "2024-01-15T08:00:00Z"),
        createMockTask("2", "Due Today Evening", "2024-01-15T20:00:00Z"),
        createMockTask("3", "Due Today Midnight", "2024-01-15T23:59:59Z"),
        // Not today
        createMockTask("4", "Due Tomorrow", "2024-01-16T01:00:00Z"),
      ];

      const result = filterAndOrderTasks(tasks);

      // First 3 should be due today tasks
      expect(result.slice(0, 3).map((t) => t.id)).toEqual(["1", "2", "3"]);
      expect(result[3].id).toBe("4"); // Tomorrow task should be in upcoming
    });

    it("should correctly identify overdue tasks", () => {
      const tasks = [
        createMockTask("1", "Overdue Yesterday", "2024-01-14T10:00:00Z"),
        createMockTask("2", "Overdue Last Week", "2024-01-08T10:00:00Z"),
        createMockTask("3", "Due Today", "2024-01-15T10:00:00Z"),
      ];

      const result = filterAndOrderTasks(tasks);

      // Due today should be first
      expect(result[0].id).toBe("3");
      // Then overdue tasks (most overdue first)
      expect(result[1].id).toBe("2"); // Last week (more overdue)
      expect(result[2].id).toBe("1"); // Yesterday (less overdue)
    });

    it("should correctly identify upcoming tasks", () => {
      const tasks = [
        createMockTask("1", "Due Next Week", "2024-01-22T10:00:00Z"),
        createMockTask("2", "Due Tomorrow", "2024-01-16T10:00:00Z"),
        createMockTask("3", "Due Today", "2024-01-15T10:00:00Z"),
      ];

      const result = filterAndOrderTasks(tasks);

      // Due today first
      expect(result[0].id).toBe("3");
      // Then upcoming tasks (shortest deadline first)
      expect(result[1].id).toBe("2"); // Tomorrow
      expect(result[2].id).toBe("1"); // Next week
    });
  });

  describe("Task Ordering", () => {
    it("should order overdue tasks by most overdue first", () => {
      const tasks = [
        createMockTask("1", "Overdue 1 Day", "2024-01-14T10:00:00Z"),
        createMockTask("2", "Overdue 7 Days", "2024-01-08T10:00:00Z"),
        createMockTask("3", "Overdue 3 Days", "2024-01-12T10:00:00Z"),
        createMockTask("4", "Overdue 1 Hour", "2024-01-14T23:00:00Z"),
      ];

      const result = filterAndOrderTasks(tasks);

      // Should be ordered from most overdue to least overdue
      expect(result.map((t) => t.id)).toEqual(["2", "3", "1", "4"]);
    });

    it("should order upcoming tasks by shortest deadline first", () => {
      const tasks = [
        createMockTask("1", "Due Next Month", "2024-02-15T10:00:00Z"),
        createMockTask("2", "Due Tomorrow", "2024-01-16T10:00:00Z"),
        createMockTask("3", "Due Next Week", "2024-01-22T10:00:00Z"),
        createMockTask("4", "Due Day After Tomorrow", "2024-01-17T10:00:00Z"),
      ];

      const result = filterAndOrderTasks(tasks);

      // Should be ordered by shortest deadline first
      expect(result.map((t) => t.id)).toEqual(["2", "4", "3", "1"]);
    });

    it("should order due today tasks by time", () => {
      const tasks = [
        createMockTask("1", "Due Today Evening", "2024-01-15T20:00:00Z"),
        createMockTask("2", "Due Today Morning", "2024-01-15T08:00:00Z"),
        createMockTask("3", "Due Today Afternoon", "2024-01-15T14:00:00Z"),
      ];

      const result = filterAndOrderTasks(tasks);

      // Should be ordered by time (earliest first)
      expect(result.map((t) => t.id)).toEqual(["2", "3", "1"]);
    });
  });

  describe("Complete Integration", () => {
    it("should correctly categorize and order all task types together", () => {
      const tasks = [
        // Upcoming
        createMockTask("upcoming1", "Due Next Week", "2024-01-22T10:00:00Z"),
        createMockTask("upcoming2", "Due Tomorrow", "2024-01-16T10:00:00Z"),

        // Due Today
        createMockTask("today1", "Due Today Evening", "2024-01-15T20:00:00Z"),
        createMockTask("today2", "Due Today Morning", "2024-01-15T08:00:00Z"),

        // Overdue
        createMockTask("overdue1", "Overdue Yesterday", "2024-01-14T10:00:00Z"),
        createMockTask("overdue2", "Overdue Last Week", "2024-01-08T10:00:00Z"),

        // Should be filtered out
        createMockTask(
          "completed",
          "Completed Task",
          "2024-01-16T10:00:00Z",
          "2024-01-14T09:00:00Z",
        ),
        createMockTask("no-date", "No End Date", null),
      ];

      const result = filterAndOrderTasks(tasks);

      // Should have 6 tasks (2 filtered out)
      expect(result).toHaveLength(6);

      // Should be in correct order: Due Today -> Overdue -> Upcoming
      const expectedOrder = [
        "today2", // Due today morning
        "today1", // Due today evening
        "overdue2", // Most overdue (last week)
        "overdue1", // Less overdue (yesterday)
        "upcoming2", // Shortest deadline (tomorrow)
        "upcoming1", // Longer deadline (next week)
      ];

      expect(result.map((t) => t.id)).toEqual(expectedOrder);
    });

    it("should handle timezone boundaries correctly", () => {
      const tasks = [
        // End of today in UTC
        createMockTask("1", "End of Today", "2024-01-15T23:59:59Z"),
        // Start of tomorrow in UTC
        createMockTask("2", "Start of Tomorrow", "2024-01-16T00:00:00Z"),
        // End of yesterday in UTC
        createMockTask("3", "End of Yesterday", "2024-01-14T23:59:59Z"),
      ];

      const result = filterAndOrderTasks(tasks);

      // Task 1 should be due today, task 2 upcoming, task 3 overdue
      expect(result[0].id).toBe("1"); // Due today
      expect(result[1].id).toBe("3"); // Overdue
      expect(result[2].id).toBe("2"); // Upcoming
    });
  });
});
