import { useGetTodaySubtasksQuery } from "@/redux/slices/apiSlice/endpoints/subtasks/getSubtasks";

const useGetDailyTasks = () => {
  const {
    data: tasks,
    isFetching,
    isError,
    isLoading,
    isSuccess,
    status,
  } = useGetTodaySubtasksQuery();

  if (!tasks) {
    return {
      tasks: [],
      isFetching,
      isError,
      isLoading,
      isSuccess,
      status,
    };
  }

  // Helper to check if a date string is today (ignoring time)
  const isToday = (dateStr: string) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  };

  // Split tasks into those starting today and others
  const todayTasks = tasks.filter((task) => isToday(task.start_date));
  const otherTasks = tasks.filter((task) => !isToday(task.start_date));

  // Order other tasks by shortest deadline (end_date ascending)
  otherTasks.sort((a, b) => {
    if (a.end_date && b.end_date) {
      return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
    }
    return 0;
  });

  return {
    tasks: [...todayTasks, ...otherTasks],
    isFetching,
    isError,
    isLoading,
    isSuccess,
    status,
  };
};

export default useGetDailyTasks;
