import { RootState } from "@/redux/store";

export const selectSession = (state: RootState) => state.auth.session;
export const selectAuthStatus = (state: RootState) => state.auth.isLoading;
