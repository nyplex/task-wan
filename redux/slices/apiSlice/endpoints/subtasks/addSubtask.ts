import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { SubtaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";
import { buildQueryError } from "@/redux/utils/buildQueryError";

export const addSubtaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSubtask: builder.mutation<SubtaskRecord, SubtaskRecord>({
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
        } catch (e) {
          return buildQueryError(e, "Failed to create subtask", 500);
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useAddSubtaskMutation } = addSubtaskApi;
