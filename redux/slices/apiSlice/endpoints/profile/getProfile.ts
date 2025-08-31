import { powersync } from "@/powersync/system";
import { UserRecord } from "@/powersync/AppSchema";
import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { getUserId } from "@/lib/getUserId";
import { buildQueryError } from "@/redux/utils/buildQueryError";

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
            return buildQueryError(
              new Error("Profile not found"),
              "Profile not found",
              404,
            );
          }
          return { data: result };
        } catch (e) {
          return buildQueryError(e, "Failed to fetch profile", 500);
        }
      },
      providesTags: (result) => [{ type: "Profile", id: result?.id }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProfileQuery } = getProfileApi;
