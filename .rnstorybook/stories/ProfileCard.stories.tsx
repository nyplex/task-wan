import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import ProfileCard from "../../components/UI/ProfileCard";

const avatarURL =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

const meta = {
  title: "UI/ProfileCard",
  component: ProfileCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#eee", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    avatarURL: {
      control: "radio",
      options: [avatarURL, null],
      labels: {
        [avatarURL]: "url",
        null: null,
      },
    },
    location: {
      control: "text",
      defaultValue: "San Francisco, CA",
      description: "Location of the user",
    },
    name: {
      control: "text",
      defaultValue: "John Doe",
      description: "Full name of the user",
    },
    profession: {
      control: "text",
      defaultValue: "Software Engineer",
      description: "Profession of the user",
    },
    tasksCompleted: {
      control: "number",
      defaultValue: 42,
      description: "Number of tasks completed by the user",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    name: "John Doe",
    avatarURL:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    location: "San Francisco, CA",
    profession: "Software Engineer",
    tasksCompleted: 42,
  },
};
