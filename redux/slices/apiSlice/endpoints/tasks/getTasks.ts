import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { TaskRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";

export const getTasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<TaskRecord[], void>({
      queryFn: async () => {
        try {
          const tasks = (await powersync.getAll(
            "SELECT * FROM tasks",
          )) as TaskRecord[];

          return { data: tasks };
        } catch {
          return { error: { status: 500, data: "Failed to fetch tasks" } };
        }
      },
      // providesTags: ["Profile"],
    }),
  }),
  overrideExisting: "throw",
});

export const { useGetTasksQuery } = getTasksApi;
