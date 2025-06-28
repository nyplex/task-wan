import React from "react";
import { Button, View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import CalendarModal from "../../components/UI/CalendarModal";

const meta = {
  title: "UI/CalendarModal",
  component: CalendarModal,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#eee", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarModal>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    isOpen: false,
    onClose: () => {},
    initialDate: new Date().getTime(),
    onSelect: (date) => {},
  },
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <View>
        <Button
          title="Open Calender Modal"
          onPress={() => setIsOpen(true)}
        />
        <CalendarModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          initialDate={new Date().getTime()}
          onSelect={(date) => {
            console.log("Selected date:", date);
            setIsOpen(false);
          }}
        />
      </View>
    );
  },
};
