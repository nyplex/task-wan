// utils/queryError.ts
import { normalizeError } from "@/lib/errors/normalizeError";
import { QueryReturnValue } from "@reduxjs/toolkit/query";

export function buildQueryError(
  e: unknown,
  defaultMessage: string,
  defaultStatus = 500,
): QueryReturnValue<any, unknown, any> {
  const msg = e instanceof Error ? e.message : String(e);
  const n = normalizeError(e);

  return {
    error: {
      status: n.code || defaultStatus,
      data: { message: `${defaultMessage}: ${msg}` },
    },
  };
}
