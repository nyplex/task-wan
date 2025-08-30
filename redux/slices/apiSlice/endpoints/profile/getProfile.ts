import { powersync } from "@/powersync/system";
import { UserRecord } from "@/powersync/AppSchema";
import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { getUserId } from "@/redux/slices/apiSlice/utils/getUserId";

export const getProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserRecord, void>({
      queryFn: async () => {
        try {
          const userId = await getUserId();
          const result = (await powersync.get(
            "SELECT * FROM users WHERE id = ?;",
            [userId],
          )) as UserRecord;

          if (!result) {
            return { error: { status: 404, data: "Profile not found" } };
          }
          return { data: result };
        } catch (err) {
          if (err instanceof Error && err.message === "Unauthorized") {
            return { error: { status: 401, data: "Unauthorized" } };
          }
          return { error: { status: 500, data: "Failed to fetch profile" } };
        }
      },
      providesTags: (result) => [{ type: "Profile", id: result?.id }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProfileQuery } = getProfileApi;
