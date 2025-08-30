import { TaskWithSubtasks } from "@/redux/slices/apiSlice/endpoints/tasks/getTasks";

export function getTaskProgress(task: TaskWithSubtasks): number {
  const { subtasks } = task;

  if (!subtasks || subtasks.length === 0) {
    return 0; // no subtasks → 0% progress
  }

  const completedCount = subtasks.filter((s) => s.completed_on !== null).length;

  const progress = (completedCount / subtasks.length) * 100;

  return Math.round(progress); // rounded to nearest %
}
