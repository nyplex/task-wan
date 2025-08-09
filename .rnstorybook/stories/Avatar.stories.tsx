import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import Avatar from "../../components/UI/Avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#eee", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disable the avatar interaction",
    },
    editable: {
      control: "boolean",
      description: "Show edit icon on the avatar",
    },
    fallbackName: {
      control: "text",
      description: "Fallback name to display when no image is provided",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    avatarURL:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    disabled: false,
    editable: true,
    fallbackName: "User",
    onPress: () => {
      action("Avatar pressed")();
    },
  },
};
