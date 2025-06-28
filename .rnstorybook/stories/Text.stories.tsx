import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import Text from "../../components/Text";

const meta = {
  title: "Components/Text",
  component: Text,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story>Hello World</Story>
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    size: {
      control: "radio",
      options: [
        "heading2XL",
        "headingXL",
        "heading",
        "bodyL",
        "body",
        "bodyS",
        "bodyXS",
        "caption",
      ],
    },
    weight: {
      control: "radio",
      options: ["bold", "semi-bold", "medium", "regular"],
    },
    color: {
      control: "radio",
      options: ["primary", "secondary", "disabled"],
    },
  },
  args: {
    onPress: () => {
      action("onPress called")();
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    color: "primary",
    disabled: false,
    size: "body",
    weight: "regular",
    children: "Hello World",
  },
};
