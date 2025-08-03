import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import Icon from "../../components/UI/Icon";

const meta = {
  title: "UI/Icon",
  component: Icon,
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
    color: {
      control: "radio",
      options: ["primary", "white"],
    },
    disabled: {
      control: "boolean",
      description: "Disable the icon interaction",
    },
  },
  args: {
    onPress: () => {
      action("onPress called")();
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    icon: "calendar",
    size: "medium",
    color: "primary",
    disabled: false,
    onPress: () => {
      action("Icon pressed")();
    },
  },
};
