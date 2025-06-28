import "@/global.css";
import { Provider, useSelector } from "react-redux";
import store from "@/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GluestackUIProvider } from "@/components/gluestack/gluestack-ui-provider";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import useAuthListener from "@/hooks/useAuthListener";
import { selectSession } from "@/redux/slices/authSlice/authSelectors";
import useErrors from "@/hooks/useErrors";
import { selectAppState } from "@/redux/slices/appSlice/appSelectors";
import BottomSheetProvider from "@/context/BottomSheetProvider";

function InnerLayout() {
  useAuthListener();
  // useErrors();
  const session = useSelector(selectSession);
  const isAppLoading = useSelector(selectAppState);

  if (isAppLoading.isLoading) {
    return null; // or a loading spinner
  }

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider mode="light">
          <ThemeProvider
            // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            value={DarkTheme}>
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
    </Provider>
  );
}
