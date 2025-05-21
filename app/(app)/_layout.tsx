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
        name="Login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        options={{
          title: "Register",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerificationCode"
        options={{
          title: "VerificationCode",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SuccessVerification"
        options={{
          title: "SuccessVerification",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
