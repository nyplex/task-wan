import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import TaskTimer from "../../components/UI/TaskTimer";

const meta = {
  title: "UI/TaskTimer",
  component: TaskTimer,
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
    timestamp: {
      control: "date",
      name: "Target Date",
    },
  },
  args: {},
} satisfies Meta<typeof TaskTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    timestamp: Date.now() + 1000 * 60 * 60 * 24, // default: 1 day from now
  },
  render: (args: any) => {
    const timestamp =
      typeof args.timestamp === "string" || args.timestamp instanceof Date
        ? new Date(args.timestamp).getTime()
        : args.timestamp;

    return <TaskTimer timestamp={timestamp} />;
  },
};
