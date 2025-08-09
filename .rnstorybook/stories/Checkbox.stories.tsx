import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import Checkbox from "../../components/form/Checkbox";

const meta = {
  title: "Form/Checkbox",
  component: Checkbox,
  decorators: [
    (Story) => (
      <View
        style={{
          padding: 16,
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
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    checked: false,
    disabled: false,
    onPress: () => {
      action("Checkbox toggled")();
    },
  },
};
