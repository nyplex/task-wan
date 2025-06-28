import React, { useEffect } from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import DatePicker from "../../components/buttons/DatePicker";

const meta = {
  title: "Buttons/DatePicker",
  component: DatePicker,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    currentDate: {
      control: "date",
      description: "The currently selected date",
    },
    disabled: {
      control: "boolean",
      description: "Disable the date picker",
    },
    onDateChange: {
      action: "onDateChange",
      description: "Callback when the date is changed",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    currentDate: Date.now(),
    disabled: false,
    onDateChange: action("onPress"),
  },
  render: (args) => {
    const [currentDate, setCurrentDate] = React.useState(args.currentDate);

    useEffect(() => {
      setCurrentDate(args.currentDate);
    }, [args.currentDate]);

    return (
      <DatePicker
        {...args}
        currentDate={currentDate}
        onDateChange={(date) => {
          setCurrentDate(date);
          args.onDateChange(date);
        }}
      />
    );
  },
};
