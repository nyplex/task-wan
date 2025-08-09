import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import TaskDetailCard from "../../components/UI/TaskDetailCard";

const meta = {
  title: "UI/TaskDetailCard",
  component: TaskDetailCard,
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
    description: {
      control: { type: "text" },
      description: "Detailed description of the task",
    },
    startDate: {
      control: { type: "date" },
      description: "Start date of the task",
    },
    endDate: {
      control: { type: "date" },
      description: "End date of the task",
    },
  },
} satisfies Meta<typeof TaskDetailCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    title: "Sample Task",
    description:
      "This is a detailed description of the task. It includes all the necessary information that needs to be conveyed to the user.",
    endDate: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week from now
    startDate: Date.now(),
    onPress: (id: string) => {
      action("onPress")({
        args: id,
      });
    },
    disabled: false,
    onPressMore: (id: string) => {
      action("onPressMore")({
        args: id,
      });
    },
    taskId: "task-123",
  },
};
