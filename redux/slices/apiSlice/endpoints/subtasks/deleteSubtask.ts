import { apiSlice } from "../../apiSlice";
import { powersync } from "@/powersync/system";
import { getSubtasksApi } from "./getSubtasks";

export const deleteSubtaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteSubtask: builder.mutation<null, string>({
      onQueryStarted: async (subtaskID, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          getSubtasksApi.util.updateQueryData(
            "getSubtasks",
            undefined,
            (draft) => {
              const index = draft.findIndex(
                (subtask) => subtask.id === subtaskID,
              );
              if (index !== -1) {
                draft.splice(index, 1);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      queryFn: async (subtaskID: string) => {
        try {
          await powersync.execute("DELETE FROM subtasks WHERE id = ?", [
            subtaskID,
          ]);
          return { data: null };
        } catch {
          return { error: { status: 500, data: "Failed to delete subtask" } };
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useDeleteSubtaskMutation } = deleteSubtaskApi;
