import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import TaskCard from "../../components/UI/TaskCard";

const meta = {
  title: "UI/TaskCard",
  component: TaskCard,
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
    title: {
      control: { type: "text" },
      description: "Title of the task",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the task card",
    },
    showSelect: {
      control: { type: "boolean" },
      description: "Show select checkbox",
    },
    isSelected: {
      control: { type: "boolean" },
      description: "Indicates if the task is selected",
    },
  },
  args: {
    onPress: () => {
      action("onPress called")();
    },
  },
} satisfies Meta<typeof TaskCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    title: "Sample Task",
    showSelect: true,
    isSelected: false,
    disabled: false,
  },
};
