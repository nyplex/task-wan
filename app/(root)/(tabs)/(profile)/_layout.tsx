import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Profile"
        options={{
          title: "profile",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MyProfile"
        options={{
          title: "my profile",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default _layout;
