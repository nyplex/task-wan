import { apiSlice } from "@/redux/slices/apiSlice/apiSlice";
import { UserRecord } from "@/powersync/AppSchema";
import { powersync } from "@/powersync/system";
import { buildQueryError } from "@/redux/utils/buildQueryError";

export type UpdateProfilePayload = Pick<
  UserRecord,
  "id" | "profession" | "dob" | "name"
>;

export const updateProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<UpdateProfilePayload, UpdateProfilePayload>(
      {
        queryFn: async (profile: UpdateProfilePayload) => {
          try {
            await powersync.execute(
              "UPDATE users SET profession = ?, dob = ?, name = ? WHERE id = ?",
              [profile.profession, profile.dob, profile.name, profile.id],
            );
            return { data: profile };
          } catch (e) {
            return buildQueryError(e, "Failed to update profile", 500);
          }
        },
        invalidatesTags: (result, error, arg) => [
          { type: "Profile", id: arg.id },
        ],
      },
    ),
  }),
  overrideExisting: true,
});

export const { useUpdateProfileMutation } = updateProfileApi;
