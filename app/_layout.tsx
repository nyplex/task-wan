// Polyfills & global styles
import "@azure/core-asynciterator-polyfill";
import "@/global.css";

// React Native core
import { ActivityIndicator, View } from "react-native";

// Gesture & keyboard
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

// Navigation & status bar
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

// UI Providers
import { GluestackUIProvider } from "@/gluestack-ui/gluestack-ui-provider";
import { BottomSheetProvider } from "@/context/BottomSheetProvider";

// Redux
import { Provider, useSelector } from "react-redux";
import store from "@/redux/store";
import { selectSession } from "@/features/authentication/authSlice/authSelectors";
import { selectAppState } from "@/redux/slices/appSlice/appSelectors";

// Hooks
import useAuthListener from "@/features/authentication/hooks/useAuthListener";
import useErrors from "@/hooks/useErrors";

// Sentry & Error Boundary
import * as Sentry from "@sentry/react-native";
import { SentryInit } from "@/lib/sentry";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";

// Initialize Sentry
SentryInit();

function InnerLayout() {
  useErrors();
  useAuthListener();
  const session = useSelector(selectSession);
  const appState = useSelector(selectAppState);

  if (appState.isLoading || !appState.isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const IS_STORYBOOK = false;

  return (
    <>
      <Stack>
        {/* <Stack.Protected guard={IS_STORYBOOK}>
          <Stack.Screen
            name="Storybook"
            options={{
              title: "Storybook",
              headerShown: false,
            }}
          />
        </Stack.Protected> */}
        <Stack.Protected guard={!session && !IS_STORYBOOK}>
          <Stack.Screen
            name="(auth)"
            options={{
              title: "(auth)",
              headerShown: false,
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!!session && !IS_STORYBOOK}>
          <Stack.Screen
            name="(root)"
            options={{
              title: "(root)",
              headerShown: false,
            }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default Sentry.wrap(function RootLayout() {
  return (
    <Provider store={store}>
      <AppErrorBoundary>
        <KeyboardProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <GluestackUIProvider mode="light">
              <ThemeProvider
                value={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    background: "#ffffff",
                  },
                }}
              >
                <BottomSheetProvider>
                  <InnerLayout />
                  <StatusBar
                    style="dark"
                    translucent={true}
                    backgroundColor="transparent"
                  />
                </BottomSheetProvider>
              </ThemeProvider>
            </GluestackUIProvider>
          </GestureHandlerRootView>
        </KeyboardProvider>
      </AppErrorBoundary>
    </Provider>
  );
});
