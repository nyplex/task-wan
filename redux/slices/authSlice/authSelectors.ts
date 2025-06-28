import { RootState } from "@/redux/store";
import { apiSlice } from "../apiSlice/apiSlice";

export const selectAuth = (state: RootState) => state.auth;
export const selectSession = (state: RootState) => state.auth.session;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.isLoading;
export const selectUsersResult = apiSlice.endpoints.getProfile.select({
  userID: "6cfde42a-f3d4-4beb-bcd1-3295e5b3c97e",
});
