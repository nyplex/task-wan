import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="settings" />
    </Stack>
  );
};

export default Layout;
