import { apiSlice } from "../../apiSlice";
import { SubtaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";

export const getSubtasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubtasks: builder.query<SubtaskRecord[], void>({
      queryFn: async () => {
        try {
          const result = (await powersync.getAll(
            "SELECT * FROM subtasks WHERE task_id IS NULL",
          )) as SubtaskRecord[];

          return { data: result };
        } catch {
          return { error: { status: 500, data: "Failed to fetch subtasks" } };
        }
      },
      // providesTags: ["Profile"],
    }),
  }),
  overrideExisting: "throw",
});

export const { useGetSubtasksQuery } = getSubtasksApi;
