import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { powersync } from "@/powersync/system";
import { buildQueryError } from "@/redux/utils/buildQueryError";

export const deleteSubtaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteSubtask: builder.mutation<null, string>({
      queryFn: async (subtaskID: string) => {
        try {
          await powersync.execute("DELETE FROM subtasks WHERE id = ?", [
            subtaskID,
          ]);
          return { data: null };
        } catch (e) {
          return buildQueryError(e, "Failed to delete subtask", 500);
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useDeleteSubtaskMutation } = deleteSubtaskApi;
