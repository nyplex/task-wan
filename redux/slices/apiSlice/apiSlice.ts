// Import RTK Query methods
import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Import your type
import type { User } from "../../../types/User";
import { RootState } from "@/redux/store";
import { supabaseAnonKey, supabaseRESTUrl } from "@/lib/supabase";
import { powersync } from "@/powersync/system";
import { GET_PROFILE_BY_ID } from "@/powersync/sql/profile.queries";
import { UserRecord } from "@/powersync/AppSchema";
export type { User };

// Define API slice
export const apiSlice = createApi({
  reducerPath: "supabaseApi",
  tagTypes: ["Profile"],
  // baseQuery: fetchBaseQuery({
  //   baseUrl: supabaseRESTUrl,
  //   prepareHeaders: (headers, { getState, type }) => {
  //     const state = getState() as RootState;
  //     const token = state.auth.session?.access_token;
  //     const supabaseKey = supabaseAnonKey;
  //     headers.set("apikey", supabaseKey);
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }
  //     if (type === "mutation") {
  //       headers.set("Content-Type", "application/json");
  //       headers.set("Prefer", "return=minimal");
  //     }
  //     return headers;
  //   },
  // }),
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProfile: builder.query<UserRecord, { userID: string }>({
      queryFn: async ({ userID }) => {
        try {
          const test = (await powersync.get(GET_PROFILE_BY_ID, [userID])) as UserRecord;
          console.log("Fetched profile:", test);

          if (!test) {
            console.log("Profile not found for userID:", userID);

            return { error: { status: 404, data: "Profile not found" } };
          }
          return { data: test };
        } catch (error) {
          console.error("Error fetching profile:", error);
          return { error: { status: 500, data: "Failed to fetch profile" } };
        }
      },
      providesTags: ["Profile"],
    }),
    // updateProfile with powersync
    updateProfile: builder.mutation<UserRecord, UserRecord>({
      queryFn: async (profile) => {
        try {
          // update username and remove column "id:1" from the profile
          const updateProfile = await powersync.execute(
            "UPDATE users SET username = ? WHERE id = ?",
            [profile.username, profile.id]
          );
          // delete the user from the table
          // const removeColumn = await powersync.execute("DELETE FROM users WHERE id = ?", [
          //   profile.id,
          // ]);

          console.log("PROFILE: ", profile);

          console.log("Updated profile:", updateProfile.rowsAffected);
          return {
            data: {
              avatar: "test",
              id: profile.id,
              username: profile.username,
              email: profile.email,
              dob: "07-07-1990", // Assuming dob is static for this example
              location: profile.location,
              profession: profile.profession,
            },
          };
        } catch (error) {
          console.error("Error updating profile:", error);
          return { error: { status: 500, data: "Failed to update profile" } };
        }
      },
      // invalidatesTags: ["test"],
    }),
  }),
  // updateProfile: builder.mutation<User, Partial<User> & { id: string }>({
  //   onQueryStarted: async (profile, { dispatch, queryFulfilled }) => {
  //     // Optimistically update the cache
  //     const patchResult = dispatch(
  //       apiSlice.util.updateQueryData("getProfile", { userID: profile.id }, (draft) => {
  //         const index = draft.findIndex((p) => p.id === profile.id);
  //         if (index !== -1) {
  //           draft[index] = { ...draft[index], ...profile };
  //         }
  //       })
  //     );

  //     try {
  //       await queryFulfilled; // Wait for the mutation to complete
  //     } catch {
  //       patchResult.undo(); // Rollback if mutation fails
  //     }
  //   },
  //   query: (profile) => ({
  //     url: `profiles?id=eq.${profile.id}`,
  //     method: "PATCH",
  //     body: profile,
  //   }),
  //   // invalidatesTags: ["Profile"],
  // }),
});

// Export auto-generated hook
export const { useGetProfileQuery, useUpdateProfileMutation } = apiSlice;
