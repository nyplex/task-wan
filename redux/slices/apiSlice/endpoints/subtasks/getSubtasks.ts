import { powersync } from "@/powersync/system";
import { SubtaskRecord } from "@/powersync/AppSchema";
import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { getUserId } from "@/redux/slices/apiSlice/utils/getUserId";

export const getSubtasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubtasks: builder.query<SubtaskRecord[], void>({
      queryFn: async () => {
        try {
          const userId = await getUserId();
          const result = (await powersync.getAll(
            "SELECT * FROM subtasks WHERE task_id IS NULL AND user_id = ?",
            [userId],
          )) as SubtaskRecord[];

          return { data: result };
        } catch (err) {
          if (err instanceof Error && err.message === "Unauthorized") {
            return { error: { status: 401, data: "Unauthorized" } };
          }
          return { error: { status: 500, data: "Failed to fetch subtasks" } };
        }
      },
    }),
    getTodaySubtasks: builder.query<SubtaskRecord[], void>({
      queryFn: async () => {
        try {
          const userId = await getUserId();
          const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
          // fake await of 5 seconds
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const result = (await powersync.getAll(
            `SELECT * FROM subtasks
            WHERE task_id IS NULL
            AND user_id = ?
            AND completed_on IS NULL
            AND (
              date(start_date) = ?
              OR (date(start_date) < ? 
              AND end_date IS NOT NULL 
              AND date(end_date) >= ?))`,
            [userId, today, today, today], // params array
          )) as SubtaskRecord[];

          return { data: result };
        } catch (err) {
          if (err instanceof Error && err.message === "Unauthorized") {
            return { error: { status: 401, data: "Unauthorized" } };
          }
          return {
            error: { status: 500, data: "Failed to fetch today's subtasks" },
          };
        }
      },
    }),
  }),

  overrideExisting: true,
});

export const { useGetSubtasksQuery, useGetTodaySubtasksQuery } = getSubtasksApi;
