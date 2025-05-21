import fonts from "@/assets/fonts/fonts";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { supabase } from "@/lib/supabase";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// @ts-ignore
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true; // Suppress warnings for Firebase modular imports

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.hideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded] = useFonts(fonts);

  // if (!loaded) {
  //   return null;
  // }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider>
        {/* <Provider store={store}> */}
        {/* <BottomSheetProvider> */}
        <ThemeProvider
          // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          value={DarkTheme}
        >
          <Stack>
            <Stack.Protected guard={!session}>
              <Stack.Screen
                name="(app)"
                options={{
                  title: "(app)",
                  headerShown: false,
                }}
              />
            </Stack.Protected>
            <Stack.Protected guard={!!session}>
              <Stack.Screen
                name="(root)"
                options={{
                  title: "(root)",
                  headerShown: false,
                }}
              />
            </Stack.Protected>
          </Stack>

          {/* <ErrorContainer /> */}
          <StatusBar style="light" translucent={true} />
        </ThemeProvider>
        {/* </BottomSheetProvider> */}
        {/* </Provider> */}
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
