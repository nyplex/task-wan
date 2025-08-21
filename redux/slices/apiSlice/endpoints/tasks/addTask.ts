import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { TaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";
import { getTasksApi } from "./getTasks";

export const addTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation<TaskRecord, TaskRecord>({
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          getTasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.push(task);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
        } catch {
          return { error: { status: 500, data: "Failed to add task" } };
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useAddTaskMutation } = addTaskApi;
