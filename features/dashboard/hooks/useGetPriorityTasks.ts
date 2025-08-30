import { useGetActiveTasksQuery } from "@/redux/slices/apiSlice/endpoints/tasks/getTasks";
import { filterAndOrderTasks } from "../utils/filterAndOrderTasks";

const useGetPriorityTasks = () => {
  const {
    data: tasks,
    isError,
    isLoading,
    isSuccess,
    status,
  } = useGetActiveTasksQuery();

  const orderedTasks = filterAndOrderTasks(tasks || []);

  return {
    tasks: orderedTasks,
    isError,
    isLoading,
    isSuccess,
    status,
  };
};

export default useGetPriorityTasks;
