import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { TaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";
import { buildQueryError } from "@/redux/utils/buildQueryError";

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
            return buildQueryError(
              new Error("Task not found"),
              "Task not found",
              404,
            );
          }
          return { data: result };
        } catch (e) {
          return buildQueryError(e, "Failed to fetch task", 500);
        }
      },
      // providesTags: ["Profile"],
    }),
  }),
  overrideExisting: "throw",
});

export const { useGetTaskQuery } = getTaskApi;
