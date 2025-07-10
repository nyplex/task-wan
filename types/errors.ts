export type GlobalError = {
  message: string;
  type?: "network" | "auth" | "form" | "unknown";
  source?: string;
};
