import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import AppTitle from "../../components/UI/AppTitle";

const meta = {
  title: "UI/AppTitle",
  component: AppTitle,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof AppTitle>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => <AppTitle />,
};
