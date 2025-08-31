import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { SubtaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";
import { buildQueryError } from "@/redux/utils/buildQueryError";

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
            return buildQueryError(
              new Error("Subtask not found"),
              "Subtask not found",
              404,
            );
          }
          return { data: result };
        } catch (e) {
          return buildQueryError(e, "Failed to fetch subtask", 500);
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const { useGetSubtaskQuery } = getSubtaskApi;
