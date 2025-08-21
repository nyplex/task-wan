import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { powersync } from "@/powersync/system";
import { getTasksApi } from "./getTasks";

export const deleteTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation<null, string>({
      onQueryStarted: async (taskId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          getTasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const index = draft.findIndex((task) => task.id === taskId);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      queryFn: async (taskId: string) => {
        try {
          await powersync.execute("DELETE FROM tasks WHERE id = ?", [taskId]);
          return { data: null };
        } catch {
          return { error: { status: 500, data: "Failed to delete task" } };
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useDeleteTaskMutation } = deleteTaskApi;
