import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middlewares/listenerMiddlewares";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import appReducer from "./slices/appSlice/appSlice";
import authReducer from "./slices/authSlice/authSlice";
import errorsReducer from "./slices/errorsSlice/errorsSlice";
import { apiSlice } from "./slices/apiSlice/apiSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    errors: errorsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(apiSlice.middleware),
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
