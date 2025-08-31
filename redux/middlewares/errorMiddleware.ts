import { Middleware, UnknownAction } from "@reduxjs/toolkit";
import { normalizeError } from "@/lib/errors/normalizeError";
import { pushError } from "../slices/errorsSlice/errorsSlice";
import { reportError } from "@/lib/errors/reportError";

// type guard to detect rejected actions
function isRejectedActionWithPayload(
  action: unknown,
): action is UnknownAction & { error: unknown } {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof (action as any).type === "string" &&
    (action as any).type.endsWith("/rejected") &&
    "payload" in action
  );
}

export const errorMiddleware: Middleware = (store) => (next) => (action) => {
  if (
    isRejectedActionWithPayload(action) &&
    action.type.startsWith("supabaseApi/")
  ) {
    const raw = action.payload;

    const err = normalizeError(raw);

    reportError(raw, { action: action.type, meta: action.meta ?? {} });

    store.dispatch(
      pushError({
        id: `${Date.now()}`,
        message: err.message,
        severity: err.severity ?? "error",
        code: err.code,
        details: raw,
      }),
    );
  }

  return next(action);
};
