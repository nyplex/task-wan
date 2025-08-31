import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { powersync } from "@/powersync/system";
import { buildQueryError } from "@/redux/utils/buildQueryError";

export const deleteTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation<null, string>({
      queryFn: async (taskId: string) => {
        try {
          await powersync.execute("DELETE FROM tasks WHERE id = ?", [taskId]);
          return { data: null };
        } catch (e) {
          return buildQueryError(e, "Failed to delete task", 500);
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useDeleteTaskMutation } = deleteTaskApi;
