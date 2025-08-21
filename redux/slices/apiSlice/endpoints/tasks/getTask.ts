import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { TaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";

export const getTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query<TaskRecord, string>({
      queryFn: async (taskId) => {
        try {
          const result = (await powersync.get(
            "SELECT * FROM tasks WHERE id = ?",
            [taskId],
          )) as TaskRecord;

          if (!result) {
            return { error: { status: 404, data: "Task not found" } };
          }
          return { data: result };
        } catch {
          return { error: { status: 500, data: "Failed to fetch task" } };
        }
      },
      // providesTags: ["Profile"],
    }),
  }),
  overrideExisting: "throw",
});

export const { useGetTaskQuery } = getTaskApi;
