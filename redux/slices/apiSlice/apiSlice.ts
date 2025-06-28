// Import RTK Query methods
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Import your type
import type { User } from "../../../types/User";
import { RootState } from "@/redux/store";
import { supabaseAnonKey, supabaseRESTUrl } from "@/lib/supabase";
export type { User };

// Define API slice
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseRESTUrl,
    prepareHeaders: (headers, { getState, type }) => {
      const state = getState() as RootState;
      const token = state.auth.session?.access_token;
      const supabaseKey = supabaseAnonKey;
      headers.set("apikey", supabaseKey);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      if (type === "mutation") {
        headers.set("Content-Type", "application/json");
        headers.set("Prefer", "return=minimal");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<User[], { userID: string }>({
      query: ({ userID }) => {
        return {
          url: `profiles?id=eq.${userID}`,
        };
      },
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<User, Partial<User> & { id: string }>({
      onQueryStarted: async (profile, { dispatch, queryFulfilled }) => {
        // Optimistically update the cache
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getProfile",
            { userID: profile.id },
            (draft) => {
              const index = draft.findIndex((p) => p.id === profile.id);
              if (index !== -1) {
                draft[index] = { ...draft[index], ...profile };
              }
            }
          )
        );

        try {
          await queryFulfilled; // Wait for the mutation to complete
        } catch {
          patchResult.undo(); // Rollback if mutation fails
        }
      },
      query: (profile) => ({
        url: `profiles?id=eq.${profile.id}`,
        method: "PATCH",
        body: profile,
      }),
      // invalidatesTags: ["Profile"],
    }),
  }),
});

// Export auto-generated hook
export const { useGetProfileQuery, useUpdateProfileMutation } = apiSlice;
