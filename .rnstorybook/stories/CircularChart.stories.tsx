import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import CircularChart from "../../components/UI/CircularChart";

const meta = {
  title: "UI/CircularChart",
  component: CircularChart,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    progress: {
      control: "range",
      description: "Progress value from 0 to 100",
    },
    showTitle: {
      control: "boolean",
      description: "Whether to show the title",
    },
    showValue: {
      control: "boolean",
      description: "Whether to show the value inside the chart",
    },
    title: {
      control: "text",
      description: "Title of the chart",
    },
  },
} satisfies Meta<typeof CircularChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    progress: 75,
    showTitle: true,
    title: "Progress",
    showValue: true,
  },
};
