import { pushError } from "@/redux/slices/errorsSlice/errorsSlice";
import { reportError } from "./errors/reportError";
import type { AppDispatch } from "@/redux/store";

export async function safe<T>(
  fn: () => Promise<T>,
  dispatch?: AppDispatch,
  userMessage?: string,
  catchCallback?: (error: unknown) => void,
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (e) {
    if (catchCallback) {
      catchCallback(e);
    }
    const n = reportError(e);

    if (dispatch) {
      dispatch(
        pushError({
          id: `${Date.now()}`,
          message: n.message || userMessage || "An unexpected error occurred",
          severity: (n.severity as any) ?? "error",
          code: n.code,
          details: e,
        }),
      );
    }
    throw e;
  }
}
