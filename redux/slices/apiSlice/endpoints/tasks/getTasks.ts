import { powersync } from "@/powersync/system";
import { SubtaskRecord } from "@/powersync/AppSchema";
import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { getUserId } from "@/lib/getUserId";
import { buildQueryError } from "@/redux/utils/buildQueryError";

type SubtaskJointRecord = {
  subtask_id: string;
  subtask_task_id: number;
  subtask_user_id: string;
  subtask_title: string;
  subtask_description: string;
  subtask_start_date: string;
  subtask_end_date: string;
  subtask_completed_on: string;
};

export type TaskWithSubtasks = {
  id: string;
  title: string;
  description: string;
  start_date: string | null;
  end_date: string | null;
  completed_on: string | null;
  started_on: string | null;
  user_id: string;
  icon: string | null;
  subtasks: SubtaskRecord[];
};

export const getTasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveTasks: builder.query<TaskWithSubtasks[], void>({
      queryFn: async () => {
        try {
          const userId = await getUserId();
          const rows = (await powersync.getAll(
            `SELECT 
              t.id,
              t.title,
              t.description,
              t.start_date,
              t.end_date,
              t.completed_on,
              t.started_on,
              t.user_id,
              t.icon,
              s.id AS subtask_id,
              s.task_id AS subtask_task_id,
              s.user_id AS subtask_user_id,
              s.title AS subtask_title,
              s.description AS subtask_description,
              s.start_date AS subtask_start_date,
              s.end_date AS subtask_end_date,
              s.completed_on AS subtask_completed_on
            FROM tasks t
            LEFT JOIN subtasks s ON s.task_id = t.id 
            WHERE t.completed_on IS NULL AND t.user_id = ?`,
            [userId],
          )) as (TaskWithSubtasks & SubtaskJointRecord)[];

          // Group subtasks by task
          const taskMap: Record<string, TaskWithSubtasks> = {};

          rows.forEach((row) => {
            if (!taskMap[row.id]) {
              taskMap[row.id] = {
                id: row.id,
                title: row.title,
                description: row.description,
                start_date: row.start_date,
                end_date: row.end_date,
                completed_on: row.completed_on,
                started_on: row.started_on,
                user_id: row.user_id,
                icon: row.icon,
                subtasks: [],
              };
            }

            if (row.subtask_id) {
              taskMap[row.id].subtasks.push({
                id: row.subtask_id,
                title: row.subtask_title,
                description: row.subtask_description,
                start_date: row.subtask_start_date,
                end_date: row.subtask_end_date,
                completed_on: row.subtask_completed_on,
                task_id: row.subtask_task_id,
                user_id: row.subtask_user_id,
              });
            }
          });

          return { data: Object.values(taskMap) };
        } catch (e) {
          return buildQueryError(e, "Failed to fetch today's tasks", 500);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetActiveTasksQuery } = getTasksApi;
