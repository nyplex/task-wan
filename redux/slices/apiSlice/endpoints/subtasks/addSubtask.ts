import { apiSlice } from "../../apiSlice";
import { SubtaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";
import { getSubtasksApi } from "./getSubtasks";

export const addSubtaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSubtask: builder.mutation<SubtaskRecord, SubtaskRecord>({
      onQueryStarted: async (subtask, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          getSubtasksApi.util.updateQueryData(
            "getSubtasks",
            undefined,
            (draft) => {
              draft.push(subtask);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      queryFn: async (subtask: SubtaskRecord) => {
        try {
          await powersync.execute(
            "INSERT INTO subtasks (task_id, title, description, start_date, end_date, completed_on) VALUES (?, ?, ?, ?, ?, ?)",
            [
              subtask.task_id,
              subtask.title,
              subtask.description,
              subtask.start_date,
              subtask.end_date,
              subtask.completed_on,
            ],
          );
          return { data: subtask };
        } catch {
          return { error: { status: 500, data: "Failed to create subtask" } };
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useAddSubtaskMutation } = addSubtaskApi;
