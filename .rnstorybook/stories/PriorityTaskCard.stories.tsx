import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import PriorityTaskCard from "../../components/UI/PriorityTaskCard";

const meta = {
  title: "UI/PriorityTaskCard",
  component: PriorityTaskCard,
  decorators: [
    (Story) => (
      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          flex: 1,
        }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    progress: {
      control: { type: "range" },
      description: "Progress of the task represented as a fraction (0 to 1)",
    },
    timeLeft: {
      control: { type: "text" },
      description: "Time left for the task in a human-readable format",
    },
    title: {
      control: { type: "text" },
      description: "Title of the task",
    },
    bgColor: {
      control: "select",
      options: [
        "Sky Blue",
        "Green",
        "Yellow",
        "Rose Pink",
        "Purple",
        "Grey",
        "Orange",
        "Lime Green",
        "Cyan",
        "Violet",
      ],
      description: "Background color of the task card",
    },
  },
  args: {
    onPress: () => {
      action("onPress called")();
    },
  },
} satisfies Meta<typeof PriorityTaskCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    progress: 25,
    timeLeft: "2h 30m",
    title: "Task Title",
    bgColor: "Violet",
    disabled: false,
  },
};
