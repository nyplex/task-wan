import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import ProgressBar from "../../components/UI/ProgressBar";

const meta = {
  title: "UI/ProgressBar",
  component: ProgressBar,
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
    progress: {
      control: "range",
    },
  },
  args: {},
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    progress: 40,
  },
};
