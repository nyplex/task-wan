import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import CalendarTimeline from "../../components/UI/CalendarTimeline";

const meta = {
  title: "UI/CalendarTimeline",
  component: CalendarTimeline,
  decorators: [
    (Story) => (
      <View style={{ paddingVertical: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    initialDate: {
      control: "date",
      description: "Timestamp to display in the input",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarTimeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    disabled: false,
    initialDate: Date.now(),
    onPress: (date: number) => {
      action("onPress")({
        args: date,
        formattedDate: new Date(date).toLocaleDateString("en-GB"),
      });
    },
  },
};
