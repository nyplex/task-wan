import { RootState } from "@/redux/store";

export const selectAppState = (state: RootState) => state.app;
export const selectIsAppReady = (state: RootState) => state.app.isAppReady;
export const selectTheme = (state: RootState) => state.app.theme;
export const selectAppVersion = (state: RootState) => state.app.appVersion;
