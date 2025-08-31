import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { TaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";
import { buildQueryError } from "@/redux/utils/buildQueryError";

export const addTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation<TaskRecord, TaskRecord>({
      queryFn: async (task: TaskRecord) => {
        try {
          await powersync.execute(
            "INSERT INTO tasks (title, description, start_date, end_date, started_on, completed_on, icon) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              task.title,
              task.description,
              task.start_date,
              task.end_date,
              task.started_on,
              task.completed_on,
              task.icon,
            ],
          );
          return { data: task };
        } catch (e) {
          return buildQueryError(e, "Failed to add task", 500);
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useAddTaskMutation } = addTaskApi;
