import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import CodeInput from "../../components/form/CodeInput";

const meta = {
  title: "Form/CodeInput",
  component: CodeInput,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    invalid: {
      control: "boolean",
      description: "Indicates whether the input is invalid",
    },
    disabled: {
      control: "boolean",
      description: "Indicates whether the input is in a loading state",
    },
  },
} satisfies Meta<typeof CodeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    invalid: false,
    disabled: false,
    onValueChange: (value: string) => {
      action("onValueChange")({
        args: value,
        formattedValue: value,
      });
    },
    currentValue: "",
  },
};
