import { createListenerMiddleware, isRejected } from "@reduxjs/toolkit";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isRejected,
  effect: async (action, listenerApi) => {
    console.log("Redux Listner Middleware triggered for rejected action:", action);

    const message =
      (action.payload as string) || action.error?.message || "An unknown error occurred";

    // Send to Sentry

    // send to crashlytics
  },
});

export { listenerMiddleware };
