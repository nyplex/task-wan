import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
