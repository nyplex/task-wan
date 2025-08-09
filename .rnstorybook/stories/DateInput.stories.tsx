import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import DateInput from "../../components/form/DateInput";

const meta = {
  title: "Form/DateInput",
  component: DateInput,
  decorators: [
    (Story) => (
      <View
        style={{ padding: 16, backgroundColor: "#fff", flex: 1, maxWidth: 200 }}
      >
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    timestamp: {
      control: "date",
      description: "Timestamp to display in the input",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
  },
  args: {
    onPress: () => {
      action("onPress called")();
    },
  },
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    timestamp: Date.now(),
    disabled: false,
    onPress: action("onPress"),
  },
};
