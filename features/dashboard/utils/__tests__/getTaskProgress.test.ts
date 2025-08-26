import { getTaskProgress } from "../getTaskProgress";
import { TaskWithSubtasks } from "@/redux/slices/apiSlice/endpoints/tasks/getTasks";

describe("getTaskProgress", () => {
  const baseTask: TaskWithSubtasks = {
    id: "1",
    title: "Test Task",
    description: "Test",
    start_date: null,
    end_date: null,
    completed_on: null,
    started_on: null,
    user_id: "user-1",
    icon: null,
    subtasks: [],
  };

  it("returns 0 when there are no subtasks", () => {
    const task = { ...baseTask, subtasks: [] };
    expect(getTaskProgress(task)).toBe(0);
  });

  it("returns 0 when there are subtasks but none completed", () => {
    const task = {
      ...baseTask,
      subtasks: [
        {
          id: "s1",
          title: "Subtask 1",
          description: null,
          start_date: null,
          end_date: null,
          completed_on: null,
          task_id: 1,
          user_id: "user-1",
        },
        {
          id: "s2",
          title: "Subtask 2",
          description: null,
          start_date: null,
          end_date: null,
          completed_on: null,
          task_id: 1,
          user_id: "user-1",
        },
      ],
    };
    expect(getTaskProgress(task)).toBe(0);
  });

  it("returns correct percentage when some subtasks are completed", () => {
    const task = {
      ...baseTask,
      subtasks: [
        {
          id: "s1",
          title: "Subtask 1",
          description: null,
          start_date: null,
          end_date: null,
          completed_on: "2025-08-20T10:00:00Z",
          task_id: 1,
          user_id: "user-1",
        },
        {
          id: "s2",
          title: "Subtask 2",
          description: null,
          start_date: null,
          end_date: null,
          completed_on: null,
          task_id: 1,
          user_id: "user-1",
        },
        {
          id: "s3",
          title: "Subtask 3",
          description: null,
          start_date: null,
          end_date: null,
          completed_on: null,
          task_id: 1,
          user_id: "user-1",
        },
      ],
    };
    // 1 of 3 completed → 33%
    expect(getTaskProgress(task)).toBe(33);
  });

  it("returns 100 when all subtasks are completed", () => {
    const task = {
      ...baseTask,
      subtasks: [
        {
          id: "s1",
          title: "Subtask 1",
          description: null,
          start_date: null,
          end_date: null,
          completed_on: "2025-08-20T10:00:00Z",
          task_id: 1,
          user_id: "user-1",
        },
        {
          id: "s2",
          title: "Subtask 2",
          description: null,
          start_date: null,
          end_date: null,
          completed_on: "2025-08-21T10:00:00Z",
          task_id: 1,
          user_id: "user-1",
        },
      ],
    };
    expect(getTaskProgress(task)).toBe(100);
  });
});
