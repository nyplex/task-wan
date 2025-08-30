import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { SubtaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";

export const getSubtaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubtask: builder.query<SubtaskRecord, string>({
      queryFn: async (subtaskID) => {
        try {
          const result = (await powersync.get(
            "SELECT * FROM subtasks WHERE id = ?",
            [subtaskID],
          )) as SubtaskRecord;

          if (!result) {
            return { error: { status: 404, data: "Subtask not found" } };
          }
          return { data: result };
        } catch {
          return { error: { status: 500, data: "Failed to fetch subtask" } };
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useGetSubtaskQuery } = getSubtaskApi;
