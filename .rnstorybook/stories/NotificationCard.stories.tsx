import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import NotificationCard from "../../components/UI/NotificationCard";

const meta = {
  title: "UI/NotificationCard",
  component: NotificationCard,
  decorators: [
    (Story) => (
      <View
        style={{
          marginTop: 20,
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
    title: {
      control: "text",
      description: "Title of the notification",
    },
    description: {
      control: "text",
      description: "Description of the notification",
    },
    disabled: {
      control: "boolean",
      description: "Disable the notification card interaction",
    },
    unread: {
      control: "boolean",
      description: "Indicates if the notification is unread",
    },
  },
  args: {
    onPress: () => {
      action("onPress called")();
    },
  },
} satisfies Meta<typeof NotificationCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    icon: "bell",
    title: "See your statistic!",
    description: "Hello Phillip, let's see your progress in 2020, and fix it",
  },
};
