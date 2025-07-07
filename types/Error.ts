export type Error = {
  message: string;
  type?: "network" | "auth" | "form" | "unknown";
  statusCode?: string;
  source?: string;
};
