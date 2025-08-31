import { Severity } from "@/redux/slices/errorsSlice/errorsSlice";

// src/lib/errors/normalizeError.ts
export function normalizeError(e: unknown) {
  const fallback = {
    message: "Something went wrong",
    code: "UNKNOWN",
    severity: "error" as const,
  };
  if (e == null) return fallback;
  if (e instanceof Error) {
    const code = (e as any).code ?? (e as any).status;
    const msg = e.message || fallback.message;
    return { message: msg, code, severity: severityFromCode(code) };
  }
  if (typeof e === "object") {
    try {
      const obj: any = e as any;
      const msg = obj.message ?? JSON.stringify(e);
      const code = obj.code ?? obj.status;
      return { message: String(msg), code, severity: severityFromCode(code) };
    } catch {
      return fallback;
    }
  }
  return { message: String(e), code: "UNKNOWN", severity: "error" as const };
}
function severityFromCode(code: any): Severity {
  if (!code) return "error";
  const s = String(code);
  if (s.includes("ECONN") || s === "NETWORK" || s.includes("timeout"))
    return "info";
  if (s === "404") return "info";
  if (s.startsWith("5") || s === "CRITICAL" || s === "AUTH") return "critical";
  return "error";
}
