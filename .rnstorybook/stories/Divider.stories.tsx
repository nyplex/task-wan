import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import Divider from "../../components/layout/Divider";

const meta = {
  title: "Layout/Divider",
  component: Divider,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Optional title for the divider",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    title: "Divider Title",
    width: "100%",
  },
};
