import * as Sentry from "@sentry/react-native";
import * as Application from "expo-application";

export const SentryInit = () => {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    sendDefaultPii: true,
    environment: process.env.EXPO_PUBLIC_APP_VARIANT,
    release: "1.0.0",
    dist: Application.nativeBuildVersion || undefined,
    attachScreenshot: true,
    attachViewHierarchy: true,
    enableCaptureFailedRequests: true,
    // Configure Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [
      Sentry.mobileReplayIntegration(),
      Sentry.feedbackIntegration(),
    ],
  });
};
