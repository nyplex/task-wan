import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

// Define API slice
export const apiSlice = createApi({
  reducerPath: "supabaseApi",
  tagTypes: ["Profile"],
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
});
