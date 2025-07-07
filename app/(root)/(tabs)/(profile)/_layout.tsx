import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Profile"
        options={{
          title: "profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyProfile"
        options={{
          title: "my profile",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
