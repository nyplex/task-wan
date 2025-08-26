import { TaskWithSubtasks } from "@/redux/slices/apiSlice/endpoints/tasks/getTasks";

export const filterAndOrderTasks = (
  tasks: TaskWithSubtasks[],
): TaskWithSubtasks[] => {
  if (!tasks || tasks.length === 0) {
    return [];
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1);

  // Filter out completed tasks and tasks without end_date
  const activeTasks = tasks.filter(
    (task) => !task.completed_on && task.end_date,
  );

  // Categorize tasks
  const dueToday: TaskWithSubtasks[] = [];
  const overdue: TaskWithSubtasks[] = [];
  const upcoming: TaskWithSubtasks[] = [];

  activeTasks.forEach((task) => {
    const endDate = new Date(task.end_date!);

    if (endDate >= todayStart && endDate <= todayEnd) {
      // Due today
      dueToday.push(task);
    } else if (endDate < todayStart) {
      // Overdue
      overdue.push(task);
    } else {
      // Upcoming
      upcoming.push(task);
    }
  });

  // Sort overdue tasks (most overdue first - earliest end_date first)
  overdue.sort((a, b) => {
    const dateA = new Date(a.end_date!);
    const dateB = new Date(b.end_date!);
    return dateA.getTime() - dateB.getTime();
  });

  // Sort upcoming tasks (shortest deadline first - earliest end_date first)
  upcoming.sort((a, b) => {
    const dateA = new Date(a.end_date!);
    const dateB = new Date(b.end_date!);
    return dateA.getTime() - dateB.getTime();
  });

  // Optional: Sort due today tasks by end_date as well
  dueToday.sort((a, b) => {
    const dateA = new Date(a.end_date!);
    const dateB = new Date(b.end_date!);
    return dateA.getTime() - dateB.getTime();
  });

  // Combine all categories in the specified order
  return [...dueToday, ...overdue, ...upcoming];
};
