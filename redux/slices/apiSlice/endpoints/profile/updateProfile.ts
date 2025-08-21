import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { getProfileApi } from "./getProfile";
import { UserRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";

type UpdateProfilePayload = Pick<
  UserRecord,
  "id" | "location" | "profession" | "dob" | "name"
>;

export const updateProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<UpdateProfilePayload, UpdateProfilePayload>(
      {
        onQueryStarted: async (profile, { dispatch, queryFulfilled }) => {
          const patchResult = dispatch(
            getProfileApi.util.updateQueryData(
              "getProfile",
              { userID: profile.id },
              (draft: UserRecord) => ({
                ...draft,
                location: profile.location,
                profession: profile.profession,
                dob: profile.dob,
              }),
            ),
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        queryFn: async (profile: UpdateProfilePayload) => {
          try {
            await powersync.execute(
              "UPDATE users SET location = ?, profession = ?, dob = ? WHERE id = ?",
              [profile.location, profile.profession, profile.dob, profile.id],
            );
            return { data: profile };
          } catch {
            return { error: { status: 500, data: "Failed to update profile" } };
          }
        },
      },
    ),
  }),
  overrideExisting: true,
});

export const { useUpdateProfileMutation } = updateProfileApi;
