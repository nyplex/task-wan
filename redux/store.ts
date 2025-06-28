import { Middleware, configureStore } from "@reduxjs/toolkit";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import appReducer from "./slices/appSlice/appSlice";
import authReducer from "./slices/authSlice/authSlice";
import errorsReducer, { setError } from "./slices/errorsSlice/errorsSlice";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice/apiSlice";

export const errorLogger: Middleware = (storeAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    action.type;
    storeAPI.dispatch(
      setError({
        message: action.payload as string | "An unknown error occurred",
      })
    );
  }
  return next(action);
};
const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    errors: errorsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, errorLogger),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      devToolsEnhancer({
        trace: true,
      })
    ),
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;

export default store;
