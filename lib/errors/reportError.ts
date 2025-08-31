import * as Sentry from "@sentry/react-native";
import { normalizeError } from "./normalizeError";

export function reportError(e: unknown, extra?: Record<string, any>) {
  const n = normalizeError(e);
  console.warn("[reportError]", n, extra);
  try {
    // Use Sentry.Native when using sentry-expo in bare; adjust if needed
    Sentry.captureException(e instanceof Error ? e : new Error(n.message));
    if (extra) Sentry.addBreadcrumb({ message: JSON.stringify(extra) });
  } catch (err) {
    console.warn("Sentry capture failed", err);
  }
  return n;
}
