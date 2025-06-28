import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/buttons/Button";

const meta = {
  title: "Buttons/Button",
  component: Button,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },
    size: {
      control: "radio",
      options: ["small", "large"],
    },
    destructive: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
    },
    leftIcon: {
      options: [false, true],
      mapping: {
        true: (
          <Ionicons
            name="arrow-back"
            size={18}
            color="white"
          />
        ),
        false: undefined,
      },
      control: {
        type: "boolean",
      },
    },
    rightIcon: {
      options: [false, true],
      mapping: {
        true: (
          <Ionicons
            name="arrow-forward"
            size={18}
            color="white"
          />
        ),
        false: undefined,
      },
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    onPress: () => {
      action("onPress called")();
    },
    onTouchEnd: () => {
      action("onTouchEnd called")();
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    title: "My Button",
    variant: "primary",
    size: "large",
    destructive: false,
    disabled: false,
    isLoading: false,
    leftIcon: false,
    rightIcon: false,
  },
};
