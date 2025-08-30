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
      <Stack.Screen name="(priorityTask)/[taskID]" />
      <Stack.Screen name="(dailyTask)/[taskID]" />
    </Stack>
  );
};

export default Layout;
