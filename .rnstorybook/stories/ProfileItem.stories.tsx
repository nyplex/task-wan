import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import ProfileItem from "../../components/UI/ProfileItem";

const meta = {
  title: "UI/ProfileItem",
  component: ProfileItem,
  decorators: [
    (Story) => (
      <View
        style={{
          paddingVertical: 16,
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: [
        "user",
        "bar-chart-2",
        "map-pin",
        "settings",
        "log-out",
        "bell",
        "lock",
        "life-buoy",
        "info",
        "users",
      ],
    },
    badgeCounter: {
      control: "number",
      description: "Counter for notifications or messages",
    },
    disabled: {
      control: "boolean",
      description: "Disable the item",
    },
    title: {
      control: "text",
      description: "Title of the profile item",
    },
  },
} satisfies Meta<typeof ProfileItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    icon: "bell",
    title: "Notifications",
    badgeCounter: 3,
    disabled: false,
    onPress: () => {
      action("Notification item pressed")();
    },
  },
};
