import { useGetActiveTasksQuery } from "@/redux/slices/apiSlice/endpoints/tasks/getTasks";
import { filterAndOrderTasks } from "../utils/filterAndOrderTasks";

const useGetPriorityTasks = () => {
  const { data: tasks } = useGetActiveTasksQuery();
  const orderedTasks = filterAndOrderTasks(tasks || []);

  return orderedTasks;
};

export default useGetPriorityTasks;
