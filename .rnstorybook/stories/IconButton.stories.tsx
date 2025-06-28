import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import IconButton from "../../components/buttons/IconButton";

const meta = {
  title: "Buttons/IconButton",
  component: IconButton,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#eee", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: [
        "mail",
        "lock",
        "user",
        "arrow-left",
        "arrow-right",
        "bell",
        "x-circle",
        "calendar",
        "plus-circle",
        "bar-chart-2",
        "map-pin",
        "settings",
        "log-out",
        "life-buoy",
        "info",
        "users",
      ],
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
    },
    isDestructive: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    color: {
      control: "radio",
      options: ["primary", "white"],
    },
  },
  args: {
    onPress: () => {
      action("onPress called")();
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    icon: "arrow-left",
    size: "medium",
    isDestructive: false,
    isDisabled: false,
    color: "primary",
  },
};
