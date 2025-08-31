import { configureStore } from "@reduxjs/toolkit";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import appReducer from "./slices/appSlice/appSlice";
import authReducer from "@/features/authentication/authSlice/authSlice";
import errorsReducer from "./slices/errorsSlice/errorsSlice";
import { apiSlice } from "./slices/apiSlice/apiSlice";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    errors: errorsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, errorMiddleware),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      devToolsEnhancer({
        trace: true,
      }),
    ),
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;

export default store;
