import "@azure/core-asynciterator-polyfill";
import "@/global.css";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/gluestack/gluestack-ui-provider";
import { Provider, useSelector } from "react-redux";
import { selectSession } from "@/redux/slices/authSlice/authSelectors";
import { selectAppState } from "@/redux/slices/appSlice/appSelectors";
import { KeyboardProvider } from "react-native-keyboard-controller";
import store from "@/redux/store";
import useInitializeApp from "@/hooks/useInitializeApp";
import useAuthListener from "@/hooks/useAuthListener";
import useErrors from "@/hooks/useErrors";
import { BottomSheetProvider } from "@/context/BottomSheetProvider";

function InnerLayout() {
  useErrors();
  useInitializeApp();
  useAuthListener();
  const session = useSelector(selectSession);
  const isAppLoading = useSelector(selectAppState);

  if (isAppLoading.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // if (!isAppLoading.isAppReady) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text style={{ fontSize: 18, color: "#000" }}>App is not ready. Please restart...</Text>
  //     </View>
  //   );
  // }

  const IS_STORYBOOK = false;

  return (
    <>
      <Stack>
        <Stack.Protected guard={IS_STORYBOOK}>
          <Stack.Screen
            name="Storybook"
            options={{
              title: "Storybook",
              headerShown: false,
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!session && !IS_STORYBOOK}>
          <Stack.Screen
            name="(app)"
            options={{
              title: "(app)",
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

export default function RootLayout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
