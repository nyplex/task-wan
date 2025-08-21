import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Start",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "register",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verificationCode"
        options={{
          title: "verificationCode",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="successVerification"
        options={{
          title: "successVerification",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
