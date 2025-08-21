import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
