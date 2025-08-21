import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { UserRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";

export const getProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserRecord, { userID: string }>({
      queryFn: async ({ userID }) => {
        try {
          const result = (await powersync.get(
            "SELECT * FROM users WHERE id = ?;",
            [userID],
          )) as UserRecord;

          if (!result) {
            return { error: { status: 404, data: "Profile not found" } };
          }
          return { data: result };
        } catch {
          return { error: { status: 500, data: "Failed to fetch profile" } };
        }
      },
      // providesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProfileQuery } = getProfileApi;
